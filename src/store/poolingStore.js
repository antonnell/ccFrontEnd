import fetch from "node-fetch";
import crypto from "crypto";
import bip39 from "bip39";
import sha256 from "sha256";

import {Dispatcher} from "flux";
import {EventEmitter} from "events";
import config from "../config";

export const  poolingDispatcher = new Dispatcher();
export const poolingEmitter = new EventEmitter();


const apiUrl = config.apiUrl;

const Store = () => {
  poolingDispatcher.register(
    function (payload) {
      switch (payload.type) {
        case 'getEtherPools':
          this.getEtherPools(payload);
          break;
        case 'createPoolingContract':
          this.createPoolingContract(payload);
          break;
        case 'getAvailableEtherPools':
          this.getAvailableEtherPools(payload);
          break;
        case 'getAvailableFundingPools':
          this.getAvailableFundingPools(payload);
          break;
        default: {
        }
      }
    }.bind(this)
  );

  this.getEtherPools = function (payload) {
    console.log("here");
    const url = 'etherPooling/getManagedEtherPools/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  this.getAvailableEtherPools = function (payload) {
    const url = 'etherPooling/getAvailableEtherPools/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };
  this.getAvailableFundingPools = function (payload) {
    console.log(payload);
    const url = 'pooling/getAvailableFundingPools/' + payload.content.id;

    this.callApi(url, 'GET', null, payload);
  };

  this.createPoolingContract = function (payload) {
    const url = 'etherPooling/createPoolingContract';
    const postJson = {
      ownerEthAddress: payload.content.primaryEthAddress,
      name: payload.content.poolName,
      minContribution: payload.content.minCap,
      maxContribution: payload.content.maxCap,
      isPledgesEnabled: payload.content.pledgesEnabled,
      saleAddress: payload.content.saleAddress,
      tokenAddress: payload.content.tokenAddress,
      transactionFee: payload.content.yourFee,
      isWhitelistEnabled: payload.content.whitelistEnabled
    };

    if (payload.content.whitelistEnabled) {
      postJson.existingWhitelistId = payload.content.chooseList;
    }

    if (payload.content.pledgesEnabled) {
      postJson.pledgesEndDate = payload.content.pledgeEndDate;
    }

    console.log(postJson);

    this.callApi(url, 'POST', postJson, payload);
  };

  this.callApi = function (url, method, postData, payload, customEmit) {
    //get X-curve-OTP from sessionStorage
    console.log(sessionStorage);
    const userString = sessionStorage.getItem('cc_user');
    let authOTP = '';
    if (userString) {
      const user = JSON.parse(userString);
      authOTP = user.authOTP;
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
          return poolingEmitter.emit('Unauthorised', null, null);
        }
        if (res.status === 403) {
          return poolingEmitter.emit('Unauthorised', null, null);
        }

        if (res.ok) {
          return res;
        } else {
          throw Error(res.statusText);
        }
      })
      .then(res => res.json())
      .then(res => {
        poolingEmitter.emit(payload.type, null, res, customEmit);
      })
      .catch(error => {
        poolingEmitter.emit(payload.type, error, null, customEmit);
      });
  };
};

/* eslint-disable */
String.prototype.hexEncode = function() {
  let hex, i;
  let result = '';
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }
  return result;
};
String.prototype.hexDecode = function() {
  let j;
  const hexes = this.match(/.{1,4}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};
/* eslint-enable */

// const store = new Store();

new Store();

// export default {
//   store: store,
// };
