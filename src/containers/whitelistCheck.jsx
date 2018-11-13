import React from 'react'
import WhitelistCheckComponent from '../components/whitelistCheck'
const createReactClass = require('create-react-class')
let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher
const email = require("email-validator");
var crypto = require('crypto');
var sha256 = require('sha256');

let WhitelistCheck = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      email: '',
      emailError: false,
      emailErrorMessage: false,
      whitelisted: false
    };
  },

  componentWillMount() {
    whitelistEmitter.on('whitelistStatus', this.whitelistStatusReturned);
  },

  componentWillUnmount() {
    whitelistEmitter.removeAllListeners('whitelistStatus');
  },

  render() {
    return (
      <WhitelistCheckComponent
        handleChange={this.handleChange}
        submitWhitelist={this.submitWhitelist}
        onWhitelistKeyDown={this.onWhitelistKeyDown}
        email={this.state.email}
        emailError={this.state.emailError}
        emailErrorMessage={this.state.emailErrorMessage}
        whitelistedMessage={this.state.whitelistedMessage}
        error={this.state.error}
        loading={this.state.loading}
      />
    );
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value,
        [name+'Error']: false,
        [name+'ErrorMessage']: ''
      });
    }
  },

  onWhitelistKeyDown(event) {
    if (event.which == 13) {
      this.submitWhitelist();
    }
  },

  submitWhitelist() {

    this.setState({
      emailError: false,
      emailErrorMessage: '',
    })
    var error = false;

    if(this.state.email == '') {
      this.setState({emailError: true, emailErrorMessage: 'Email Address is required'});
      error = true;
    } else if(!email.validate(this.state.email)) {
      this.setState({emailError: true, emailErrorMessage: 'Invalid Email Address'});
      error = true;
    }

    if(!error) {
      this.setState({loading: true, error: null});
      var content = {
        email: this.state.email,
      };
      whitelistDispatcher.dispatch({ type: 'whitelistStatus', content })
    }
  },

  whitelistStatusReturned(error, data) {
    if(error) {
      this.setState({loading: false});
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({ loading: false })

      //disply whitelist status
      if(data.message == 'This email has been registered as a Whitelist candidate. You will be emailed once your Whitelist status has been approved.') {
        data.message = 'You are whitelisted!'
      }
      this.setState({whitelistedMessage: data.message, loading: false})
    } else if (data.requires2fa) {
      this.setState({ requires2fa: true, loading: false });
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, loading: false});
    } else {
      this.setState({error: data.statusText, loading: false})
    }
  },

  decodeWhitelistResponse(message) {
    const mnemonic = message.m.hexDecode()
    const encrypted = message.e.hexDecode()
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

export default (WhitelistCheck);
