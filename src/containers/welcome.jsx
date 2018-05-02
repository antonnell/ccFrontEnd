import React from 'react'
import WelcomeComponent from '../components/welcome'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

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
  },

  componentWillUnmount() {
    emitter.removeAllListeners('login');
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
        password={this.state.password}
        passwordError={this.state.passwordError}
        error={this.state.error}
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
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var user = {
        username: this.state.username,
        token: data.token
      };
      this.props.setUser(user);
      window.location.hash = 'account';
    } else {
      this.setState({error: data.errorMsg});
    }
  },

  submitRegisterNavigate() {
    window.location.hash='registerAccount';
  },

  submitForgotPasswordNavigate() {
    window.location.hash = 'forgotPassword';
  },
})

export default (Welcome);
