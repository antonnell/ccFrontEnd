import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import MomentUtils from '@date-io/moment';
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import Context from './context/Context';

import curveTheme from './theme';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';

import Welcome from './containers/welcome.jsx';
import CreateEth from './containers/createEth.jsx';
import CreateWan from './containers/createWan.jsx';
import CreateAion from './containers/createAion.jsx';
import CreateBitcoin from './containers/createBitcoin.jsx';
import EthAccounts from './containers/ethAccounts.jsx';
import WanAccounts from './containers/wanAccounts.jsx';
import AionAccounts from './containers/aionAccounts.jsx';
import BitcoinAccounts from './containers/bitcoinAccounts.jsx';
import Contacts from './containers/contacts.jsx';
import SendEthereum from './containers/sendEthereum.jsx';
import SendERC20 from './containers/sendERC20.jsx';
import SendWanchain from './containers/sendWanchain.jsx';
import SendWRC20 from './containers/sendWRC20.jsx';
import SendAion from './containers/sendAion.jsx';
import SendBitcoin from './containers/sendBitcoin.jsx';
import SetUsername from './containers/setUsername.jsx';
import Settings from './containers/settings.jsx';
import Pooling from './containers/Pooling/index';

import PoolCreate from './containers/PoolCreate/index';
import PageLoader from './components/pageLoader';
import WhitelistCreate from './containers/WhitelistCreate';
import AppDialog from './containers/AppDialog/AppDialog';
import PoolBrowse from './containers/PoolBrowse/index';
import PoolDetails from './containers/PoolDetails/PoolDetails';
import AppSnackBar from './containers/AppSnackBar/AppSnackBar';
import VerifyAccount from './containers/VerifyAccount/VerifyAccount';

import { poolingEmitter, poolingDispatcher } from './store/poolingStore';

let accountEmitter = require("./store/accountStore.js").default.emitter;
let accountDispatcher = require("./store/accountStore.js").default.dispatcher;

let contactsEmitter = require("./store/contactsStore.js").default.emitter;
let contactsDispatcher = require("./store/contactsStore.js").default.dispatcher;

let ethEmitter = require("./store/ethStore.js").default.emitter;
let ethDispatcher = require("./store/ethStore.js").default.dispatcher;

let wanEmitter = require("./store/wanStore.js").default.emitter;
let wanDispatcher = require("./store/wanStore.js").default.dispatcher;

let aionEmitter = require("./store/aionStore.js").default.emitter;
let aionDispatcher = require("./store/aionStore.js").default.dispatcher;

let bitcoinEmitter = require('./store/bitcoinStore.js').default.emitter;
let bitcoinDispatcher = require('./store/bitcoinStore.js').default.dispatcher;

const setInitialUser = () => {
  const userString = sessionStorage.getItem("cc_user");
  return userString !== null ? JSON.parse(userString) : null;
};

const setInitialTheme = () => {
  let themeString = localStorage.getItem("cc_theme");
  return themeString !== null ? themeString : "light";
};

class App extends Component {
  state = {
    drawerOpen: false,
    user: setInitialUser(),
    addresses: null,
    ethAddresses: null,
    wanAddresses: null,
    aionAddresses: null,
    bitcoinAddresses: null,
    contacts: null,
    uriParameters: {},
    ipValid: false,
    ipLoading: true,
    rejectionReason: "",
    erc20Tokens: null,
    wrc20Tokens: null,
    verificationSearching: false,
    ethTransactions: null,
    wanTransactions: null,
    aionTransactions: null,
    bitcoinTransactions: null,
    myPools: null,
    currentTheme: setInitialTheme(),
    theme: curveTheme[setInitialTheme()],
    ethWalletChecked: false,
    wanWalletChecked: false,
    aionWalletChecked: false,
    bitcoinWalletChecked: false
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.locationHashChanged = this.locationHashChanged.bind(this);

    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.openSendEther = this.openSendEther.bind(this);
    this.openSendERC = this.openSendERC.bind(this);
    this.openSendWanchain = this.openSendWanchain.bind(this);
    this.openSendWRC = this.openSendWRC.bind(this);
    this.openSendAion = this.openSendAion.bind(this);
    this.openSendBitcoin = this.openSendBitcoin.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);

    this.getEthAddressReturned = this.getEthAddressReturned.bind(this);
    this.getWanAddressReturned = this.getWanAddressReturned.bind(this);
    this.getAionAddressReturned = this.getAionAddressReturned.bind(this);
    this.getBitcoinAddressReturned = this.getBitcoinAddressReturned.bind(this);
    this.getContactsReturned = this.getContactsReturned.bind(this);

    this.getERC20AddressReturned = this.getERC20AddressReturned.bind(this);
    this.getWRC20AddressReturned = this.getWRC20AddressReturned.bind(this);
    this.getSupportedERC20TokensReturned = this.getSupportedERC20TokensReturned.bind(
      this
    );
    this.getSupportedWRC20TokensReturned = this.getSupportedWRC20TokensReturned.bind(
      this
    );

    this.verificationResultReturned = this.verificationResultReturned.bind(
      this
    );
    this.getEthTransactionHistoryReturned = this.getEthTransactionHistoryReturned.bind(
      this
    );
    this.getWanTransactionHistoryReturned = this.getWanTransactionHistoryReturned.bind(
      this
    );
    this.getAionTransactionHistoryReturned = this.getAionTransactionHistoryReturned.bind(
      this
    );
    this.getBitcoinWalletDetailsReturned = this.getBitcoinWalletDetailsReturned.bind(
      this
    );
    this.getBitcoinTransactionHistoryReturned = this.getBitcoinTransactionHistoryReturned.bind(
      this
    );

    this.getEtherPoolsReturned = this.getEtherPoolsReturned.bind(this);
    this.getAvailableFundingPoolsReturned = this.getAvailableFundingPoolsReturned.bind(
      this
    );

    this.changeTheme = this.changeTheme.bind(this);
  }

  verificationResultReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      let user = this.state.user;

      if (
        user.verificationResult !== data.verificationResult ||
        user.verificationUrl !== data.verificationUrl
      ) {
        user.verificationResult = data.verificationResult;
        user.verificationUrl = data.verificationUrl;

        this.setUser(user);
      }

      if (user.verificationResult !== "complete" && user) {
        setTimeout(() => {
          accountDispatcher.dispatch({
            type: "verificationResult",
            content: { userId: user.id },
            token: user.token
          });
        }, 300000);
      }
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getEthTransactionHistoryReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ ethTransactions: data.transactions });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getWanTransactionHistoryReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ wanTransactions: data.transactions });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getAionTransactionHistoryReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ aionTransactions: data.transactions });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getBitcoinTransactionHistoryReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ bitcoinTransactions: data.transactions });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getBitcoinWalletDetailsReturned(error, data, walletId) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      let bitcoinAddresses = this.state.bitcoinAddresses

      bitcoinAddresses.map((address) => {
        if(address.id === walletId) {
          address.addresses = data.addresses
        }

        return address
      })

      this.setState({bitcoinAddresses})
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  componentWillMount() {
    ReactGA.initialize("UA-106832873-2", { cookieDomain: "auto" });

    var user = null;
    var userString = sessionStorage.getItem("cc_user");
    if (userString) {
      user = JSON.parse(userString);
      this.setUser(user);
    }

    var currentScreen = window.location.hash.substring(1);
    var paramsIndex = window.location.hash.indexOf("?");
    if (paramsIndex > -1) {
      currentScreen = window.location.hash.substring(1, paramsIndex);
    }
    if (
      ![
        "welcome",
        "resetPassword",
        "verifyAccount",
      ].includes(currentScreen)
    ) {
      if (user == null) {
        window.location.hash = "welcome";
      }
    }

    window.removeEventListener('resize', this.updateWindowDimensions);
    contactsEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('Unauthorised');
    wanEmitter.removeAllListeners('Unauthorised');
    aionEmitter.removeAllListeners('Unauthorised');
    bitcoinEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('getEthAddress');
    wanEmitter.removeAllListeners('getWanAddress');
    aionEmitter.removeAllListeners('getAionAddress');
    bitcoinEmitter.removeAllListeners('getBitcoinAddress');
    contactsEmitter.removeAllListeners('getContacts');
    ethEmitter.removeAllListeners('getSupportedERC20Tokens');
    wanEmitter.removeAllListeners('getSupportedWRC20Tokens');
    // crowdsaleEmitter.removeAllListeners('getCrowdSales');
    // crowdsaleEmitter.removeAllListeners('getUserCrowdSaleContributions');
    accountEmitter.removeAllListeners('verificationResult');
    ethEmitter.removeAllListeners('getEthTransactionHistory');
    wanEmitter.removeAllListeners('getWanTransactionHistory');
    aionEmitter.removeAllListeners('getAionTransactionHistory');
    bitcoinEmitter.removeAllListeners('getBitcoinTransactionHistory');
    bitcoinEmitter.removeAllListeners('getBitcoinWalletDetails');
    // TODO: Removed the listener for getEtherPools remover
    // poolingEmitter.removeAllListeners("getEtherPools");
    // TODO: Removed the listener for getAvailableEtherPools remover
    //poolingEmitter.removeAllListeners("getAvailableEtherPools");
    poolingEmitter.removeAllListeners('getAvailableFundingPools');

    contactsEmitter.on('Unauthorised', this.logUserOut);
    ethEmitter.on('Unauthorised', this.logUserOut);
    wanEmitter.on('Unauthorised', this.logUserOut);
    aionEmitter.on('Unauthorised', this.logUserOut);
    bitcoinEmitter.on('Unauthorised', this.logUserOut);
    accountEmitter.on('Unauthorised', this.logUserOut);
    poolingEmitter.on('Unauthorised', this.logUserOut);

    ethEmitter.on('getEthAddress', this.getEthAddressReturned);
    ethEmitter.on('getERC20Address', this.getERC20AddressReturned);
    wanEmitter.on('getWanAddress', this.getWanAddressReturned);
    wanEmitter.on('getWRC20Address', this.getWRC20AddressReturned);
    aionEmitter.on('getAionAddress', this.getAionAddressReturned);
    bitcoinEmitter.on('getBitcoinAddress', this.getBitcoinAddressReturned);
    contactsEmitter.on('getContacts', this.getContactsReturned);
    ethEmitter.on(
      "getSupportedERC20Tokens",
      this.getSupportedERC20TokensReturned
    );
    wanEmitter.on(
      "getSupportedWRC20Tokens",
      this.getSupportedWRC20TokensReturned
    );

    accountEmitter.on('verificationResult', this.verificationResultReturned);
    ethEmitter.on(
      "getEthTransactionHistory",
      this.getEthTransactionHistoryReturned
    );
    wanEmitter.on(
      "getWanTransactionHistory",
      this.getWanTransactionHistoryReturned
    );
    aionEmitter.on(
      "getAionTransactionHistory",
      this.getAionTransactionHistoryReturned
    );
    bitcoinEmitter.on(
      'getBitcoinTransactionHistory',
      this.getBitcoinTransactionHistoryReturned
    );
    bitcoinEmitter.on(
      'getBitcoinWalletDetails',
      this.getBitcoinWalletDetailsReturned
    );
    poolingEmitter.on('getEtherPools', this.getEtherPoolsReturned);
    poolingEmitter.on(
      "getAvailableFundingPools",
      this.getAvailableFundingPoolsReturned
    );
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    window.onhashchange = this.locationHashChanged;
    this.locationHashChanged();

    if (this.state.user) {
      let content = {};

      if (this.state.erc20Tokens == null || this.state.wrc20Tokens == null) {
        ethDispatcher.dispatch({
          type: "getSupportedERC20Tokens",
          content,
          token: this.state.user.token
        });
        wanDispatcher.dispatch({
          type: "getSupportedWRC20Tokens",
          content,
          token: this.state.user.token
        });
      }

      if (
        this.state.user.verificationResult !== "complete" &&
        this.state.verificationSearching === false
      ) {
        this.setState({ verificationSearching: true });
        accountDispatcher.dispatch({
          type: "verificationResult",
          content: { userId: this.state.user.id },
          token: this.state.user.token
        });
      }

      content = { id: user.id };
      accountDispatcher.dispatch({
        type: "generate2faKey",
        content,
        token: user.token
      });
    }
  }

  getSupportedERC20TokensReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ erc20Tokens: data.tokens });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getSupportedWRC20TokensReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ wrc20Tokens: data.tokens });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  }

  getUserDetails = user => {
    if (user) {
      const content = { id: user.id };

      poolingDispatcher.dispatch({
        type: "getAvailableFundingPools",
        content,
        token: user.token
      });
    }
  };

  getEtherPoolsReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ myPools: data.etherPools });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, contacts: [] });
    } else {
      this.setState({ error: data.statusText, contacts: [] });
    }
  }

  getAvailableFundingPoolsReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }
    data = null;
    // if (data.success) {
    //   this.setState({ availablePools: data.etherPools });
    // } else if (data.errorMsg) {
    //   this.setState({ error: data.errorMsg, contacts: [] });
    // } else {
    //   this.setState({ error: data.statusText, contacts: [] });
    // }
  }

  getEthAddressReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      if (data.ethAddresses.length === 0 && !this.state.ethWalletChecked && window.location.hash === "#ethAccounts") {
        this.setState({ ethWalletChecked: true })
        window.location.hash = 'createEth';
        return;
      }
      this.setState({ ethAddresses: data.ethAddresses });
      //map through the eth addresses and get their ERC20 addresses.
      data.ethAddresses.map(address => {
        let content = { address: address.address };

        return ethDispatcher.dispatch({
          type: "getERC20Address",
          content,
          token: this.state.user.token
        });
      });

    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, ethAddresses: [] });
    } else {
      this.setState({ error: data.statusText, ethAddresses: [] });
    }
  }

  getERC20AddressReturned(error, data, publicAddress) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      //add the ERC20 addresses as a child of the eth address
      let ethAddresses = this.state.ethAddresses.map(address => {
        if (address.address === publicAddress) {
          address.erc20Tokens = data.tokens;
          return address;
        }

        return address;
      });

      if (ethAddresses.length > 0) {
        //save it to state
        this.setState({ ethAddresses });
      } else {
        //hmmmmm?
      }
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, wanAddresses: [] });
    } else {
      this.setState({ error: data.statusText, wanAddresses: [] });
    }
  }

  getWanAddressReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {

      if (data.wanAddresses.length === 0 && !this.state.wanWalletChecked && window.location.hash === "#wanAccounts") {
        this.setState({ wanWalletChecked: true })
        window.location.hash = 'createWan';
        return;
      }
      this.setState({ wanAddresses: data.wanAddresses });

      //map through the eth addresses and get their ERC20 addresses.
      data.wanAddresses.map(address => {
        let content = { address: address.publicAddress };

        return wanDispatcher.dispatch({
          type: "getWRC20Address",
          content,
          token: this.state.user.token
        });
      });

    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, wanAddresses: [] });
    } else {
      this.setState({ error: data.statusText, wanAddresses: [] });
    }
  }

  getWRC20AddressReturned(error, data, publicAddress) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      //add the WRC20 addresses as a child of the wan address
      let wanAddresses = this.state.wanAddresses.map(address => {
        if (address.publicAddress === publicAddress) {
          address.wrc20Tokens = data.tokens;
          return address;
        }

        return address;
      });

      if (wanAddresses.length > 0) {
        //save it to state
        this.setState({ wanAddresses });
      } else {
        //hmmmmm?
      }
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, wanAddresses: [] });
    } else {
      this.setState({ error: data.statusText, wanAddresses: [] });
    }
  }

  getAionAddressReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {

      if (data.aionAddresses.length === 0 && !this.state.aionWalletChecked && window.location.hash === "#aionAccounts") {
        this.setState({ aionWalletChecked: true })
        window.location.hash = 'createAion';
        return;
      }
      this.setState({ aionAddresses: data.aionAddresses });

    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, aionAddresses: [] });
    } else {
      this.setState({ error: data.statusText, aionAddresses: [] });
    }
  }

  getBitcoinAddressReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      if (data.wallets.length === 0 && !this.state.bitcoinWalletChecked && window.location.hash === "#bitcoinAccounts") {
        this.setState({ bitcoinWalletChecked: true })
        window.location.hash = 'createBitcoin';
        return;
      }
      this.setState({ bitcoinAddresses: data.wallets });

      var user = this.state.user;

      data.wallets.map((wallet) => {
        let content = { id: wallet.id }
        bitcoinDispatcher.dispatch({
          type: 'getBitcoinWalletDetails',
          content,
          token: user.token
        });

        return null
      })

    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, bitcoinAddresses: [] });
    } else {
      this.setState({ error: data.statusText, bitcoinAddresses: [] });
    }
  }

  getContactsReturned(error, data) {
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      this.setState({ contacts: data.contacts });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, contacts: [] });
    } else {
      this.setState({ error: data.statusText, contacts: [] });
    }
  }

  updateWindowDimensions() {
    var size = "xl";
    if (window.innerWidth < 600) {
      size = "xs";
    } else if (window.innerWidth < 960) {
      size = "sm";
    } else if (window.innerWidth < 1280) {
      size = "md";
    } else  if (window.innerWidth < 1920) {
      size = "lg";
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      size
    });
  }

  closeDrawer() {
    this.setState({ drawerOpen: false });
  }

  openDrawer() {
    this.setState({ drawerOpen: true });
  }

  navClicked(event, currentScreen) {
    this.setState({ drawerOpen: false });
    window.location.hash = currentScreen;
  }

  logUserOut = () => {
    sessionStorage.removeItem("cc_user");
    window.location.hash = "welcome";
  };

  setUser(user) {
    this.setState({ user });
    sessionStorage.setItem("cc_user", JSON.stringify(user));
    this.getUserDetails(user);
  }

  openSendEther(sendEtherContact, sendEtherAccount) {
    this.setState({ sendEtherContact, sendEtherAccount });
    window.location.hash = "sendEthereum";
  }

  openSendERC(sendERC20Symbol, sendERC20Account) {
    this.setState({ sendERC20Symbol, sendERC20Account });
    window.location.hash = "sendERC20";
  }

  openSendWanchain(sendWanchainContact, sendWanchainAccount) {
    this.setState({ sendWanchainContact, sendWanchainAccount });
    window.location.hash = "sendWanchain";
  }

  openSendWRC(sendWRC20Symbol, sendWRC20Account) {
    this.setState({ sendWRC20Symbol, sendWRC20Account });
    window.location.hash = "sendWRC20";
  }

  openSendAion(sendAionContact, sendAionAccount) {
    this.setState({ sendAionContact, sendAionAccount });
    window.location.hash = "sendAion";
  }

  openSendBitcoin(sendBitcoinContact, sendBitcoinAccount) {
    this.setState({ sendBitcoinContact, sendBitcoinAccount });
    window.location.hash = 'sendBitcoin';
  }

  changeTheme() {
    let theme = this.state.currentTheme;

    this.setState({
      currentTheme: theme === "dark" ? "light" : "dark",
      theme: theme === "dark" ? curveTheme.light : curveTheme.dark
    });

    localStorage.setItem("cc_theme", theme === "dark" ? "light" : "dark");
  }

  locationHashChanged() {
    const uriParameters = {};
    var currentScreen = "";
    var paramsIndex = window.location.hash.indexOf("?");
    if (paramsIndex > -1) {
      var params = window.location.hash.substring(paramsIndex + 1);
      params.split("&").forEach(pair => {
        var arr = pair.split("=");
        var val = decodeURIComponent(arr[1]);
        if (val.indexOf("'>here</a") > -1) {
          val = val.substring(0, val.length - 9);
        }
        uriParameters[decodeURIComponent(arr[0])] = val;
      });
      currentScreen = window.location.hash.substring(1, paramsIndex);
    } else {
      currentScreen = window.location.hash.substring(1);
    }
    if (["", "welcome", "logOut"].includes(currentScreen)) {
      sessionStorage.removeItem("cc_user");

      this.setState({
        drawerOpen: false,
        user: null,
        contacts: null,
        addresses: null,
        ethAddresses: null,
        wanAddresses: null,
        aionAddresses: null,
        bitcoinAddresses: null,
        ethTransactions: null,
        wanTransactions: null,
        aionTransactions: null,
        bitcoinTransactions: null
      });
    }

    if (
      ![
        "welcome",
        "resetPassword",
        "verifyAccount",
      ].includes(currentScreen)
    ) {
      if (this.state.user == null) {
        return (window.location.hash = "welcome");
      }
    }

    if (this.state.user) {
      var content = {};
      if (currentScreen === "wanAccounts" || currentScreen === "sendWanchain" || currentScreen === "sendWRC20") {
        content = { id: this.state.user.id };
        wanDispatcher.dispatch({
          type: "getWanAddress",
          content,
          token: this.state.user.token
        });
        wanDispatcher.dispatch({
          type: "getWanTransactionHistory",
          content,
          token: this.state.user.token
        });
        contactsDispatcher.dispatch({
          type: 'getContacts',
          content,
          token: this.state.user.token
        });
      } else if (
        currentScreen === "ethAccounts" ||
        currentScreen === "sendEthereum" ||
        currentScreen === "sendERC20"
      ) {
        content = { id: this.state.user.id };
        ethDispatcher.dispatch({
          type: "getEthAddress",
          content,
          token: this.state.user.token
        });
        ethDispatcher.dispatch({
          type: "getEthTransactionHistory",
          content,
          token: this.state.user.token
        });
        contactsDispatcher.dispatch({
          type: 'getContacts',
          content,
          token: this.state.user.token
        });
      } else if (
        currentScreen === "aionAccounts" ||
        currentScreen === "sendAion"
      ) {
        content = { id: this.state.user.id };
        aionDispatcher.dispatch({
          type: "getAionAddress",
          content,
          token: this.state.user.token
        });
        aionDispatcher.dispatch({
          type: "getAionTransactionHistory",
          content,
          token: this.state.user.token
        });
        contactsDispatcher.dispatch({
          type: 'getContacts',
          content,
          token: this.state.user.token
        });
      } else if (
        currentScreen === 'bitcoinAccounts' ||
        currentScreen === 'sendBitcoin'
      ) {
        content = { id: this.state.user.id };
        bitcoinDispatcher.dispatch({
          type: 'getBitcoinAddress',
          content,
          token: this.state.user.token
        });
        bitcoinDispatcher.dispatch({
          type: 'getBitcoinTransactionHistory',
          content,
          token: this.state.user.token
        });
        contactsDispatcher.dispatch({
          type: 'getContacts',
          content,
          token: this.state.user.token
        });
      } else if (currentScreen === 'contacts') {
        content = { id: this.state.user.id };
        contactsDispatcher.dispatch({
          type: "getContacts",
          content,
          token: this.state.user.token
        });
      } else if (currentScreen === 'browsePools') {
        content = { id: this.state.user.id };
        wanDispatcher.dispatch({
          type: "getWanAddress",
          content,
          token: this.state.user.token
        });
        ethDispatcher.dispatch({
          type: "getEthAddress",
          content,
          token: this.state.user.token
        });
      }

      const path = currentScreen.split('/')[0];
      if (['poolDetails', 'updatePool', 'createPool', 'pooling'].includes(path)) {
        content = { id: this.state.user.id };
        if(this.state.ethAddresses == null) {
          ethDispatcher.dispatch({
            type: "getEthAddress",
            content,
            token: this.state.user.token
          });
        }
        if(this.state.wanAddresses == null) {
          wanDispatcher.dispatch({
            type: "getWanAddress",
            content,
            token: this.state.user.token
          });
        }
      }


      if (this.state.erc20Tokens == null || this.state.wrc20Tokens == null) {
        content = {};
        ethDispatcher.dispatch({
          type: "getSupportedERC20Tokens",
          content,
          token: this.state.user.token
        });
        wanDispatcher.dispatch({
          type: "getSupportedWRC20Tokens",
          content,
          token: this.state.user.token
        });
      }

      if (
        this.state.user.verificationResult !== "complete" &&
        this.state.verificationSearching === false
      ) {
        this.setState({ verificationSearching: true });
        accountDispatcher.dispatch({
          type: "verificationResult",
          content: { userId: this.state.user.id },
          token: this.state.user.token
        });
      }
    }

    ReactGA.set({ page: window.location.pathname + window.location.hash });
    ReactGA.pageview(window.location.pathname + window.location.hash);

    this.setState({ currentScreen, uriParameters });
  }

  renderAppBar() {
    var menuClicked = null;
    if (this.state.user != null) {
      menuClicked = this.openDrawer;
    }

    return (
      <TheAppBar
        menuClicked={ menuClicked }
        user={ this.state.user }
        size={ this.state.size }
        title={ this.state.title }
        theme={ this.state.theme }
      />
    );
  }

  renderDrawer() {
    var drawer = null;
    if (this.state.user != null) {
      drawer = (
        <AppDrawer
          navClicked={ this.navClicked }
          currentScreen={ this.state.currentScreen }
          closeDrawer={ this.closeDrawer }
          user={ this.state.user }
          open={ this.state.drawerOpen }
          size={ this.state.size }
          theme={ this.state.theme }
        />
      );
    }
    return drawer;
  }

  render() {
    let background = "#fff";
    let backgroundImage = null;
    if (this.state.currentTheme === "dark") {
      backgroundImage =
        "radial-gradient(farthest-corner at 20% 20%, #3d424b, 40%, #1a191d)";
    }

    const { currentScreen } = this.state;
    const path = currentScreen.split('/')[0];
    if(['welcome', 'resetPassword'].includes(path)) {
      return (
        <MuiThemeProvider theme={ createMuiTheme(this.state.theme.mui) }>
          <CssBaseline />
          { this.renderScreen() }
        </MuiThemeProvider>
      )
    }


    return (
      <Context>
        <MuiPickersUtilsProvider utils={ MomentUtils }>
          <MuiThemeProvider theme={ createMuiTheme(this.state.theme.mui) }>
            <CssBaseline />
            <div
              style={ {
                minHeight: '100%',
                display: "flex",
                padding:
                  this.state.size === "xs" || this.state.size === "sm"
                    ? "0px"
                    : this.state.theme.custom.page.padding,
                background: background,
                backgroundImage: backgroundImage
              } }
            >
              { this.renderDrawer() }
              <Grid
                container
                justify="space-around"
                alignItems="flex-start"
                direction="row"
                style={ {
                  minHeight: "924px",
                  position: "relative",
                  flex: 1,
                  marginLeft: ["xs", "sm"].includes(this.state.size) ? "0px" : this.state.size === "md" ? "24px" : "100px",
                  marginRight: ["xs", "sm"].includes(this.state.size) ? "0px" : '24px'
                } }
              >
                <Grid item xs={ 12 } style={ { flex: 1, height: "100%"  } }>
                  { this.state.user == null ? null : this.renderAppBar() }
                  <div style={ {
                      paddingLeft: ["xs", "sm"].includes(this.state.size) ? "24px" : "0px",
                      paddingRight: ["xs", "sm"].includes(this.state.size) ? "24px" : "0px"
                    } }
                  >
                    { this.renderScreen() }
                  </div>
                </Grid>
              </Grid>
            </div>
            <AppDialog />
            <AppSnackBar />
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </Context>
    );
  }

  renderScreen() {
    const { ethAddresses, wanAddresses, currentScreen, width } = this.state;
    const path = currentScreen.split('/')[0];
    const params = currentScreen.split('/')[1] || null;

    switch (path) {
      case "welcome":
        return <Welcome setUser={ this.setUser } theme={ this.state.theme } />;
      case "verifyAccount":
        const { uriParameters: { token, code } } = this.state;
        return <VerifyAccount token={ token } code={ code } />;
      case 'createEth':
        return <CreateEth user={ this.state.user } theme={ this.state.theme } />;
      case 'createWan':
        return <CreateWan user={ this.state.user } theme={ this.state.theme } />;
      case 'createAion':
        return <CreateAion user={ this.state.user } theme={ this.state.theme } />;
      case 'createBitcoin':
        return <CreateBitcoin user={ this.state.user } theme={ this.state.theme } />;
      case "setUsername":
        return <SetUsername user={ this.state.user } setUser={ this.setUser } />;
      case "resetPassword":
        return <Welcome setUser={ this.setUser } theme={ this.state.theme } initialScreen='resetPassword' uriParameters={ this.state.uriParameters } />;
      case "ethAccounts":
        return (
          <EthAccounts
            theme={ this.state.theme }
            user={ this.state.user }
            ethAddresses={ this.state.ethAddresses }
            openSendEther={ this.openSendEther }
            openSendERC={ this.openSendERC }
            ethTransactions={ this.state.ethTransactions }
            contacts={ this.state.contacts }
            size={ this.state.size }
          />
        );
      case "wanAccounts":
        return (
          <WanAccounts
            theme={ this.state.theme }
            user={ this.state.user }
            wanAddresses={ this.state.wanAddresses }
            openSendWanchain={ this.openSendWanchain }
            openSendWRC={ this.openSendWRC }
            crowdsales={ this.state.crowdsales }
            size={ this.state.size }
            wanTransactions={ this.state.wanTransactions }
            contacts={ this.state.contacts }
            width={ width }
          />
        );
      case "aionAccounts":
        return (
          <AionAccounts
            theme={ this.state.theme }
            user={ this.state.user }
            aionAddresses={ this.state.aionAddresses }
            openSendAion={ this.openSendAion }
            aionTransactions={ this.state.aionTransactions }
            contacts={ this.state.contacts }
            size={ this.state.size }
          />
        );
      case 'bitcoinAccounts':
        return (
          <BitcoinAccounts
            theme={ this.state.theme }
            user={ this.state.user }
            bitcoinAddresses={ this.state.bitcoinAddresses }
            openSendBitcoin={ this.openSendBitcoin }
            bitcoinTransactions={ this.state.bitcoinTransactions }
            contacts={ this.state.contacts }
            size={ this.state.size }
          />
        );
      case 'contacts':
        return (
          <Contacts
            theme={ this.state.theme }
            user={ this.state.user }
            contacts={ this.state.contacts }
            openSendEther={ this.openSendEther }
            openSendWanchain={ this.openSendWanchain }
            openSendAion={ this.openSendAion }
            openSendBitcoin={ this.openSendBitcoin }
            size={ this.state.size }
          />
        );
      case "sendEthereum":
        return (
          <SendEthereum
            user={ this.state.user }
            sendEtherContact={ this.state.sendEtherContact }
            sendEtherAccount={ this.state.sendEtherAccount }
            ethAddresses={ this.state.ethAddresses }
            size={ this.state.size }
            contacts={ this.state.contacts }
            theme={ this.state.theme }
          />
        );
      case "sendERC20":
        return (
          <SendERC20
            user={ this.state.user }
            sendERC20Symbol={ this.state.sendERC20Symbol }
            erc20Tokens={ this.state.erc20Tokens }
            sendERC20Contact={ this.state.sendERC20Contact }
            sendERC20Account={ this.state.sendERC20Account }
            ethAddresses={ this.state.ethAddresses }
            size={ this.state.size }
            contacts={ this.state.contacts }
            theme={ this.state.theme }
          />
        );
      case "sendWanchain":
        return (
          <SendWanchain
            user={ this.state.user }
            sendWanchainContact={ this.state.sendWanchainContact }
            sendWanchainAccount={ this.state.sendWanchainAccount }
            wanAddresses={ this.state.wanAddresses }
            size={ this.state.size }
            contacts={ this.state.contacts }
            theme={ this.state.theme }
          />
        );
      case 'sendWRC20':
        return (<SendWRC20
          user={this.state.user}
          sendWRC20Symbol={this.state.sendWRC20Symbol}
          wrc20Tokens={this.state.wrc20Tokens}
          sendWRC20Contact={this.state.sendWRC20Contact}
          sendWRC20Account={this.state.sendWRC20Account}
          wanAddresses={this.state.wanAddresses}
          size={this.state.size}
          contacts={this.state.contacts}
          theme={ this.state.theme }
          />
        );
      case "sendAion":
        return (
          <SendAion
            user={ this.state.user }
            sendAionContact={ this.state.sendAionContact }
            sendAionAccount={ this.state.sendAionAccount }
            aionAddresses={ this.state.aionAddresses }
            size={ this.state.size }
            contacts={ this.state.contacts }
            theme={ this.state.theme }
          />
        );
      case 'sendBitcoin':
        return (
          <SendBitcoin
            user={ this.state.user }
            sendBitcoinContact={ this.state.sendBitcoinContact }
            sendBitcoinAccount={ this.state.sendBitcoinAccount }
            bitcoinAddresses={ this.state.bitcoinAddresses }
            size={ this.state.size }
            contacts={ this.state.contacts }
            theme={ this.state.theme }
          />
        );
      case 'pooling':
        return (ethAddresses && ethAddresses.length && wanAddresses && wanAddresses.length) ?
          <Pooling
            user={ this.state.user }
            theme={ this.state.theme } /> : <PageLoader />;
      case "createPool":
      case "updatePool":
        return (ethAddresses && ethAddresses.length && wanAddresses && wanAddresses.length) ?
          <PoolCreate
            // theme={this.state.theme}
            user={ this.state.user }
            id={ params }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "createWhitelist":
      case "updateWhitelist":
        return (ethAddresses && ethAddresses.length && wanAddresses && wanAddresses.length) ?
          <WhitelistCreate
            // theme={this.state.theme}
            // user={this.state.user}
            id={ params }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "browsePools":
        return (ethAddresses && ethAddresses.length && wanAddresses && wanAddresses.length) ?
          <PoolBrowse
            user={ this.state.user }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "poolDetails":
        return (ethAddresses && ethAddresses.length && wanAddresses && wanAddresses.length) ?
          <PoolDetails
            id={ params }
            user={ this.state.user }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "settings":
        return (
          <Settings
            theme={ this.state.theme }
            user={ this.state.user }
            setUser={ this.setUser }
            changeTheme={ this.changeTheme }
          />
        )
      case "logOut":
        return <Welcome setUser={ this.setUser } />;
      default:
        return <Welcome setUser={ this.setUser } />;
    }
  }
}

export default App;
