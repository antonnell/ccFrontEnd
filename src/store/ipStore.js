import fetch from 'node-fetch';

let Dispatcher = require('flux').Dispatcher;
let Emitter = require('events').EventEmitter;

let dispatcher = new Dispatcher();
let emitter = new Emitter();

let apiUrl =
  'https://api.ipapi.com/check?access_key=ade3c6119f9c5f1482eeb7f29f934217';

class Store {
  constructor() {
    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case 'getIp':
            this.getIp(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getIp = function (payload) {
    this.callApi('', 'GET', payload);
  };

  callApi = function (url, method, payload) {
    var call = apiUrl + url;
    fetch(call, {
      method: method
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

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
