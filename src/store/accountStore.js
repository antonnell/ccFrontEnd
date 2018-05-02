import fetch from 'node-fetch';

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = 'http://18.221.173.171:81/';

var Store = () => {

  dispatcher.register(function(payload) {
    console.log(payload)
    switch (payload.type) {
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
      email: payload.content.email,
      callbackUrl: payload.content.callbackUrl //change this at some stage. He needs to define the URL.
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = apiUrl+url

    fetch(call, {
        method: method,
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+payload.token },
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

var store = new Store()

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
