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

    this.store = {
      contacts: null
    }

    dispatcher.register(
      function (payload) {
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
          default: {
          }
        }
      }.bind(this)
    );
  }

  //GETTER AND SETTER FOR CURRENT STORE DATA
  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return emitter.emit('StoreUpdated');
  };

  getContacts = function (payload) {
    var url = 'contacts/getUserContacts/' + payload.content.id;

    this.callApi(url, 'GET', null, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }

      if(data && data.success) {
        this.setStore({contacts: data.contacts})

        emitter.emit('contactsUpdated');
      } else {
        emitter.emit('error', data.errorMsg)
      }
    });
  };

  addContact = function (payload) {
    var url = 'contacts/addUserContact';
    var postJson = {
      emailOrUsername: payload.content.username,
      displayName: payload.content.displayName,
      notes: payload.content.notes,
      ownerUsername: payload.content.ownerUsername
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      if(err) {
        emitter.emit('error', err)
        return
      }

      if(data.success) {
        payload.content.id = payload.content.userId
        this.getContacts(payload)

        emitter.emit('addContactReturned');
      } else {
        emitter.emit('addContactReturned');
        emitter.emit('error', data.errorMsg.toString())
      }

    });
  };

  updateContact = function (payload) {
    var url = 'contacts/updateUserContact';
    var postJson = {
      username: payload.content.username,
      displayName: payload.content.displayName,
      notes: payload.content.notes,
      ownerUsername: payload.content.ownerUsername
    };

    this.callApi(url, 'POST', postJson, payload, (err, data) => {
      payload.content.id = payload.content.userId
      this.getContacts(payload)
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
        callback(null, res)
      })
      .catch(error => {
        callback(error, null)
      });
  };
}

var store = new Store();

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

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
