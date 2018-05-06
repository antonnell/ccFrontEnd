import fetch from 'node-fetch';
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = 'http://18.221.173.171:81/';

var Store = () => {

  dispatcher.register(function(payload) {
    console.log(payload)
    switch (payload.type) {
    case 'getWanAddress':
      this.getEthAddress(payload);
      break;
    case 'createWanAddress':
      this.createWanAddress(payload);
      break;
    case 'sendWan':
      this.sendWan(payload);
      break;
    }
  }.bind(this))

  this.getEthAddress = function(payload) {
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

  this.sendEther = function(payload) {
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
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+payload.token },
    })
    .then(res => {
      if(res.status == 401) {
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
