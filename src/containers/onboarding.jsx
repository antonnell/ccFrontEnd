import React from 'react'

import Grid from 'material-ui/Grid';
import HaveEthAddress from '../components/haveEthAddress.jsx';
import ImportEthAddress from '../components/importEthAddress.jsx';
import CreateEthAddres from '../components/createEthAddress.jsx';
import HaveWanAddress from '../components/haveWanAddress.jsx';
import ImportWanAddress from '../components/importWanAddress.jsx';
import CreateWanAddress from '../components/createWanAddress.jsx';
import JoinWhitelist from '../components/joinWhitelist.jsx';
import WhitelistJoined from '../components/whitelistJoined.jsx';

const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let Onboarding = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      onboardingScreen: 'haveEthAddress'
    };
  },

  navigateImportEthAddress() {
    this.setState({onboardingScreen: 'importEthAddress'})
  },

  navigateCreateEthAddress() {
    this.setState({onboardingScreen: 'createEthAddress'})
  },

  createEthAddress() {
    this.setState({onboardingScreen: 'haveWanAddress'})
  },

  importEthAddress() {
    this.setState({onboardingScreen: 'haveWanAddress'})
  },

  navigateImportWanAddress() {
    this.setState({onboardingScreen: 'importWanAddress'})
  },

  navigateCreateWanAddress() {
    this.setState({onboardingScreen: 'createWanAddress'})
  },

  createWanAddress() {
    this.setState({onboardingScreen: 'joinWhitelist'})
  },

  importWanAddress() {
    this.setState({onboardingScreen: 'joinWhitelist'})
  },

  joinWhitelist() {
    this.setState({onboardingScreen: 'whitelistJoined'})
  },

  notNow() {
    window.location.hash = 'account'
  },

  done() {
    window.location.hash = 'account'
  },

  render(){
    return(
      <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align='center'>
          <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            {this.renderScreen()}
          </Grid>
        </Grid>
      </Grid>
    );
  },

  renderScreen() {
    switch (this.state.onboardingScreen) {
      case 'haveEthAddress':
        return (<HaveEthAddress
          navigateImportEthAddress={this.navigateImportEthAddress}
          navigateCreateEthAddress={this.navigateCreateEthAddress} />)
        break;
      case 'importEthAddress':
        return (<ImportEthAddress
          navigateCreateEthAddress={this.navigateCreateEthAddress}
          importEthAddress={this.importEthAddress} />)
        break;
      case 'createEthAddress':
        return (<CreateEthAddres
          handleChange={this.handleChange}
          createEthAddress={this.createEthAddress}
          navigateImportEthAddress={this.navigateImportEthAddress}
          />)
        break;
      case 'haveWanAddress':
        return (<HaveWanAddress
          navigateImportWanAddress={this.navigateImportWanAddress}
          navigateCreateWanAddress={this.navigateCreateWanAddress} />)
        break;
      case 'importWanAddress':
        return (<ImportWanAddress
          navigateCreateWanAddress={this.navigateCreateWanAddress}
          importWanAddress={this.importWanAddress} />)
        break;
      case 'createWanAddress':
        return (<CreateWanAddress
          handleChange={this.handleChange}
          createWanAddress={this.createWanAddress}
          navigateImportWanAddress={this.navigateImportWanAddress}
          />)
        break;
      case 'joinWhitelist':
        return (<JoinWhitelist
          handleChange={this.handleChange}
          joinWhitelist={this.joinWhitelist}
          notNow={this.notNow}
          />)
        break;
      case 'whitelistJoined':
        return (<WhitelistJoined
          handleChange={this.handleChange}
          done={this.done}
          />)
        break;
      default:
        return (<HaveEthAddress
          navigateCaptureEthAddress={this.navigateCaptureEthAddress}
          navigateCreateEthAddress={this.navigateCreateEthAddress} />)
        break;

    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (Onboarding);
