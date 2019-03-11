import React from "react";
import CreateWanComponent from "../components/createWan";

// const crypto = require("crypto");

const createReactClass = require("create-react-class");

let wanEmitter = require("../store/wanStore.js").default.emitter;
let wanDispatcher = require("../store/wanStore.js").default.dispatcher;

let WanAccounts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      addressName: "",
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Wanchain account",
      addressNameValid: false
    };
  },
  render() {
    return (
      <CreateWanComponent
        handleChange={this.handleChange}
        onCreateKeyDown={this.onCreateKeyDown}
        createWanAddress={this.createWanAddress}
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
    wanEmitter.removeAllListeners("createWanAddress");
    wanEmitter.on("createWanAddress", this.createWanAddressReturned);
  },

  resetInputs() {
    this.setState({
      addressName: "",
      addressNameError: false
    });
  },

  createWanAddressReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      wanDispatcher.dispatch({
        type: "getWanAddress",
        content,
        token: this.props.user.token
      });

      window.location.hash = "wanAccounts";
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  navigateSkip() {
    window.location.hash = "wanAccounts";
  },

  onCreateKeyDown(event) {
    if (event.which === 13) {
      this.createWanAddress();
    }
  },

  validateAddressName(value) {
    this.setState({
      addressNameValid: false,
      addressNameError: false,
      addressNameErrorMessage: "This is the name of your new Wanchain account"
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

  createWanAddress() {
    if (this.validateAddressName()) {
      this.setState({ loading: true });
      var content = {
        username: this.props.user.username,
        name: this.state.addressName,
        isPrimary: this.state.primary
      };
      wanDispatcher.dispatch({
        type: "createWanAddress",
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

export default WanAccounts;
