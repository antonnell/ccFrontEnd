import React from "react";
import CreateBitcoinComponent from "../components/createBitcoin";

// const crypto = require("crypto");

const createReactClass = require("create-react-class");

let bitcoinEmitter = require("../store/bitcoinStore.js").default.emitter;
let bitcoinDispatcher = require("../store/bitcoinStore.js").default.dispatcher;

let BitcoinAccounts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      addressName: "",
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Bitcoin account",
      addressNameValid: false
    };
  },
  render() {
    return (
      <CreateBitcoinComponent
        handleChange={this.handleChange}
        onCreateKeyDown={this.onCreateKeyDown}
        createBitcoinAddress={this.createBitcoinAddress}
        navigateSkip={this.navigateSkip}
        loading={this.state.loading}
        error={this.state.error}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        addressNameErrorMessage={this.state.addressNameErrorMessage}
        addressNameValid={this.state.addressNameValid}
        theme={this.props.theme}
      />
    );
  },

  componentWillMount() {
    bitcoinEmitter.removeAllListeners("createBitcoinAddress");
    bitcoinEmitter.on("createBitcoinAddress", this.createBitcoinAddressReturned);
  },

  resetInputs() {
    this.setState({
      addressName: "",
      addressNameError: false
    });
  },

  createBitcoinAddressReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      bitcoinDispatcher.dispatch({
        type: "getBitcoinAddress",
        content,
        token: this.props.user.token
      });

      window.location.hash = "bitcoinAccounts";
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  navigateSkip() {
    window.location.hash = "bitcoinAccounts";
  },

  onCreateKeyDown(event) {
    if (event.which === 13) {
      this.createBitcoinAddress();
    }
  },

  validateAddressName(value) {
    this.setState({
      addressNameValid: false,
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Bitcoin account"
    });
    if (value == null) {
      value = this.state.addressName;
    }
    if (value === "") {
      this.setState({
        addressNameError: true,
        addressNameErrorMessage: "Address name is required"
      });
      return false;
    }
    this.setState({ addressNameValid: true });
    return true;
  },

  createBitcoinAddress() {
    if (this.validateAddressName()) {
      this.setState({ loading: true });
      var content = {
        username: this.props.user.username,
        displayName: this.state.addressName,
        isPrimary: this.state.primary
      };
      bitcoinDispatcher.dispatch({
        type: "createBitcoinAddress",
        content,
        token: this.props.user.token
      });
    }
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });

      if (name === "addressName") {
        this.validateAddressName(event.target.value);
      }
    }
  }
});

// function decrypt(text, seed) {
//   var decipher = crypto.createDecipher("aes-256-cbc", seed);
//   var dec = decipher.update(text, "base64", "utf8");
//   dec += decipher.final("utf8");
//   return dec;
// }

export default BitcoinAccounts;
