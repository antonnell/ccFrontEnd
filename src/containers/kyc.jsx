import React from "react";
import KYCComponent from "../components/kyc";
import KYCStatusComponent from "../components/kycStatus";

let accountEmitter = require("../store/accountStore.js").default.emitter;
let accountDispatcher = require("../store/accountStore.js").default.dispatcher;
const createReactClass = require("create-react-class");

let KYC = createReactClass({
  getInitialState() {
    return {
      kycClicked: false,
      loading: false
    };
  },

  componentWillMount() {
    accountEmitter.on("allocateKycCode", this.allocateKycCodeReturned);
  },

  componentWillUnmount() {
    accountEmitter.removeAllListeners("allocateKycCode");
  },

  render() {
    let state =
      this.props.user != null ? this.props.user.verificationResult : null;
    if (this.state.kycClicked === true && state == null) {
      state = "pending";
    }

    if (state == null || state === "") {
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
    if(this.props.user && this.props.user.verificationUrl != null && this.props.user.verificationUrl !== "") {
      this.openKYC(this.props.user.verificationUrl)
    } else {
      this.setState({ loading: true });
      accountDispatcher.dispatch({
        type: "allocateKycCode",
        content: { username: this.props.user.username },
        token: this.props.user.token
      });
    }
  },

  allocateKycCodeReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {

      //save user new fields
      let user = this.props.user;
      user.verificationUrl = data.verificationUrl;
      this.props.setUser(user);

      this.openKYC(data.verificationUrl)
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  openKYC(url) {
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
