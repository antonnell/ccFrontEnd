import React from 'react'
import WelcomeComponent from '../components/welcome'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher
let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');
var crypto = require('crypto');

let Welcome = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      username: '',
      usernameError: false,
      password: '',
      passwordError: false
    };
  },

  componentWillMount() {
    emitter.on('login', this.loginReturned);
    whitelistEmitter.on('whitelistLogin', this.whitelistLoginReturned);
    whitelistEmitter.on('Unauthorised', this.whitelistUnauthorisedReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('login');
    whitelistEmitter.removeAllListeners('whitelistLogin');
    whitelistEmitter.removeAllListeners('Unauthorised');
  },

  render() {
    return (
      <WelcomeComponent
        handleChange={this.handleChange}
        submitRegisterNavigate={this.submitRegisterNavigate}
        submitForgotPasswordNavigate={this.submitForgotPasswordNavigate}
        submitLogin={this.submitLogin}
        onLoginKeyDown={this.onLoginKeyDown}
        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}
        password={this.state.password}
        passwordError={this.state.passwordError}
        error={this.state.error}
        loading={this.state.loading}
      />
  );
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onLoginKeyDown(event) {
    if (event.which == 13) {
      this.submitLogin();
    }
  },

  submitLogin() {
    var error = false;

    if(this.state.username == '') {
      this.setState({usernameError: true});
      error = true;
    }
    if(this.state.password == '') {
      this.setState({passwordError: true});
      error = true;
    }

    if(!error) {
      this.setState({loading: true, error: null});
      var content = {username: this.state.username, password: this.state.password};
      dispatcher.dispatch({type: 'login', content})
    }
  },

  loginReturned(error, data) {
    if(error) {
      this.setState({loading: false});
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      data.user.token = data.token;
      this.props.setUser(data.user);

      var whitelistContent = { emailAddress: data.user.email, password: this.state.password };
      whitelistDispatcher.dispatch({type: 'whitelistLogin', content: whitelistContent });
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, loading: false});
    } else {
      this.setState({error: data.statusText, loading: false})
    }
  },

  whitelistLoginReturned(error, data) {
    this.setState({loading: false});

    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var whitelistState = this.decodeWhitelistResponse(data.message)
      if(whitelistState) {
        console.log(whitelistState)
        this.props.setWhitelistState(whitelistState);

        if(whitelistState.user.canWhitelist === true /*&& whitelistState.user.whitelisted !== true*/) {
          window.location.hash = 'whitelist';
        } else {
          window.location.hash = 'ethAccounts';
        }
      } else {
        this.setState({error: "An unexpected error has occurred"})
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  decodeWhitelistResponse(message) {
    const mnemonic = message.m.hexDecode()
    const encrypted = message.e.hexDecode()
    const time = message.t
    const signature = message.s

    const sig = {
      e: message.e,
      m: message.m,
      u: message.u,
      p: message.p,
      t: message.t
    }
    const seed = JSON.stringify(sig)
    const compareSignature = sha256(seed)

    if (compareSignature !== signature) {
      return null
    }

    const payload = decrypt(encrypted, mnemonic)
    var data = null
    try {
      data = JSON.parse(payload)
    } catch (ex) {
      return null
    }

    return data;
  },

  whitelistUnauthorisedReturned(error, data) {
    //this.props.setWhitelistState(null);
    //this.setState({loading: false});
    //window.location.hash = 'ethAccounts';
    this.setState({loading: false, usernameError: true, usernameErrorMessage: "The email provided is not an approved presale email address"})
  },

  submitRegisterNavigate() {
    window.location.hash = 'registerAccount';
  },

  submitForgotPasswordNavigate() {
    window.location.hash = 'forgotPassword';
  },
})

function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
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

export default (Welcome);
