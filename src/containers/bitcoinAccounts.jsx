import React from "react";
import BitcoinAccountsComponent from "../components/bitcoinAccounts";
import bip39 from "bip39";

const crypto = require("crypto");

const createReactClass = require("create-react-class");

let bitcoinEmitter = require("../store/bitcoinStore.js").default.emitter;
let bitcoinDispatcher = require("../store/bitcoinStore.js").default.dispatcher;

let BitcoinAccounts = createReactClass({
  getInitialState() {
    return {
      createLoading: false,
      error: null,
      addressName: "",
      addressNameError: false,
      addressNameErrorMessage: "",
      privateKey: "",
      privateKeyError: false,
      privateKeyErrorMessage: "",
      mnemonicPhrase: "",
      mnemonicPhraseError: false,
      mnemonicPhraseErrorMessage: "",
      primary: false,
      primaryError: false,
      editAddressName: "",
      editAddressNameError: false,
      editAddressNameErrorMessage: "",
      editAccount: null,
      keyOpen: false,
      currentAccountKey: null,
      currentAccountPhrase: null,
      optionsAccount: null,
      loadingAccount: null,
      deleteOpen: false,
      createOpen: false,
      importOpen: false,
      viewAddress: null,
      viewOpen: false
    };
  },
  render() {
    return (
      <BitcoinAccountsComponent
        theme={this.props.theme}
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        exportBitcoinKeyClicked={this.exportBitcoinKeyClicked}
        viewBitcoinKeysClicked={this.viewBitcoinKeysClicked}
        createLoading={this.state.createLoading}
        cardLoading={this.state.cardLoading}
        privateKeyLoading={this.state.privateKeyLoading}
        error={this.state.error}
        addresses={this.props.bitcoinAddresses}
        addressName={this.state.addressName}
        addressNameError={this.state.addressNameError}
        addressNameErrorMessage={this.state.addressNameErrorMessage}
        primary={this.state.primary}
        privateKey={this.state.privateKey}
        privateKeyError={this.state.privateKeyError}
        privateKeyErrorMessage={this.state.privateKeyErrorMessage}
        mnemonicPhrase={this.state.mnemonicPhrase}
        mnemonicPhraseError={this.state.mnemonicPhraseError}
        mnemonicPhraseErrorMessage={this.state.mnemonicPhraseErrorMessage}
        handleChecked={this.handleChecked}
        sendBitcoinClicked={this.props.openSendBitcoin}
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
        currentAccountPhrase={this.state.currentAccountPhrase}
        keyOpen={this.state.keyOpen}
        handleKeyClose={this.handleKeyClose}
        copyKey={this.copyKey}
        copyPhrase={this.copyPhrase}
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
        bitcoinTransactions={this.props.bitcoinTransactions}
        contacts={this.props.contacts}
        handleCreateOpen={this.handleCreateOpen}
        handleImportOpen={this.handleImportOpen}
        createOpen={this.state.createOpen}
        handleCreateClose={this.handleCreateClose}
        importOpen={this.state.importOpen}
        handleImportClose={this.handleImportClose}
        viewAddress={this.state.viewAddress}
        viewOpen={this.state.viewOpen}
        handleViewClose={this.handleViewClose}
        copyViewKey={this.copyViewKey}
      />
    );
  },

  componentWillMount() {
    bitcoinEmitter.removeAllListeners("createBitcoinAddress");
    bitcoinEmitter.removeAllListeners("importBitcoinAddress");
    bitcoinEmitter.removeAllListeners("updateBitcoinAddress");
    bitcoinEmitter.removeAllListeners("exportBitcoinKey");
    bitcoinEmitter.removeAllListeners("deleteBitcoinAddress");

    bitcoinEmitter.on("createBitcoinAddress", this.createBitcoinAddressReturned);
    bitcoinEmitter.on("importBitcoinAddress", this.importBitcoinAddressReturned);
    bitcoinEmitter.on("updateBitcoinAddress", this.updateBitcoinAddressReturned);
    bitcoinEmitter.on("exportBitcoinKey", this.exportBitcoinKeyReturned);
    bitcoinEmitter.on("deleteBitcoinAddress", this.deleteBitcoinAddressReturned);
  },

  resetInputs() {
    this.setState({
      addressName: "",
      addressNameError: false,
      primary: false,
      primaryError: false,
      privateKey: "",
      privateKeyError: false,
      privateKeyErrorMessage: "",
      mnemonicPhrase: "",
      mnemonicPhraseError: false,
      mnemonicPhraseErrorMessage: ""
    });
  },

  createBitcoinAddressReturned(error, data) {
    this.setState({ createLoading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      bitcoinDispatcher.dispatch({
        type: "getBitcoinAddress",
        content,
        token: this.props.user.token
      });

      this.setState({ createOpen: false });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  importBitcoinAddressReturned(error, data) {
    this.setState({ createLoading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.resetInputs();
      var content = { id: this.props.user.id };
      bitcoinDispatcher.dispatch({
        type: "getBitcoinAddress",
        content,
        token: this.props.user.token
      });

      this.setState({ createOpen: false });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  updateBitcoinAddressReturned(error, data) {
    this.setState({
      cardLoading: false,
      editAccount: null,
      editAddressName: "",
      editAddressNameError: false,
      editAddressNameErrorMessage: "",
      loadingAccount: null
    });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      var content = { id: this.props.user.id };
      bitcoinDispatcher.dispatch({
        type: "getBitcoinAddress",
        content,
        token: this.props.user.token
      });

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  exportBitcoinKeyReturned(error, data) {
    this.optionsClosed();
    this.setState({ privateKeyLoading: false, exportKeyAccount: null });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      const mnemonic = this.state.mnemonic;

      const encodedKeyHex = data.encryptedPrivateKey;
      const encodedKey = encodedKeyHex.hexDecode();

      const encodedPhraseHex = data.encryptedPhrase;
      const encodedPhrase = encodedPhraseHex.hexDecode();

      var privateKey = decrypt(encodedKey, mnemonic);
      var phrase = decrypt(encodedPhrase, mnemonic);

      this.setState({ keyOpen: true, currentAccountKey: privateKey, currentAccountPhrase: phrase });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  deleteBitcoinAddressReturned(error, data) {
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
      bitcoinDispatcher.dispatch({
        type: "getBitcoinAddress",
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
  handleViewClose() {
    this.setState({ viewOpen: false });
  },

  deleteKeyClicked(id) {
    this.setState({ deleteAddress: id, deleteOpen: true });
  },

  confirmDelete() {
    this.setState({ deleteLoading: true });
    var content = { id: this.state.deleteAddress };
    bitcoinDispatcher.dispatch({
      type: "deleteBitcoinAddress",
      content,
      token: this.props.user.token
    });
  },

  handleDeleteClose() {
    this.setState({ deleteAddress: null, deleteOpen: false });
  },

  exportBitcoinKeyClicked(id) {
    this.setState({ privateKeyLoading: true, exportKeyAccount: id });
    var mnemonic = bip39.generateMnemonic();
    this.setState({ mnemonic });
    var content = { mnemonic: mnemonic, id };
    bitcoinDispatcher.dispatch({
      type: "exportBitcoinKey",
      content,
      token: this.props.user.token
    });
  },

  viewBitcoinKeysClicked(id) {

    //we have the data already. jsut display it somewhere? Popup?
    let addy = this.props.bitcoinAddresses.filter((addy) => {
      return addy.id == id
    })

    if(addy && addy.length > 0) {
      this.setState({viewAddress: addy[0], viewOpen: true})
    } else {
      //something went wrong
    }
  },

  onCreateImportKeyDown(event) {
    if (event.which === 13) {
      this.createImportClicked();
    }
  },

  createImportClicked() {
    if (this.state.createOpen === true) {
      this.createBitcoinAddress();
    } else {
      this.importBitcoinAddress();
    }
  },

  updatePrimaryClicked(account) {
    this.optionsClosed();
    this.setState({ cardLoading: true });
    var content = {
      displayName: account.displayName,
      isPrimary: true,
      id: account.id
    };
    bitcoinDispatcher.dispatch({
      type: "updateBitcoinAddress",
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
    this.setState({ editAccount, editAddressName: editAccount.displayName });
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
      displayName: this.state.editAddressName,
      isPrimary: account.isPrimary,
      id: account.id
    };
    bitcoinDispatcher.dispatch({
      type: "updateBitcoinAddress",
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
        privateKeyErrorMessage: "Bitcoin private key is required"
      });
      return false;
    }
    this.setState({ privateKeyValid: true });
    return true;
  },

  validateMnemonicPhrase(value) {
    this.setState({
      mnemonicPhraseValid: false,
      mnemonicPhraseError: false,
      mnemonicPhraseErrorMessage: ""
    });
    if (value == null) {
      value = this.state.mnemonicPhrase;
    }
    if (value === "") {
      this.setState({
        mnemonicPhraseError: true,
        mnemonicPhraseErrorMessage: "Mnemonic phrase is required"
      });
      return false;
    }
    this.setState({ mnemonicPhraseValid: true });
    return true;
  },

  createBitcoinAddress() {
    if (this.validateAddressName()) {
      this.setState({ createLoading: true });
      var content = {
        username: this.props.user.username,
        displayName: this.state.addressName,
        isPrimary: this.state.primary
      };
      bitcoinDispatcher.dispatch({
        type: "createBitcoinAddress",
        content,
        token: this.props.user.token
      });
    }
  },

  importBitcoinAddress() {
    if (
      this.validateAddressName() &
      this.validatePrivateKey() &
      this.validateMnemonicPhrase() ) {
      this.setState({ createLoading: true });
      var content = {
        displayName: this.state.addressName,
        isPrimary: this.state.primary,
        privateKey: this.state.privateKey,
        mnemonic: this.state.mnemonicPhrase
      };
      bitcoinDispatcher.dispatch({
        type: "importBitcoinAddress",
        content,
        token: this.props.user.token
      });
    }
  },

  copyPhrase() {
    var elm = document.getElementById("currentAccountPhrase");
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

  copyViewKey(element) {
    var elm = document.getElementById(element);
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
    }
  }
});

function decrypt(text, seed) {
  var decipher = crypto.createDecipher("aes-256-cbc", seed);
  var dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

export default BitcoinAccounts;
