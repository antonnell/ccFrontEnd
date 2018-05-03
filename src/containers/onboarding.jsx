import React from 'react'
import UpdatePasswordComponent from '../components/updatePassword'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let Onboarding = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null
    };
  },

  componentWillMount() {

  },

  componentWillUnmount() {

  },

  render() {
    return (
      <UpdatePasswordComponent
        handleChange={this.handleChange}
        onUpdateKeyDown={this.onUpdateKeyDown}
        submitUpdatePassword={this.submitUpdatePassword}
        password={this.state.password}
        passwordError={this.state.passwordError}
        confirmPassword={this.state.confirmPassword}
        confirmPasswordError={this.state.confirmPasswordError}
        error={this.state.error}
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

})

export default (Onboarding);
