import React from "react";
import WanTransactionsComponent from "../components/wanTransactions";

const createReactClass = require("create-react-class");

// let wanEmitter = require('../store/wanStore.js').default.poolingEmitter;
// let wanDispatcher = require('../store/wanStore.js').default.poolingDispatcher;

let WanTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      wanTransactions: this.props.wanTransactions,
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
      <WanTransactionsComponent
        handleChange={this.handleChange}
        loading={this.state.loading}
        error={this.state.error}
        wanAddresses={this.props.wanAddresses}
        wanTransactions={this.props.wanTransactions}
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
        width={this.props.width}
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

export default WanTransactions;
