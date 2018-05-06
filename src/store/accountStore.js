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
    case 'testEncryption':
      this.testEncryption(payload);
      break;
    case 'login':
      this.login(payload);
      break;
    case 'register':
      this.register(payload);
      break;
    case 'updatePassword':
      this.updatePassword(payload);
      break;
    case 'resetPassword':
      this.resetPassword(payload);
      break;
    case 'sendResetPasswordEmail':
      this.sendResetPasswordEmail(payload);
      break;
    }
  }.bind(this))

  this.testEncryption = function(payload) {
    var url = 'test/encryptionWithUserPass'

    var postJson = {
      hello: 'world',
      testing: 123,
      wrong: false,
      rigth: true
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)

  }

  this.login = function(payload) {
    var url = 'account/login'
    var postJson = {
      usernameOrEmail: payload.content.username,
      password: payload.content.password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.register = function(payload) {
    var url = 'account/register'
    var postJson = {
      username: payload.content.username,
      email: payload.content.emailAddress,
      password: payload.content.password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.updatePassword = function(payload) {
    var url = 'account/updatePassword'
    var postJson = {
      username: payload.content.username,
      password: payload.content.password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.resetPassword = function(payload) {
    var url = 'account/resetPassword'
    var postJson = {
      code: payload.content.code,
      email: payload.content.emailAddress,
      password: payload.content.password
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.sendResetPasswordEmail = function(payload) {
    var url = 'account/sendResetPasswordEmail'
    var postJson = {
      email: payload.content.emailAddress,
      callbackUrl: "http://localhost:3000/#resetPassword" //change this at some stage. He needs to define the URL.
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
