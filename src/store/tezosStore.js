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
    //INITIAL STORE DATA

    // let dummyAccounts = [{"id":11,"address":"0xa084592ef3e475762b472bd9c008b8a44da7f3d257959b4071987b9d619b5124","name":"Jacob","isPrimary":true,"balance":0.02239,"usdBalance":0.003068963715000000000},{"id":9,"address":"0xa0c78c47319b0ae7e2b587328c71b57a785febd16883c91b08eec8521d4ef0e4","name":"Hello","isPrimary":false,"balance":0.02393,"usdBalance":0.003280049205000000000},{"id":29,"address":"0xa0cc55cbb4e32232841e70a3592bcd6942dec8493569ba4a95b3256fd81468de","name":"SOMEBODY THAT","isPrimary":false,"balance":0.002,"usdBalance":0.0002741370000000000}]

    this.store = {
      accounts: null,
      stakingAccounts: null,
      transactAccounts: null,
      accountsCombined: null
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getTezosAddress':
            this.getTezosAddress(payload);
            break;
          case 'createTezosAddress':
            this.createTezosAddress(payload);
            break;
          case 'importTezosAddress':
            this.importTezosAddress(payload);
            break;
          case 'updateTezosAddress':
            this.updateTezosAddress(payload);
            break;
          case 'deleteTezosAddress':
            this.deleteTezosAddress(payload);
            break;
          case 'sendTezos':
            this.sendTezos(payload);
            break;
          case 'exportTezosKey':
            this.exportTezosKey(payload);
            break;
          case 'getTezosTransactionHistory':
            this.getTezosTransactionHistory(payload);
            break;
          case 'setDelegate':
            this.setDelegate(payload)
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

  getTezosAddress = function (payload) {
    var url = 'tezos/getUserAddresses/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('accountsUpdated')
        return
      }

      if(data && data.success) {
        this.setStore({ accounts: [...data.tezosAddresses, ...data.tezosOriginatedAddresses], transactAccounts: data.tezosAddresses, stakingAccounts: data.tezosOriginatedAddresses })

        let accountsCombined = data.tezosAddresses.reduce((total, currentVal) => {

          total.balance = total.balance + currentVal.balance
          total.usdBalance = total.usdBalance + currentVal.usdBalance

          return total
        }, {
          balance: 0,
          usdBalance: 0,
          type: 'Tezos',
          name: 'Tezos',
          symbol: 'XTZ'
        })

        this.setStore({accountsCombined: [accountsCombined]})

        emitter.emit('accountsUpdated');
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('accountsUpdated')
      }
    });
  };

  createTezosAddress = function (payload) {
    var url = 'tezos/createAddress';
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      name: payload.content.name
    };

    if(payload.content.accountType === 'Staking') {
      url = 'tezos/createStakingAccount'

      postJson.managerAddress = payload.content.managerAddress
      postJson.displayName = payload.content.name
      postJson.delegateAddress = payload.content.delegateAddress
      postJson.amount = payload.amount
    }

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getTezosAddress(payload)
    });
  };

  importTezosAddress = function (payload) {
    var url = 'tezos/importAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.publicAddress,
      privateKey: payload.content.privateKey
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      this.getTezosAddress(payload)
    });
  };

  updateTezosAddress = function (payload) {
    var url = 'tezos/updateAddress';
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getTezosAddress(payload)
    });
  };

  deleteTezosAddress = function (payload) {
    var url = 'tezos/deleteAddress';
    var postJson = {
      address: payload.content.address
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getTezosAddress(payload)
    });
  };

  sendTezos = function (payload) {
    var url = 'tezos/sendTezos';
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

  exportTezosKey = function (payload) {
    var url = 'tezos/exportAddress';
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
    });
  };

  getTezosTransactionHistory = function (payload) {
    var url = 'tezos/getTransactionHistory/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(data) {
        this.setStore({ transactions: data.transactions });
        emitter.emit('transactionsUpdated');
      }
    });
  };

  setDelegate = function (payload) {
    var url = 'tezos/setDelegate';
    var postJson = {
      address: payload.content.address,
      delegateAddress: payload.content.delegateAddress
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      emitter.emit(payload.type, err, data);
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
