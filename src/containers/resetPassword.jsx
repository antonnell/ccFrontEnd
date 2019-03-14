import React from "react";
import ResetPasswordComponent from "../components/resetPassword";
const createReactClass = require("create-react-class");
let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

let ResetPassword = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      confirmPassword: "",
      confirmPasswordError: false,
      confirmPasswordErrorMessage: ""
    };
  },

  componentWillMount() {
    if (
      this.props.uriParameters.token == null ||
      this.props.uriParameters.code == null
    ) {
      window.location.hash = "welcome";
    }
    return emitter.on("resetPassword", this.resetPasswordReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("resetPassword");
  },

  render() {
    return (
      <ResetPasswordComponent
        handleChange={this.handleChange}
        submitReset={this.submitReset}
        onResetKeyDown={this.onResetKeyDown}
        password={this.state.password}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordErrorMessage}
        confirmPassword={this.state.confirmPassword}
        confirmPasswordError={this.state.confirmPasswordError}
        confirmPasswordErrorMessage={this.state.confirmPasswordErrorMessage}
        error={this.state.error}
        loading={this.state.loading}
      />
    );
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onResetKeyDown(event) {
    if (event.which === 13) {
      this.submitReset();
    }
  },

  submitReset() {
    var error = false;

    if (this.state.password === "") {
      this.setState({
        passwordError: true,
        passwordErrorMessage: "Password is required"
      });
      error = true;
    } else if (this.state.password.length < 8) {
      this.setState({
        passwordError: true,
        passwordErrorMessage:
          "Your password needs to be at least 8 characaters long"
      });
      return false;
    }
    if (this.state.confirmPassword === "") {
      this.setState({
        confirmPasswordError: true,
        passwordErrorMessage: "Please confirm your password"
      });
      error = true;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        passwordError: true,
        confirmPasswordError: true,
        confirmPasswordErrorMessage: "Your passwords to do not match"
      });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true });
      this.props.setError(null)

      this.props.startLoading();
      var content = {
        token: this.props.uriParameters.token,
        code: this.props.uriParameters.code,
        password: this.state.password
      };
      dispatcher.dispatch({ type: "resetPassword", content });
    }
  },

  resetPasswordReturned(error, data) {
    this.setState({ loading: false });
    this.props.stopLoading();
    if (error) {
      this.props.setError(error.toString())
      return this.setState({ error: error.toString() });      
    }

    if (data.success) {
      this.props.navigate('login');
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
      this.props.setError(data.errorMsg)
    } else {
      this.setState({ error: data.statusText });
      this.props.setError(data.statusText)
    }
  }
});

export default ResetPassword;
