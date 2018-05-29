import React from 'react'
import RegisterAccountComponent from '../components/registerAccount'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher
let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');
var crypto = require('crypto');

const email = require("email-validator");

let RegisterAccount = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      username: '',
      usernameError: false,
      emailAddress: '',
      emailAddressError: false,
      emailAddressErrorMessage: 'The email address that is approved for Presale participation',
      password: '',
      passwordError: false,
      passwordErrorMessage: 'This will be your account password for the Curve wallet',
      confirmPassword: '',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
    };
  },

  componentWillMount() {
    emitter.on('register', this.registerReturned);
    whitelistEmitter.on('whitelistCheck', this.whitelistCheckReturned);
    whitelistEmitter.on('Unauthorised', this.whitelistUnauthorisedReturned);
    whitelistEmitter.on('whitelistLogin', this.whitelistLoginReturned);
    whitelistEmitter.on('123123', this.whitelistUnauthorisedReturned)
  },

  componentWillUnmount() {
    emitter.removeAllListeners('register');
    whitelistEmitter.removeAllListeners('whitelistCheck');
    whitelistEmitter.removeAllListeners('Unauthorised');
    whitelistEmitter.removeAllListeners('whitelistLogin');
  },

  render() {
    return (
      <RegisterAccountComponent
        handleChange={this.handleChange}
        submitRegister={this.submitRegister}
        validateEmail={this.validateEmail}
        submitLoginNavigate={this.submitLoginNavigate}
        onRegisterKeyDown={this.onRegisterKeyDown}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorMessage={this.state.emailAddressErrorMessage}
        username={this.state.username}
        usernameError={this.state.usernameError}
        password={this.state.password}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordErrorMessage}
        confirmPassword={this.state.confirmPassword}
        confirmPasswordError={this.state.confirmPasswordError}
        confirmPasswordErrorMessage={this.state.confirmPasswordErrorMessage}
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

  validateEmail() {
    /*var that = this
    setTimeout(function() {

      if(that.state.emailAddress == '') {

      } else if (!email.validate(that.state.emailAddress)) {
        //that.setState({emailAddressError: true, emailAddressErrorMessage: "Email address provided is not a valid email address"});
      } else {
        that.setState({emailAddressError: false, emailAddressErrorMessage: "The email address that is approved for Presale participation"})
      }
    }, 100)*/
  },

  submitRegister() {
    var error = false;
    this.setState({
      emailAddressError: false,
      emailAddressErrorMessage: 'The email address that is approved for Presale participation',
      passwordError: false,
      passwordErrorMessage: 'This will be your account password for the Curve wallet',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: ''
    })

    /*if(this.state.username == '') {
      this.setState({usernameError: true});
      error = true;
    }*/
    if(this.state.emailAddress == '') {
      this.setState({emailAddressError: true, emailAddressErrorMessage: "Email address is a required field"});
      error = true;
    } else if (!email.validate(this.state.emailAddress)) {
      this.setState({emailAddressError: true, emailAddressErrorMessage: "Email address provided is not a valid email address"});
      error = true;
    }
    if(this.state.password == '') {
      this.setState({passwordError: true, passwordErrorMessage: "Your password is a required field"});
      error = true;
    } else if(this.state.password.length < 8) {
      this.setState({passwordError: true, passwordErrorMessage: "Passwords must be at least 8 characters long"});
      error = true;
    }
    if(this.state.confirmPassword == '') {
      this.setState({confirmPasswordError: true, confirmPasswordErrorMessage: "Please confirm your password"});
      error = true;
    }
    if(this.state.password != this.state.confirmPassword) {
      this.setState({confirmPasswordError: true, confirmPasswordErrorMessage: "Your passwords to do not match"});
      error = true;
    }

    if(!error) {
      this.setState({loading: true});

      var whitelistContent = { emailAddress: this.state.emailAddress };
      whitelistDispatcher.dispatch({type: 'whitelistCheck', content: whitelistContent});
    }
  },

  whitelistCheckReturned(error, data) {
    console.log('check')
    if(error) {
      return this.setState({error: error.toString()});
    }
    if(data.success) {
      var decodedData = this.decodeWhitelistResponse(data.message);

      if(decodedData) {
        if(decodedData.user.canWhitelist === true) {
          var content = {username: this.state.emailAddress, emailAddress: this.state.emailAddress, password: this.state.password};
          dispatcher.dispatch({type: 'register', content});
        } else {
          this.setState({loading: false, emailAddressError: true, emailAddressErrorMessage: "The email provided is not an approved presale email address"})
        }
      } else {
        this.setState({loading: false, emailAddressError: true, emailAddressErrorMessage: "The email provided is not an approved presale email address"})
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, loading: false});
    } else {
      this.setState({error: data.statusText, loading: false})
    }
  },

  whitelistUnauthorisedReturned(error, data) {
    console.log('whitelist unauthorised')
    this.setState({loading: false, emailAddressError: true, emailAddressErrorMessage: "The email provided is not an approved presale email address"})
  },

  registerReturned(error, data) {
    console.log('register')
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      console.log(data)
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
    console.log('login')
    this.setState({loading: false});

    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var whitelistState = this.decodeWhitelistResponse(data.message)
      console.log(whitelistState)
      if(whitelistState) {
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

  submitLoginNavigate() {
    window.location.hash = 'welcome';
  },

  onRegisterKeyDown(event) {
    if (event.which == 13) {
      this.submitRegister()
    }
  }
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

export default (RegisterAccount);
