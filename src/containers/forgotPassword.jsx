import React from 'react'
import ForgotPasswordComponent from '../components/forgotPassword'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let ForgotPassword = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null
    };
  },

  componentWillMount() {
    emitter.on('sendResetPasswordEmail', this.sendResetPasswordEmailReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('sendResetPasswordEmail');
  },

  render() {
    return (
      <ForgotPasswordComponent
        handleChange={this.handleChange}
        submitReset={this.submitReset}
        submitLoginNavigate={this.submitLoginNavigate}
        onResetKeyDown={this.onResetKeyDown}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        error={this.state.error}
        loading={this.state.loading}
        />
    )
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onResetKeyDown(event) {
    if (event.which == 13) {
      this.submitReset()
    }
  },

  submitReset() {
    var error = false;

    if(this.state.emailAddress == '') {
      this.setState({emailAddressError: true});
      error = true;
    }

    if(!error) {
      this.setState({loading: true});
      var content = { emailAddress: this.state.emailAddress };
      dispatcher.dispatch({type: 'sendResetPasswordEmail', content});
    }
  },

  sendResetPasswordEmailReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      window.location.hash = 'forgotPasswordDone'; //or show 'Your password has been updated'
    } else {
      this.setState({error: data.errorMsg});
    }
  },

  submitLoginNavigate() {
    window.location.hash = 'welcome';
  },
})

export default (ForgotPassword);
