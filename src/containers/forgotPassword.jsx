import React from "react";
import ForgotPasswordComponent from "../components/forgotPassword";
const createReactClass = require("create-react-class");
let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

const email = require("email-validator");

let ForgotPassword = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorMessage: ""
    };
  },

  componentWillMount() {
    emitter.on("sendResetPasswordEmail", this.sendResetPasswordEmailReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("sendResetPasswordEmail");
  },

  render() {
    return (
      <ForgotPasswordComponent
        handleChange={this.handleChange}
        submitReset={this.submitReset}
        onResetKeyDown={this.onResetKeyDown}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorMessage={this.state.emailAddressErrorMessage}
        error={this.state.error}
        loading={this.state.loading}
        theme={ this.props.theme }
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
    this.setState({ emailAddressError: false, emailAddressErrorMessage: "" });

    if (this.state.emailAddress === "") {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage: "Email address is required"
      });
      error = true;
    } else if (!email.validate(this.state.emailAddress)) {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage:
          "Email address provided is not a valid email address"
      });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true });
      this.props.setError(null)

      this.props.startLoading();
      var content = { emailAddress: this.state.emailAddress };
      dispatcher.dispatch({ type: "sendResetPasswordEmail", content });
    }
  },

  sendResetPasswordEmailReturned(error, data) {
    this.setState({ loading: false });
    this.props.stopLoading();
    if (error) {
      this.props.setError(error.toString())
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.props.navigate("forgotPasswordDone")
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
      this.props.setError(data.errorMsg)
    } else {
      this.setState({ error: data.statusText });
      this.props.setError(data.statusText)
    }
  }
});

export default ForgotPassword;
