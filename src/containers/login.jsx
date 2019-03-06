import React from "react";
import LoginComponent from "../components/login";
import AuthComponent from "../components/authComponent";

import createReactClass from "create-react-class";
let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

let Login = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      username: "",
      usernameError: false,
      usernameErrorMessage: false,
      password: "",
      passwordError: false,
      passwordErrorMessage: false
    };
  },

  componentWillMount() {
    emitter.on("login", this.loginReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("login");
  },

  render() {
    return (
      <LoginComponent
        handleChange={this.handleChange}
        submitResendConfirmationNavigate={this.submitResendConfirmationNavigate}
        submitForgotPasswordNavigate={this.submitForgotPasswordNavigate}
        submitLogin={this.submitLogin}
        onLoginKeyDown={this.onLoginKeyDown}
        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}
        password={this.state.password}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordError}
        error={this.state.error}
        loading={this.state.loading}
        theme={this.props.theme}
      />
    );
  },

  submitLoginNavigate() {
    this.setState({ requires2fa: false });
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

  submitLogin() {
    this.setState({
      usernameError: false,
      passwordError: false,
    });
    let error = false;

    if (this.state.username === "") {
      this.setState({ usernameError: true });
      error = true;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: true });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true, error: null });
      this.props.startLoading()
      var content = {
        username: this.state.username,
        password: this.state.password
      };
      dispatcher.dispatch({ type: "login", content });
    }
  },

  loginReturned(error, data) {
    this.setState({ loading: false });
    this.props.stopLoading()
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      data.user.token = data.token;
      data.user.authOTP = this.state.code;
      data.user.verificationResult = data.verificationResult;
      data.user.verificationUrl = data.verificationUrl;
      data.user.whitelistStatus = data.whitelistStatus;
      this.props.setUser(data.user);

      // not called anymore, we included it in the original login call
      // var whitelistContent = { emailAddress: data.user.email, password: this.state.password };
      // whitelistDispatcher.dispatch({type: 'whitelistLogin', content: whitelistContent });
      if (data.user.username === data.user.email) {
        window.location.hash = "setUsername";
      } else {
        window.location.hash = "wanAccounts";
      }
    } else if (data.requires2fa) {
      this.setState({ requires2fa: true });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  submitResendConfirmationNavigate() {
    this.props.navigate("resendConfirmationEmail");
  },

  submitForgotPasswordNavigate() {
    this.props.navigate("forgotPassword");
  }
});


export default Login;