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

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getEthAddress':
            this.getEthAddress(payload);
            break;
          case 'createEthAddressWhitelist':
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
          default: {
          }
        }
      }.bind(this)
    );
  }

  getEthAddress = function (payload) {
    // console.log(payload);
    var url = 'ethereum/getUserAddresses/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  createEthAddress = function (payload) {
    var url = 'ethereum/createAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  importEthAddress = function (payload) {
    var url = 'ethereum/importAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.publicAddress,
      privateKey: payload.content.privateKey
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  updateEthAddress = function (payload) {
    var url = 'ethereum/updateAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  deleteEthAddress = function (payload) {
    var url = 'ethereum/deleteAddress';
    var postJson = {
      address: payload.content.publicAddress
    };

    this.callApi(url, 'POST', postJson, payload);
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

    this.callApi(url, 'POST', postJson, payload);
  };

  createPoolingContract = function (payload) {
    var url = 'ethereum/createPoolingContract';
    var postJson = {
      ownerEthAddress: payload.content.ethAddress,
      name: payload.content.name
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  exportEthereumKey = function (payload) {
    var url = 'ethereum/exportAddress';
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  getERC20Address = function (payload) {
    var url = 'ethereum/getErc20Balances/' + payload.content.address;

    this.callApi(url, 'GET', null, payload, payload.content.address);
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

    this.callApi(url, 'POST', postJson, payload);
  };

  getSupportedERC20Tokens = function (payload) {
    var url = 'ethereum/getSupportedErc20Tokens';

    this.callApi(url, 'GET', null, payload);
  };

  getEthTransactionHistory = function (payload) {
    var url = 'ethereum/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  callApi = function (url, method, postData, payload, customEmit) {
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
        emitter.emit(payload.type, null, res, customEmit);
      })
      .catch(error => {
        emitter.emit(payload.type, error, null, customEmit);
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
