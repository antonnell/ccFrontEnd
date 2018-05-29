import fetch from 'node-fetch';
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()
let apiUrl = 'http://13.59.178.103:81/';

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'getWanAddress':
      this.getWanAddress(payload);
      break;
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
      address: payload.content.address,
      contactUserName: payload.content.contactUserName,
      wanAddressID: payload.content.wanAddressID,
      password: payload.content.password,
      amount: payload.content.amount,
      gwei: payload.content.gwei
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
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
      emitter.emit(payload.type, null, res)
    })
    .catch((error) => {
      emitter.emit(payload.type, error, null)
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
