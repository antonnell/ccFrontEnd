import fetch from 'node-fetch';
import config from '../config';

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
    this.registerDispatchers();
  }

  registerDispatchers = () => {
    dispatcher.register(
      payload => {
        switch (payload.type) {
          case 'login':
          case 'loginOTP':
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
          case 'sendWhitelistConfirmationEmail':
            this.sendWhitelistConfirmationEmail(payload);
            break;
          case 'generate2faKey':
            this.generate2faKey(payload);
            break;
          case 'enable2fa':
            this.enable2fa(payload);
            break;
          case 'disable2fa':
            this.disable2fa(payload);
            break;
          case 'sendPresaleEmail':
            this.sendPresaleEmail(payload);
            break;
          case 'updateUsername':
            this.updateUsername(payload);
            break;
          case 'verificationResult':
            this.verificationResult(payload);
            break;
          case 'updateEmail':
            this.updateEmail(payload);
            break;
          case 'uploadProfilePhoto':
            this.uploadProfilePhoto(payload);
            break;
          case 'getUserProfile':
            this.getUserProfile(payload);
            break;
          case "allocateKycCode":
            this.allocateKycCode(payload);
            break;
          case "resendConfirmationEmail":
            this.resendConfirmationEmail(payload);
            break;
          default: {
          }
        }
      });
  };

  verificationResult = payload=> {
    const url = 'account/getVerificationResult/' + payload.content.userId;

    this.callApi(url, 'GET', null, payload);
  };

  login = payload=> {
    const url = 'account/login';
    const postJson = {
      usernameOrEmail: payload.content.username,
      password: payload.content.password
    };
    this.callApi(url, 'POST', postJson, payload);
  };

  register = payload=> {
    const url = 'account/register';
    const postJson = {
      username: payload.content.username,
      email: payload.content.emailAddress,
      password: payload.content.password,
      callbackUrl: `${ window.location.protocol }//${ window.location.host }/#verifyAccount`
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  updatePassword = payload=> {
    const url = 'account/updatePassword';
    const postJson = {
      username: payload.content.username,
      password: payload.content.password
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  updateEmail = payload=> {
    const url = 'account/updateEmail';
    const postJson = {
      username: payload.content.username,
      email: payload.content.emailAddress
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  uploadProfilePhoto = payload=> {
    const url = 'account/uploadProfilePhoto';
    const postJson = {
      userId: payload.content.userId,
      imageData: payload.content.imageData,
      extension: payload.content.extension
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  getUserProfile = payload=> {
    const url = 'account/getUserProfile/' + payload.content.userId;

    this.callApi(url, 'GET', null, payload);
  };

  resetPassword = payload=> {
    const url = 'account/resetPassword';
    const postJson = {
      code: payload.content.code,
      token: payload.content.token,
      password: payload.content.password
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  allocateKycCode = payload=> {
    var url = "account/allocateKycCode";
    var postJson = {
      username: payload.content.username
    }

    this.callApi(url, "POST", postJson, payload);
  };

  resendConfirmationEmail = payload=> {
    let url = "account/sendEmailConfirmationEmail";
    let postJson = {
      email: payload.content.email,
      callbackUrl: `${ window.location.protocol }//${ window.location.host }/#verifyAccount`
    }

    this.callApi(url, "POST", postJson, payload);
  };

  sendResetPasswordEmail = payload=> {
    const url = 'account/sendResetPasswordEmail';
    const postJson = {
      email: payload.content.emailAddress,
      callbackUrl: window.location.origin + '/#resetPassword'
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  sendWhitelistConfirmationEmail = payload=> {
    const url = 'account/sendWhitelistConfirmationEmail';
    const postJson = {
      emailAddress: payload.content.emailAddress
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  generate2faKey = payload=> {
    const url = 'account/generate2faKey/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  enable2fa = payload=> {
    const url = 'account/enable2fa';
    const postJson = {
      secretKey: payload.content.secretKey,
      code: payload.content.code,
      userId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  disable2fa = payload=> {
    const url = 'account/disable2fa';
    const postJson = {
      userId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  sendPresaleEmail = payload=> {
    const url = 'account/sendPresaleEmail';
    const postJson = {
      userId: payload.content.id
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  updateUsername = payload=> {
    const url = 'account/updateUsername';
    const postJson = {
      username: payload.content.username,
      usernameNew: payload.content.usernameNew
    };

    this.callApi(url, 'POST', postJson, payload);
  };

  callApi = function (url, method, postData, payload) {
    //get X-curve-OTP from sessionStorage
    let authOTP = '';
    if (payload.authOTP != null) {
      authOTP = payload.authOTP;
    } else {
      const userString = sessionStorage.getItem('cc_user');
      if (userString) {
        const user = JSON.parse(userString);
        authOTP = user.authOTP;
      }
    }

    const call = apiUrl + url;

    if (method === 'GET') {
      postData = null;
    } else {
      const signJson = JSON.stringify(postData);
      const signMnemonic = bip39.generateMnemonic();
      const cipher = crypto.createCipher('aes-256-cbc', signMnemonic);
      const signEncrypted =
        cipher.update(signJson, 'utf8', 'base64') + cipher.final('base64');
      const signData = {
        e: signEncrypted.hexEncode(),
        m: signMnemonic.hexEncode(),
        u: sha256(url.toLowerCase()),
        p: sha256(sha256(url.toLowerCase())),
        t: new Date().getTime()
      };
      const signSeed = JSON.stringify(signData);
      signData.s = sha256(signSeed);
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
        emitter.emit(payload.type, null, res);
      })
      .catch(error => {
        emitter.emit(payload.type, error, null);
      });
  };
}

/* eslint-disable */
String.prototype.hexEncode = function () {
  let hex, i;
  let result = '';
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }
  return result;
};
String.prototype.hexDecode = function () {
  let j;
  const hexes = this.match(/.{1,4}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

/* eslint-enable */

const store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
