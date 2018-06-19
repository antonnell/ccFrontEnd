import React from 'react'
import WhitelistMeComponent from '../components/whitelistMe'
import WhitelistMeDoneComponent from '../components/whitelistMeDone'
import ReactGA from 'react-ga';
const createReactClass = require('create-react-class')
let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher
const email = require("email-validator");
var crypto = require('crypto');
var sha256 = require('sha256');

let WhitelistMe = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      email: '',
      emailError: false,
      emailErrorMessage: false,
      firstname: '',
      firstnameError: false,
      firstnameErrorMessage: false,
      surname: '',
      surnameError: false,
      surnameErrorMessage: false,
      telegram: '',
      telegramError: false,
      telegramErrorMessage: false,
      country: '',
      countryError: false,
      countryErrorMessage: false
    };
  },

  componentWillMount() {
    whitelistEmitter.on('whitelist', this.whitelistReturned);
  },

  componentWillUnmount() {
    whitelistEmitter.removeAllListeners('whitelist');
  },

  componentDidMount() {
    ReactGA.event({
      category: 'AddToWhitelist',
      action: 'Requested'
    });
  },

  render() {

    return (
      <WhitelistMeComponent
        handleChange={this.handleChange}
        submitWhitelist={this.submitWhitelist}
        onWhitelistKeyDown={this.onWhitelistKeyDown}
        email={this.state.email}
        emailError={this.state.emailError}
        emailErrorMessage={this.state.emailErrorMessage}
        firstname={this.state.firstname}
        firstnameError={this.state.firstnameError}
        firstnameErrorMessage={this.state.firstnameErrorMessage}
        surname={this.state.surname}
        surnameError={this.state.surnameError}
        surnameErrorMessage={this.state.surnameErrorMessage}
        telegram={this.state.telegram}
        telegramError={this.state.telegramError}
        telegramErrorMessage={this.state.telegramErrorMessage}
        country={this.state.country}
        countryError={this.state.countryError}
        countryErrorMessage={this.state.countryErrorMessage}
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
      firstnameError: false,
      firstnameErrorMessage: '',
      surnameError: false,
      surnameErrorMessage: '',
      telegramError: false,
      telegramErrorMessage: '',
      countryError: false,
      countryErrorMessage: ''
    })
    var error = false;

    if(this.state.email == '') {
      this.setState({emailError: true, emailErrorMessage: 'Email Address is required'});
      error = true;
    } else if(!email.validate(this.state.email)) {
      this.setState({emailError: true, emailErrorMessage: 'Invalid Email Address'});
      error = true;
    }
    if(this.state.firstname == '') {
      this.setState({firstnameError: true, firstnameErrorMessage: 'Firstname is required'});
      error = true;
    }
    if(this.state.surname == '') {
      this.setState({surnameError: true, surnameErrorMessage: 'Surname is required'});
      error = true;
    }
    if(this.state.country == '') {
      this.setState({countryError: true, countryErrorMessage: 'Please select a country'});
      error = true;
    }

    if(!error) {
      this.setState({loading: true, error: null});
      var content = {
        email: this.state.email,
        firstname: this.state.firstname,
        surname: this.state.surname,
        telegram: this.state.telegram,
        country: this.state.country
      };
      whitelistDispatcher.dispatch({ type: 'whitelist', content })
    }
  },

  whitelistReturned(error, data) {
    if(error) {
      this.setState({loading: false});
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({ loading: false, email: '', firstname: '', surname: '', telegram: '', country: '' })
      window.location.hash = 'added'
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

export default (WhitelistMe);
