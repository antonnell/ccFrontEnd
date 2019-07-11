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
      erc20Accounts: null,
      erc20AccountsCombined: null,
      supportedERC20Tokens: null,
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getEthAddress':
            this.getEthAddress(payload);
            break;
          case 'createEthAddress':
            this.createEthAddress(payload);
            break;
          case 'importEthAddress':
            this.importEthAddress(payload);
            break;
          case 'updateEthAddress':
            this.updateEthAddress(payload);
            break;
          case 'deleteEthAddress':
            this.deleteEthAddress(payload);
            break;
          case 'sendEther':
            this.sendEther(payload);
            break;
          case 'createPoolingContract':
            this.createPoolingContract(payload);
            break;
          case 'exportEthereumKey':
            this.exportEthereumKey(payload);
            break;
          case 'getERC20Address':
            this.getERC20Address(payload);
            break;
          case 'sendERC20':
            this.sendERC20(payload);
            break;
          case 'getSupportedERC20Tokens':
            this.getSupportedERC20Tokens(payload);
            break;
          case 'getEthTransactionHistory':
            this.getEthTransactionHistory(payload);
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

  getEthAddress = function (payload) {
    var url = 'ethereum/getUserAddresses/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('accountsUpdated')
        return
      }

      if(data && data.success) {
        this.setStore({accounts: data.ethAddresses})

        let accountsCombined = data.ethAddresses.reduce((total, currentVal) => {

          total.balance = total.balance + currentVal.balance
          total.usdBalance = total.usdBalance + currentVal.usdBalance

          return total
        }, {
          balance: 0,
          usdBalance: 0,
          type: 'Ethereum',
          name: 'Ethereum',
          symbol: 'Eth'
        })

        this.setStore({accountsCombined: [accountsCombined]})

        //trigger get for all ERC20 addresses
        async.map(data.ethAddresses, (account, callback) => {
          payload.content.address = account.address
          this.getERC20Address(payload, callback)
        }, (err, erc20data) => {

          let accountsNew = data.ethAddresses.map((address) => {
            erc20data.map((accountTokens) => {
              if(accountTokens.payloadAddress === address.address) {
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
          for(var i = 0; i < erc20data.length; i++) {

            //itterate through each of the sub sections
            for(var j = 0; j < erc20data[i].tokens.length; j++) {

              if(i === 0) {
                totals.push({
                  balance: erc20data[i].tokens[j].balance,
                  usdBalance: 0,
                  type: 'ERC20',
                  name: erc20data[i].tokens[j].name,
                  symbol: erc20data[i].tokens[j].symbol,
                  address: erc20data[i].tokens[j].address
                })
              } else {

                //itterate through totals to add balance
                for(var k = 0; k < totals.length; k++) {
                  if(totals[k].address === erc20data[i].tokens[j].address) {
                    totals[k].balance = totals[k].balance + erc20data[i].tokens[j].balance
                  }
                }
              }
            }
          }

          this.setStore({ erc20AccountsCombined: totals })
          emitter.emit('erc20AccountsUpdated');
        })
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('accountsUpdated')
      }
    });
  };

  createEthAddress = function (payload) {
    var url = 'ethereum/createAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getEthAddress(payload)
    });
  };

  importEthAddress = function (payload) {
    var url = 'ethereum/importAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.publicAddress,
      privateKey: payload.content.privateKey
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getEthAddress(payload)
    });
  };

  updateEthAddress = function (payload) {
    var url = 'ethereum/updateAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getEthAddress(payload)
    });
  };

  deleteEthAddress = function (payload) {
    var url = 'ethereum/deleteAddress';
    var postJson = {
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getEthAddress(payload)
    });
  };

  sendEther = function (payload) {
    var url = 'ethereum/sendEther';
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

  createPoolingContract = function (payload) {
    var url = 'ethereum/createPoolingContract';
    var postJson = {
      ownerEthAddress: payload.content.ethAddress,
      name: payload.content.name
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  exportEthereumKey = function (payload) {
    var url = 'ethereum/exportAddress';
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  getERC20Address = function (payload, callback) {
    const addy = payload.content.address
    var url = 'ethereum/getErc20Balances/' + addy;
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

  sendERC20 = function (payload) {
    var url = 'ethereum/sendErc20Tokens';
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

  getSupportedERC20Tokens = function (payload) {
    var url = 'ethereum/getSupportedErc20Tokens';

    this.callApi(url, 'GET', null, payload, (err, data) => {

      this.setStore({ supportedERC20Tokens: data.tokens });
      emitter.emit('getSupportedERC20Tokens');
    });
  };

  getEthTransactionHistory = function (payload) {
    var url = 'ethereum/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {

      this.setStore({ transactions: data.transactions });
      emitter.emit('transactionsUpdated');
    });
  };

  convertCurve = function (payload) {
    var url = 'ethereum/convertCurve';
    var postJson = payload.content

    console.log(postJson)
    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
      this.getEthAddress(payload)
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
        callback(null, res)
        // emitter.emit(payload.type, null, res);
      })
      .catch(error => {
        callback(error, null)
        // emitter.emit(payload.type, error, null);
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
