import React from "react";
import CreateEthComponent from "../components/createEth";

// const crypto = require("crypto");

const createReactClass = require("create-react-class");

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;

let CreateEth = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      addressName: "",
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Ethereum account",
      addressNameValid: false
    };
  },
  render() {
    return (
      <CreateEthComponent
        handleChange={this.handleChange}
        onCreateKeyDown={this.onCreateKeyDown}
        createEthAddress={this.createEthAddress}
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
    ethEmitter.removeAllListeners("createEthAddress");
    ethEmitter.on("createEthAddress", this.createEthAddressReturned);
  },

  resetInputs() {
    this.setState({
      addressName: "",
      addressNameError: false
    });
  },

  createEthAddressReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      ethDispatcher.dispatch({
        type: "getEthAddress",
        content,
        token: this.props.user.token
      });

      window.location.hash = "ethAccounts";
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  navigateSkip() {
    window.location.hash = "ethAccounts";
  },

  onCreateKeyDown(event) {
    if (event.which === 13) {
      this.createEthAddress();
    }
  },

  validateAddressName(value) {
    this.setState({
      addressNameValid: false,
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Ethereum account"
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

  createEthAddress() {
    if (this.validateAddressName()) {
      this.setState({ loading: true });
      var content = {
        username: this.props.user.username,
        name: this.state.addressName,
        isPrimary: this.state.primary
      };
      ethDispatcher.dispatch({
        type: "createEthAddress",
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

export default CreateEth;
