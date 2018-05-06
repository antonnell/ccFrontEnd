import fetch from 'node-fetch';
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = 'https://api.cryptocurve.network/';

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'getWhitelistState':
      this.getWhitelistState(payload);
      break;
    case 'ethPrivateKeyUnlock':
      this.ethPrivateKeyUnlock(payload);
      break;
    case 'wanPrivateKeyUnlock':
      this.wanPrivateKeyUnlock(payload);
      break;
    case 'ethJsonv3Unlock':
      this.ethJsonv3Unlock(payload);
      break;
    case 'wanJsonv3Unlock':
      this.wanJsonv3Unlock(payload);
      break;
    case 'ethMnemonic':
      this.ethMnemonic(payload);
      break;
    case 'wanMnemonic':
      this.wanMnemonic(payload);
      break;
    }
  }.bind(this))

  this.getWhitelistState = function(payload) {
    var url = 'api/v1/getWhitelistState/'+payload.username

    this.callApi(url,
      'GET',
      postJson,
      payload)
  }

  this.ethPrivateKeyUnlock = function(payload) {
    var url = 'api/v1/ethPrivateKeyUnlock'
    var postJson = {
      ethPrivateKey: payload.content.ethPrivateKey,
      ethPrivateKeyPassword: payload.content.ethPrivateKeyPassword
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.wanPrivateKeyUnlock = function(payload) {
    var url = 'api/v1/wanPrivateKeyUnlock'
    var postJson = {
      wanPrivateKey: payload.content.wanPrivateKey,
      wanPrivateKeyPassword: payload.content.wanPrivateKeyPassword
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.ethJsonv3Unlock = function(payload) {
    var url = 'api/v1/ethJsonv3Unlock'
    var postJson = {
      ethJsonv3: payload.content.ethJsonv3,
      ethJsonv3Password: payload.content.ethJsonv3Password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.wanJsonv3Unlock = function(payload) {
    var url = 'api/v1/wanJsonv3Unlock'
    var postJson = {
      wanJsonv3: payload.content.wanJsonv3,
      wanJsonv3Password: payload.content.wanJsonv3Password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.ethMnemonic = function(payload) {
    var url = 'api/v1/ethMnemonic'
    var postJson = {
      ethMnemonic: payload.content.ethMnemonic,
      ethMnemonicPassword: payload.content.ethMnemonicPassword
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.wanMnemonic = function(payload) {
    var url = 'api/v1/wanMnemonic'
    var postJson = {
      wanMnemonic: payload.content.wanMnemonic,
      wanMnemonicPassword: payload.content.wanMnemonicPassword
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
