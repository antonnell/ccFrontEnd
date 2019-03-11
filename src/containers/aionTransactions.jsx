import React from "react";
import AionTransactionsComponent from "../components/aionTransactions";

const createReactClass = require("create-react-class");

// let aionEmitter = require('../store/aionStore.js').default.poolingEmitter;
// let aionDispatcher = require('../store/aionStore.js').default.poolingDispatcher;

let AionTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      aionTransactions: this.props.aionTransactions,
      selectedAddress: "",
      selectedAddressError: false,
      selectedAddressErrorMessage: "",
      selectedContact: "",
      selectedContactError: false,
      selectedContactErrorMessage: "",
      fromDate: "",
      toDate: ""
    };
  },
  render() {
    return (
      <AionTransactionsComponent
        handleChange={this.handleChange}
        loading={this.state.loading}
        error={this.state.error}
        aionAddresses={this.props.aionAddresses}
        aionTransactions={this.props.aionTransactions}
        selectedAddress={this.state.selectedAddress}
        selectedAddressError={this.state.selectedAddressError}
        selectedAddressErrorMessage={this.state.selectedAddressErrorMessage}
        contacts={this.props.contacts}
        selectedContact={this.state.selectedContact}
        selectedContactError={this.state.selectedContactError}
        selectedContactErrorMessage={this.state.selectedContactErrorMessage}
        fromDate={this.state.fromDate}
        toDate={this.state.toDate}
        selectContact={this.selectContact}
        selectAddress={this.selectAddress}
        theme={this.props.theme}
        size={this.props.size}
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

  selectAddress(event) {
    this.setState({ selectedAddress: event.target.value });
  },

  selectContact(event) {
    this.setState({ selectedContact: event.target.value });
  }
});

export default AionTransactions;
