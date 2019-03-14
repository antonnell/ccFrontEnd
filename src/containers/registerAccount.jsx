import React from 'react';
import RegisterAccountComponent from '../components/registerAccount';

const createReactClass = require('create-react-class');
let emitter = require('../store/accountStore.js').default.emitter;
let dispatcher = require('../store/accountStore.js').default.dispatcher;

const email = require('email-validator');

let RegisterAccount = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      username: '',
      usernameError: false,
      usernameErrorMessage: "",
      emailAddress: '',
      emailAddressError: false,
      emailAddressErrorMessage: "",
      password: '',
      passwordError: false,
      passwordErrorMessage: "",
      confirmPassword: '',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
      confirmEmail: false
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
        handleChange={ this.handleChange }
        submitRegister={ this.submitRegister }
        validateEmail={ this.validateEmail }
        submitLoginNavigate={ this.submitLoginNavigate }
        onRegisterKeyDown={ this.onRegisterKeyDown }
        emailAddress={ this.state.emailAddress }
        emailAddressError={ this.state.emailAddressError }
        emailAddressErrorMessage={ this.state.emailAddressErrorMessage }
        username={ this.state.username }
        usernameError={ this.state.usernameError }
        usernameErrorMessage={ this.state.usernameErrorMessage }
        password={ this.state.password }
        passwordError={ this.state.passwordError }
        passwordErrorMessage={ this.state.passwordErrorMessage }
        confirmPassword={ this.state.confirmPassword }
        confirmPasswordError={ this.state.confirmPasswordError }
        confirmPasswordErrorMessage={ this.state.confirmPasswordErrorMessage }
        error={ this.state.error }
        loading={ this.state.loading }
        handleChecked={ this.handleChecked }
        confirmEmail={ this.state.confirmEmail }
        resendConfirmationEmail={ this.resendConfirmationEmail }
        theme={ this.props.theme }
      />
    );
  },

  resendConfirmationEmail() {
    this.props.navigate('resendConfirmationEmail');;
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onLoginKeyDown(event) {
    if (event.which === 13) {
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
      usernameError: false,
      usernameErrorMessage: "",
      emailAddressError: false,
      emailAddressErrorMessage: "",
      passwordError: false,
      passwordErrorMessage: "",
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
    });

    if (this.state.username === '') {
      this.setState({
        usernameError: true,
        usernameErrorMessage: 'Username is a required field'
      });
      error = true;
    }
    if (this.state.emailAddress === '') {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage: 'Email address is a required field'
      });
      error = true;
    } else if (!email.validate(this.state.emailAddress)) {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage:
          'Email address provided is not a valid email address'
      });
      error = true;
    }
    if (this.state.password === '') {
      this.setState({
        passwordError: true,
        passwordErrorMessage: 'Your password is a required field'
      });
      error = true;
    } else if (this.state.password.length < 8) {
      this.setState({
        passwordError: true,
        passwordErrorMessage: 'Passwords must be at least 8 characters long'
      });
      error = true;
    }
    if (this.state.confirmPassword === '') {
      this.setState({
        confirmPasswordError: true,
        confirmPasswordErrorMessage: 'Please confirm your password'
      });
      error = true;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: true,
        confirmPasswordErrorMessage: 'Your passwords to do not match'
      });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true });
      this.props.setError(null)

      this.props.startLoading()

      var content = {
        username: this.state.username,
        emailAddress: this.state.emailAddress,
        password: this.state.password
      };
      dispatcher.dispatch({ type: 'register', content });
    }
  },

  registerReturned(error, data) {

    this.setState({ loading: false });
    this.props.stopLoading()

    if (error) {
      this.props.setError(error.toString())
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.props.setEmail(this.state.emailAddress)
      this.props.navigate("registrationSuccessful")
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
      this.props.setError(data.errorMsg)
    } else {
      this.setState({ error: data.statusText });
      this.props.setError(data.statusText)
    }
  },

  submitLoginNavigate() {
    this.props.navigate("login")
  },

  onRegisterKeyDown(event) {
    if (event.which === 13) {
      this.submitRegister();
    }
  }
});

export default RegisterAccount;
