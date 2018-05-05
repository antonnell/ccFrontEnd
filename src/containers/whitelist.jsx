import React from 'react';
import Stepper, { Step, StepButton, StepLabel, StepContent } from 'material-ui/Stepper';
import MobileStepper from 'material-ui/MobileStepper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, {  CardContent } from 'material-ui/Card';

import AcceptTermsAndConditions from '../components/acceptTermsAndConditions.jsx';
import TermsModal from '../components/termsModal.jsx';

import HaveEthAddress from '../components/haveEthAddress.jsx';
import StoreEthAddress from '../components/storeEthAddress.jsx';
import ImportPublicEthAddress from '../components/importPublicEthAddress.jsx';
import ImportPrivateTypeEthAddress from '../components/importPrivateTypeEthAddress.jsx';
import ImportPrivateEthAddress from '../components/importPrivateEthAddress.jsx';
import CreateEthAddres from '../components/createEthAddress.jsx';

import HaveWanAddress from '../components/haveWanAddress.jsx';
import StoreWanAddress from '../components/storeWanAddress.jsx';
import ImportPublicWanAddress from '../components/importPublicWanAddress.jsx';
import ImportPrivateTypeWanAddress from '../components/importPrivateTypeWanAddress.jsx';
import ImportPrivateWanAddress from '../components/importPrivateWanAddress.jsx';
import CreateWanAddress from '../components/createWanAddress.jsx';

import KYCIDDocument from '../components/kycIDDocument.jsx';
import KYCPhoto from '../components/kycPhoto.jsx';

import JoinWhitelist from '../components/joinWhitelist.jsx';
import WhitelistJoined from '../components/whitelistJoined.jsx';

const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let Whitelist = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      termsOpen: false,
      whitelistScreen: 'acceptTermsAndConditions',
      activeStep: 0,
      steps: ['Accept Terms and Conditions', 'Setup Ethereum Address', 'Setup Wanchain Address', 'KYC', 'Join the Whitelist'],
      completed: {}
    };
  },

  acceptTerms() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'haveEthAddress', activeStep: 1, completed})
  },

  navigateHaveEthAddress() {
    this.setState({whitelistScreen: 'haveEthAddress', activeStep: 1})
  },

  readTerms() {
    this.setState({termsOpen: true})
  },

  navigateTermsAndConditions() {
    this.setState({whitelistScreen: 'acceptTermsAndConditions', activeStep: 0})
  },

  navigateExistingEthAddress() {
    this.setState({whitelistScreen: 'storeEthAddress'})
  },

  navigateImportPublicEthAddress() {
    this.setState({whitelistScreen: 'importPublicEthAddress'})
  },

  navigateImportPrivateTypeEthAddress() {
    this.setState({whitelistScreen: 'importPrivateTypeEthAddress'})
  },

  navigateImportPrivateEthAddress(type) {
    this.setState({whitelistScreen: 'importPrivateEthAddress', ethPrivateKeyType: type})
  },

  navigateCreateEthAddress() {
    this.setState({whitelistScreen: 'createEthAddress'})
  },

  createEthAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed})
  },

  importPublicEthAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed})
  },

  importPrivateEthAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed})
  },

  navigateHaveWanAddress() {
    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2})
  },

  navigateImportPublicWanAddress() {
    this.setState({whitelistScreen: 'importPublicWanAddress'})
  },

  navigateImportPrivateTypeWanAddress() {
    this.setState({whitelistScreen: 'importPrivateTypeWanAddress'})
  },

  navigateImportPrivateWanAddress(type) {
    this.setState({whitelistScreen: 'importPrivateWanAddress', wanPrivateKeyType: type})
  },

  navigateExistingWanAddress() {
    this.setState({whitelistScreen: 'storeWanAddress'})
  },

  navigateImportWanAddress() {
    this.setState({whitelistScreen: 'importWanAddress'})
  },

  navigateCreateWanAddress() {
    this.setState({whitelistScreen: 'createWanAddress'})
  },

  createWanAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed})
  },

  importPublicWanAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed})
  },

  importPrivateWanAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed})
  },

  navigateKYCIDDocument() {
    this.setState({whitelistScreen: 'kycIDDOcument'})
  },

  uploadIDDocument() {
    //something should happen
  },

  navigateUploadPhoto() {
    this.setState({whitelistScreen: 'kycPhoto'})
  },

  uploadPhoto() {
    //something should happen
  },

  navigateJoinWhitelist() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'whitelistJoined', activeStep: 4, completed})
  },

  joinWhitelist() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'whitelistJoined', completed})
  },

  notNow() {
    window.location.hash = 'ethAccounts'
  },

  done() {
    window.location.hash = 'ethAccounts'
  },

  handleStep(step) {
    this.setState({ activeStep: step })
  },

  handleTermsClose() {
    this.setState({termsOpen: false})
  },

  importPublicEthAddressKeyDown(event) {
    if (event.which == 13) {
      this.importPublicEthAddress();
    }
  },

  importPrivateEthAddressKeyDown(event) {
    if (event.which == 13) {
      this.importPrivateEthAddress();
    }
  },

  createEthAddressKeyDown(event) {
    if (event.which == 13) {
      this.createEthAddress();
    }
  },

  importWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.importWanAddress();
    }
  },

  createWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.createWanAddress();
    }
  },

  renderStepper() {
    if(['xs', 'sm'].includes(this.props.size)) {
      return (
        <Card>
          <CardContent>
            <Stepper orientation="vertical" steps={this.state.steps.length} activeStep={this.state.activeStep} style={{background: 'inherit'}}>
              {this.state.steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel completed={this.state.completed[index]}>{label}</StepLabel>
                    <StepContent>
                      {this.renderScreen()}
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </CardContent>
        </Card>
      )
    } else {
      return (
        <div>
          <Stepper alternativeLabel activeStep={this.state.activeStep} style={{background: 'inherit'}}>
            {this.state.steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel completed={this.state.completed[index]}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
            <Card>
              <CardContent>
                {this.renderScreen()}
              </CardContent>
            </Card>
        </div>)
    }
  },

  render(){
    return(
      <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={6} align='center'>
          {this.renderStepper()}
          <TermsModal isOpen={this.state.termsOpen} handleClose={this.handleTermsClose} />
        </Grid>
      </Grid>
    );
  },

  renderScreen() {
    switch (this.state.whitelistScreen) {
      case 'acceptTermsAndConditions':
        return (<AcceptTermsAndConditions
          acceptTerms={this.acceptTerms}
          readTerms={this.readTerms}
        />);
      case 'haveEthAddress':
        return (<HaveEthAddress
          navigateBack={this.navigateTermsAndConditions}
          navigateExistingEthAddress={this.navigateExistingEthAddress}
          navigateCreateEthAddress={this.navigateCreateEthAddress}
          />);
      case 'storeEthAddress':
        return (<StoreEthAddress
          navigateBack={this.navigateHaveEthAddress}
          navigateImportPublicEthAddress={this.navigateImportPublicEthAddress}
          navigateImportPrivateTypeEthAddress={this.navigateImportPrivateTypeEthAddress}
          />);
      case 'importPublicEthAddress':
        return (<ImportPublicEthAddress
          navigateBack={this.navigateExistingEthAddress}
          importPublicEthAddress={this.importPublicEthAddress}
          importPublicEthAddressKeyDown={this.importPublicEthAddressKeyDown}
          />);
      case 'importPrivateTypeEthAddress':
        return (<ImportPrivateTypeEthAddress
          navigateBack={this.navigateExistingEthAddress}
          navigateImportPrivateEthAddress={this.navigateImportPrivateEthAddress}
          />);
      case 'importPrivateEthAddress':
        return (<ImportPrivateEthAddress
          navigateBack={this.navigateImportPrivateTypeEthAddress}
          importPrivateEthAddress={this.importPrivateEthAddress}
          onImportKeyDown={this.importPrivateEthAddressKeyDown}
          keyType={this.state.ethPrivateKeyType}
          />);
      case 'createEthAddress':
        return (<CreateEthAddres
          handleChange={this.handleChange}
          createEthAddress={this.createEthAddress}
          navigateBack={this.navigateHaveEthAddress}
          onCreateKeyDown={this.createEthAddressKeyDown}
          />);
      case 'haveWanAddress':
        return (<HaveWanAddress
          navigateBack={this.navigateHaveEthAddress}
          navigateExistingWanAddress={this.navigateExistingWanAddress}
          navigateCreateWanAddress={this.navigateCreateWanAddress}
          />)
      case 'storeWanAddress':
        return (<StoreWanAddress
          navigateBack={this.navigateHaveWanAddress}
          navigateImportPublicWanAddress={this.navigateImportPublicWanAddress}
          navigateImportPrivateTypeWanAddress={this.navigateImportPrivateTypeWanAddress}
          />)
      case 'importPublicWanAddress':
        return (<ImportPublicWanAddress
          navigateBack={this.navigateExistingWanAddress}
          importPublicWanAddress={this.importPublicWanAddress}
          importPublicWanAddressKeyDown={this.importPublicWanAddressKeyDown}
          />)
      case 'importPrivateTypeWanAddress':
        return (<ImportPrivateTypeWanAddress
          navigateBack={this.navigateExistingWanAddress}
          navigateImportPrivateWanAddress={this.navigateImportPrivateWanAddress}
          />)
      case 'importPrivateWanAddress':
        return (<ImportPrivateWanAddress
          navigateBack={this.navigateImportPrivateTypeWanAddress}
          importPrivateWanAddress={this.importPrivateWanAddress}
          onImportKeyDown={this.importPrivateWanAddressKeyDown}
          keyType={this.state.wanPrivateKeyType}
          />)
      case 'createWanAddress':
        return (<CreateWanAddress
          handleChange={this.handleChange}
          createWanAddress={this.createWanAddress}
          navigateBack={this.navigateHaveWanAddress}
          onCreateKeyDown={this.createWanAddressKeyDown}
          />)
      case 'kycIDDOcument':
        return (<KYCIDDocument
          navigateBack={this.navigateHaveWanAddress}
          uploadIDDocument={this.uploadIDDocument}
          navigateUploadPhoto={this.navigateUploadPhoto}
          />)
      case 'kycPhoto':
        return (<KYCPhoto
          navigateBack={this.navigateKYCIDDocument}
          uploadPhoto={this.uploadPhoto}
          navigateJoinWhitelist={this.navigateJoinWhitelist}
          />)
      case 'joinWhitelist':
        return (<JoinWhitelist
          handleChange={this.handleChange}
          joinWhitelist={this.joinWhitelist}
          notNow={this.notNow}
          />)
      case 'whitelistJoined':
        return (<WhitelistJoined
          handleChange={this.handleChange}
          done={this.done}
          />)
      default:
        return (<AcceptTermsAndConditions
          acceptTerms={this.acceptTerms}
          readTerms={this.readTerms}
        />)
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

export default (Whitelist);
