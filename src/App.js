import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';
import AppFooter from './containers/footer.jsx';

import Welcome from './containers/welcome.jsx';
import RegisterAccount from './containers/registerAccount.jsx';
import CreateEth from './containers/createEth.jsx';
import CreateWan from './containers/createWan.jsx';
import CreateAion from './containers/createAion.jsx';
import KYC from './containers/kyc.jsx';
import ForgotPassword from './containers/forgotPassword.jsx';
import ForgotPasswordDone from './containers/forgotPasswordDone.jsx';
import ResetPassword from './containers/resetPassword.jsx';
//import Accounts from './containers/accounts.jsx';
import EthAccounts from './containers/ethAccounts.jsx';
import WanAccounts from './containers/wanAccounts.jsx';
import AionAccounts from './containers/aionAccounts.jsx';
import UpdatePassword from './containers/updatePassword.jsx';
import Manage2FA from './containers/manage2fa.jsx';
import Contacts from './containers/contacts.jsx';
import Whitelist from './containers/whitelist.jsx';
import SendEthereum from './containers/sendEthereum.jsx';
import SendERC20 from './containers/sendERC20.jsx';
import SendWanchain from './containers/sendWanchain.jsx';
import SendWRC20 from './containers/sendWRC20.jsx';
import SendAion from './containers/sendAion.jsx';
import WhitelistMe from './containers/whitelistMe.jsx';
import WhitelistMeDone from './containers/whitelistMeDone.jsx';
import WhitelistCheck from './containers/whitelistCheck.jsx';
import SetUsername from './containers/setUsername.jsx';

import WhitelistMeUnavailable from './components/whitelistMeUnavailable.jsx'
import ComingSoon from './components/comingSoon.jsx';
import PrivacyPolicy from './components/privacyPolicy.jsx';
import CookiePolicy from './components/cookiePolicy.jsx';
import TermsAndConditions from './components/termsAndConditions.jsx';
import ContactUs from './components/contactUs.jsx';
var sha256 = require('sha256');
var crypto = require('crypto');
var bip39 = require('bip39');


let accountEmitter = require('./store/accountStore.js').default.emitter
let accountDispatcher = require('./store/accountStore.js').default.dispatcher

let contactsEmitter = require('./store/contactsStore.js').default.emitter
let contactsDispatcher = require('./store/contactsStore.js').default.dispatcher

let ethEmitter = require('./store/ethStore.js').default.emitter
let ethDispatcher = require('./store/ethStore.js').default.dispatcher

let wanEmitter = require('./store/wanStore.js').default.emitter
let wanDispatcher = require('./store/wanStore.js').default.dispatcher

let aionEmitter = require('./store/aionStore.js').default.emitter
let aionDispatcher = require('./store/aionStore.js').default.dispatcher

let whitelistEmitter = require('./store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('./store/whitelistStore.js').default.dispatcher

let crowdsaleEmitter = require('./store/crowdsaleStore.js').default.emitter
let crowdsaleDispatcher = require('./store/crowdsaleStore.js').default.dispatcher

let emitter = require('./store/ipStore.js').default.emitter
let dispatcher = require('./store/ipStore.js').default.dispatcher

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&-active': {
          color: "#2ad4dc"
        }
      },
      active: {
        color: "#2ad4dc !important"
      },
      completed: {
        color: "#2ad4dc !important"
      }
    },
    MuiInput: {
      underline: {
        '&:before': { //underline color when textfield is inactive
          backgroundColor: 'black',
          height: '2px'
        },
        '&:hover:not($disabled):before': { //underline color when hovered
          backgroundColor: 'black',
          height: '2px'
        },
      }
    },
    MuiButton: {
      root: {
        transition: "1s ease",
        '&:hover:not($disabled)' : {
          backgroundColor: "#2ad4dc",
          color: 'black'
        }
      }
    }
  },
  typography: {
    // Use the system font over Roboto.
    fontFamily: 'Abel, sans-serif',
  },
  palette: {
    primary: {
      light: '#2c2c2c',
      main: '#000000',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#72ffff',
      main: '#2ad4dc',
      dark: '#00a2aa',
      contrastText: '#000000',
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    var userString = sessionStorage.getItem('cc_user')
    var user = null;
    if (userString != null) {
      user = JSON.parse(userString)
    }

    this.state = {
      drawerOpen: false,
      user: user,
      addresses: null,
      ethAddresses: null,
      wanAddresses: null,
      aionAddresses: null,
      contacts: null,
      // whitelistState: whitelistState,
      uriParameters: {},
      ipValid: false,
      ipLoading: true,
      rejectionReason: '',
      erc20Tokens: null,
      wrc20Tokens: null,
      crowdsales: null,
      verificationSearching: false
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.locationHashChanged = this.locationHashChanged.bind(this);

    this.setUser = this.setUser.bind(this);
    this.setWhitelistState = this.setWhitelistState.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.openSendEther = this.openSendEther.bind(this);
    this.openSendERC = this.openSendERC.bind(this);
    this.openSendWanchain = this.openSendWanchain.bind(this);
    this.openSendWRC = this.openSendWRC.bind(this);
    this.openSendAion = this.openSendAion.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);

    this.getEthAddressReturned = this.getEthAddressReturned.bind(this);
    this.getWanAddressReturned = this.getWanAddressReturned.bind(this);
    this.getAionAddressReturned = this.getAionAddressReturned.bind(this);
    this.getContactsReturned = this.getContactsReturned.bind(this);
    this.getWhitelistStateReturned = this.getWhitelistStateReturned.bind(this);

    this.getIpReturned = this.getIpReturned.bind(this);

    this.getERC20AddressReturned = this.getERC20AddressReturned.bind(this);
    this.getWRC20AddressReturned = this.getWRC20AddressReturned.bind(this);
    this.getSupportedERC20TokensReturned = this.getSupportedERC20TokensReturned.bind(this);
    this.getSupportedWRC20TokensReturned = this.getSupportedWRC20TokensReturned.bind(this);

    this.getCrowdSalesReturned = this.getCrowdSalesReturned.bind(this);
    this.getUserCrowdSaleContributionsReturned = this.getUserCrowdSaleContributionsReturned.bind(this);

    this.verificationResultReturned = this.verificationResultReturned.bind(this);
  };

  verificationResultReturned(error, data)  {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {

      let user = this.state.user

      if(user.verificationResult != data.verificationResult || user.verificationUrl != data.verificationUrl || user.whitelistStatus != data.whitelistStatus) {
        user.verificationResult = data.verificationResult
        user.verificationUrl = data.verificationUrl
        user.whitelistStatus = data.whitelistStatus

        this.setUser(user)
      }

      if(user.verificationResult != 'complete' && user) {
        setTimeout(() => {
          accountDispatcher.dispatch({ type: 'verificationResult', content:{ userId: user.id }, token: user.token })
        }, 300000);
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  componentWillMount() {
    ReactGA.initialize('UA-106832873-2', { cookieDomain: 'auto' });

    var user = null;
    var userString = sessionStorage.getItem('cc_user');
    if(userString) {
      user = JSON.parse(userString);
      this.setUser(user);
    }

    var currentScreen = window.location.hash.substring(1);
    var paramsIndex = window.location.hash.indexOf('?')
    if(paramsIndex > -1) {
      currentScreen = window.location.hash.substring(1, paramsIndex)
    }
    if(!['welcome', 'registerAccount', 'forgotPassword', 'forgotPasswordDone', 'resetPassword', 'privacyPolicy', 'cookiePolicy', 'termsAndConditions', 'about', 'press', 'contactUs', 'bugBounty', 'blog', 'faq', 'fees', 'add', 'added', 'addUnavailable', 'whitelistStatus'].includes(currentScreen)) {
      if(user == null) {
        window.location.hash = 'welcome';
      }
    }

    window.removeEventListener('resize', this.updateWindowDimensions);
    contactsEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('Unauthorised');
    wanEmitter.removeAllListeners('Unauthorised');
    aionEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('getEthAddress');
    wanEmitter.removeAllListeners('getWanAddress');
    aionEmitter.removeAllListeners('getAionAddress');
    contactsEmitter.removeAllListeners('getContacts');
    whitelistEmitter.removeAllListeners('whitelistCheck');
    ethEmitter.removeAllListeners('getSupportedERC20Tokens');
    wanEmitter.removeAllListeners('getSupportedWRC20Tokens');
    crowdsaleEmitter.removeAllListeners('getCrowdSales');
    crowdsaleEmitter.removeAllListeners('getUserCrowdSaleContributions');
    accountEmitter.removeAllListeners('verificationResult');

    contactsEmitter.on('Unauthorised', this.logUserOut);
    ethEmitter.on('Unauthorised', this.logUserOut);
    wanEmitter.on('Unauthorised', this.logUserOut);
    aionEmitter.on('Unauthorised', this.logUserOut);
    accountEmitter.on('Unauthorised', this.logUserOut);

    ethEmitter.on('getEthAddress', this.getEthAddressReturned);
    ethEmitter.on('getERC20Address', this.getERC20AddressReturned);
    wanEmitter.on('getWanAddress', this.getWanAddressReturned);
    wanEmitter.on('getWRC20Address', this.getWRC20AddressReturned);
    aionEmitter.on('getAionAddress', this.getAionAddressReturned);
    contactsEmitter.on('getContacts', this.getContactsReturned);
    whitelistEmitter.on('getWhitelistState', this.getWhitelistStateReturned);
    ethEmitter.on('getSupportedERC20Tokens', this.getSupportedERC20TokensReturned);
    wanEmitter.on('getSupportedWRC20Tokens', this.getSupportedWRC20TokensReturned);
    crowdsaleEmitter.on('getCrowdSales', this.getCrowdSalesReturned);
    crowdsaleEmitter.on('getUserCrowdSaleContributions', this.getUserCrowdSaleContributionsReturned);
    accountEmitter.on('verificationResult', this.verificationResultReturned);


    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    window.onhashchange = this.locationHashChanged;
    this.locationHashChanged();

    var loader = document.getElementById("loader")
    document.body.removeChild(loader);

    emitter.on('getIp', this.getIpReturned);
    dispatcher.dispatch({ type: 'getIp' });

    if(this.state.user) {
      let content = {}

      if(this.state.erc20Tokens == null || this.state.wrc20Tokens == null) {
        ethDispatcher.dispatch({ type: 'getSupportedERC20Tokens', content, token: this.state.user.token });
        wanDispatcher.dispatch({ type: 'getSupportedWRC20Tokens', content, token: this.state.user.token });
      }

      crowdsaleDispatcher.dispatch({ type: 'getCrowdSales', content, token: this.state.user.token });

      if(this.state.user.verificationResult != 'complete' && this.state.verificationSearching == false) {
        this.setState({verificationSearching: true})
        accountDispatcher.dispatch({ type: 'verificationResult', content:{ userId: this.state.user.id }, token: this.state.user.token })
      }

      this.constantRefresh(user)
    }
  };

  getIpReturned(err, data) {
    this.setState({ipLoading: false})
    emitter.removeAllListeners('getIp');

    this.setState({ipValid: true})
    // if(data == null || data.country == null) {
    //   this.setState({rejectionReason: 'Could not identify country. Please disable any add blockers then reload the page.'})
    // } else {
    //   if(data.country.code != 'US') {
    //     this.setState({ipValid: true})
    //   } else {
    //     this.setState({rejectionReason: 'Whitelisting is not available in your area.'})
    //   }
    // }
  };

  getCrowdSalesReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({crowdsales: data.crowdSales})

      data.crowdSales.map((crowdsale) => {
        let content = {
          userId: this.state.user.id,
          crowdsaleID: crowdsale.id
        }
        crowdsaleDispatcher.dispatch({ type: 'getUserCrowdSaleContributions', content, token: this.state.user.token });
      })
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  getUserCrowdSaleContributionsReturned(error, data, id) {
    this.setState({ investLoading: false });
    if(error) {
      return this.setState({ICOError: error.toString()});
    }

    if(data.success) {
      let crowdsales = this.state.crowdsales

      crowdsales = this.state.crowdsales.map((crowdsale) => {
        if(crowdsale.id == id) {
          crowdsale.totalContribution = data.totalContribution
        }

        return crowdsale
      })

    } else if (data.errorMsg) {
      this.setState({ICOError: data.errorMsg});
    } else {
      this.setState({ICOError: data.statusText})
    }
  };

  getSupportedERC20TokensReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({erc20Tokens: data.tokens})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  getSupportedWRC20TokensReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({wrc20Tokens: data.tokens})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  constantRefresh(user) {
    let content = {}

    setTimeout(() => {
      this.getUserDetails(this.state.user)
      crowdsaleDispatcher.dispatch({ type: 'getCrowdSales', content, token: this.state.user.token });

      this.constantRefresh()
    }, 300000);
  };

  getUserDetails(user) {
    var content = {id: user.id};
    ethDispatcher.dispatch({type: 'getEthAddress', content, token: user.token });
    wanDispatcher.dispatch({type: 'getWanAddress', content, token: user.token });
    aionDispatcher.dispatch({type: 'getAionAddress', content, token: user.token });
    contactsDispatcher.dispatch({type: 'getContacts', content, token: user.token });

  };

  getWhitelistStateReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var whitelistState = this.decodeWhitelistResponse(data.message)
      if(whitelistState) {
        this.setWhitelistState(whitelistState);
      } else {
        this.setState({error: "An unexpected error has occurred"})
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  getEthAddressReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({ethAddresses: data.ethAddresses});

      //map through the eth addresses and get their ERC20 addresses.
      data.ethAddresses.map((address) => {
        let content = {address: address.address};

        ethDispatcher.dispatch({type: 'getERC20Address', content, token: this.state.user.token });
      })

      // let ethAddresses = data.ethAddresses.map((add) => {
      //   add.type = 'Ethereum'
      //   add.extension = 'Eth'
      //   return add
      // })
      //
      // let wanAddress = this.state.wanAddresses.map((add) => {
      //   add.type = 'Wanchain'
      //   add.extension = 'Wan'
      //   add.address = add.publicAddress
      //   return add
      // })
      //
      // let aionAddress = this.state.aionAddresses.map((add) => {
      //   add.type = 'Aion'
      //   add.extension = 'Aion'
      //   return add
      // })
      //
      // let addresses = [...ethAddresses, ...wanAddress, ...aionAddress];
      //
      // this.setState({addresses});

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, ethAddresses: []});
    } else {
      this.setState({error: data.statusText, ethAddresses: []})
    }
  };

  getERC20AddressReturned(error, data, publicAddress) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      //add the ERC20 addresses as a child of the eth address
      let ethAddresses = this.state.ethAddresses.map((address) => {
        if(address.address == publicAddress) {
          address.erc20Tokens = data.tokens
          return address
        }

        return address
      })

      if(ethAddresses.length > 0) {
        //save it to state
        this.setState({ethAddresses})
      } else {
        //hmmmmm?
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, wanAddresses: []});
    } else {
      this.setState({error: data.statusText, wanAddresses: []})
    }
  };

  getWanAddressReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({wanAddresses: data.wanAddresses})

      //map through the eth addresses and get their ERC20 addresses.
      data.wanAddresses.map((address) => {
        let content = {address: address.publicAddress};

        wanDispatcher.dispatch({type: 'getWRC20Address', content, token: this.state.user.token });
      })

      // let ethAddresses = this.state.ethAddresses.map((add) => {
      //   add.type = 'Ethereum'
      //   add.extension = 'Eth'
      //   return add
      // })
      //
      // let wanAddress = data.wanAddresses.map((add) => {
      //   add.type = 'Wanchain'
      //   add.extension = 'Wan'
      //   add.address = add.publicAddress
      //   return add
      // })
      //
      // let aionAddress = this.state.aionAddresses.map((add) => {
      //   add.type = 'Aion'
      //   add.extension = 'Aion'
      //   return add
      // })
      //
      // let addresses = [...ethAddresses, ...wanAddress, ...aionAddress];
      //
      // this.setState({addresses});

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, wanAddresses: []});
    } else {
      this.setState({error: data.statusText, wanAddresses: []})
    }
  };

  getWRC20AddressReturned(error, data, publicAddress) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      //add the WRC20 addresses as a child of the wan address
      let wanAddresses = this.state.wanAddresses.map((address) => {
        if(address.publicAddress == publicAddress) {
          address.wrc20Tokens = data.tokens
          return address
        }

        return address
      })

      if(wanAddresses.length > 0) {
        //save it to state
        this.setState({wanAddresses})
      } else {
        //hmmmmm?
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, wanAddresses: []});
    } else {
      this.setState({error: data.statusText, wanAddresses: []})
    }
  };

  getAionAddressReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({aionAddresses: data.aionAddresses})

      // let ethAddresses = this.state.ethAddresses.map((add) => {
      //   add.type = 'Ethereum'
      //   add.extension = 'Eth'
      //   return add
      // })
      //
      // let wanAddress = this.state.wanAddresses.map((add) => {
      //   add.type = 'Wanchain'
      //   add.extension = 'Wan'
      //   add.address = add.publicAddress
      //   return add
      // })
      //
      // let aionAddress = data.aionAddresses.map((add) => {
      //   add.type = 'Aion'
      //   add.extension = 'Aion'
      //   return add
      // })
      //
      // let addresses = [...ethAddresses, ...wanAddress, ...aionAddress];
      //
      // this.setState({addresses});

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, aionAddresses: []});
    } else {
      this.setState({error: data.statusText, aionAddresses: []})
    }
  };

  getContactsReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({contacts: data.contacts})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, contacts: []});
    } else {
      this.setState({error: data.statusText, contacts: []})
    }
  };

  updateWindowDimensions() {

    var size = 'sm'
    if(window.innerWidth < 600) {
      size = 'xs'
    } else if (window.innerWidth < 1024) {
      size = 'sm'
    } else if (window.innerWidth < 1440) {
      size = 'md'
    } else {
      size = 'lg'
    }

    this.setState({ width: window.innerWidth, height: window.innerHeight, size });
  };

  closeDrawer() {
    this.setState({drawerOpen: false});
  };
  openDrawer() {
    this.setState({drawerOpen: true});
  };
  navClicked(event, currentScreen) {
    this.setState({drawerOpen: false});
    window.location.hash=currentScreen;
  };

  logUserOut() {
    sessionStorage.removeItem('cc_user');
    sessionStorage.removeItem('cc_whiteliststate');
    window.location.hash = 'welcome';
  };

  setUser(user) {
    this.setState({user});
    sessionStorage.setItem('cc_user', JSON.stringify(user));
    this.getUserDetails(user);
  };

  setWhitelistState(whitelistState) {

    if(whitelistState != null) {
      if(whitelistState.jwt) {
        var user = this.state.user;

        user.whitelistToken = whitelistState.jwt.token;
        user.whitelistTokenKey = sha256(whitelistState.user.emailAddress);
        delete whitelistState.jwt;

        this.setState({user});
        sessionStorage.setItem('cc_user', JSON.stringify(user));
      }

      if(whitelistState.activeStep == null) {
        whitelistState.activeStep = 0;
        whitelistState.completed = {};
      }
    }

    this.setState({whitelistState});
    sessionStorage.setItem('cc_whiteliststate', JSON.stringify(whitelistState));
    // whitelistDispatcher.dispatch({type: 'setWhitelistState', content: whitelistState, token: this.state.user.whitelistToken, tokenKey: this.state.user.whitelistTokenKey });
  };

  openSendEther(sendEtherContact, sendEtherAccount) {
    this.setState({ sendEtherContact, sendEtherAccount});
    window.location.hash = 'sendEthereum'
  };

  openSendERC(sendERC20Symbol, sendERC20Account) {
    this.setState({ sendERC20Symbol, sendERC20Account});
    window.location.hash = 'sendERC20'
  };

  openSendWanchain(sendWanchainContact, sendWanchainAccount) {
    this.setState({ sendWanchainContact, sendWanchainAccount});
    window.location.hash = 'sendWanchain'
  };

  openSendWRC(sendWRC20Symbol, sendWRC20Account) {
    this.setState({ sendWRC20Symbol, sendWRC20Account});
    window.location.hash = 'sendWRC20'
  };

  openSendAion(sendAionContact, sendAionAccount) {
    this.setState({ sendAionContact, sendAionAccount});
    window.location.hash = 'sendAion'
  };

  locationHashChanged() {
    var uriParameters = {}
    var currentScreen = ''
    var paramsIndex = window.location.hash.indexOf('?')
    if(paramsIndex > -1) {
      var params = window.location.hash.substring(paramsIndex+1)
      params.split('&').forEach((pair) => {
        var arr = pair.split('=')
        var val = decodeURIComponent(arr[1])
        if(val.indexOf("'>here</a") > -1) {
          val = val.substring(0, val.length - 9)
        }
        uriParameters[decodeURIComponent(arr[0])] = val
      })
      currentScreen = window.location.hash.substring(1, paramsIndex)
    } else {
      currentScreen = window.location.hash.substring(1);
    }
    if(['', 'welcome', 'logOut', 'registerAccount'].includes(currentScreen)) {
      sessionStorage.removeItem('cc_user');
      sessionStorage.removeItem('cc_whiteliststate');

      this.setState({drawerOpen: false, user: null, contacts: null, ethAddresses: null, wanAddress: null, aionAddresses: null});
      if(currentScreen != 'registerAccount') {
        this.setState({currentScreen: 'welcome'});
      }
    }

    if(!['welcome', 'registerAccount', 'forgotPassword', 'forgotPasswordDone', 'resetPassword', 'privacyPolicy', 'cookiePolicy', 'termsAndConditions', 'about', 'press', 'contactUs', 'bugBounty', 'blog', 'faq', 'fees', 'add', 'added', 'addUnavailable', 'whitelistStatus'].includes(currentScreen)) {
      if(this.state.user == null) {
        return window.location.hash = 'welcome';
      }
    }

    if(this.state.user) {
      var content = {}
      if((currentScreen == 'wanAccounts' || currentScreen == 'sendWanchain') && this.state.wanAddresses == null) {
        content = {id: this.state.user.id};
        wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.state.user.token });
      } else if ((currentScreen == 'ethAccounts' || currentScreen == 'sendEthereum') && this.state.ethAddresses == null) {
        content = {id: this.state.user.id};
        ethDispatcher.dispatch({type: 'getEthAddress', content, token: this.state.user.token });
      } else if ((currentScreen == 'aionAccounts' || currentScreen == 'sendAion') && this.state.aionAddresses == null) {
        content = {id: this.state.user.id};
        aionDispatcher.dispatch({type: 'getAionAddress', content, token: this.state.user.token });
      } else if (currentScreen == 'contacts' && this.state.contacts == null) {
        content = {id: this.state.user.id};
        contactsDispatcher.dispatch({type: 'getContacts', content, token: this.state.user.token });
      }

      if(this.state.erc20Tokens == null || this.state.wrc20Tokens == null) {
        content = {}
        ethDispatcher.dispatch({ type: 'getSupportedERC20Tokens', content, token: this.state.user.token });
        wanDispatcher.dispatch({ type: 'getSupportedWRC20Tokens', content, token: this.state.user.token });
      }

      if(this.state.crowdsales == null) {
        content = {}
        crowdsaleDispatcher.dispatch({ type: 'getCrowdSales', content, token: this.state.user.token });
      }

      if(this.state.user.verificationResult != 'complete' && this.state.verificationSearching == false) {
        this.setState({verificationSearching: true})
        accountDispatcher.dispatch({ type: 'verificationResult', content:{ userId: this.state.user.id }, token: this.state.user.token })
      }
    }

    ReactGA.set({ page: window.location.pathname + window.location.hash })
    ReactGA.pageview(window.location.pathname + window.location.hash)

    this.setState({currentScreen, uriParameters});
  };

  renderAppBar() {
    var menuClicked = null
    if(this.state.user != null) {
      menuClicked = this.openDrawer
    }

    return (<TheAppBar
      menuClicked={menuClicked}
      user={this.state.user}
    />)
  };

  renderDrawer() {
    var drawer = null
    if(this.state.user != null) {
      drawer = (<AppDrawer
        navClicked={this.navClicked}
        currentScreen={this.state.currentScreen}
        closeDrawer={this.closeDrawer}
        user={this.state.user}
        open={this.state.drawerOpen}
      />)
    }
    return drawer;
  };

  renderFooter() {
    return <AppFooter
      user={this.state.user}
      navClicked={this.navClicked}
      ipValid={this.state.ipValid} />
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.renderAppBar()}
        {this.renderDrawer()}
        <CssBaseline />
        <Grid container justify="space-around" alignItems="flex-start" direction="row" spacing={0} style={{minHeight: '622px', position: 'relative'}}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {this.renderScreen()}
          </Grid>
        </Grid>
        {this.renderFooter()}
      </MuiThemeProvider>
    )
  };

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'welcome':
        return (<Welcome setUser={this.setUser} />);
      case 'registerAccount':
        return (<RegisterAccount setUser={this.setUser} />);
      case 'createEth':
        return (<CreateEth user={this.state.user} />);
      case 'createWan':
        return (<CreateWan user={this.state.user} />);
      case 'createAion':
        return (<CreateAion user={this.state.user} />);
      case 'kyc':
        return (<KYC user={this.state.user} setUser={this.setUser}  />);
      case 'setUsername':
        return (<SetUsername user={this.state.user} setUser={this.setUser} />);
      case 'forgotPassword':
        return (<ForgotPassword />);
      case 'forgotPasswordDone':
        return (<ForgotPasswordDone />);
      case 'resetPassword':
        return (<ResetPassword uriParameters={this.state.uriParameters} />);
      // case 'whitelist':
      //   return (<Whitelist whitelistObject={this.state.whitelistState} setWhitelistState={this.setWhitelistState} user={this.state.user} size={this.state.size} ethAddresses={this.state.ethAddresses} wanAddresses={this.state.wanAddresses} />);
      case 'ethAccounts':
        return (<EthAccounts user={this.state.user} ethAddresses={this.state.ethAddresses} openSendEther={this.openSendEther} openSendERC={this.openSendERC} />);
      case 'wanAccounts':
        return (<WanAccounts user={this.state.user} wanAddresses={this.state.wanAddresses} openSendWanchain={this.openSendWanchain} openSendWRC={this.openSendWRC} crowdsales={this.state.crowdsales} size={this.state.size}/>);
      case 'aionAccounts':
        return (<AionAccounts user={this.state.user} aionAddresses={this.state.aionAddresses} openSendAion={this.openSendAion} />);
      case 'contacts':
        return (<Contacts user={this.state.user} contacts={this.state.contacts} openSendEther={this.openSendEther} openSendWanchain={this.openSendWanchain} openSendAion={this.openSendAion} />);
      case 'updatePassword':
        return (<UpdatePassword user={this.state.user} />);
      case 'manage2FA':
        return (<Manage2FA user={this.state.user} setUser={this.setUser} />);
      case 'privacyPolicy':
        return (<PrivacyPolicy />);
      case 'cookiePolicy':
        return (<CookiePolicy />);
      case 'termsAndConditions':
        return (<TermsAndConditions />);
      case 'manageEthPools':
        return (<ComingSoon />);
      case 'sendEthereum':
        return (<SendEthereum user={this.state.user} sendEtherContact={this.state.sendEtherContact} sendEtherAccount={this.state.sendEtherAccount} ethAddresses={this.state.ethAddresses} size={this.state.size} contacts={this.state.contacts}/>)
      case 'sendERC20':
        return (<SendERC20 user={this.state.user} sendERC20Symbol={this.state.sendERC20Symbol} erc20Tokens={this.state.erc20Tokens} sendERC20Contact={this.state.sendERC20Contact} sendERC20Account={this.state.sendERC20Account} ethAddresses={this.state.ethAddresses} size={this.state.size} contacts={this.state.contacts}/>)
      case 'sendWanchain':
        return (<SendWanchain user={this.state.user} sendWanchainContact={this.state.sendWanchainContact} sendWanchainAccount={this.state.sendWanchainAccount} wanAddresses={this.state.wanAddresses} size={this.state.size} contacts={this.state.contacts}/>)
      case 'sendWRC20':
        return (<SendWRC20 user={this.state.user} sendWRC20Symbol={this.state.sendWRC20Symbol} wrc20Tokens={this.state.wrc20Tokens} sendWRC20Contact={this.state.sendWRC20Contact} sendWRC20Account={this.state.sendWRC20Account} wanAddresses={this.state.wanAddresses} size={this.state.size} contacts={this.state.contacts}/>)
      case 'sendAion':
        return (<SendAion user={this.state.user} sendAionContact={this.state.sendAionContact} sendAionAccount={this.state.sendAionAccount} aionAddresses={this.state.aionAddresses} size={this.state.size} contacts={this.state.contacts}/>)
      case 'about':
        return (<ComingSoon />);
      case 'press':
        return (<ComingSoon />);
      case 'contactUs':
        return (<ContactUs />);
      case 'bugBounty':
        return (<ComingSoon />);
      case 'blog':
        return (<ComingSoon />);
      case 'faq':
        return (<ComingSoon />);
      case 'fees':
        return (<ComingSoon />);
      case 'add':
        if(!this.state.ipValid) {
          window.location.hash = 'addUnavailable'
          return <div></div>
        }
        return (<WhitelistMe ipLoading={this.state.ipLoading} />);
      case 'added':
        return (<WhitelistMeDone />);
      case 'addUnavailable':
        if(this.state.ipValid == true) {
          window.location.hash = 'add'
          return <div></div>
        }
        return (<WhitelistMeUnavailable ipLoading={this.state.ipLoading} rejectionReason={this.state.rejectionReason}/>);
      case 'whitelistStatus':
        return (<WhitelistCheck />)
      case 'logOut':
        return (<Welcome setUser={this.setUser}  />);
      default:
        return (<Welcome setUser={this.setUser}  />);
    }
  }

  decodeWhitelistResponse(message) {
    const mnemonic = message.m.hexDecode()
    const encrypted = message.e.hexDecode()
    const signature = message.s

    const sig = {
      e: message.e,
      m: message.m,
      u: message.u,
      p: message.p,
      t: message.t
    }
    const seed = JSON.stringify(sig)
    const compareSignature = sha256(seed)

    if (compareSignature !== signature) {
      return null
    }

    const payload = decrypt(encrypted, mnemonic)
    var data = null
    try {
      data = JSON.parse(payload)
    } catch (ex) {
      return null
    }

    return data;
  }
}

function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

export default App;
