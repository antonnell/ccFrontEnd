import fetch from 'node-fetch';
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let config = require('../config')

let apiUrl = config.apiUrl;

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'getWanAddressWhitelist':
    case 'getWanAddress':
      this.getWanAddress(payload);
      break;
    case 'createWanAddressWhitelist':
    case 'createWanAddress':
      this.createWanAddress(payload);
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
    case 'investICO':
      this.investICO(payload)
      break;
    case 'getICOProgress':
      this.getICOProgress(payload)
      break;
    case 'getWanTransactionHistory':
      this.getWanTransactionHistory(payload);
      break;
    }
  }.bind(this))

  this.getWanAddress = function(payload) {
    var url = 'wanchain/getUserAddresses/'+payload.content.id

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.createWanAddress = function(payload) {
    var url = 'wanchain/createAddress'
    var postJson = {
      username: payload.content.username,
      isPrimary: payload.content.isPrimary,
      name: payload.content.name
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.updateWanAddress = function(payload) {
    var url = 'wanchain/updateAddress'
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary,
      address: payload.content.publicAddress
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.deleteWanAddress = function(payload) {
    var url = 'wanchain/deleteAddress'
    var postJson = {
      address: payload.content.publicAddress
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.sendWan = function(payload) {
    var url = 'wanchain/sendWan'
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei
    }
    if(payload.content.toAddress != null) {
      postJson.toAddress = payload.content.toAddress
    }
    if(payload.content.contactUserName != null) {
      postJson.contactUsername = payload.content.contactUserName
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.exportWanchainKey = function(payload) {
    var url = 'wanchain/exportAddress'
    var postJson = {
      address: payload.content.address,
      mnemonic: payload.content.mnemonic
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.getWRC20Address = function(payload) {
    var url = 'wanchain/getWrc20Balances/'+payload.content.address

    this.callApi(url,
      'GET',
      null,
      payload,
      payload.content.address)
  }

  this.sendWRC20 = function(payload) {
    var url = 'wanchain/sendWrc20Tokens'
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei,
      tokenAddress: payload.content.tokenAddress
    }
    if(payload.content.toAddress != null) {
      postJson.toAddress = payload.content.toAddress
    }
    if(payload.content.contactUserName != null) {
      postJson.contactUsername = payload.content.contactUserName
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.investICO = function(payload) {
    var url = 'wanchain/sendWan'
    var postJson = {
      fromAddress: payload.content.fromAddress,
      amount: payload.content.amount,
      gwei: payload.content.gwei,
      toAddress: payload.content.toAddress
    }

    console.log(postJson)
    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.getICOProgress = function(payload) {
    var url = 'test/getcrowdsaleprogress'

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.getSupportedWRC20Tokens = function(payload) {
    var url = 'wanchain/getSupportedWrc20Tokens'

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.getWanTransactionHistory = function(payload)  {
    var url = 'wanchain/getTransactionHistory/'+payload.content.id

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.callApi = function(url, method, postData, payload, customEmit) {
    //get X-curve-OTP from sessionStorage
    var userString = sessionStorage.getItem('cc_user');
    var authOTP = ''
    if(userString) {
      var user = JSON.parse(userString)
      authOTP = user.authOTP
    }

    var call = apiUrl+url

    if(method == 'GET') {
      postData = null
    } else {
      const signJson = JSON.stringify(postData);
      const signMnemonic = bip39.generateMnemonic();
      const cipher = crypto.createCipher('aes-256-cbc', signMnemonic);
      const signEncrypted = cipher.update(signJson, 'utf8', 'base64') + cipher.final('base64');
      var signData = {
        e: signEncrypted.hexEncode(),
        m: signMnemonic.hexEncode(),
        u: sha256(url.toLowerCase()),
        p: sha256(sha256(url.toLowerCase())),
        t: new Date().getTime(),
      }
      const signSeed = JSON.stringify(signData)
      const signSignature = sha256(signSeed)
      signData.s = signSignature
      postData = JSON.stringify(signData)
    }

    fetch(call, {
        method: method,
        body: postData,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+payload.token, 'X-curve-OTP': authOTP },
    })
    .then(res => {
      if(res.status == 401) {
        return emitter.emit('Unauthorised', null, null)
      }
      if(res.status == 403) {
        return emitter.emit('Unauthorised', null, null)
      }

      if (res.ok) {
        return res;
      } else {
        throw Error(res.statusText);
      }
    })
    .then(res => res.json())
    .then((res) => {
      emitter.emit(payload.type, null, res, customEmit)
    })
    .catch((error) => {
      emitter.emit(payload.type, error, null, customEmit)
    });
  }
}

String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}
String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

var store = new Store()

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
