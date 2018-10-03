import React from 'react';
import WanAccountsComponent from '../components/wanAccounts';
import bip39 from 'bip39';

const crypto = require('crypto');
const sha256 = require('sha256');

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
      editAccount: null,
      keyOpen: false,
      currentAccountKey:  '',
      optionsAccount: null,
      loadingAccount: null,
      selectedAddress: '',
      investmentAmount: '',
      deleteOpen: false
    }
  },
  render() {
    return (
      <WanAccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        exportWanchainKeyClicked={this.exportWanchainKeyClicked}
        tabValue={this.state.tabValue}
        createLoading={this.state.createLoading}
        cardLoading={this.state.cardLoading}
        privateKeyLoading={this.state.privateKeyLoading}
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
        sendWanchainClicked={this.props.openSendWanchain}
        sendWRC20={this.props.openSendWRC}
        validateField={this.validateField}
        updatePrimaryClicked={this.updatePrimaryClicked}
        editNameClicked={this.editNameClicked}
        editAccount={this.state.editAccount}
        editAddressName={this.state.editAddressName}
        editAddressNameError={this.state.editAddressNameError}
        editAddressNameErrorMessage={this.state.editAddressNameErrorMessage}
        onEditAddressNameKeyDown={this.onEditAddressNameKeyDown}
        onEditAddressNameBlur={this.onEditAddressNameBlur}
        currentAccountKey={this.state.currentAccountKey}
        keyOpen={this.state.keyOpen}
        handleKeyClose={this.handleKeyClose}
        copyKey={this.copyKey}
        exportKeyAccount={this.state.exportKeyAccount}
        optionsClicked={this.optionsClicked}
        optionsClosed={this.optionsClosed}
        optionsAccount={this.state.optionsAccount}
        loadingAccount={this.state.loadingAccount}
        deleteKeyClicked={this.deleteKeyClicked}
        deleteOpen={this.state.deleteOpen}
        confirmDelete={this.confirmDelete}
        handleDeleteClose={this.handleDeleteClose}
        deleteLoading={this.state.deleteLoading}
        selectedAddress={this.state.selectedAddress}
        selectAddress={this.selectAddress}
        investmentAmount={this.state.investmentAmount}
        user={this.props.user}
        whitelistState={this.props.whitelistState}
      />
    )
  },

  componentWillMount() {
    wanEmitter.removeAllListeners('createWanAddress');
    wanEmitter.removeAllListeners('importWanAddress');
    wanEmitter.removeAllListeners('updateWanAddress');
    wanEmitter.removeAllListeners('exportWanchainKey');
    wanEmitter.removeAllListeners('deleteWanAddress');

    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
    wanEmitter.on('importWanAddress', this.importWanAddressReturned);
    wanEmitter.on('updateWanAddress', this.updateWanAddressReturned);
    wanEmitter.on('exportWanchainKey', this.exportWanchainKeyReturned);
    wanEmitter.on('deleteWanAddress', this.deleteWanAddressReturned);
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
    this.setState({cardLoading: false, editAccount: null, editAddressName: '', editAddressNameError: false, editAddressNameErrorMessage: '', loadingAccount: null});
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

  exportWanchainKeyReturned(error, data) {
    this.optionsClosed()
    this.setState({ privateKeyLoading: false,  exportKeyAccount: null });
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {

      const encodedKeyHex = data.encryptedPrivateKey
      const mnemonic = this.state.mnemonic
      const encodedKey = encodedKeyHex.hexDecode()

      var privateKey = decrypt(encodedKey, mnemonic)
      this.setState({keyOpen: true, currentAccountKey: privateKey})

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  deleteWanAddressReturned(error, data) {
    this.setState({ deleteLoading: false, deleteAddress: null, deleteOpen: false });
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var content = { id: this.props.user.id };
      wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.props.user.token });
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  deleteKeyClicked(address) {
    this.setState({deleteAddress: address, deleteOpen: true});
  },

  confirmDelete() {
    this.setState({deleteLoading: true});
    var content = { publicAddress: this.state.deleteAddress };
    wanDispatcher.dispatch({type: 'deleteWanAddress', content, token: this.props.user.token });
  },

  handleDeleteClose() {
    this.setState({deleteAddress: null, deleteOpen: false});
  },

  exportWanchainKeyClicked(address) {
    this.setState({ privateKeyLoading: true, exportKeyAccount: address })
    var mnemonic = bip39.generateMnemonic()
    this.setState({ mnemonic })
    var content = { mnemonic: mnemonic, address };
    wanDispatcher.dispatch({type: 'exportWanchainKey', content, token: this.props.user.token });
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
    this.optionsClosed()
    this.setState({loadingAccount: account, cardLoading: true})
    var content = { name: account.name, isPrimary: true, publicAddress: account.publicAddress };
    wanDispatcher.dispatch({type: 'updateWanAddress', content, token: this.props.user.token });
  },

  optionsClicked(event, optionsAccount) {
    optionsAccount.anchorEl = event.currentTarget
    this.setState({optionsAccount})
  },

  optionsClosed() {
    this.setState({optionsAccount: null})
  },

  editNameClicked(editAccount) {
    this.optionsClosed()
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

  copyKey() {
    let elm = document.getElementById("currentAccountKey");
      // for Internet Explorer

    if(document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    }
    else if(window.getSelection) {
      // other browsers
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    }
  },

  handleKeyClose() {
    this.setState({keyOpen: false})
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

  selectAddress(event, value) {
    this.setState({selectedAddress: event.target.value})
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

function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

export default (WanAccounts);
