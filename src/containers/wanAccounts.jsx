import React from 'react'
import WanAccountsComponent from '../components/wanAccounts'
const createReactClass = require('create-react-class')

let wanEmitter = require('../store/wanStore.js').default.emitter
let wanDispatcher = require('../store/wanStore.js').default.dispatcher

let WanAccounts = createReactClass({
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
      <WanAccountsComponent
        handleChange={this.handleChange}
        handleChecked={this.handleChecked}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        tabValue={this.state.tabValue}
        createLoading={this.state.createLoading}
        error={this.state.error}
        addresses={this.props.wanAddresses}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        primary={this.state.primary}
        privateKey={this.state.privateKey}
        privateKeyError={this.state.privateKeyError}
        publicAddress={this.state.publicAddress}
        publicAddressError={this.state.publicAddressError}
      />
    )
  },

  componentWillMount() {
    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
    wanEmitter.on('importWanAddress', this.importWanAddressReturned);
  },
  componentWillUnmount() {
    wanEmitter.removeAllListeners('createWanAddress');
    wanEmitter.removeAllListeners('importWanAddress');
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

  createWanAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importWanAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.props.user.token });

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
      this.createWanAddress();
    } else {
      this.importWanAddress();
    }
  },

  createWanAddress() {
    this.setState({createLoading: true});
    var content = { username: this.props.user.username, name: this.state.addressName, isPrimary: this.state.primary };
    wanDispatcher.dispatch({type: 'createWanAddress', content, token: this.props.user.token });
  },

  importWanAddress() {
    //not available yet

    /*this.setState({createLoading: true});
    var content = { name: this.state.addressName, isPrimary: this.state.primary, address: this.state.publicAddress, privateKey: this.state.privateKey };
    wanDispatcher.dispatch({type: 'importWanAddress', content, token: this.props.user.token });*/
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

export default (WanAccounts);
