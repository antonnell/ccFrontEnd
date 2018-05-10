import React from 'react'
import SendEtherComponent from '../components/sendEtherModal'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let SendEther = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      isOpen: false,
      contact: null,
      account: null,
      handleClose: null,

      amount: '',
      amountError: false,
      amountErrorMessage: '',

      gwei: '',
      gweiError: false,
      gweiErrorMessage: '',
    };
  },

  componentWillReceiveProps(props) {
    this.setState({
      isOpen: props.isOpen,
      contact: props.sendEtherContact,
      account: props.sendEtherAccount,
      handleClose: props.closeSendEther
    })
  },

  render() {
    return (
      <SendEtherComponent
        handleChange={this.handleChange}

        selectAddress={this.selectAddress}
        selectContact={this.selectContact}

        error={this.state.error}
        loading={this.state.loading}

        account={this.state.account}
        contact={this.state.contact}
        isOpen={this.state.isOpen}
        handleClose={this.state.handleClose}

        ethAddresses={this.props.ethAddresses}

        amount={this.state.amount}
        amountError={this.state.amountError}
        amountErrorMessage={this.state.amountErrorMessage}

        gwei={this.state.gwei}
        confirmPasswordError={this.state.gweiError}
        gweiErrorMessage={this.state.gweiErrorMessage}
      />
    )
  },

  selectAddress(account) {
    this.setState({account})
  },

  selectContact(contact) {
    this.setState({contact})
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (SendEther);
