import React from "react";
import ResendConfirmationEmailComponent from "../components/resendConfirmationEmail";
const createReactClass = require("create-react-class");
let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

let ResendConfirmationEmail = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      snackOpen: false,

      email: "",
      emailError: false,
      emailErrorMessage: ""
    };
  },

  componentWillMount() {
    emitter.on("resendConfirmationEmail", this.resendConfirmationEmailReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("resendConfirmationEmail");
  },

  render() {
    return (
      <ResendConfirmationEmailComponent
        handleChange={this.handleChange}
        onSendKeyDown={this.onSendKeyDown}
        submitResendConfirmationEmail={this.submitResendConfirmationEmail}
        submitBack={this.submitBack}
        email={this.state.email}
        emailError={this.state.emailError}
        emailErrorMessage={this.state.emailErrorMessage}
        error={this.state.error}
        loading={this.state.loading}
        snackOpen={this.state.snackOpen}
        handleSnackClose={this.handleSnackClose}
        theme={this.props.theme}
      />
    );
  },

  handleSnackClose() {
    this.setState({ snackOpen: false });
  },

  onSendKeyDown(event) {
    if (event.which === 13) {
      this.submitResendConfirmationEmail();
    }
  },

  validateEmail(value) {
    this.setState({
      emailValid: false,
      emailError: false,
      emailErrorMessage: ""
    });
    if (value == null) {
      value = this.state.email;
    }
    if (value === "") {
      this.setState({
        emailError: true,
        emailErrorMessage: "Email is required"
      });
      return false;
    }
    this.setState({ emailValid: true });
    return true;
  },


  submitResendConfirmationEmail() {
    if (this.validateEmail()) {
      this.setState({ loading: true });
      this.props.setError(null)

      this.props.startLoading();
      var content = {
        email: this.state.email
      };
      dispatcher.dispatch({
        type: "resendConfirmationEmail",
        content
      });
    }
  },

  resendConfirmationEmailReturned(error, data) {
    this.setState({ loading: false });
    this.props.stopLoading();
    if (error) {
      this.props.setError(error.toString())
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.props.setEmail(this.state.email)
      this.props.navigate("registrationSuccessful")
      // this.setState({ snackOpen: true, email: "" });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
      this.props.setError(data.errorMsg)
    } else {
      this.setState({ error: data.statusText });
      this.props.setError(data.statusText)
    }
  },

  submitBack() {
    window.location.hash = "registerAccount";
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  }
});

export default ResendConfirmationEmail;
