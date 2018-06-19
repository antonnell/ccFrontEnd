import fetch from 'node-fetch';

let Dispatcher = require('flux').Dispatcher
let Emitter = require('events').EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = 'https://json.geoiplookup.io/api';

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case 'getIp':
      this.getIp(payload);
      break;
    }
  }.bind(this))

  this.getIp = function(payload) {
    this.callApi('',
      'GET',
      payload)
  }

  this.callApi = function(url, method, payload) {

    var call = apiUrl+url
    fetch(call, {
        method: method,
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
