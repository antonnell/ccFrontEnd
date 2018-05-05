import React from 'react'
import RegisterAccountComponent from '../components/registerAccount'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let RegisterAccount = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      username: '',
      usernameError: false,
      emailAddress: '',
      emailAddressError: false,
      password: '',
      passwordError: false,
      confirmPassword: '',
      confirmPasswordError: false
    };
  },

  componentWillMount() {
    emitter.on('register', this.registerReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('register');
  },

  render() {
    return (
      <RegisterAccountComponent
        handleChange={this.handleChange}
        submitRegister={this.submitRegister}
        submitLoginNavigate={this.submitLoginNavigate}
        onRegisterKeyDown={this.onRegisterKeyDown}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        username={this.state.username}
        usernameError={this.state.usernameError}
        password={this.state.password}
        passwordError={this.state.passwordError}
        confirmPassword={this.state.confirmPassword}
        confirmPasswordError={this.state.confirmPasswordError}
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

  submitRegister() {
    var error = false;

    if(this.state.username == '') {
      this.setState({usernameError: true});
      error = true;
    }
    if(this.state.emailAddress == '') {
      this.setState({emailAddressError: true});
      error = true;
    }
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
      var content = {username: this.state.username, emailAddress: this.state.emailAddress, password: this.state.password};
      dispatcher.dispatch({type: 'register', content});
    }
  },

  registerReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      data.user.token = data.token;
      this.props.setUser(data.user);
      window.location.hash = 'whitelist';
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
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

export default (RegisterAccount);
