import React from 'react'
import ProfileComponent from '../components/profile'
const createReactClass = require('create-react-class')

const email = require("email-validator");

let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let Profile = createReactClass({
  getInitialState() {
    return {
      error: '',
      loading: false,
      editEmailOpen: false,
      emailAddress: '',
      emailAddressError: false,
      emailAddressErrorMessage: ''
    }
  },

  render() {
    if(!this.props.user) {
      return null
    }
    return (
      <ProfileComponent
        theme={this.props.theme}
        error={this.state.error}
        user={this.props.user}
        setUser={this.props.setUser}
        loading={this.state.loading}
        editEmail={this.editEmail}
        editEmailOpen={this.state.editEmailOpen}
        handleEmailClose={this.handleEmailClose}
        updateClicked={this.updateClicked}
        onUpdateKeyDown={this.onUpdateKeyDown}
        handleChange={this.handleChange}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorMessage={this.state.emailAddressErrorMessage}
      />
    )
  },

  editEmail() {
    this.setState({editEmailOpen: true})
  },

  handleEmailClose() {
    this.setState({editEmailOpen: false})
  },

  handleChange(event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onUpdateKeyDown(event) {
    if (event.which == 13) {
      this.updateClicked();
    }
  },

  updateClicked() {
    if(this.validateEmail()) {
      this.setState({loading: true});

      var content = {username: this.props.user.username, emailAddress: this.state.emailAddress};
      dispatcher.dispatch({type: 'updateEmail', content});
    }
  },

  validateEmail() {
    this.setState({emailAddressError: false, emailAddressErrorMessage: ''})

    if(this.state.emailAddress == '') {
      this.setState({emailAddressError: true, emailAddressErrorMessage: "Please enter your new email address"});
      return false
    } else if (!email.validate(this.state.emailAddress)) {
      this.setState({emailAddressError: true, emailAddressErrorMessage: "Email address provided is not a valid email address"});
      return false
    }

    return true
  },

})

export default (Profile);
