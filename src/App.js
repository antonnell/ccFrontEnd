import React, { Component } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import MomentUtils from '@date-io/moment';
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import Context from './context/Context';

import curveTheme from './theme';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';

import Welcome from './containers/welcome.jsx';
import Accounts from './containers/accounts.jsx';
import Contacts from './containers/contacts.jsx';
import SetUsername from './containers/setUsername.jsx';
import Settings from './containers/settings.jsx';
import Pooling from './containers/Pooling/index';
import Transact from './containers/transact';
import TokenSwap from './containers/tokenSwap.jsx';

import PoolCreate from './containers/PoolCreate/index';
import PageLoader from './components/pageLoader';
import WhitelistCreate from './containers/WhitelistCreate';
import AppDialog from './containers/AppDialog/AppDialog';
import PoolBrowse from './containers/PoolBrowse/index';
import PoolDetails from './containers/PoolDetails/PoolDetails';
import AppSnackBar from './containers/AppSnackBar/AppSnackBar';
import VerifyAccount from './containers/VerifyAccount/VerifyAccount';

import Staking from './containers/staking';

import { poolingEmitter, poolingDispatcher } from './store/poolingStore';
import PoolNoWallet from "./components/PoolNoWallet";

let accountEmitter = require("./store/accountStore.js").default.emitter;
let accountDispatcher = require("./store/accountStore.js").default.dispatcher;

let contactsEmitter = require("./store/contactsStore.js").default.emitter;
let contactsDispatcher = require("./store/contactsStore.js").default.dispatcher;
let contactsStore = require("./store/contactsStore.js").default.store;

let ethEmitter = require("./store/ethStore.js").default.emitter;
let ethDispatcher = require("./store/ethStore.js").default.dispatcher;
let ethStore = require("./store/ethStore.js").default.store;

let wanEmitter = require("./store/wanStore.js").default.emitter;
let wanDispatcher = require("./store/wanStore.js").default.dispatcher;
let wanStore = require("./store/wanStore.js").default.store;

let aionEmitter = require("./store/aionStore.js").default.emitter;
let aionDispatcher = require('./store/aionStore.js').default.dispatcher;
let aionStore = require("./store/aionStore.js").default.store;

let tezosEmitter = require("./store/tezosStore.js").default.emitter;
let tezosDispatcher = require('./store/tezosStore.js').default.dispatcher;
let tezosStore = require("./store/tezosStore.js").default.store;

let bitcoinEmitter = require('./store/bitcoinStore.js').default.emitter;
let bitcoinDispatcher = require('./store/bitcoinStore.js').default.dispatcher;
let bitcoinStore = require("./store/bitcoinStore.js").default.store;

let binanceEmitter = require("./store/binanceStore.js").default.emitter;
let binanceDispatcher = require('./store/binanceStore.js').default.dispatcher;
let binanceStore = require("./store/binanceStore.js").default.store;

let stakingDispatcher = require("./store/stakingStore.js").default.dispatcher;
let stakingStore = require("./store/stakingStore.js").default.store;

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
    contacts: null,
    uriParameters: {},
    verificationSearching: false,
    myPools: null,
    currentTheme: setInitialTheme(),
    theme: curveTheme[setInitialTheme()],
    transactOpen: false,
    transactCurrency: null,
    transactContact: null,
    transactAccount: null,
    stakeOpen: false,
    stakingCurrency: null,
  };

  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.locationHashChanged = this.locationHashChanged.bind(this);
    this.changeTheme = this.changeTheme.bind(this);

    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);

    this.transactClicked = this.transactClicked.bind(this);
    this.transactClosed = this.transactClosed.bind(this);
    this.stakeClicked = this.stakeClicked.bind(this);
    this.addStakeClosed = this.addStakeClosed.bind(this);

    this.contactsRefreshed = this.contactsRefreshed.bind(this);
    this.ethAccountsRefreshed = this.ethAccountsRefreshed.bind(this);
    this.wanAccountsRefreshed = this.wanAccountsRefreshed.bind(this);

    this.verificationResultReturned = this.verificationResultReturned.bind(this);
    this.getEtherPoolsReturned = this.getEtherPoolsReturned.bind(this);
    this.getAvailableFundingPoolsReturned = this.getAvailableFundingPoolsReturned.bind(this);

    this.getSupportedWRC20TokensReturned = this.getSupportedWRC20TokensReturned.bind(this);
    this.getSupportedERC20TokensReturned = this.getSupportedERC20TokensReturned.bind(this);
  }

  contactsRefreshed() {
    this.setState({ contacts: contactsStore.getStore('contacts') })
  }

  ethAccountsRefreshed() {
    this.setState({ ethAddresses: ethStore.getStore('accounts') })
  }

  wanAccountsRefreshed() {
    this.setState({ wanAddresses: wanStore.getStore('accounts') })
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
        "verifyAccount"
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
    tezosEmitter.removeAllListeners('Unauthorised');
    bitcoinEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('verificationResult');
    poolingEmitter.removeAllListeners('getAvailableFundingPools');
    binanceEmitter.removeAllListeners('Unauthorised');

    contactsEmitter.on('Unauthorised', this.logUserOut);
    ethEmitter.on('Unauthorised', this.logUserOut);
    wanEmitter.on('Unauthorised', this.logUserOut);
    aionEmitter.on('Unauthorised', this.logUserOut);
    tezosEmitter.on('Unauthorised', this.logUserOut);
    bitcoinEmitter.on('Unauthorised', this.logUserOut);
    accountEmitter.on('Unauthorised', this.logUserOut);
    poolingEmitter.on('Unauthorised', this.logUserOut);
    binanceEmitter.on('Unauthorised', this.logUserOut);

    contactsEmitter.on('contactsUpdated', this.contactsRefreshed);
    accountEmitter.on('verificationResult', this.verificationResultReturned);
    wanEmitter.on("appAccountsUpdated", this.wanAccountsRefreshed);
    ethEmitter.on('appAccountsUpdated', this.ethAccountsRefreshed);

    poolingEmitter.on('getEtherPools', this.getEtherPoolsReturned);
    poolingEmitter.on( "getAvailableFundingPools", this.getAvailableFundingPoolsReturned);

    ethEmitter.on('getSupportedERC20Tokens', this.getSupportedERC20TokensReturned)
    wanEmitter.on('getSupportedWRC20Tokens', this.getSupportedWRC20TokensReturned)

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    window.onhashchange = this.locationHashChanged;
    this.locationHashChanged();

    if (this.state.user) {
      let content = {};
      if ( this.state.user.verificationResult !== "complete" && this.state.verificationSearching === false) {
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

  getSupportedERC20TokensReturned() {
    this.setState({ supportedERC20Tokens: ethStore.getStore('supportedERC20Tokens') })
  }

  getSupportedWRC20TokensReturned() {
    this.setState({ supportedWRC20Tokens: wanStore.getStore('supportedWRC20Tokens') })
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
    this.resetStores()
    sessionStorage.removeItem("cc_user");
    window.location.hash = "welcome";
  };

  resetStores() {
    aionStore.setStore({
      accounts: null,
      accountsCombined: null
    })
    binanceStore.setStore({
      accounts: null,
      accountsCombined: null
    })
    bitcoinStore.setStore({
      accounts: null,
      accountsCombined: null
    })
    ethStore.setStore({
      accounts: null,
      accountsCombined: null,
      erc20Accounts: null,
      erc20AccountsCombined: null
    })
    tezosStore.setStore({
      accounts: null,
      accountsCombined: null
    })
    wanStore.setStore({
      accounts: null,
      accountsCombined: null,
      wrc20Accounts: null,
      wrc20AccountsCombined: null
    })
    stakingStore.setStore({
      stakeableCurrencies: [],
      stakingNodes: [],
      userStakes: null,
      rewardHistory: [],
      transactionHistory: []
    })
  }

  setUser(user) {
    this.setState({ user });
    sessionStorage.setItem("cc_user", JSON.stringify(user));
    this.getUserDetails(user);
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
      });
    }

    if (
      ![
        "welcome",
        "resetPassword",
        "verifyAccount"
      ].includes(currentScreen)
    ) {
      if (this.state.user == null) {
        return (window.location.hash = "welcome");
      }
    }

    if (this.state.user) {
      var content = {};
      const path = currentScreen.split('/')[0];

      if (['accounts', 'aionAccounts', 'binanceAccounts', 'bitcoinAccounts', 'ethAccounts', 'tezosAccounts', 'wanAccounts', 'staking'].includes(path) ) {
        content = { id: this.state.user.id };
        contactsDispatcher.dispatch({
          type: "getContacts",
          content,
          token: this.state.user.token
        });

        stakingDispatcher.dispatch({
          type: 'getStakeableCurrencies',
          content,
          token: this.state.user.token
        });

        this.getAllAccounts()

        if(['accounts', 'ethAccounts', 'wanAccounts'].includes(path)) {
          ethDispatcher.dispatch({
            type: "getSupportedERC20Tokens",
            content: {},
            token: this.state.user.token
          });

          wanDispatcher.dispatch({
            type: "getSupportedWRC20Tokens",
            content: {},
            token: this.state.user.token
          });
        }

      } else if (path === 'contacts') {
        content = { id: this.state.user.id };
        contactsDispatcher.dispatch({
          type: "getContacts",
          content,
          token: this.state.user.token
        });

        this.getAllAccounts()
      } else if (['poolDetails', 'updatePool', 'createPool', 'pooling', 'browsePools'].includes(path)) {
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

      if ( this.state.user.verificationResult !== "complete" && this.state.verificationSearching === false ) {
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

  getAllAccounts() {
    const { user } = this.state;
    const content = { id: user.id };

    aionDispatcher.dispatch({
      type: 'getAionAddress',
      content,
      token: user.token
    });
    binanceDispatcher.dispatch({
      type: 'getBinanceAddress',
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
          logUserOut={ this.logUserOut }
        />
      );
    }
    return drawer;
  }

  renderTransact() {
    const { transactOpen, transactCurrency, transactContact, transactAccount, theme, user, supportedERC20Tokens, supportedWRC20Tokens } = this.state

    return <Transact
      user={ user }
      theme={ theme }
      isOpen={ transactOpen }
      transactClosed= { this.transactClosed }
      transactCurrency={ transactCurrency }
      transactContact={ transactContact }
      transactAccount={ transactAccount }
      supportedERC20Tokens={ supportedERC20Tokens }
      supportedWRC20Tokens={ supportedWRC20Tokens }
    />
  }

  transactClicked(token, contact, account) {
    this.setState({ transactOpen: true, transactCurrency: token, transactContact: contact, transactAccount: (account ? account.address: null) })
  }

  transactClosed() {
    this.setState({ transactOpen: false})
  }

  stakeClicked(account) {
    this.setState({ stakingCurrency: account.symbol, stakeOpen: true })
    window.location.hash = "staking"
  }

  addStakeClosed() {
    this.setState({ stakingCurrency: null, stakeOpen: false })
  }

  render() {
    let background = "#f9f7f9";
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
                  width: ["xs", "sm"].includes(this.state.size) ? '100vw' : this.state.size === "md" ? 'calc(100vw - 325px)' : 'calc(100vw - 402px)',
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
            { this.state.transactOpen && this.renderTransact() }
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </Context>
    );
  }

  renderScreen() {
    const { ethAddresses, wanAddresses, currentScreen } = this.state;
    const path = currentScreen.split('/')[0];
    const params = currentScreen.split('/')[1] || null;

    switch (path) {
      case "welcome":
        return <Welcome setUser={ this.setUser } theme={ this.state.theme } />;
      case "verifyAccount":
        const { uriParameters: { token, code } } = this.state;
        return <VerifyAccount token={ token } code={ code } />;
      case "setUsername":
        return <SetUsername user={ this.state.user } setUser={ this.setUser } />;
      case "resetPassword":
        return <Welcome setUser={ this.setUser } theme={ this.state.theme } initialScreen='resetPassword' uriParameters={ this.state.uriParameters } />;
      case "accounts":
        return ( <Accounts theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case "ethAccounts":
        return ( <Accounts token="Ethereum" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case "wanAccounts":
        return ( <Accounts token="Wanchain" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case "aionAccounts":
        return ( <Accounts token="Aion" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case "tezosAccounts":
        return ( <Accounts token="Tezos" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case 'binanceAccounts':
        return ( <Accounts token="Binance" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case 'bitcoinAccounts':
        return ( <Accounts token="Bitcoin" theme={ this.state.theme } size={ this.state.size } user={ this.state.user } transactOpen={ this.state.transactOpen } transactClosed={ this.transactClosed } transactClicked={ this.transactClicked } transactCurrency={ this.state.transactCurrency } stakeClicked={ this.stakeClicked } /> )
      case 'contacts':
        return (
          <Contacts
            theme={ this.state.theme }
            user={ this.state.user }
            contacts={ this.state.contacts }
            transactClicked={ this.transactClicked }
            size={ this.state.size }
          />
        );
      case 'tokenSwap':
        return (
          <TokenSwap
            theme={ this.state.theme }
            user={ this.state.user }
          />
        );
      case 'pooling':
        return (ethAddresses !== undefined && wanAddresses !== undefined ) ?
          (ethAddresses.length === 0 && wanAddresses.length === 0)?
            <PoolNoWallet />:
          <Pooling
            user={ this.state.user }
            theme={ this.state.theme } /> : <PageLoader />;
      case "createPool":
      case "updatePool":
        return (ethAddresses !== undefined && wanAddresses !== undefined ) ?
          (ethAddresses.length === 0 && wanAddresses.length === 0)?
            <PoolNoWallet />:
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
        return (ethAddresses !== undefined && wanAddresses !== undefined ) ?
          (ethAddresses.length === 0 && wanAddresses.length === 0)?
            <PoolNoWallet />:
          <WhitelistCreate
            // theme={this.state.theme}
            // user={this.state.user}
            id={ params }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "browsePools":
        return (ethAddresses !== undefined && wanAddresses !== undefined ) ?
          (ethAddresses.length === 0 && wanAddresses.length === 0)?
          <PoolNoWallet />:
          <PoolBrowse
            user={ this.state.user }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
      case "poolDetails":
        return (ethAddresses !== undefined && wanAddresses !== undefined ) ?
          (ethAddresses.length === 0 && wanAddresses.length === 0)?
            <PoolNoWallet />:
          <PoolDetails
            id={ params }
            user={ this.state.user }
            ethAddresses={ this.state.ethAddresses }
            wanAddresses={ this.state.wanAddresses }
            theme={ this.state.theme }
          /> : <PageLoader />;
        case "staking":
          return (
            <Staking
              size={ this.state.size }
              theme={ this.state.theme }
              user={ this.state.user }
              stakeOpen={ this.state.stakeOpen }
              stakingCurrency={ this.state.stakingCurrency }
              addStakeClosed={ this.addStakeClosed }
            />
        );
      case "settings":
        return (
          <Settings
            theme={ this.state.theme }
            user={ this.state.user }
            setUser={ this.setUser }
            changeTheme={ this.changeTheme }
          />
        );
      case "logOut":
        return <Welcome setUser={ this.setUser } />;
      default:
        return <Welcome setUser={ this.setUser } />;
    }
  }
}

export default App;
