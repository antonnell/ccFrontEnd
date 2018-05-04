import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';

import TheAppBar from './containers/applicationBar.jsx';
import AppDrawer from './containers/drawer.jsx';
import AppFooter from './containers/footer.jsx';

import PrivacyPolicy from './components/privacyPolicy.jsx';
import ContactUs from './components/contactUs.jsx';

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

let accountEmitter = require('./store/accountStore.js').default.emitter
let accountDispatcher = require('./store/accountStore.js').default.dispatcher

let contactsEmitter = require('./store/contactsStore.js').default.emitter
let contactsDispatcher = require('./store/contactsStore.js').default.dispatcher

let ethEmitter = require('./store/ethStore.js').default.emitter
let ethDispatcher = require('./store/ethStore.js').default.dispatcher

let wanEmitter = require('./store/wanStore.js').default.emitter
let wanDispatcher = require('./store/wanStore.js').default.dispatcher

const theme = createMuiTheme({
  overrides: {
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
      user: user
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.locationHashChanged = this.locationHashChanged.bind(this);

    this.setUser = this.setUser.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.navClicked = this.navClicked.bind(this);

    this.getContactsReturned = this.getContactsReturned.bind(this);
    this.getEthAddressReturned = this.getEthAddressReturned.bind(this);
    this.getWanAddressReturned = this.getWanAddressReturned.bind(this);

    contactsEmitter.on('getContacts', this.getContactsReturned);
    ethEmitter.on('getEthAddress', this.getEthAddressReturned);
    wanEmitter.on('getWanAddress', this.getWanAddressReturned);
  };

  getContactsReturned(error, data) {

    console.log(error)
    console.log(data)

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

  getEthAddressReturned(error, data) {

    console.log(error)
    console.log(data)

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

    console.log(error)
    console.log(data)

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

  componentWillMount() {
    var currentScreen = window.location.hash.substring(1);
    if(!['welcome', 'registerAccount', 'forgotPassword', 'forgotPasswordDone', 'resetPassword', 'privacyPolicy', 'about', 'press', 'contactUs', 'bugBounty', 'blog', 'faq', 'fees'].includes(currentScreen)) {
      if(this.state.user == null) {
        window.location.hash = 'welcome';
      }
    }

    var userString = sessionStorage.getItem('cc_user');
    if(userString) {
      var user = JSON.parse(userString);
      this.setUser(user);
    }
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

  setUser(user) {
    this.setState({user});
    sessionStorage.setItem('cc_user', JSON.stringify(user));

    /*var contenta = {username: user.username};
    contactsDispatcher.dispatch({type: 'getContacts', content:contenta});

    var contentb = {username: user.username};
    ethDispatcher.dispatch({type: 'getEthAddress', content:contentb});

    var contentc = {username: user.username};
    wanDispatcher.dispatch({type: 'getWanAddress', content:contentc});*/
  };

  locationHashChanged() {
    var currentScreen = window.location.hash.substring(1);
    if(['', 'welcome'].includes(currentScreen)) {
      this.setState({drawerOpen: false, user: null})
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
      navClicked={this.navClicked} />
  };

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        {this.renderAppBar()}
        {this.renderDrawer()}
        <CssBaseline />
        <Grid container justify="space-around" alignItems="flex-start" direction="row" spacing={0} style={{minHeight: '584px', position: 'relative'}}>
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
      case 'forgotPassword':
        return (<ForgotPassword />);
      case 'forgotPasswordDone':
        return (<ForgotPasswordDone />);
      case 'resetPassword':
        return (<ResetPassword />);
      case 'whitelist':
        return (<Whitelist user={this.state.user} size={this.state.size} />);
      case 'ethAccounts':
        return (<EthAccounts user={this.state.user} />);
      case 'wanAccounts':
        return (<WanAccounts user={this.state.user} />);
      case 'updatePassword':
        return (<UpdatePassword user={this.state.user} />);
      case 'manage2FA':
        return (<Manage2FA user={this.state.user} />);
      case 'contacts':
        return (<Contacts user={this.state.user} />);
      case 'privacyPolicy':
        return (<PrivacyPolicy />);
      case 'about':
        return (<Welcome setUser={this.setUser} />);
      case 'press':
        return (<Welcome setUser={this.setUser} />);
      case 'contactUs':
        return (<ContactUs />);
      case 'bugBounty':
        return (<Welcome setUser={this.setUser} />);
      case 'blog':
        return (<Welcome setUser={this.setUser} />);
      case 'faq':
        return (<Welcome setUser={this.setUser} />);
      case 'fees':
        return (<Welcome setUser={this.setUser} />);
      default:
        return (<Welcome setUser={this.setUser} />);
    }
  }
}

export default App;
