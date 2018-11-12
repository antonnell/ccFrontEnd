import React from 'react';
import EthTransactionsComponent from '../components/ethTransactions';

const createReactClass = require('create-react-class');
const isEthereumAddress  = require('is-ethereum-address');

let ethEmitter = require('../store/ethStore.js').default.emitter;
let ethDispatcher = require('../store/ethStore.js').default.dispatcher;

let EthTransactions = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      ethTransactions: this.props.ethTransactions,
      selectedAddress: '',
      selectedAddressError: false,
      selectedAddressErrorMessage: '',
      selectedContact: '',
      selectedContactError: false,
      selectedContactErrorMessage: '',
      fromDate: '',
      toDate: ''
    }
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
      />
    )
  },

  componentWillMount() {
    ethEmitter.removeAllListeners('getTransactionHistoryFiltered');

    ethEmitter.on('getTransactionHistoryFiltered', this.getTransactionHistoryFilteredReturned);
  },

  getTransactionHistoryFilteredReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({ethTransactions: data.transactions})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  selectAddress(event) {
    this.setState({selectedAddress: event.target.value})
  },

  selectContact(event) {
    console.log(event.target.value)
    this.setState({selectedContact: event.target.value})
  },
})

export default (EthTransactions);
