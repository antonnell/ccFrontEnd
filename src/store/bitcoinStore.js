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

  getBitcoinAddress = function (payload) {
    var url = 'bitcoin/getUserBtcWallets/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  createBitcoinAddress = function (payload) {
    var url = 'bitcoin/createWallet';
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      displayName: payload.content.displayName
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  importBitcoinAddress = function (payload) {
    var url = 'bitcoin/importWallet';
    var postJson = {
      displayName: payload.content.displayName,
      isPrimary: payload.content.isPrimary,
      privateKey: payload.content.privateKey,
      phrase: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  updateBitcoinAddress = function (payload) {
    var url = 'bitcoin/updateWallet';
    var postJson = {
      displayName: payload.content.displayName,
      isPrimary: payload.content.isPrimary,
      walletId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  deleteBitcoinAddress = function (payload) {
    var url = 'bitcoin/deleteWallet';
    var postJson = {
      walletId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  sendBitcoin = function (payload) {
    var url = 'bitcoin/send';
    var postJson = {
      walletId: payload.content.walletId,
      value: payload.content.value,
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

    this.callApi(url, 'POST', postJson, payload);
  };

  exportBitcoinKey = function (payload) {
    var url = 'bitcoin/exportWallet';
    var postJson = {
      walletId: payload.content.id,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  getBitcoinWalletDetails  = function  (payload) {
    var url = 'bitcoin/getWalletDetails/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, payload.content.id);
  };

  getBitcoinTransactionHistory = function (payload) {
    var url = 'bitcoin/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, payload.content.id);
  };

  callApi = function (url, method, postData, payload, extraData) {
    //get X-curve-OTP from sessionStorage
    var userString = sessionStorage.getItem('cc_user');
    var authOTP = '';
    if (userString) {
      var user = JSON.parse(userString);
      authOTP = user.authOTP;
    }

    var call = apiUrl + url;

    console.log(postData);

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
        emitter.emit(payload.type, null, res, extraData);
      })
      .catch(error => {
        emitter.emit(payload.type, error, null, extraData);
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
