import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';
import AppFooter from './containers/footer.jsx';

import Welcome from './containers/welcome.jsx';
import RegisterAccount from './containers/registerAccount.jsx';
import ForgotPassword from './containers/forgotPassword.jsx';
import ForgotPasswordDone from './containers/forgotPasswordDone.jsx';
import ResetPassword from './containers/resetPassword.jsx';
import EthAccounts from './containers/ethAccounts.jsx';
import WanAccounts from './containers/wanAccounts.jsx';
import UpdatePassword from './containers/updatePassword.jsx';
import Manage2FA from './containers/manage2fa.jsx';
import Contacts from './containers/contacts.jsx';
import Whitelist from './containers/whitelist.jsx';

import ComingSoon from './components/comingSoon.jsx';
import PrivacyPolicy from './components/privacyPolicy.jsx';
import ContactUs from './components/contactUs.jsx';
var sha256 = require('sha256');

let accountEmitter = require('./store/accountStore.js').default.emitter
let accountDispatcher = require('./store/accountStore.js').default.dispatcher

let contactsEmitter = require('./store/contactsStore.js').default.emitter
let contactsDispatcher = require('./store/contactsStore.js').default.dispatcher

let ethEmitter = require('./store/ethStore.js').default.emitter
let ethDispatcher = require('./store/ethStore.js').default.dispatcher

let wanEmitter = require('./store/wanStore.js').default.emitter
let wanDispatcher = require('./store/wanStore.js').default.dispatcher

let whitelistEmitter = require('./store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('./store/whitelistStore.js').default.dispatcher

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

    var whitelistString = sessionStorage.getItem('cc_whiteliststate')
    var whitelistState = null;
    if (whitelistString != null) {
      whitelistState = JSON.parse(whitelistString)
    }

    this.state = {
      drawerOpen: false,
      user: user,
      ethAddresses: null,
      wanAddresses: null,
      contacts: null,
      whitelistState: whitelistState
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.locationHashChanged = this.locationHashChanged.bind(this);

    this.setUser = this.setUser.bind(this);
    this.setWhitelistState = this.setWhitelistState.bind(this);
    this.logUserOut = this.logUserOut.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);

    this.getEthAddressReturned = this.getEthAddressReturned.bind(this);
    this.getWanAddressReturned = this.getWanAddressReturned.bind(this);
    this.getContactsReturned = this.getContactsReturned.bind(this);
    this.getWhitelistStateReturned = this.getWhitelistStateReturned.bind(this);
  };

  componentWillMount() {
    var user = null;
    var userString = sessionStorage.getItem('cc_user');
    if(userString) {
      user = JSON.parse(userString);
      this.setUser(user);
    }

    var currentScreen = window.location.hash.substring(1);
    if(!['welcome', 'registerAccount', 'forgotPassword', 'forgotPasswordDone', 'resetPassword', 'privacyPolicy', 'about', 'press', 'contactUs', 'bugBounty', 'blog', 'faq', 'fees'].includes(currentScreen)) {
      if(user == null) {
        window.location.hash = 'welcome';
      }
    }

    contactsEmitter.on('Unauthorised', this.logUserOut);
    ethEmitter.on('Unauthorised', this.logUserOut);
    wanEmitter.on('Unauthorised', this.logUserOut);
    accountEmitter.on('Unauthorised', this.logUserOut);

    ethEmitter.on('getEthAddress', this.getEthAddressReturned);
    wanEmitter.on('getWanAddress', this.getWanAddressReturned);
    contactsEmitter.on('getContacts', this.getContactsReturned);

    whitelistEmitter.on('getWhitelistState', this.getWhitelistStateReturned);
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    window.onhashchange = this.locationHashChanged;
    this.locationHashChanged();

    var loader = document.getElementById("loader")
    document.body.removeChild(loader);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    contactsEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('Unauthorised');
    wanEmitter.removeAllListeners('Unauthorised');
    accountEmitter.removeAllListeners('Unauthorised');
    ethEmitter.removeAllListeners('getEthAddress');
    wanEmitter.removeAllListeners('getWanAddress');
    contactsEmitter.removeAllListeners('getContacts');
    whitelistEmitter.removeAllListeners('whitelistCheck');
  };

  getUserDetails(user) {
    var content = {id: user.id};
    ethDispatcher.dispatch({type: 'getEthAddress', content, token: user.token });
    wanDispatcher.dispatch({type: 'getWanAddress', content, token: user.token });

    var contactsContent = {username: user.username};
    contactsDispatcher.dispatch({type: 'getContacts', content: contactsContent, token: user.token });

    if(this.state.whitelistState == null) {
      //maybe get whitelistState from here if whitelistState is null
      if(user.whitelistToken != null && user.whitelistTokenKey != null) {
        var whitelistContent = { emailAddress: user.email };
        whitelistDispatcher.dispatch({type: 'getWhitelistState', content: whitelistContent, token: user.whitelistToken, tokenKey: user.whitelistTokenKey });
      }
    }
  };

  getWhitelistStateReturned(error, data) {
    console.log(error)
    console.log(data)
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
      this.setState({ethAddresses: data.ethAddresses})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  getWanAddressReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({wanAddresses: data.wanAddresses})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  getContactsReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({contacts: data.contacts})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  };

  updateWindowDimensions() {

    var size = 'sm'
    if(window.innerWidth <= 360) {
      size = 'xs'
    } else if (window.innerWidth <= 640) {
      size = 'sm'
    } else if (window.innerWidth <= 960) {
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
    window.location.hash = 'welcome';
  };

  setUser(user) {
    this.setState({user});
    sessionStorage.setItem('cc_user', JSON.stringify(user));
    this.getUserDetails(user);
  };

  setWhitelistState(whitelistState) {
    if(whitelistState != null && whitelistState.activeStep == null) {
      whitelistState.activeStep = 0;
      whitelistState.completed = {};
    } else if (whitelistState != null) {
      if(whitelistState.jwt) {
        var user = this.state.user;

        user.whitelistToken = whitelistState.jwt.token;
        user.whitelistTokenKey = sha256(whitelistState.user.emailAddress);
        delete whitelistState.jwt;

        this.setState({user});
        sessionStorage.setItem('cc_user', JSON.stringify(user));
      }
    }
    this.setState({whitelistState});
    sessionStorage.setItem('cc_whiteliststate', JSON.stringify(whitelistState));
  };

  locationHashChanged() {
    var currentScreen = window.location.hash.substring(1);
    if(['', 'welcome', 'logOut'].includes(currentScreen)) {
      sessionStorage.removeItem('cc_user');
      this.setState({drawerOpen: false, user: null});
      this.setState({currentScreen: 'welcome'});
    } else {
      if(!['welcome', 'registerAccount', 'forgotPassword', 'forgotPasswordDone', 'resetPassword', 'privacyPolicy', 'about', 'press', 'contactUs', 'bugBounty', 'blog', 'faq', 'fees'].includes(currentScreen)) {
        if(this.state.user == null) {
          return window.location.hash = 'welcome';
        }
      }

      this.setState({currentScreen});
    }
  };

  renderAppBar() {
    var menuClicked = null
    if(this.state.user != null) {
      var menuClicked = this.openDrawer
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
        canWhitelist={this.state.whitelistState != null}
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
      navClicked={this.navClicked} />
  };

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        {this.renderAppBar()}
        {this.renderDrawer()}
        <CssBaseline />
        <Grid container justify="space-around" alignItems="flex-start" direction="row" spacing={0} style={{minHeight: '564px', position: 'relative'}}>
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
        return (<Welcome setUser={this.setUser} setWhitelistState={this.setWhitelistState} />);
      case 'registerAccount':
        return (<RegisterAccount setUser={this.setUser} setWhitelistState={this.setWhitelistState}/>);
      case 'forgotPassword':
        return (<ForgotPassword />);
      case 'forgotPasswordDone':
        return (<ForgotPasswordDone />);
      case 'resetPassword':
        return (<ResetPassword />);
      case 'whitelist':
        return (<Whitelist whitelistObject={this.state.whitelistState} setWhitelistState={this.setWhitelistState} user={this.state.user} size={this.state.size} ethAddresses={this.state.ethAddresses} wanAddresses={this.state.wanAddresses} />);
      case 'ethAccounts':
        return (<EthAccounts user={this.state.user} ethAddresses={this.state.ethAddresses} />);
      case 'wanAccounts':
        return (<WanAccounts user={this.state.user} wanAddresses={this.state.wanAddresses} />);
      case 'contacts':
        return (<Contacts user={this.state.user} contacts={this.state.contacts} />);
      case 'updatePassword':
        return (<UpdatePassword user={this.state.user} />);
      case 'manage2FA':
        return (<Manage2FA user={this.state.user} />);
      case 'privacyPolicy':
        return (<PrivacyPolicy />);
      case 'manageEthPools':
        return (<ComingSoon />);
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
      case 'logOut':
        return (<Welcome setUser={this.setUser} setWhitelistState={this.setWhitelistState} />);
      default:
        return (<Welcome setUser={this.setUser} setWhitelistState={this.setWhitelistState} />);
    }
  }
}

export default App;
