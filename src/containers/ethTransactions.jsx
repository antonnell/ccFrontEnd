import React from "react";
import EthTransactionsComponent from "../components/ethTransactions";

const createReactClass = require("create-react-class");

// let ethEmitter = require('../store/ethStore.js').default.poolingEmitter;
// let ethDispatcher = require('../store/ethStore.js').default.poolingDispatcher;

let EthTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      ethTransactions: this.props.ethTransactions,
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
      <EthTransactionsComponent
        handleChange={this.handleChange}
        loading={this.state.loading}
        error={this.state.error}
        ethAddresses={this.props.ethAddresses}
        ethTransactions={this.props.ethTransactions}
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

export default EthTransactions;
