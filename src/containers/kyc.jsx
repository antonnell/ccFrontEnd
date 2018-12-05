import React from "react";
import KYCComponent from "../components/kyc";
import KYCStatusComponent from "../components/kycStatus";

const createReactClass = require("create-react-class");

let KYC = createReactClass({
  getInitialState() {
    return {
      kycClicked: false
    };
  },

  render() {
    let state =
      this.props.user != null ? this.props.user.verificationResult : null;
    if (this.state.kycClicked === true && state == null) {
      state = "pending";
    }

    if (state == null) {
      return (
        <KYCComponent
          KYC={this.KYC}
          navigateSkip={this.navigateSkip}
          confirm={this.confirm}
          kycState={state}
          kycClicked={this.state.kycClicked}
        />
      );
    }
    return (
      <KYCStatusComponent
        KYC={this.KYC}
        navigateSkip={this.navigateSkip}
        confirm={this.confirm}
        kycState={state}
        kycClicked={this.state.kycClicked}
      />
    );
  },

  KYC() {
    let url = this.props.user != null ? this.props.user.verificationUrl : null;
    window.open(url, "_blank");
    this.setState({ kycClicked: true });
  },

  navigateSkip() {
    if (this.props.user && this.props.user.username === this.props.user.email) {
      window.location.hash = "setUsername";
    } else {
      window.location.hash = "wanAccounts";
    }
  },

  confirm() {
    if (this.props.user && this.props.user.username === this.props.user.email) {
      window.location.hash = "setUsername";
    } else {
      window.location.hash = "wanAccounts";
    }
  }
});

export default KYC;
