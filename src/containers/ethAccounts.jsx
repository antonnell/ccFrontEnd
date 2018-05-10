import React from 'react'
import EthAccountsComponent from '../components/ethAccounts'
const createReactClass = require('create-react-class')

let ethEmitter = require('../store/ethStore.js').default.emitter
let ethDispatcher = require('../store/ethStore.js').default.dispatcher

let EthAccounts = createReactClass({
  getInitialState() {
    return {
      createLoading: false,
      error: null,
      tabValue: 0,
      addressName: '',
      addressNameError: false,
      primary: false,
      primaryError: false,
      privateKey: '',
      privateKeyError: false,
      publicAddress: '',
      publicAddressError: false
    }
  },
  render() {
    return (
      <EthAccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        tabValue={this.state.tabValue}
        createLoading={this.state.createLoading}
        error={this.state.error}
        addresses={this.props.ethAddresses}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        primary={this.state.primary}
        privateKey={this.state.privateKey}
        privateKeyError={this.state.privateKeyError}
        publicAddress={this.state.publicAddress}
        publicAddressError={this.state.publicAddressError}
        handleChecked={this.handleChecked}
        sendEtherClicked={this.props.openSendEther}
      />
    )
  },

  componentWillMount() {
    ethEmitter.on('createEthAddress', this.createEthAddressReturned);
    ethEmitter.on('importEthAddress', this.importEthAddressReturned);
  },
  componentWillUnmount() {
    ethEmitter.removeAllListeners('createEthAddress');
    ethEmitter.removeAllListeners('importEthAddress');
  },

  resetInputs() {
    this.setState({
      addressName: '',
      addressNameError: false,
      primary: false,
      primaryError: false,
      privateKey: '',
      privateKeyError: false,
      publicAddress: '',
      publicAddressError: false
    })
  },

  createEthAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      ethDispatcher.dispatch({type: 'getEthAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importEthAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      ethDispatcher.dispatch({type: 'getEthAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  onCreateImportKeyDown(event) {
    if (event.which == 13) {
      this.createImportClicked()
    }
  },

  createImportClicked() {
    if(this.state.tabValue === 0) {
      this.createEthAddress();
    } else {
      this.importEthAddress();
    }
  },

  createEthAddress() {
    this.setState({createLoading: true});
    var content = { username: this.props.user.username, name: this.state.addressName, isPrimary: this.state.primary };
    ethDispatcher.dispatch({type: 'createEthAddress', content, token: this.props.user.token });
  },

  importEthAddress() {
    this.setState({createLoading: true});
    var content = { name: this.state.addressName, isPrimary: this.state.primary, address: this.state.publicAddress, privateKey: this.state.privateKey };
    ethDispatcher.dispatch({type: 'importEthAddress', content, token: this.props.user.token });
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleChecked (event, name) {
    this.setState({ [name]: event.target.checked });
  }

})

export default (EthAccounts);
