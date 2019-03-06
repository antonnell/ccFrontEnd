import React from "react";
import WelcomeComponent from "../components/welcome";

const createReactClass = require("create-react-class");

let Welcome = createReactClass({
  getInitialState() {
    return {
      currentScreen: this.props.initialScreen!=null?this.props.initialScreen:'login', // login, register, otp, registrationSuccessful, resendConfirmation, forgotPassword, verifyAccount
      email: "",
      loading: false
    };
  },

  render() {
    return (
      <WelcomeComponent
        currentScreen={ this.state.currentScreen }
        theme={ this.props.theme }
        navigate={ this.navigate }
        setUser={ this.props.setUser }
        email={ this.state.email }
        setEmail={ this.setEmail }
        loading={ this.state.loading }
        startLoading={ this.startLoading }
        stopLoading={ this.stopLoading }
        uriParameters={ this.props.uriParameters }
        token={ this.props.token }
        code={ this.props.code }
      />
    )
  },

  startLoading() {
    this.setState({ loading: true })
  },

  stopLoading() {
    this.setState({ loading: false })
  },

  setEmail(email) {
    this.setState({ email: email });
  },

  navigate(currentScreen) {
    this.setState({ currentScreen });
  }
});

export default Welcome;
