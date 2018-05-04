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
    case 'getContacts':
      this.getContacts(payload);
      break;
    case 'addContact':
      this.addContact(payload);
      break;
    case 'updateContact':
      this.updateContact(payload);
      break;
    }
  }.bind(this))

  this.getContacts = function(payload) {
    var url = 'contacts/getUserContacts/'+payload.content.username

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.addContact = function(payload) {
    var url = 'contacts/AddUserContact'
    var postJson = {
      emailOrUsername: payload.content.username,
      displayName: payload.content.displayName,
      notes: payload.content.notes,
      ownerUsername: payload.content.ownerUsername
    }

    this.callApi(url,
      'PUT',
      postJson,
      payload)
  }

  this.updateContact = function(payload) {
    var url = 'contacts/UpdateUserContact'
    var postJson = {
      emailOrUsername: payload.content.username,
      displayName: payload.content.displayName,
      notes: payload.content.notes,
      ownerUsername: payload.content.ownerUsername
    }

    this.callApi(url,
      'PUT',
      postJson,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = apiUrl+url

    /*const signJson = JSON.stringify(postData);
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
    signData.s = signSignature*/

    if(method == 'GET') {
      postData = null
    } else {
      postData = JSON.stringify(postData)
    }

    fetch(call, {
        method: method,
        body: postData,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+payload.token },
    })
    .then((res) => {
      try {
        JSON.parse(res);
      } catch (e) {
        return res;
      }

      return res.json();
    })
    .then((res) => {
      emitter.emit(payload.type, null, res)
    })
    .catch((error) => {
      emitter.emit(payload.type, error, null)
    });
  }
}

var store = new Store()

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

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
