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
    case 'getEthAddress':
      this.getEthAddress(payload);
      break;
    case 'createEthAddress':
      this.createEthAddress(payload);
      break;
    case 'importAddress':
      this.importAddress(payload);
      break;
    case 'sendEther':
      this.sendEther(payload);
      break;
    case 'createPoolingContract':
      this.createPoolingContract(payload);
      break;
    }
  }.bind(this))

  this.getEthAddress = function(payload) {
    var url = '/ethereum/getUserAddresses/'+payload.content.username

    this.callApi(url,
      'GET',
      null,
      payload)
  }

  this.createEthAddress = function(payload) {
    var url = 'ethereum/createAddress'
    var postJson = {
      name: payload.content.name,
      isPrimary: payload.content.isPrimary
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.importAddress = function(payload) {
    var url = 'ethereum/importAddress'
    var postJson = {
      //no documentation on this?
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.sendEther = function(payload) {
    var url = 'ethereum/sendEther'
    var postJson = {
      address: payload.content.address,
      contactUserName: payload.content.contactUserName,
      ethAddressID: payload.content.ethAddressID,
      password: payload.content.password,
      amount: payload.content.amount,
      gwei: payload.content.gwei
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.createPoolingContract = function(payload) {
    var url = 'ethereum/createPoolingContract'
    var postJson = {
      //no documentation on this?
    }

    this.callApi(url,
      'POST',
      postJson,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = apiUrl+url

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

    fetch(call, {
        method: method,
        body: JSON.stringify(signData),
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
