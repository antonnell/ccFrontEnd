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
      accountsCombined: null,
      wrc20Accounts: null,
      wrc20AccountsCombined: null,
      supportedWRC20Tokens: null
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getWanAddress':
            this.getWanAddress(payload);
            break;
          case 'createWanAddress':
            this.createWanAddress(payload);
            break;
          case 'importWanAddress':
            this.importWanAddress(payload);
            break;
          case 'updateWanAddress':
            this.updateWanAddress(payload);
            break;
          case 'deleteWanAddress':
            this.deleteWanAddress(payload);
            break;
          case 'sendWan':
            this.sendWan(payload);
            break;
          case 'exportWanchainKey':
            this.exportWanchainKey(payload);
            break;
          case 'getWRC20Address':
            this.getWRC20Address(payload);
            break;
          case 'sendWRC20':
            this.sendWRC20(payload);
            break;
          case 'getSupportedWRC20Tokens':
            this.getSupportedWRC20Tokens(payload);
            break;
          case 'getWanTransactionHistory':
            this.getWanTransactionHistory(payload);
            break;
          case 'convertCurve':
            this.convertCurve(payload);
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

  getWanAddress = function (payload) {
    var url = 'wanchain/getUserAddresses/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('accountsUpdated')
        return
      }

      if(data && data.success) {
        this.setStore({accounts: data.wanAddresses})

        let accountsCombined = data.wanAddresses.reduce((total, currentVal) => {

          total.balance = total.balance + currentVal.balance
          total.usdBalance = total.usdBalance + currentVal.usdBalance

          return total
        }, {
          balance: 0,
          usdBalance: 0,
          type: 'Wanchain',
          name: 'Wanchain',
          symbol: 'Wan'
        })

        this.setStore({accountsCombined: [accountsCombined]})

        //trigger get for all WRC20 addresses
        async.map(data.wanAddresses, (account, callback) => {
          payload.content.address = account.publicAddress
          this.getWRC20Address(payload, callback)
        }, (err, wrc20data) => {

          let accountsNew = data.wanAddresses.map((address) => {
            wrc20data.map((accountTokens) => {
              if(accountTokens.payloadAddress === address.publicAddress) {
                address.tokens = accountTokens.tokens
              }
              return true
            })
            return address
          })

          this.setStore({accounts: accountsNew})

          emitter.emit('accountsUpdated');
          emitter.emit('appAccountsUpdated');

          let totals = []

          //itterate through the responses.
          for(var i = 0; i < wrc20data.length; i++) {

            //itterate through each of the sub sections
            for(var j = 0; j < wrc20data[i].tokens.length; j++) {

              if(i === 0) {
                totals.push({
                  balance: wrc20data[i].tokens[j].balance,
                  usdBalance: 0,
                  type: 'WRC20',
                  name: wrc20data[i].tokens[j].name,
                  symbol: wrc20data[i].tokens[j].symbol,
                  address: wrc20data[i].tokens[j].address
                })
              } else {

                //itterate through totals to add balance
                for(var k = 0; k < totals.length; k++) {
                  if(totals[k].address === wrc20data[i].tokens[j].publicAddress) {
                    totals[k].balance = totals[k].balance + wrc20data[i].tokens[j].balance
                  }
                }
              }
            }
          }

          this.setStore({ wrc20AccountsCombined: totals })
          emitter.emit('wrc20AccountsUpdated');
        })
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('accountsUpdated')
      }
    });
  };

  createWanAddress = function (payload) {
    var url = 'wanchain/createAddress';
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      name: payload.content.name
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getWanAddress(payload)
    });
  };

  importWanAddress = function (payload) {
    var url = 'wanchain/importMyCCAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.publicAddress,
      privateKey: payload.content.privateKey
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getWanAddress(payload)
    });
  };

  updateWanAddress = function (payload) {
    var url = 'wanchain/updateAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getWanAddress(payload)
    });
  };

  deleteWanAddress = function (payload) {
    var url = 'wanchain/deleteAddress';
    var postJson = {
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getWanAddress(payload)
    });
  };

  sendWan = function (payload) {
    var url = 'wanchain/sendWan';
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei
    };
    if (payload.content.toAddress != null) {
      postJson.toAddress = payload.content.toAddress;
    }
    if (payload.content.contactUserName != null) {
      postJson.contactUsername = payload.content.contactUserName;
    }

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }
      emitter.emit('sendReturned', err, data);
    });
  };

  exportWanchainKey = function (payload) {
    var url = 'wanchain/exportAddress';
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  getWRC20Address = function (payload, callback) {
    const addy = payload.content.address
    var url = 'wanchain/getWrc20Balances/' + addy;
    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        callback(err, data)
        return
      }
      data.payloadAddress = addy
      callback(err, data)
    });
  };

  sendWRC20 = function (payload) {
    var url = 'wanchain/sendWrc20Tokens';
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei,
      tokenAddress: payload.content.tokenAddress
    };
    if (payload.content.toAddress != null) {
      postJson.toAddress = payload.content.toAddress;
    }
    if (payload.content.contactUserName != null) {
      postJson.contactUsername = payload.content.contactUserName;
    }

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }
      emitter.emit('sendReturned', err, data);
    });
  };

  getSupportedWRC20Tokens = function (payload) {
    var url = 'wanchain/getSupportedWrc20Tokens';

    this.callApi(url, 'GET', null, payload, (err, data) => {

      this.setStore({ supportedWRC20Tokens: data.tokens });
      emitter.emit('getSupportedWRC20Tokens');
    });
  };

  getWanTransactionHistory = function (payload) {
    var url = 'wanchain/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {

      this.setStore({ transactions: data.transactions });
      emitter.emit('transactionsUpdated');
    });
  };

  convertCurve = function (payload) {
    var url = 'wanchain/convertCurve';
    var postJson = payload.content

    console.log(postJson)
    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
      this.getWanAddress(payload)
    });
  };

  callApi = function (url, method, postData, payload, callback, customEmit) {
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
        // emitter.emit(payload.type, null, res, customEmit);
        callback(null, res)
      })
      .catch(error => {
        // emitter.emit(payload.type, error, null, customEmit);
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
