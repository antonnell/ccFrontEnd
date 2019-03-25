import React from "react";
import AionAccountsComponent from "../components/aionAccounts";
import bip39 from "bip39";

const crypto = require("crypto");

const createReactClass = require("create-react-class");

let aionEmitter = require("../store/aionStore.js").default.emitter;
let aionDispatcher = require("../store/aionStore.js").default.dispatcher;
let aionStore = require("../store/aionStore.js").default.store;

let AionAccounts = createReactClass({
  getInitialState() {
    return {
      error: null,
      addressName: "",
      addressNameError: false,
      addressNameErrorMessage: "",
      privateKey: "",
      privateKeyError: false,
      privateKeyErrorMessage: "",
      publicAddress: "",
      publicAddressError: false,
      publicAddressErrorMessage: "",
      primary: false,
      primaryError: false,
      editAddressName: "",
      editAddressNameError: false,
      editAddressNameErrorMessage: "",
      editAccount: null,
      keyOpen: false,
      currentAccountKey: "",
      optionsAccount: null,
      loadingAccount: null,
      deleteOpen: false,
      accounts: aionStore.getStore('accounts'),
      transactions: aionStore.getStore('transactions')
    };
  },
  render() {
    return (
      <AionAccountsComponent
        theme={this.props.theme}
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        exportAionKeyClicked={this.exportAionKeyClicked}
        cardLoading={this.state.cardLoading}
        privateKeyLoading={this.state.privateKeyLoading}
        error={this.state.error}
        addresses={this.state.accounts}
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
        sendAionClicked={this.props.openSendAion}
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
        aionTransactions={this.state.transactions}
        contacts={this.props.contacts}
        size={this.props.size}
      />
    );
  },

  componentWillMount() {
    aionEmitter.removeAllListeners("exportAionKey");
    aionEmitter.removeAllListeners("deleteAionAddress");
    aionEmitter.removeAllListeners("transactionsUpdated");

    aionEmitter.on("exportAionKey", this.exportAionKeyReturned);
    aionEmitter.on("deleteAionAddress", this.deleteAionAddressReturned);
    aionEmitter.on("transactionsUpdated", this.transactionsUpdated);
  },

  componentDidMount() {
    const { user } = this.props;
    const content = { id: user.id };

    aionDispatcher.dispatch({
      type: 'getAionTransactionHistory',
      content,
      token: user.token
    });
  },

  transactionsUpdated() {
    this.setState({ transactions: aionStore.getStore('transactions') })
  },

  exportAionKeyReturned(error, data) {
    this.optionsClosed();
    this.setState({ privateKeyLoading: false, exportKeyAccount: null });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      const encodedKeyHex = data.encryptedPrivateKey;
      const mnemonic = this.state.mnemonic;
      const encodedKey = encodedKeyHex.hexDecode();

      var privateKey = decrypt(encodedKey, mnemonic);
      this.setState({ keyOpen: true, currentAccountKey: privateKey });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  deleteAionAddressReturned(error, data) {
    this.setState({
      deleteLoading: false,
      deleteAddress: null,
      deleteOpen: false
    });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      var content = { id: this.props.user.id };
      aionDispatcher.dispatch({
        type: "getAionAddress",
        content,
        token: this.props.user.token
      });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  handleCreateOpen() {
    this.setState({ createOpen: true });
  },
  handleCreateClose() {
    this.setState({ createOpen: false });
  },

  handleImportOpen() {
    this.setState({ importOpen: true });
  },
  handleImportClose() {
    this.setState({ importOpen: false });
  },

  deleteKeyClicked(address) {
    this.setState({ deleteAddress: address, deleteOpen: true });
  },

  confirmDelete() {
    this.setState({ deleteLoading: true });
    var content = { publicAddress: this.state.deleteAddress };
    aionDispatcher.dispatch({
      type: "deleteAionAddress",
      content,
      token: this.props.user.token
    });
  },

  handleDeleteClose() {
    this.setState({ deleteAddress: null, deleteOpen: false });
  },

  exportAionKeyClicked(address) {
    this.setState({ privateKeyLoading: true, exportKeyAccount: address });
    var mnemonic = bip39.generateMnemonic();
    this.setState({ mnemonic });
    var content = { mnemonic: mnemonic, address };
    aionDispatcher.dispatch({
      type: "exportAionKey",
      content,
      token: this.props.user.token
    });
  },

  onCreateImportKeyDown(event) {
    if (event.which === 13) {
      this.createImportClicked();
    }
  },

  createImportClicked() {
    if (this.state.createOpen === true) {
      this.createAionAddress();
    } else {
      this.importAionAddress();
    }
  },

  updatePrimaryClicked(account) {
    this.optionsClosed();
    this.setState({ cardLoading: true });
    var content = {
      name: account.name,
      isPrimary: true,
      address: account.address
    };
    aionDispatcher.dispatch({
      type: "updateAionAddress",
      content,
      token: this.props.user.token
    });
  },

  optionsClicked(event, optionsAccount) {
    optionsAccount.anchorEl = event.currentTarget;
    this.setState({ optionsAccount });
  },

  optionsClosed() {
    this.setState({ optionsAccount: null });
  },

  editNameClicked(editAccount) {
    this.optionsClosed();
    this.setState({ editAccount, editAddressName: editAccount.name });
  },

  onEditAddressNameKeyDown(event, editAccount) {
    if (event.which === 13) {
      this.updateName(editAccount);
    }
  },

  onEditAddressNameBlur(event, editAccount) {
    this.updateName(editAccount);
  },

  updateName(account) {
    this.setState({ cardLoading: true });
    var content = {
      name: this.state.editAddressName,
      isPrimary: account.isPrimary,
      address: account.address
    };
    aionDispatcher.dispatch({
      type: "updateAionAddress",
      content,
      token: this.props.user.token
    });
  },

  validateAddressName(value) {
    this.setState({
      addressNameValid: false,
      addressNameError: false,
      addressNameErrorMessage: ""
    });
    if (value == null) {
      value = this.state.addressName;
    }
    if (value === "") {
      this.setState({
        addressNameError: true,
        addressNameErrorMessage: "Address name is required"
      });
      return false;
    }
    this.setState({ addressNameValid: true });
    return true;
  },

  validatePublicAddress(value) {
    this.setState({
      publicAddressValid: false,
      publicAddressError: false,
      publicAddressErrorMessage: ""
    });
    if (value == null) {
      value = this.state.publicAddress;
    }
    if (value === "") {
      this.setState({
        publicAddressError: true,
        publicAddressErrorMessage: "Aion public address is required"
      });
      return false;
    }

    this.setState({ publicAddressValid: true });
    return true;
  },

  validatePrivateKey(value) {
    this.setState({
      privateKeyValid: false,
      privateKeyError: false,
      privateKeyErrorMessage: ""
    });
    if (value == null) {
      value = this.state.privateKey;
    }
    if (value === "") {
      this.setState({
        privateKeyError: true,
        privateKeyErrorMessage: "Aion private key is required"
      });
      return false;
    }
    this.setState({ privateKeyValid: true });
    return true;
  },

  createAionAddress() {
    if (this.validateAddressName()) {
      this.setState({ createLoading: true });
      var content = {
        username: this.props.user.username,
        name: this.state.addressName,
        isPrimary: this.state.primary
      };
      aionDispatcher.dispatch({
        type: "createAionAddress",
        content,
        token: this.props.user.token
      });
    }
  },

  importAionAddress() {
    if (
      this.validateAddressName() &
      this.validatePrivateKey() &&
      this.validatePublicAddress()
    ) {
      this.setState({ createLoading: true });
      var content = {
        name: this.state.addressName,
        isPrimary: this.state.primary,
        publicAddress: this.state.publicAddress,
        privateKey: this.state.privateKey
      };
      aionDispatcher.dispatch({
        type: "importAionAddress",
        content,
        token: this.props.user.token
      });
    }
  },

  copyKey() {
    var elm = document.getElementById("currentAccountKey");
    let range;
    // for Internet Explorer

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    } else if (window.getSelection) {
      // other browsers
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    }
  },

  handleKeyClose() {
    this.setState({ keyOpen: false });
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleChecked(event, name) {
    this.setState({ [name]: event.target.checked });
  },

  validateField(event, name) {
    if (name === "addressName") {
      this.validateAddressName(event.target.value);
    }
    if (name === "privateKey") {
      this.validatePrivateKey(event.target.value);
    } else if (name === "publicAddress") {
      this.validatePublicAddress(event.target.value);
    }
  }
});

function decrypt(text, seed) {
  var decipher = crypto.createDecipher("aes-256-cbc", seed);
  var dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

export default AionAccounts;
