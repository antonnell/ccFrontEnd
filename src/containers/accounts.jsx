import React from "react";
import createReactClass from "create-react-class";
import AccountsComponent from "../components/accounts";
import bip39 from "bip39";
import TokenAccounts from '../components/tokenAccounts';

const crypto = require("crypto");

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let ethStore = require("../store/ethStore.js").default.store;

let wanEmitter = require("../store/wanStore.js").default.emitter;
let wanDispatcher = require("../store/wanStore.js").default.dispatcher;
let wanStore = require("../store/wanStore.js").default.store;

let aionEmitter = require("../store/aionStore.js").default.emitter;
let aionDispatcher = require("../store/aionStore.js").default.dispatcher;
let aionStore = require("../store/aionStore.js").default.store;

let bitcoinEmitter = require('../store/bitcoinStore.js').default.emitter;
let bitcoinDispatcher = require('../store/bitcoinStore.js').default.dispatcher;
let bitcoinStore = require('../store/bitcoinStore.js').default.store;

let tezosEmitter = require("../store/tezosStore.js").default.emitter;
let tezosDispatcher = require("../store/tezosStore.js").default.dispatcher;
let tezosStore = require("../store/tezosStore.js").default.store;


let Accounts = createReactClass({

  getInitialState() {

    const { user, token } = this.props;
    const content = { id: user.id };

    switch(token) {
      case 'Aion':
        aionDispatcher.dispatch({
          type: 'getAionTransactionHistory',
          content,
          token: user.token
        });
        break
      case 'Bitcoin':
        bitcoinDispatcher.dispatch({
          type: 'getBitcoinTransactionHistory',
          content,
          token: user.token
        });
        break
      case 'Ethereum':
      case 'ERC20':
        ethDispatcher.dispatch({
          type: 'getEthTransactionHistory',
          content,
          token: user.token
        });
        break
      case 'Tezos':
        tezosDispatcher.dispatch({
          type: 'getTezosTransactionHistory',
          content,
          token: user.token
        });
        break
      case 'Wanchain':
      case 'WRC20':
        wanDispatcher.dispatch({
          type: 'getWanTransactionHistory',
          content,
          token: user.token
        });
        break
    }

    return {
      error: null,

      ethAccountsCombined: ethStore.getStore('accountsCombined'),
      erc20AccountsCombined: ethStore.getStore('erc20AccountsCombined'),
      wanAccountsCombined: wanStore.getStore('accountsCombined'),
      wrc20AccountsCombined: wanStore.getStore('wrc20AccountsCombined'),
      aionAccountsCombined: aionStore.getStore('accountsCombined'),
      bitcoinAccountsCombined: bitcoinStore.getStore('accountsCombined'),
      tezosAccountsCombined: tezosStore.getStore('accountsCombined'),

      ethAccounts: ethStore.getStore('accounts'),
      erc20Accounts: ethStore.getStore('erc20Accounts'),
      wanAccounts: wanStore.getStore('accounts'),
      wrc20Accounts: ethStore.getStore('wrc20Accounts'),
      aionAccounts: aionStore.getStore('accounts'),
      bitcoinAccounts: bitcoinStore.getStore('accounts'),
      tezosAccounts: tezosStore.getStore('accounts'),

      ethTransactions: ethStore.getStore('transactions'),
      wanTransactions: wanStore.getStore('transactions'),
      aionTransactions: aionStore.getStore('transactions'),
      bitcoinTransactions: bitcoinStore.getStore('transactions'),
      tezosTransactions: tezosStore.getStore('transactions'),

      ethLoading: true,
      wanLoading: true,
      aionLoading: true,
      bitcoinLoading: true,
      tezosLoading: true,
      tokens: [
        { value: 'Aion', description: 'Aion' },
        { value: 'Bitcoin', description: 'Bitcoin' },
        { value: 'Ethereum', description: 'Ethereum'},
        { value: 'Tezos', description: 'Tezos' },
        { value: 'Wanchain', description: 'Wanchain'}
      ],
      tokenValue: null,
      optionsAccount: null,
      editAccount: null,
      editAddressName: '',
      editAddressNameError: null,
      editAddressNameErrorMessage: '',
      cardLoading: false,
      exportKeyAccount: null,
      deleteAddress: null,
      deleteId: null,
      deleteOpen: false,
      mnemonic: null,
      keyOpen: false,
      currentAccountKey: null,
      currentAccountPhrase: null,
      loadingAccount: null,
      viewOpen: false,
      viewAddress: null,
      viewTokensOpen: false,
      viewTokens: null,
      viewTokensAccount: null,
      viewMode: 'Grid',
    };
  },

  componentWillReceiveProps(props) {

    if(this.props.token != props.token) {
      const { user } = this.props;
      const content = { id: user.id };

      switch(props.token) {
        case 'Aion':
          aionDispatcher.dispatch({
            type: 'getAionTransactionHistory',
            content,
            token: user.token
          });
          break
        case 'Bitcoin':
          bitcoinDispatcher.dispatch({
            type: 'getBitcoinTransactionHistory',
            content,
            token: user.token
          });
          break
        case 'Ethereum':
        case 'ERC20':
          ethDispatcher.dispatch({
            type: 'getEthTransactionHistory',
            content,
            token: user.token
          });
          break
        case 'Tezos':
          tezosDispatcher.dispatch({
            type: 'getTezosTransactionHistory',
            content,
            token: user.token
          });
          break
        case 'Wanchain':
        case 'WRC20':
          wanDispatcher.dispatch({
            type: 'getWanTransactionHistory',
            content,
            token: user.token
          });
          break
      }
    }
  },

  render() {
    switch(this.props.token) {
      case "Aion":
      case "Bitcoin":
      case "Ethereum":
      case "Tezos":
      case "Wanchain":
        return this.renderToken()
      default:
        return this.renderAccounts()
    }
  },

  renderToken() {

    let {
      error,
      createOpen,
      importOpen,
      tokens,
      tokenValue,
      tokenError,
      tokenErrorMessage,
      ethLoading,
      wanLoading,
      aionLoading,
      bitcoinLoading,
      tezosLoading,
      addressName,
      addressNameError,
      addressNameErrorMessage,
      publicAddress,
      publicAddressError,
      publicAddressErrorMessage,
      privateKey,
      privateKeyError,
      privateKeyErrorMessage,
      mnemonicPhrase,
      mnemonicPhraseError,
      mnemonicPhraseErrorMessage,
      aionAccounts,
      bitcoinAccounts,
      tezosAccounts,
      ethAccounts,
      erc20Accounts,
      wanAccounts,
      wrc20Accounts,
      aionTransactions,
      bitcoinTransactions,
      tezosTransactions,
      ethTransactions,
      wanTransactions,
      optionsAccount,
      editAccount,
      editAddressName,
      editAddressNameError,
      editAddressNameErrorMessage,
      cardLoading,
      exportKeyAccount,
      deleteOpen,
      keyOpen,
      currentAccountKey,
      currentAccountPhrase,
      loadingAccount,
      viewOpen,
      viewAddress,
      viewTokens,
      viewTokensOpen,
      viewTokensAccount
    } = this.state

    let {
      theme,
      user,
      transactClicked,
      size,
      contacts,
      token
    } = this.props

    let accounts = null
    let transactions = null

    switch(token) {
      case "Aion":
        accounts = aionAccounts
        transactions = aionTransactions
        break;
      case "Bitcoin":
        accounts = bitcoinAccounts
        transactions = bitcoinTransactions
        break;
      case "Ethereum":
        accounts = ethAccounts
        transactions = ethTransactions
        break;
      case "Tezos":
        accounts = tezosAccounts
        transactions = tezosTransactions
        break;
      case "Wanchain":
        accounts = wanAccounts
        transactions = wanTransactions
        break;
    }

    return (
      <TokenAccounts
        error={ error }
        token={ token }
        accounts={ accounts }
        transactions={ transactions }
        loading={ ethLoading || wanLoading || aionLoading || bitcoinLoading || tezosLoading }
        theme={ theme }
        user={ user }
        transactClicked={ transactClicked }
        contacts={ contacts }
        size={ size }
        createOpen={ createOpen }
        handleCreateOpen={ this.handleCreateOpen }
        handleCreateClose={ this.handleCreateClose }
        importOpen={ importOpen }
        handleImportOpen={ this.handleImportOpen }
        handleImportClose={ this.handleImportClose }
        tokens={ tokens }
        tokenValue={ tokenValue }
        tokenError={ tokenError }
        tokenErrorMessage={ tokenErrorMessage }
        handleChange={ this.handleChange }
        handleSelectChange={ this.handleSelectChange }
        handleCreate={ this.handleCreate }
        handleImport={ this.handleImport }
        addressName={ addressName }
        addressNameError={ addressNameError }
        addressNameErrorMessage={ addressNameErrorMessage }
        publicAddress={ publicAddress }
        publicAddressError={ publicAddressError }
        publicAddressErrorMessage={ publicAddressErrorMessage }
        privateKey={ privateKey }
        privateKeyError={ privateKeyError }
        privateKeyErrorMessage={ privateKeyErrorMessage }
        mnemonicPhrase={ mnemonicPhrase }
        mnemonicPhraseError={ mnemonicPhraseError }
        mnemonicPhraseErrorMessage={ mnemonicPhraseErrorMessage }
        optionsClicked={ this.optionsClicked }
        optionsClosed={ this.optionsClosed }
        optionsAccount={ optionsAccount }
        editNameClicked={ this.editNameClicked }
        onEditAddressNameKeyDown={ this.onEditAddressNameKeyDown }
        editAddressName={ editAddressName }
        editAddressNameError={ editAddressNameError }
        editAddressNameErrorMessage={ editAddressNameErrorMessage }
        updatePrimaryClicked={ this.updatePrimaryClicked }
        exportKeyClicked={ this.exportKeyClicked }
        deleteClicked={ this.deleteClicked }
        deleteOpen={ deleteOpen }
        confirmDelete={ this.confirmDelete }
        handleDeleteClose={ this.handleDeleteClose }
        editAccount={ editAccount }
        cardLoading={ cardLoading }
        exportKeyAccount={ exportKeyAccount }
        keyOpen={ keyOpen }
        currentAccountKey={ currentAccountKey }
        currentAccountPhrase={ currentAccountPhrase }
        handleKeyClose={ this.handleKeyClose }
        copyKey={ this.copyKey }
        copyPhrase={ this.copyPhrase }
        loadingAccount={ loadingAccount }
        viewBitcoinKeysClicked={ this.viewBitcoinKeysClicked }
        viewOpen={ viewOpen }
        viewAddress={ viewAddress }
        handleViewClose={ this.handleViewClose }
        handleViewTokens={ this.handleViewTokens }
        viewTokensClose={ this.viewTokensClose }
        viewTokensOpen={ viewTokensOpen }
        viewTokens={ viewTokens }
        viewTokensAccount={ viewTokensAccount }
      />
    );
  },

  renderAccounts() {
    let {
      theme,
      stakeClicked,
      transactClicked,
      transactClosed,
      transactOpen,
      user
    } = this.props

    let {
      error,
      ethAccountsCombined,
      wanAccountsCombined,
      aionAccountsCombined,
      bitcoinAccountsCombined,
      tezosAccountsCombined,
      erc20AccountsCombined,
      wrc20AccountsCombined,
      ethLoading,
      wanLoading,
      aionLoading,
      bitcoinLoading,
      tezosLoading,
      createOpen,
      importOpen,
      tokens,
      tokenValue,
      tokenError,
      tokenErrorMessage,
      addressName,
      addressNameError,
      addressNameErrorMessage,
      publicAddress,
      publicAddressError,
      publicAddressErrorMessage,
      privateKey,
      privateKeyError,
      privateKeyErrorMessage,
      mnemonicPhrase,
      mnemonicPhraseError,
      mnemonicPhraseErrorMessage,
      viewMode,
    } = this.state

    let accounts = [
      ...(aionAccountsCombined != null ? aionAccountsCombined : []),
      ...(bitcoinAccountsCombined != null ? bitcoinAccountsCombined : []),
      ...(ethAccountsCombined != null ? ethAccountsCombined : []),
      ...(erc20AccountsCombined != null ? erc20AccountsCombined : []),
      ...(tezosAccountsCombined != null ? tezosAccountsCombined : []),
      ...(wanAccountsCombined != null ? wanAccountsCombined : []),
      ...(wrc20AccountsCombined != null ? wrc20AccountsCombined : [])
    ]

    return (
      <AccountsComponent
        error={ error }
        user={ user }
        theme={ theme }
        accounts={ accounts }
        loading={ ethLoading || wanLoading || aionLoading || bitcoinLoading || tezosLoading }
        stakeClicked={ stakeClicked }
        transactClicked= { transactClicked }
        transactOpen={ transactOpen }
        transactClosed={ transactClosed }
        createOpen={ createOpen }
        handleCreateOpen={ this.handleCreateOpen }
        handleCreateClose={ this.handleCreateClose }
        importOpen={ importOpen }
        handleImportOpen={ this.handleImportOpen }
        handleImportClose={ this.handleImportClose }
        tokens={ tokens }
        tokenValue={ tokenValue }
        tokenError={ tokenError }
        tokenErrorMessage={ tokenErrorMessage }
        handleChange={ this.handleChange }
        handleSelectChange={ this.handleSelectChange }
        handleCreate={ this.handleCreate }
        handleImport={ this.handleImport }
        addressName={ addressName }
        addressNameError={ addressNameError }
        addressNameErrorMessage={ addressNameErrorMessage }
        publicAddress={ publicAddress }
        publicAddressError={ publicAddressError }
        publicAddressErrorMessage={ publicAddressErrorMessage }
        privateKey={ privateKey }
        privateKeyError={ privateKeyError }
        privateKeyErrorMessage={ privateKeyErrorMessage }
        mnemonicPhrase={ mnemonicPhrase }
        mnemonicPhraseError={ mnemonicPhraseError }
        mnemonicPhraseErrorMessage={ mnemonicPhraseErrorMessage }
        toggleViewClicked={ this.toggleViewClicked }
        viewMode={ viewMode }
      />
    );
  },

  componentWillMount() {
    aionEmitter.removeAllListeners('accountsUpdated');
    aionEmitter.removeAllListeners("transactionsUpdated");
    aionEmitter.removeAllListeners('error');
    aionEmitter.removeAllListeners('exportAionKey');
    aionEmitter.on('accountsUpdated', this.aionAccountsRefreshed);
    aionEmitter.on("transactionsUpdated", this.aionTransactionsUpdated);
    aionEmitter.on("error", this.showError);
    aionEmitter.on("exportAionKey", this.exportKeyReturned);

    bitcoinEmitter.removeAllListeners('accountsUpdated');
    bitcoinEmitter.removeAllListeners("transactionsUpdated");
    bitcoinEmitter.removeAllListeners('error');
    bitcoinEmitter.removeAllListeners('exportBitcoinKey');
    bitcoinEmitter.on('accountsUpdated', this.bitcoinAccountsRefreshed);
    bitcoinEmitter.on("transactionsUpdated", this.bitcoinTransactionsUpdated);
    bitcoinEmitter.on("error", this.showError);
    bitcoinEmitter.on("exportBitcoinKey", this.exportKeyReturned);

    ethEmitter.removeAllListeners('accountsUpdated');
    ethEmitter.removeAllListeners("transactionsUpdated");
    ethEmitter.removeAllListeners('error');
    ethEmitter.removeAllListeners('exportEthereumKey');
    ethEmitter.on('accountsUpdated', this.ethAccountsRefreshed);
    ethEmitter.on("transactionsUpdated", this.ethTransactionsUpdated);
    ethEmitter.on("erc20AccountsUpdated", this.erc20AccountsUpdated);
    ethEmitter.on("error", this.showError);
    ethEmitter.on("exportEthereumKey", this.exportKeyReturned);

    tezosEmitter.removeAllListeners('accountsUpdated');
    tezosEmitter.removeAllListeners("transactionsUpdated");
    tezosEmitter.removeAllListeners('error');
    tezosEmitter.removeAllListeners('exportTezosKey');
    tezosEmitter.on('accountsUpdated', this.tezosAccountsRefreshed);
    tezosEmitter.on("transactionsUpdated", this.tezosTransactionsUpdated);
    tezosEmitter.on("error", this.showError);
    tezosEmitter.on("exportTezosKey", this.exportKeyReturned);

    wanEmitter.removeAllListeners("transactionsUpdated");
    wanEmitter.removeAllListeners('accountsUpdated');
    wanEmitter.removeAllListeners('error');
    wanEmitter.removeAllListeners('exportWanchainKey');
    wanEmitter.on('accountsUpdated', this.wanAccountsRefreshed);
    wanEmitter.on("transactionsUpdated", this.wanTransactionsUpdated);
    wanEmitter.on("wrc20AccountsUpdated", this.wrc20AccountsUpdated);
    wanEmitter.on("error", this.showError);
    wanEmitter.on("exportWanchainKey", this.exportKeyReturned);

    this.getAllAccounts()
  },

  showError(error) {
    this.setState({ error: error.toString() })
  },

  exportKeyReturned(error, data) {
    this.setState({ cardLoading: false, exportKeyAccount: null });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      const mnemonic = this.state.mnemonic;

      const encodedKeyHex = data.encryptedPrivateKey;
      const encodedKey = encodedKeyHex.hexDecode();
      let privateKey = decrypt(encodedKey, mnemonic);
      let phrase = null;

      if(data.encryptedPhrase) {
        const encodedPhraseHex = data.encryptedPhrase;
        const encodedPhrase = encodedPhraseHex.hexDecode();
        phrase = decrypt(encodedPhrase, mnemonic);
      }

      this.setState({ keyOpen: true, currentAccountKey: privateKey, currentAccountPhrase: phrase });

    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  aionTransactionsUpdated() {
    this.setState({ aionTransactions: aionStore.getStore('transactions') })
  },

  bitcoinTransactionsUpdated() {
    this.setState({ bitcoinTransactions: bitcoinStore.getStore('transactions') })
  },

  ethTransactionsUpdated() {
    this.setState({ ethTransactions: ethStore.getStore('transactions') })
  },

  tezosTransactionsUpdated() {
    this.setState({ tezosTransactions: tezosStore.getStore('transactions') })
  },

  wanTransactionsUpdated() {
    this.setState({ wanTransactions: wanStore.getStore('transactions') })
  },

  ethAccountsRefreshed() {
    this.setState({
      ethAccounts: ethStore.getStore('accounts'),
      ethAccountsCombined: ethStore.getStore('accountsCombined'),
      ethLoading: false,
      loadingAccount: null,
      cardLoading: false,
      deleteOpen: false,
      editAccount: null,
      editAddressName: null,
    })
  },

  erc20AccountsUpdated() {
    this.setState({
      erc20Accounts: ethStore.getStore('erc20Accounts'),
      erc20AccountsCombined: ethStore.getStore('erc20AccountsCombined'),
    })
  },

  wrc20AccountsUpdated() {
    this.setState({
      wrc20Accounts: wanStore.getStore('wrc20Accounts'),
      wrc20AccountsCombined: wanStore.getStore('wrc20AccountsCombined')
    })
  },

  wanAccountsRefreshed() {
    this.setState({
      wanAccounts: wanStore.getStore('accounts'),
      wanAccountsCombined: wanStore.getStore('accountsCombined'),
      wanLoading: false,
      loadingAccount: null,
      cardLoading: false,
      deleteOpen: false,
      editAccount: null,
      editAddressName: null,
    })
  },

  aionAccountsRefreshed() {
    this.setState({
      aionAccounts: aionStore.getStore('accounts'),
      aionAccountsCombined: aionStore.getStore('accountsCombined'),
      aionLoading: false,
      loadingAccount: null,
      cardLoading: false,
      deleteOpen: false,
      editAccount: null,
      editAddressName: null,
    })
  },

  bitcoinAccountsRefreshed() {
    this.setState({
      bitcoinAccounts: bitcoinStore.getStore('accounts'),
      bitcoinAccountsCombined: bitcoinStore.getStore('accountsCombined'),
      bitcoinLoading: false,
      loadingAccount: null,
      cardLoading: false,
      deleteOpen: false,
      editAccount: null,
      editAddressName: null,
    })
  },

  tezosAccountsRefreshed() {
    this.setState({
      tezosAccounts: tezosStore.getStore('accounts'),
      tezosAccountsCombined: tezosStore.getStore('accountsCombined'),
      tezosLoading: false,
      loadingAccount: null,
      cardLoading: false,
      deleteOpen: false,
      editAccount: null,
      editAddressName: null,
    })
  },

  getAllAccounts() {
    const { user } = this.props;
    const content = { id: user.id };

    aionDispatcher.dispatch({
      type: 'getAionAddress',
      content,
      token: user.token
    });
    bitcoinDispatcher.dispatch({
      type: 'getBitcoinAddress',
      content,
      token: user.token
    });
    ethDispatcher.dispatch({
      type: 'getEthAddress',
      content,
      token: user.token
    });
    tezosDispatcher.dispatch({
      type: 'getTezosAddress',
      content,
      token: user.token
    });
    wanDispatcher.dispatch({
      type: 'getWanAddress',
      content,
      token: user.token
    });
  },

  handleCreateOpen(tokenValue) {
    this.setState({ createOpen: true, tokenValue })
  },

  handleCreateClose(tokenValue) {
    this.setState({ createOpen: false, tokenValue })
  },

  handleImportOpen(tokenValue) {
    this.setState({ importOpen: true, tokenValue })
  },

  handleImportClose(tokenValue) {
    this.setState({ importOpen: false, tokenValue })
  },

  handleSelectChange(event, value) {
    switch (event.target.name) {
      case 'token':
        this.setState({ tokenValue: event.target.value })
        break;
    }
  },

  handleChange(event) {
    switch (event.target.name) {
      case 'addressName':
        this.setState({ addressName: event.target.value })
        break;
      case 'publicAddress':
        this.setState({ publicAddress: event.target.value })
        break;
      case 'privateKey':
        this.setState({ privateKey: event.target.value })
        break;
      case 'mnemonicPhrase':
        this.setState({ mnemonicPhrase: event.target.value })
        break;
      case 'editAddressName':
        this.setState({ editAddressName: event.target.value })
        break;
    }
  },

  onCreateImportKeyDown(event) {
    if (event.which === 13) {
      if (this.state.createOpen === true) {
        this.handleCreate();
      } else {
        this.handleImport();
      }
    }
  },

  validateCreate() {
    this.setState({ addressNameError: false, addressNameErrorMessage: "", tokenValueError: false, tokenValueErrorMessage: ""})

    const {
      addressName,
      tokenValue
    } = this.state

    let error = false

    if(addressName === null || addressName === "") {
      this.setState({ addressNameError: true, addressNameErrorMessage: 'Address Name is required' })
      error = true
    }

    if(tokenValue === null || tokenValue === "") {
      this.setState({ tokenValueError: true, tokenValueErrorMessage: 'Token is required' })
      error = true
    }

    return !error
  },

  handleCreate() {
    if (this.validateCreate()) {

      const {
        addressName,
        tokenValue
      } = this.state

      const { user } = this.props

      const content = {
        username: user.username,
        name: addressName,
        id: user.id
      };

      switch(tokenValue) {
        case 'Aion':
          this.setState({ aionLoading: true })
          aionDispatcher.dispatch({
            type: "createAionAddress",
            content,
            token: user.token
          });
          break;
        case 'Bitcoin':
          this.setState({ bitcoinLoading: true })
          bitcoinDispatcher.dispatch({
            type: "createBitcoinAddress",
            content,
            token: user.token
          });
          break;
        case 'Ethereum':
          this.setState({ ethLoading: true })
          ethDispatcher.dispatch({
            type: "createEthAddress",
            content,
            token: user.token
          });
          break;
        case 'Tezos':
          this.setState({ tezosLoading: true })
          tezosDispatcher.dispatch({
            type: "createTezosAddress",
            content,
            token: user.token
          });
          break;
        case 'Wanchain':
          this.setState({ wanLoading: true })
          wanDispatcher.dispatch({
            type: "createWanAddress",
            content,
            token: user.token
          });
          break;
      }

      this.handleCreateClose()
    }
  },

  validateImport() {
    this.setState({
      addressNameError: false,
      addressNameErrorMessage: "",
      tokenValueError: false,
      tokenValueErrorMessage: "",
      publicAddressError: false,
      publicAddressErrorMessage: "",
      privateKeyError: false,
      privateKeyErrorMessage: "",
      mnemonicPhraseError: false,
      mnemonicPhraseErrorMessage: "",

    })

    const {
      addressName,
      tokenValue,
      publicAddress,
      privateKey,
      mnemonicPhrase
    } = this.state

    let error = false

    if(addressName === null || addressName === "") {
      this.setState({ addressNameError: true, addressNameErrorMessage: 'Address Name is required' })
      error = true
    }

    if(tokenValue === null || tokenValue === "") {
      this.setState({ tokenValueError: true, tokenValueErrorMessage: 'Token is required' })
      error = true
    }

    if(tokenValue !== "Bitcoin") {
      if(publicAddress === null || publicAddress === "") {
        this.setState({ publicAddressError: true, publicAddressErrorMessage: 'Public Address is required' })
        error = true
      }
    }

    if(privateKey === null || privateKey === "") {
      this.setState({ privateKeyError: true, privateKeyErrorMessage: 'Private Key is required' })
      error = true
    }

    if(tokenValue === 'Bitcoin') {
      if(mnemonicPhrase === null || mnemonicPhrase === "") {
        this.setState({ mnemonicPhraseError: true, mnemonicPhraseErrorMessage: 'Mnemonic Phrase is required' })
        error = true
      }
    }

    return !error
  },

  handleImport() {
    if (this.validateImport()) {

      const {
        addressName,
        tokenValue,
        publicAddress,
        privateKey,
        mnemonicPhrase
      } = this.state

      const { user } = this.props

      const content = {
        name: addressName,
        publicAddress: publicAddress,
        privateKey: privateKey,
        mnemonicPhrase: mnemonicPhrase,
        id: user.id
      };

      switch(tokenValue) {
        case 'Aion':
          this.setState({ aionLoading: true })
          aionDispatcher.dispatch({
            type: "importAionAddress",
            content,
            token: user.token
          });
          break;
        case 'Bitcoin':
          this.setState({ bitcoinLoading: true })
          bitcoinDispatcher.dispatch({
            type: "importBitcoinAddress",
            content,
            token: user.token
          });
          break;
        case 'Ethereum':
          this.setState({ ethLoading: true })
          ethDispatcher.dispatch({
            type: "importEthAddress",
            content,
            token: user.token
          });
          break;
        case 'Tezos':
          this.setState({ tezosLoading: true })
          tezosDispatcher.dispatch({
            type: "importTezosAddress",
            content,
            token: user.token
          });
          break;
        case 'Wanchain':
          this.setState({ wanLoading: true })
          wanDispatcher.dispatch({
            type: "importWanAddress",
            content,
            token: user.token
          });
          break;
      }

      this.handleImportClose()
    }
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

  updateName(account) {
    this.setState({ cardLoading: true });

    const { user } = this.props;

    var content = {
      name: this.state.editAddressName,
      isPrimary: account.isPrimary,
      address: account.address != null ? account.address : account.publicAddress,
      id: account.id,
      userId: user.id
    };

    switch(this.props.token) {
      case 'Aion':
        aionDispatcher.dispatch({
          type: "updateAionAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Bitcoin':
        bitcoinDispatcher.dispatch({
          type: "updateBitcoinAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Ethereum':
        ethDispatcher.dispatch({
          type: "updateEthAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Tezos':
        tezosDispatcher.dispatch({
          type: "updateTezosAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Wanchain':
        wanDispatcher.dispatch({
          type: "updateWanAddress",
          content,
          token: this.props.user.token
        });
        break;
    }
  },

  updatePrimaryClicked(account) {
    this.optionsClosed();
    this.setState({ loadingAccount: account, cardLoading: true });

    const { user } = this.props;

    var content = {
      name: account.name != null ? account.name : account.displayName,
      isPrimary: true,
      address: account.address != null ? account.address : account.publicAddress,
      id: account.id,
      userId: user.id
    };

    switch(this.props.token) {
      case 'Aion':
        aionDispatcher.dispatch({
          type: "updateAionAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Bitcoin':
        bitcoinDispatcher.dispatch({
          type: "updateBitcoinAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Ethereum':
        ethDispatcher.dispatch({
          type: "updateEthAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Tezos':
        tezosDispatcher.dispatch({
          type: "updateTezosAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Wanchain':
        wanDispatcher.dispatch({
          type: "updateWanAddress",
          content,
          token: this.props.user.token
        });
        break;
    }
  },

  exportKeyClicked(address, id) {
    this.optionsClosed();
    this.setState({
      cardLoading: true,
      exportKeyAccount: address != null ? address : id
    });
    var mnemonic = bip39.generateMnemonic();
    this.setState({ mnemonic });
    var content = {
      mnemonic: mnemonic,
      address: address,
      id: id
    };

    switch(this.props.token) {
      case 'Aion':
        aionDispatcher.dispatch({
          type: "exportAionKey",
          content,
          token: this.props.user.token
        });
        break;
      case 'Bitcoin':
        bitcoinDispatcher.dispatch({
          type: "exportBitcoinKey",
          content,
          token: this.props.user.token
        });
        break;
      case 'Ethereum':
        ethDispatcher.dispatch({
          type: "exportEthereumKey",
          content,
          token: this.props.user.token
        });
        break;
      case 'Tezos':
        tezosDispatcher.dispatch({
          type: "exportTezosKey",
          content,
          token: this.props.user.token
        });
        break;
      case 'Wanchain':
        wanDispatcher.dispatch({
          type: "exportWanchainKey",
          content,
          token: this.props.user.token
        });
        break;
    }
  },

  deleteClicked(address, id) {
    this.optionsClosed()
    this.setState({ deleteAddress: address, deleteId: id, deleteOpen: true });
  },

  confirmDelete() {
    this.setState({ cardLoading: true });

    const { user } = this.props;

    var content = {
      address: this.state.deleteAddress,
      id: this.state.deleteId,
      userId: user.id
    };

    console.log(content)

    switch(this.props.token) {
      case 'Aion':
        aionDispatcher.dispatch({
          type: "deleteAionAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Bitcoin':
        bitcoinDispatcher.dispatch({
          type: "deleteBitcoinAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Ethereum':
        ethDispatcher.dispatch({
          type: "deleteEthAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Tezos':
        tezosDispatcher.dispatch({
          type: "deleteTezosAddress",
          content,
          token: this.props.user.token
        });
        break;
      case 'Wanchain':
        wanDispatcher.dispatch({
          type: "deleteWanAddress",
          content,
          token: this.props.user.token
        });
        break;
    }
  },

  handleDeleteClose() {
    this.setState({ deleteAddress: null, deleteOpen: false });
  },

  handleKeyClose() {
    this.setState({ keyOpen: false });
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

  viewBitcoinKeysClicked(id) {
    //we have the data already. just display it somewhere? Popup?
    let addy = this.state.bitcoinAccounts.filter((addy) => {
      return addy.id == id
    })

    if(addy && addy.length > 0) {
      this.optionsClosed();
      this.setState({viewAddress: addy[0], viewOpen: true})
    } else {
      //something went wrong
    }
  },

  handleViewClose() {
    this.setState({ viewOpen: false });
  },

  handleViewTokens(account) {
    this.optionsClosed();
    this.setState({ viewTokensOpen: true, viewTokens: account.tokens, viewTokensAccount: account.address });
  },

  viewTokensClose() {
    this.setState({ viewTokensOpen: false });
  },

  toggleViewClicked() {
    this.setState({ viewMode: this.state.viewMode === 'Grid' ? 'List' : 'Grid'})
  },

});

function decrypt(text, seed) {
  var decipher = crypto.createDecipher("aes-256-cbc", seed);
  var dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

export default Accounts;
