import React from 'react';
import WanAccountsComponent from '../components/wanAccounts';
const createReactClass = require('create-react-class');


let wanEmitter = require('../store/wanStore.js').default.emitter;
let wanDispatcher = require('../store/wanStore.js').default.dispatcher;

let WanAccounts = createReactClass({
  getInitialState() {
    return {
      createLoading: false,
      error: null,
      tabValue: 0,
      addressName: '',
      addressNameError: false,
      addressNameErrorMessage: '',
      privateKey: '',
      privateKeyError: false,
      privateKeyErrorMessage: '',
      publicAddress: '',
      publicAddressError: false,
      publicAddressErrorMessage: '',
      primary: false,
      primaryError: false,
      editAddressName: '',
      editAddressNameError: false,
      editAddressNameErrorMessage: '',
      editAccount: null
    }
  },
  render() {
    return (
      <WanAccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        tabValue={this.state.tabValue}
        createLoading={this.state.createLoading}
        error={this.state.error}
        addresses={this.props.wanAddresses}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        addressNameErrorMessage={this.state.addressNameErrorMessage}
        primary={this.state.primary}
        privateKey={this.state.privateKey}
        privateKeyError={this.state.privateKeyError}
        privateKeyErrorMessage={this.state.privateKeyErrorMessage}
        publicAddress={this.state.publicAddress}
        publicAddressError={this.state.publicAddressError}
        publicAddressErrorMessage={this.state.publicAddressErrorMessage}
        handleChecked={this.handleChecked}

        validateField={this.validateField}
        updatePrimaryClicked={this.updatePrimaryClicked}
        editNameClicked={this.editNameClicked}
        editAccount={this.state.editAccount}
        editAddressName={this.state.editAddressName}
        editAddressNameError={this.state.editAddressNameError}
        editAddressNameErrorMessage={this.state.editAddressNameErrorMessage}
        onEditAddressNameKeyDown={this.onEditAddressNameKeyDown}
        onEditAddressNameBlur={this.onEditAddressNameBlur}
      />
    )
  },

  componentWillMount() {
    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
    wanEmitter.on('importWanAddress', this.importWanAddressReturned);
    wanEmitter.on('updateWanAddress', this.updateWanAddressReturned);
  },
  componentWillUnmount() {
    wanEmitter.removeAllListeners('createWanAddress');
    wanEmitter.removeAllListeners('importWanAddress');
    wanEmitter.removeAllListeners('updateWanAddress');
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

  updateWanAddressReturned(error, data) {
    this.setState({createLoading: false, editAccount: null, editAddressName: '', editAddressNameError: false, editAddressNameErrorMessage: ''});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
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

  updatePrimaryClicked(account) {
    this.setState({cardLoading: true})
    var content = { name: account.name, isPrimary: true, publicAddress: account.publicAddress };
    wanDispatcher.dispatch({type: 'updateWanAddress', content, token: this.props.user.token });
  },

  editNameClicked(editAccount) {
    this.setState({editAccount, editAddressName: editAccount.name})
  },

  onEditAddressNameKeyDown(event, editAccount) {
    if (event.which == 13) {
      this.updateName(editAccount)
    }
  },

  onEditAddressNameBlur(event, editAccount) {
    this.updateName(editAccount)
  },

  updateName(account) {
    this.setState({cardLoading: true})
    var content = { name: this.state.editAddressName, isPrimary: account.isPrimary, publicAddress: account.publicAddress };
    wanDispatcher.dispatch({type: 'updateWanAddress', content, token: this.props.user.token });
  },

  validateAddressName(value) {
    this.setState({ addressNameValid: false, addressNameError: false, addressNameErrorMessage:'' });
    if(value==null) {
      value = this.state.addressName;
    }
    if(value == '') {
      this.setState({ addressNameError: true, addressNameErrorMessage:'Address name is required' });
      return false;
    }
    this.setState({ addressNameValid: true });
    return true;
  },

  validatePublicAddress(value) {
    this.setState({ publicAddressValid: false, publicAddressError: false, publicAddressErrorMessage:'' });
    if(value==null) {
      value = this.state.publicAddress;
    }
    if(value == '') {
      this.setState({ publicAddressError: true, publicAddressErrorMessage:'Wanchain public address is required' });
      return false;
    }



    this.setState({ publicAddressValid: true });
    return true;
  },

  validatePrivateKey(value) {
    this.setState({ privateKeyValid: false, privateKeyError: false, privateKeyErrorMessage:'' });
    if(value==null) {
      value = this.state.publicAddress;
    }
    if(value == '') {
      this.setState({ privateKeyError: true, privateKeyErrorMessage:'Wanchain private key is required' });
      return false;
    }
    this.setState({ privateKeyValid: true });
    return true;
  },

  createWanAddress() {
    if(this.validateAddressName()) {
      this.setState({createLoading: true});
      var content = { username: this.props.user.username, name: this.state.addressName, isPrimary: this.state.primary };
      wanDispatcher.dispatch({type: 'createWanAddress', content, token: this.props.user.token });
    }
  },

  importWanAddress() {
    /*if(this.validateAddressName() & this.validatePrivateKey() & this.validatePublicAddress()) {
      this.setState({createLoading: true});
      var content = { name: this.state.addressName, isPrimary: this.state.primary, address: this.state.publicAddress, privateKey: this.state.privateKey };
      wanDispatcher.dispatch({type: 'importWanAddress', content, token: this.props.user.token });
    }*/
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
  },

  validateField (event, name) {
    if (name==="addressName") {
      this.validateAddressName(event.target.value)
    } if (name==="privateKey") {
      this.validatePrivateKey(event.target.value)
    } else if (name==="publicAddress") {
      this.validatePublicAddress(event.target.value)
    }
  }

})

export default (WanAccounts);
