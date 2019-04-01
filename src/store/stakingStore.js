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
    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getStakeableCurrencies':
            this.getStakeableCurrencies(payload);
            break;
          case 'getStakingNodes':
            this.getStakingNodes(payload);
            break;
          case 'getUserStakes':
            this.getUserStakes(payload);
            break;
          case 'getRewardHistory':
            this.getRewardHistory(payload);
            break;
          case 'getTransactionHistory':
            this.getTransactionHistory(payload);
            break;
          case 'addStake':
            this.addStake(payload);
            break;
          case 'withdrawStake':
            this.withdrawStake(payload);
            break;
          default: {

          }
        }
      }.bind(this)
    );

    //INITIAL STORE DATA
    this.store = {
      timeFrameOptions: [
        { value: '1 Year', description: '1 Year' },
        { value: '6 Months', description: '6 Months' },
        { value: '3 Months', description: '3 Months' },
        { value: '1 Month', description: '1 Month' },
        { value: '1 Week', description: '1 Week' },
        { value: '1 Day', description: '1 Day' }
      ],
      currencyOptions: [
        { value: 'USD', description: 'USD' },
        { value: 'BTC', description: 'BTC' },
        { value: 'ETH', description: 'ETH' }
      ],
      timeFrame: '1 Year',
      currency: 'USD',
      data: Array(30).fill().map(() => Math.random()*100),
      labels: Array(30).fill().map((_, i) => i),
      coins: [
        { uuid: 'Cosmos', name: 'Cosmos', checked: false },
        { uuid: 'Fantom', name: 'Fantom', checked: false },
        { uuid: 'Fusion', name: 'Fusion', checked: false },
        { uuid: 'Neo', name: 'Neo', checked: false },
        { uuid: 'PivX', name: 'PivX', checked: false }
      ],
      tokens: [],

      stakeableCurrencies: [],
      stakingNodes: [],
      userStakes: null,
      rewardHistory: [],
      transactionHistory: []
    }
  }

  //GETTER AND SETTER FOR CURRENT STORE DATA
  getStore(index) {
    return(this.store[index]);
  }

  setStore(obj) {
    this.store = {...this.store, ...obj}
  }

  getStakeableCurrencies(payload) {
    var url = 'staking/getStakeableCurrencies';

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit(payload.type, err, data);
        return
      }

      this.setStore({ stakeableCurrencies: data.currencies })

      emitter.emit(payload.type, err, data);
    });
  }

  getStakingNodes(payload) {
    var url = 'staking/getStakingNodes';

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit(payload.type, err, data);
        return
      }

      this.setStore({ stakingNodes: data.stakingNodes })

      emitter.emit(payload.type, err, data);
    });
  }

  getUserStakes(payload) {
    var url = 'staking/getUserStakes/'+payload.content.userId;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('stakesUpdated')
        return
      }

      this.setStore({ userStakes: data.stakes })

      async.parallel([
        (callback) => { this.getRewardHistory(payload, callback) },
        (callback) => { this.getTransactionHistory(payload, callback) }
      ], (err, subData) => {
        if(err) {
          emitter.emit('error', err)
          emitter.emit('stakesUpdated')
          return
        }

        this.setStore({ rewardHistory: subData[0].rewards, transactionHistory: subData[1].transactions })

        emitter.emit('stakesUpdated')
      })

    });
  }

  getRewardHistory(payload, callback) {
    var url = 'staking/getRewardHistory/'+payload.content.userId;

    this.callApi(url, 'GET', null, payload, callback);
  }

  getTransactionHistory(payload, callback) {
    var url = 'staking/getTransactionHistory/'+payload.content.userId;

    this.callApi(url, 'GET', null, payload, callback);
  }

  addStake(payload) {
    var url = 'staking/addStake';
    var postJson = {
      userId: payload.content.userId,
      fromAddress: payload.content.fromAddress,
      nodeId: payload.content.nodeId,
      amount: payload.content.amount,
      currency: payload.content.currency
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('stakesUpdated')
        return
      }

      if(data && data.success) {
        this.getUserStakes(payload)
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('stakesUpdated')
      }
    });
  }

  withdrawStake(payload) {
    var url = 'staking/withdrawStake';
    var postJson = {
      userId: payload.content.userId,
      toAddress: payload.content.toAddress,
      nodeId: payload.content.nodeId,
      amount: payload.content.amount
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        emitter.emit('stakesUpdated')
        return
      }
      if(data && data.success) {
        this.getUserStakes(payload)
      } else {
        emitter.emit('error', data.errorMsg)
        emitter.emit('stakesUpdated')
      }
    });
  }


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
/* eslint-enable */
var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
