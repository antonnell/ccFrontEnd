import React from "react";
import BitcoinTransactionsComponent from "../components/bitcoinTransactions";

const createReactClass = require("create-react-class");

// let bitcoinEmitter = require('../store/bitcoinStore.js').default.poolingEmitter;
// let bitcoinDispatcher = require('../store/bitcoinStore.js').default.poolingDispatcher;

let BitcoinTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      bitcoinTransactions: this.props.bitcoinTransactions,
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
      <BitcoinTransactionsComponent
        handleChange={this.handleChange}
        loading={this.state.loading}
        error={this.state.error}
        bitcoinAddresses={this.props.bitcoinAddresses}
        bitcoinTransactions={this.props.bitcoinTransactions}
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

export default BitcoinTransactions;
