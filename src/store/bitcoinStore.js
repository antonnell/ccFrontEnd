import fetch from 'node-fetch';
import config from "../config";
import async from "async";

var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher;
let Emitter = require('events').EventEmitter;

let dispatcher = new Dispatcher();
let emitter = new Emitter();

let apiUrl = config.apiUrl;

class Store {
  constructor() {
    this.store = {
      accounts: null,
      accountsCombined: null
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getBitcoinAddress':
            this.getBitcoinAddress(payload);
            break;
          case 'createBitcoinAddress':
            this.createBitcoinAddress(payload);
            break;
          case 'importBitcoinAddress':
            this.importBitcoinAddress(payload);
            break;
          case 'updateBitcoinAddress':
            this.updateBitcoinAddress(payload);
            break;
          case 'deleteBitcoinAddress':
            this.deleteBitcoinAddress(payload);
            break;
          case 'sendBitcoin':
            this.sendBitcoin(payload);
            break;
          case 'exportBitcoinKey':
            this.exportBitcoinKey(payload);
            break;
          case 'getBitcoinTransactionHistory':
            this.getBitcoinTransactionHistory(payload);
            break;
          case 'getBitcoinWalletDetails':
            this.getBitcoinWalletDetails(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  //GETTER AND SETTER FOR CURRENT STORE DATA
  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return emitter.emit('StoreUpdated');
  };

  getBitcoinAddress = function (payload) {
    var url = 'bitcoin/getUserBtcWallets/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('accountsUpdated')
        return
      }

      if(data && data.success) {
        this.setStore({accounts: data.wallets})

        let accountsCombined = data.wallets.reduce((total, currentVal) => {

          total.balance = total.balance + currentVal.balance
          total.usdBalance = total.usdBalance + currentVal.usdBalance

          return total
        }, {
          balance: 0,
          usdBalance: 0,
          type: 'Bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC'
        })

        this.setStore({accountsCombined: [accountsCombined]})

        //trigger get for all Bitcoin Wallet Details
        async.map(data.wallets, (wallet, callback) => {
          payload.content.id = wallet.id
          this.getBitcoinWalletDetails(payload, callback)
        }, (err, detailsData) => {

          let walletsNew = data.wallets.map((wallet) => {
            detailsData.map((walletDetails) => {
              if(walletDetails.id === wallet.id) {
                wallet.addresses = walletDetails.addresses
              }
              return true
            })
            return wallet
          })

          this.setStore({accounts: walletsNew})

          emitter.emit('accountsUpdated');
        })

      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('accountsUpdated')
      }
    });
  };

  createBitcoinAddress = function (payload) {
    var url = 'bitcoin/createWallet';
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      displayName: payload.content.name
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getBitcoinAddress(payload)
    });
  };

  importBitcoinAddress = function (payload) {
    var url = 'bitcoin/importWallet';
    var postJson = {
      displayName: payload.content.name,
      isPrimary: payload.content.isPrimary,
      privateKey: payload.content.privateKey,
      phrase: payload.content.mnemonicPhrase
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getBitcoinAddress(payload)
    });
  };

  updateBitcoinAddress = function (payload) {
    var url = 'bitcoin/updateWallet';
    var postJson = {
      displayName: payload.content.name,
      isPrimary: payload.content.isPrimary,
      walletId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getBitcoinAddress(payload)
    });
  };

  deleteBitcoinAddress = function (payload) {
    var url = 'bitcoin/deleteWallet';
    var postJson = {
      walletId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getBitcoinAddress(payload)
    });
  };

  sendBitcoin = function (payload) {
    var url = 'bitcoin/send';
    var postJson = {
      walletId: payload.content.fromAddress,
      value: payload.content.amount,
      useNewChangeAddress: payload.content.useNewChangeAddress
    };
    if (payload.content.recipientAddress != null) {
      postJson.recipientAddress = payload.content.recipientAddress;
    }
    if (payload.content.recipientWalletId != null) {
      postJson.recipientWalletId = payload.content.recipientWalletId;
    }
    if (payload.content.contactUserName != null) {
      postJson.contactUserName = payload.content.contactUserName;
    }

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }
      emitter.emit('sendReturned', err, data);
    });
  };

  exportBitcoinKey = function (payload) {
    var url = 'bitcoin/exportWallet';
    var postJson = {
      walletId: payload.content.id,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  getBitcoinWalletDetails  = function  (payload, callback) {
    var url = 'bitcoin/getWalletDetails/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, callback);
  };

  getBitcoinTransactionHistory = function (payload) {
    var url = 'bitcoin/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      this.setStore({ transactions: data.transactions })
      emitter.emit('transactionsUpdated');
    }, payload.content.id);
  };

  callApi = function (url, method, postData, payload, callback) {
    //get X-curve-OTP from sessionStorage
    var userString = sessionStorage.getItem('cc_user');
    var authOTP = '';
    if (userString) {
      var user = JSON.parse(userString);
      authOTP = user.authOTP;
    }

    var call = apiUrl + url;

    if (method === 'GET') {
      postData = null;
    } else {
      const signJson = JSON.stringify(postData);
      const signMnemonic = bip39.generateMnemonic();
      const cipher = crypto.createCipher('aes-256-cbc', signMnemonic);
      const signEncrypted =
        cipher.update(signJson, 'utf8', 'base64') + cipher.final('base64');
      var signData = {
        e: signEncrypted.hexEncode(),
        m: signMnemonic.hexEncode(),
        u: sha256(url.toLowerCase()),
        p: sha256(sha256(url.toLowerCase())),
        t: new Date().getTime()
      };
      const signSeed = JSON.stringify(signData);
      const signSignature = sha256(signSeed);
      signData.s = signSignature;
      postData = JSON.stringify(signData);
    }

    fetch(call, {
      method: method,
      body: postData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + payload.token,
        'X-curve-OTP': authOTP
      }
    })
      .then(res => {
        if (res.status === 401) {
          return emitter.emit('Unauthorised', null, null);
        }
        if (res.status === 403) {
          return emitter.emit('Unauthorised', null, null);
        }

        if (res.ok) {
          return res;
        } else {
          callback(res.statusText)
        }
      })
      .then(res => res.json())
      .then(res => {
        callback(null, res)
      })
      .catch(error => {
        callback(error, null)
      });
  };
}

/* eslint-disable */
String.prototype.hexEncode = function () {
  var hex, i;
  var result = '';
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }
  return result;
};
String.prototype.hexDecode = function () {
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

/* eslint-enable */
var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
