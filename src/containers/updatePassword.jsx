import React from 'react'
import UpdatePasswordComponent from '../components/updatePassword'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let UpdatePassword = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null
    };
  },

  componentWillMount() {
    emitter.on('updatePassword', this.updatePasswordReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('updatePassword');
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
        loading={this.state.loading}
      />
    )
  },

  onUpdateKeyDown(event) {
    if (event.which == 13) {
      this.submitUpdatePassword();
    }
  },

  submitUpdatePassword() {
    var error = false;

    if(this.state.password == '') {
      this.setState({passwordError: true});
      error = true;
    }
    if(this.state.confirmPassword == '') {
      this.setState({confirmPasswordError: true});
        error = true;
    }
    if(this.state.password != this.state.confirmPassword) {
      this.setState({passwordError: true, confirmPasswordError: true});
      error = true;
    }

    if(!error) {
      this.setState({loading: true});
      var content = {username: this.props.user.username, password: this.state.password};
      dispatcher.dispatch({type: 'updatePassword', content, token: this.props.user.token});
    }
  },

  updatePasswordReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      window.location.hash = 'account'; //or show 'Your password has been updated'
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (UpdatePassword);
