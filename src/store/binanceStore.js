import fetch from 'node-fetch';
import config from "../config";

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
      accountsCombined: null,
      bep2AccountsCombined: null
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getBinanceAddress':
            this.getBinanceAddress(payload);
            break;
          case 'createBinanceAddress':
            this.createBinanceAddress(payload);
            break;
          case 'importBinanceAddress':
            this.importBinanceAddress(payload);
            break;
          case 'updateBinanceAddress':
            this.updateBinanceAddress(payload);
            break;
          case 'deleteBinanceAddress':
            this.deleteBinanceAddress(payload);
            break;
          case 'sendBinance':
            this.sendBinance(payload);
            break;
          case 'exportBinanceKey':
            this.exportBinanceKey(payload);
            break;
          case 'getBinanceTransactionHistory':
            this.getBinanceTransactionHistory(payload);
            break;
          case 'convertCurve':
            this.convertCurve(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  };

  //GETTER AND SETTER FOR CURRENT STORE DATA
  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return emitter.emit('StoreUpdated');
  };

  getBinanceAddress = function (payload) {
    var url = 'binance/getUserAddresses/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('accountsUpdated')
        return
      }

      if(data && data.success) {

        console.log(data.binanceAddresses)

        const binAccount = data.binanceAddresses.map((acc) => {

          let bal = acc.balances.filter((balance) => {
            return balance.symbol === 'BNB'
          })

          let balance = 0

          if(bal.length > 0) {
            balance = parseFloat(bal[0].free)
          }

          acc.tokens = acc.balances

          acc.balance = balance
          acc.usdBalance = acc.totalUsdValue
          return acc
        })

        this.setStore({accounts: binAccount})

        let accountsCombined = data.binanceAddresses.reduce((total, currentVal) => {

          let bal = currentVal.balances.filter((balance) => {
            return balance.symbol === 'BNB'
          })

          if(bal.length > 0) {
            total.balance = parseFloat(total.balance) + parseFloat(bal[0].free)
            total.usdBalance = total.usdBalance + parseFloat(bal[0].usdValue)
          }

          return total
        }, {
          balance: 0,
          usdBalance: 0,
          type: 'Binance',
          name: 'Binance',
          symbol: 'BNB'
        })

        let totals = []

        //itterate through the responses.
        for(var i = 0; i < data.binanceAddresses.length; i++) {

          //itterate through each of the sub sections
          for(var j = 0; j < data.binanceAddresses[i].balances.length; j++) {

            if(data.binanceAddresses[i].balances[j].symbol !== 'BNB') {
              if(i === 0) {
                totals.push({
                  balance: parseFloat(data.binanceAddresses[i].balances[j].free),
                  usdBalance: parseFloat(data.binanceAddresses[i].balances[j].usdValue),
                  type: 'BEP2',
                  name: data.binanceAddresses[i].balances[j].symbol,
                  symbol: data.binanceAddresses[i].balances[j].symbol,
                  address: data.binanceAddresses[i].balances[j].symbol
                })
              } else {

                //itterate through totals to add balance
                for(var k = 0; k < totals.length; k++) {
                  if(totals[k].symbol === data.binanceAddresses[i].balances[j].symbol) {
                    totals[k].balance = parseFloat(totals[k].balance) + parseFloat(data.binanceAddresses[i].balances[j].free)
                    totals[k].usdBalance = parseFloat(totals[k].usdBalance) + parseFloat(data.binanceAddresses[i].balances[j].usdValue)
                  }
                }

              }
            }
          }
        }

        this.setStore({accountsCombined: [accountsCombined], bep2AccountsCombined: totals })

        emitter.emit('accountsUpdated');
        emitter.emit('bep2AccountsUpdated');
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('accountsUpdated')
      }
    });
  };

  createBinanceAddress = function (payload) {
    var url = 'binance/createAddress';
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      name: payload.content.name
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getBinanceAddress(payload)
    });
  };

  importBinanceAddress = function (payload) {
    var url = 'binance/importAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      privateKey: payload.content.privateKey,
      phrase: payload.content.mnemonicPhrase
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getBinanceAddress(payload)
    });
  };

  updateBinanceAddress = function (payload) {
    var url = 'binance/updateAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getBinanceAddress(payload)
    });
  };

  deleteBinanceAddress = function (payload) {
    var url = 'binance/deleteAddress';
    var postJson = {
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getBinanceAddress(payload)
    });
  };

  sendBinance = function (payload) {
    var url = 'binance/send';
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei,
      currency: payload.content.currency
    };
    if (payload.content.toAddress != null) {
      postJson.toAddress = payload.content.toAddress;
    }
    if (payload.content.contactUserName != null) {
      postJson.contactUsername = payload.content.contactUserName;
    }

    console.log(postJson)

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }
      emitter.emit('sendReturned', err, data);
    });
  };

  exportBinanceKey = function (payload) {
    var url = 'binance/exportAddress';
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  getBinanceTransactionHistory = function (payload) {
    var url = 'binance/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(data) {
        this.setStore({ transactions: data.transactions });
        emitter.emit('transactionsUpdated');
      }
    });
  };

  convertCurve = function (payload) {
    var url = 'binance/convertCurve';
    var postJson = payload.content

    console.log(postJson)
    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
      this.getBinanceAddress(payload)
    });
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
          throw Error(res.statusText);
        }
      })
      .then(res => res.json())
      .then(res => {
        callback(null, res);
      })
      .catch(error => {
        callback(error, null);
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
