import $ from 'jquery'
import fetch from 'node-fetch';
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let config = require('../config')

let apiUrl = config.whitelistApiUrl;

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'whitelistLogin':
      this.whitelistLogin(payload);
      break;
    case 'whitelistRegister':
      this.whitelistLogin(payload);
      break;
    case 'whitelistCheck':
      this.whitelistCheck(payload);
      break;
    case 'getWhitelistState':
      this.getWhitelistState(payload);
      break;
    case 'setWhitelistState':
      this.setWhitelistState(payload);
      break;
    case 'uploadFile':
      this.uploadFile(payload);
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
    case 'whitelist':
      this.whitelist(payload);
      break;
    }
  }.bind(this))

  this.whitelist = function(payload) {
    var url = 'whitelist'
    var version = 'api/v2/'
    var postJson = {
      email: payload.content.email,
      firstname: payload.content.firstname,
      surname: payload.content.surname,
      telegram: payload.content.telegram,
      country: payload.content.country
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.whitelistLogin = function(payload) {
    var url = 'login'
    var version = 'api/v2/'
    var postJson = {
      emailAddress: payload.content.emailAddress,
      password: payload.content.password
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.whitelistCheck = function(payload) {
    var url = 'check'
    var version = 'api/v2/'
    var postJson = {
      emailAddress: payload.content.emailAddress
    }
    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.getWhitelistState = function(payload) {
    var url = 'whitelistState'
    var version = 'api/v1/'
    var postJson = {
      emailAddress: payload.content.emailAddress
    }
    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.setWhitelistState = function(payload) {
    var url = 'whitelistState'
    var version = 'api/v1/'
    var postJson = payload.content

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.ethPrivateKeyUnlock = function(payload) {
    var url = 'ethPrivateKeyUnlock'
    var version = 'api/v1/'
    var postJson = {
      ethPrivateKey: payload.content.ethPrivateKey,
      ethPrivateKeyPassword: payload.content.ethPrivateKeyPassword
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.wanPrivateKeyUnlock = function(payload) {
    var url = 'wanPrivateKeyUnlock'
    var version = 'api/v1/'
    var postJson = {
      wanPrivateKey: payload.content.wanPrivateKey,
      wanPrivateKeyPassword: payload.content.wanPrivateKeyPassword
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.ethJsonv3Unlock = function(payload) {
    var url = 'ethJsonv3Unlock'
    var version = 'api/v1/'
    var postJson = {
      ethJsonv3: payload.content.ethJsonv3,
      ethJsonv3Password: payload.content.ethJsonv3Password
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.wanJsonv3Unlock = function(payload) {
    var url = 'wanJsonv3Unlock'
    var version = 'api/v1/'
    var postJson = {
      wanJsonv3: payload.content.wanJsonv3,
      wanJsonv3Password: payload.content.wanJsonv3Password
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.ethMnemonic = function(payload) {
    var url = 'ethMnemonic'
    var version = 'api/v1/'
    var postJson = {
      ethMnemonic: payload.content.ethMnemonic,
      ethMnemonicPassword: payload.content.ethMnemonicPassword
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.wanMnemonic = function(payload) {
    var url = 'wanMnemonic'
    var version = 'api/v1/'
    var postJson = {
      wanMnemonic: payload.content.wanMnemonic,
      wanMnemonicPassword: payload.content.wanMnemonicPassword
    }

    this.callApi(url,
      version,
      'POST',
      postJson,
      payload)
  }

  this.uploadFile = function(payload) {
    var func = '';
    var version = 'api/v1/'
    if(payload.content.fileType == 'KYC') {
      func = 'uploadFileKYC';
    } else {
      func = 'uploadFileID';
    }
    var call = apiUrl+version+func+'?emailAddress='+payload.content.emailAddress

    /*fetch(call, {
      method: 'POST',
      body: payload.content.data,
      headers: { 'Authorization': 'Basic NDk5MUQ1OTJFN0ZFQTE1MDkyQ0IwNjhFQkZCREVFQzczNzNBMTk0NEU1MTA3QTFERDE5MUMzMTBENkY5MDRBMDowRkYxNUI0NDMxQjI0RkE0M0U5RTYwODIxMERGNEU0QTVBNjBCQ0MzMTUzREIzMTlEMTU1MUE4RjEzQ0ZEMkUx' },
    })
    .then(res => res.json())
    .then(json => console.log(json));*/

    $.ajax({
      url: call,
      type: 'POST',
      data: payload.content.data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Basic NDk5MUQ1OTJFN0ZFQTE1MDkyQ0IwNjhFQkZCREVFQzczNzNBMTk0NEU1MTA3QTFERDE5MUMzMTBENkY5MDRBMDowRkYxNUI0NDMxQjI0RkE0M0U5RTYwODIxMERGNEU0QTVBNjBCQ0MzMTUzREIzMTlEMTU1MUE4RjEzQ0ZEMkUx' )
        xhr.setRequestHeader('x-access-token', payload.token )
        xhr.setRequestHeader('x-key', payload.tokenKey )
      },
      success: (res) => { emitter.emit(func, null, res) },
      error: (err) => { emitter.emit(func, err, null) },
    })
  }

  this.callApi = function(url, version, method, postData, payload) {
    var call = apiUrl+version+url

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
        u: sha256(url).toUpperCase(),
        p: sha256(sha256(url).toUpperCase()).toUpperCase(),
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.whitelistApiHeader,
        'x-access-token': payload.token,
        'x-key': payload.tokenKey }
    })
    .then(res => {
      if(res.status == 401) {
        emitter.emit('Unauthorised', null, null)
        return res;
      } else if(res.status == 404) {
        emitter.emit('Unauthorised', null, null)
        emitter.emit('123123', null, null)
        return res;
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
