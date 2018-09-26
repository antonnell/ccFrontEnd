import React from 'react';
import AccountsComponent from '../components/accounts';
import bip39 from 'bip39';

const crypto = require('crypto');
const sha256 = require('sha256');

const createReactClass = require('create-react-class');
const isEthereumAddress  = require('is-ethereum-address');

let ethEmitter = require('../store/ethStore.js').default.emitter;
let ethDispatcher = require('../store/ethStore.js').default.dispatcher;
let wanEmitter = require('../store/wanStore.js').default.emitter;
let wanDispatcher = require('../store/wanStore.js').default.dispatcher;
let aionEmitter = require('../store/aionStore.js').default.emitter;
let aionDispatcher = require('../store/aionStore.js').default.dispatcher;

let Accounts = createReactClass({
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
      currentAccountKey:  ''
    }
  },
  render() {
    return (
      <AccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        exportKeyClicked={this.exportKeyClicked}
        tabValue={this.state.tabValue}
        createLoading={this.state.createLoading}
        cardLoading={this.state.cardLoading}
        privateKeyLoading={this.state.privateKeyLoading}
        error={this.state.error}
        addresses={this.props.addresses}
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
        sendClicked={this.props.openSend}
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
      />
    )
  },

  componentWillMount() {
    ethEmitter.removeAllListeners('createEthAddress');
    ethEmitter.removeAllListeners('importEthAddress');
    ethEmitter.removeAllListeners('updateEthAddress');
    ethEmitter.removeAllListeners('exportEthereumKey');

    ethEmitter.on('createEthAddress', this.createEthAddressReturned);
    ethEmitter.on('importEthAddress', this.importEthAddressReturned);
    ethEmitter.on('updateEthAddress', this.updateEthAddressReturned);
    ethEmitter.on('exportEthereumKey', this.exportEthereumKeyReturned);

    wanEmitter.removeAllListeners('createWanAddress');
    wanEmitter.removeAllListeners('importWanAddress');
    wanEmitter.removeAllListeners('updateWanAddress');
    wanEmitter.removeAllListeners('exportWanchainKey');

    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
    wanEmitter.on('importWanAddress', this.importWanAddressReturned);
    wanEmitter.on('updateWanAddress', this.updateWanAddressReturned);
    wanEmitter.on('exportWanchainKey', this.exportWanchainKeyReturned);

    aionEmitter.removeAllListeners('createAionAddress');
    aionEmitter.removeAllListeners('importAionAddress');
    aionEmitter.removeAllListeners('updateAionAddress');
    aionEmitter.removeAllListeners('exportAionKey');

    aionEmitter.on('createAionAddress', this.createAionAddressReturned);
    aionEmitter.on('importAionAddress', this.importAionAddressReturned);
    aionEmitter.on('updateAionAddress', this.updateAionAddressReturned);
    aionEmitter.on('exportAionKey', this.exportAionKeyReturned);
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

  updateEthAddressReturned(error, data) {
    this.setState({cardLoading: false,  editAccount: null, editAddressName: '', editAddressNameError: false, editAddressNameErrorMessage: ''});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var content = {id: this.props.user.id};
      ethDispatcher.dispatch({type: 'getEthAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  exportEthereumKeyReturned(error, data) {
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
    this.setState({cardLoading: false, editAccount: null, editAddressName: '', editAddressNameError: false, editAddressNameErrorMessage: ''});
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

  createAionAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      aionDispatcher.dispatch({type: 'getAionAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importAionAddressReturned(error, data) {
    this.setState({createLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      aionDispatcher.dispatch({type: 'getAionAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  updateAionAddressReturned(error, data) {
    this.setState({cardLoading: false,  editAccount: null, editAddressName: '', editAddressNameError: false, editAddressNameErrorMessage: ''});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var content = {id: this.props.user.id};
      aionDispatcher.dispatch({type: 'getAionAddress', content, token: this.props.user.token });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  exportAionKeyReturned(error, data) {
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

  exportEthereumKeyClicked(address) {
    this.setState({ privateKeyLoading: true, exportKeyAccount: address })
    var mnemonic = bip39.generateMnemonic()
    this.setState({ mnemonic })
    var content = { mnemonic: mnemonic, address };
    ethDispatcher.dispatch({type: 'exportEthereumKey', content, token: this.props.user.token });
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

  updatePrimaryClicked(account) {
    this.setState({cardLoading: true})
    var content = { name: account.name, isPrimary: true, address: account.address };
    ethDispatcher.dispatch({type: 'updateEthAddress', content, token: this.props.user.token });
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
    var content = { name: this.state.editAddressName, isPrimary: account.isPrimary, address: account.address };
    ethDispatcher.dispatch({type: 'updateEthAddress', content, token: this.props.user.token });
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
      this.setState({ publicAddressError: true, publicAddressErrorMessage:'Ethereum public address is required' });
      return false;
    } else if (!isEthereumAddress(value)) {
      this.setState({publicAddressError: true, publicAddressErrorMessage:'Invalid Ethereum public address'});
      return false;
    }
    this.setState({ publicAddressValid: true });
    return true;
  },

  validatePrivateKey(value) {
    this.setState({ privateKeyValid: false, privateKeyError: false, privateKeyErrorMessage:'' });
    if(value==null) {
      value = this.state.privateKey;
    }
    if(value == '') {
      this.setState({ privateKeyError: true, privateKeyErrorMessage:'Ethereum private key is required' });
      return false;
    }
    this.setState({ privateKeyValid: true });
    return true;
  },

  createEthAddress() {
    if(this.validateAddressName()) {
      this.setState({createLoading: true});
      var content = { username: this.props.user.username, name: this.state.addressName, isPrimary: this.state.primary };
      ethDispatcher.dispatch({type: 'createEthAddress', content, token: this.props.user.token });
    }
  },

  importEthAddress() {
    if(this.validateAddressName() & this.validatePrivateKey() & this.validatePublicAddress()) {
      this.setState({createLoading: true});
      var content = { name: this.state.addressName, isPrimary: this.state.primary, publicAddress: this.state.publicAddress, privateKey: this.state.privateKey };
      ethDispatcher.dispatch({type: 'importEthAddress', content, token: this.props.user.token });
    }
  },

  copyKey() {
    var elm = document.getElementById("currentAccountKey");
    // for Internet Explorer

    if(document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    }
    else if(window.getSelection) {
      // other browsers

      var selection = window.getSelection();
      var range = document.createRange();
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

export default (Accounts);
