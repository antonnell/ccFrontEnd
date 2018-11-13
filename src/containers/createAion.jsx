import React from 'react';
import CreateAionComponent from '../components/createAion';
import bip39 from 'bip39';

const crypto = require('crypto');
const sha256 = require('sha256');

const createReactClass = require('create-react-class');


let aionEmitter = require('../store/aionStore.js').default.emitter;
let aionDispatcher = require('../store/aionStore.js').default.dispatcher;

let AionAccounts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      addressName: '',
      addressNameError: false,
      addressNameErrorMessage: 'This is the name of your new Aion account',
      addressNameValid: false
    }
  },
  render() {
    return (
      <CreateAionComponent
        handleChange={this.handleChange}
        onCreateKeyDown={this.onCreateKeyDown}
        createAionAddress={this.createAionAddress}
        navigateSkip={this.navigateSkip}
        loading={this.state.loading}
        error={this.state.error}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        addressNameErrorMessage={this.state.addressNameErrorMessage}
        addressNameValid={this.state.addressNameValid}
      />
    )
  },

  componentWillMount() {
    aionEmitter.removeAllListeners('createAionAddress');
    aionEmitter.on('createAionAddress', this.createAionAddressReturned);
  },

  resetInputs() {
    this.setState({
      addressName: '',
      addressNameError: false,
    })
  },

  createAionAddressReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      aionDispatcher.dispatch({type: 'getAionAddress', content, token: this.props.user.token });

      window.location.hash = 'kyc'
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  navigateSkip() {
    window.location.hash = 'kyc'
  },

  onCreateKeyDown(event) {
    if (event.which == 13) {
      this.createAionAddress()
    }
  },

  validateAddressName(value) {
    this.setState({ addressNameValid: false, addressNameError: false, addressNameErrorMessage:'This is the name of your new Aion account' });
    if(value==null) {
      value = this.state.addressName;
    }
    if(value == '') {
      this.setState({ addressNameError: true, addressNameErrorMessage:'Address name is required' });
      return false;
    }
    this.setState({ addressNameValid: true });
    return true;
  },

  createAionAddress() {
    if(this.validateAddressName()) {
      this.setState({loading: true});
      var content = { username: this.props.user.username, name: this.state.addressName, isPrimary: this.state.primary };
      aionDispatcher.dispatch({type: 'createAionAddress', content, token: this.props.user.token });
    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });

      if (name==="addressName") {
        this.validateAddressName(event.target.value)
      }
    }
  },
})

function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

export default (AionAccounts);
