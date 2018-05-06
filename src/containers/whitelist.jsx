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

const isEthereumAddress  = require('is-ethereum-address');

let Whitelist = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      termsOpen: false,
      whitelistScreen: 'acceptTermsAndConditions',
      activeStep: 0,
      steps: ['Accept Terms and Conditions', 'Setup Ethereum Address', 'Setup Wanchain Address', 'KYC', 'Join the Whitelist'],
      completed: {},
      ethereumAddress: '',
      ethereumAddressError: false,
      ethereumAddressErrorMessage: '',
      ethereumAddressValid: false,
      wanchainAddress: '',
      wanchainAddressError: false,
      wanchainAddressErrorMessage: '',
      termsOpened: false,
      ethereumAddressName: '',
      ethereumAddressNameError: false,
      ethereumAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts',
      ethereumAddressNameValid: false,
      wanchainAddressName: '',
      wanchainAddressNameError: false,
      wanchainAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts',
      wanchainAddressNameValid: false,
      cryptocurveWallet: false,
      allocation: 1000,
      loadingAddress: true,
      contributionAddress: '	0x4a48c693B100775d66C8E0Cf9B32663Cf1996838'
    };
  },

  validateETHAddress(ethereumAddress) {
    if (!ethereumAddress) {
      ethereumAddress = this.state.ethereumAddress
    }
    this.setState({ ethereumAddressError: false, ethereumAddressErrorMessage: '' });
    if (!isEthereumAddress(ethereumAddress)) {
      this.setState({ ethereumAddressError: true, ethereumAddressErrorMessage: 'Invalid Ethereum Address' });
      return false
    } else {
      this.setState({ ethereumAddressValid: true })
    }
    return true
  },
  validateETHAddressName(ethereumAddressName) {
    if (!ethereumAddressName) {
      ethereumAddressName = this.state.ethereumAddressName
    }
    this.setState({ ethereumAddressNameError: false, ethereumAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts' });
    if (ethereumAddressName === '') {
      this.setState({ ethereumAddressNameError: true, ethereumAddressNameErrorMessage: 'Invalid Ethereum Address Name' });
      return false
    } else {
      this.setState({ ethereumAddressNameValid: true })
    }
    return true
  },
  validateWANAddress(wanchainAddress) {
    if (!wanchainAddress) {
      wanchainAddress = this.state.wanchainAddress
    }
    this.setState({ wanchainAddressError: false, wanchainAddressErrorMessage: '' });
    const isEthereumValid = isEthereumAddress(wanchainAddress)
    if (!isEthereumValid) {
      this.setState({ wanchainAddressError: true, wanchainAddressErrorMessage: 'Invalid Wanchain Address' });
      return false
    } else if (isEthereumValid) {
      this.setState({ wanchainAddressValid: true, wanchainAddressError: true, wanchainAddressErrorMessage: 'This address is not compatible with the official wanchain wallet, are you sure you want to proceed?' });
      return true
    } else {
      this.setState({ wanchainAddressValid: true })
    }
    return true
  },
  validateWANAddressName(wanchainAddressName) {
    if (!wanchainAddressName) {
      wanchainAddressName = this.state.wanchainAddressName
    }
    this.setState({ wanchainAddressNameError: false, wanchainAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts' });
    if (wanchainAddressName === '') {
      this.setState({ wanchainAddressNameError: true, wanchainAddressNameErrorMessage: 'Invalid Wanchain Address Name' });
      return false
    } else {
      this.setState({ wanchainAddressNameValid: true })
    }
    return true
  },

  acceptTerms() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;
    this.setState({whitelistScreen: 'haveEthAddress', activeStep: 1, completed})
  },

  navigateHaveEthAddress() {
    this.setState({whitelistScreen: 'haveEthAddress', activeStep: 1, cryptocurveWallet:false})
  },

  readTerms() {
    this.setState({termsOpen: true, termsOpened: true})
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
    if (this.validateETHAddressName()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;
      this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed, cryptocurveWallet:true})
    }
  },

  importPublicEthAddress() {
    if (this.validateETHAddress()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;
      this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed})
    }
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
    if (this.validateWANAddressName()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;
      this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed})
    }
  },

  importPublicWanAddress() {
    if (this.validateWANAddress()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;
      this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed})
    }
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

  sendFromMEW() {
    window.open('https://www.myetherwallet.com/?to='+this.state.contributionAddress+'&value='+this.state.allocation+'#send-transaction')
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
          termsOpened={this.state.termsOpened}
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
          handleChange={this.handleChange}
          ethereumAddress={this.state.ethereumAddress}
          ethereumAddressError={this.state.ethereumAddressError}
          ethereumAddressErrorMessage={this.state.ethereumAddressErrorMessage}
          ethereumAddressValid={this.state.ethereumAddressValid}
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
          ethereumAddressName={this.state.ethereumAddressName}
          ethereumAddressNameError={this.state.ethereumAddressNameError}
          ethereumAddressNameErrorMessage={this.state.ethereumAddressNameErrorMessage}
          ethereumAddressNameValid={this.state.ethereumAddressNameValid}
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
          handleChange={this.handleChange}
          wanchainAddress={this.state.wanchainAddress}
          wanchainAddressError={this.state.wanchainAddressError}
          wanchainAddressErrorMessage={this.state.wanchainAddressErrorMessage}
          wanchainAddressValid={this.state.wanchainAddressValid}
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
          wanchainAddressName={this.state.wanchainAddressName}
          wanchainAddressNameError={this.state.wanchainAddressNameError}
          wanchainAddressNameErrorMessage={this.state.wanchainAddressNameErrorMessage}
          wanchainAddressNameValid={this.state.wanchainAddressNameValid}
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
        var that = this
        setTimeout(function() {
          that.setState({loadingAddress:false})
        },2000)
        return (<WhitelistJoined
          ethereumAddress={this.state.ethereumAddress}
          ethereumAddressName={this.state.ethereumAddressName}
          wanchainAddress={this.state.wanchainAddress}
          wanchainAddressName={this.state.wanchainAddressName}
          allocation={this.state.allocation}
          loadingAddress={this.state.loadingAddress}
          contributionAddress={this.state.contributionAddress}
          handleChange={this.handleChange}
          onwWallet={this.state.cryptocurveWallet}
          done={this.done}
          sendFromMEW={this.sendFromMEW}
          cryptocurveWallet={this.state.cryptocurveWallet}
          />)
      default:
        return (<AcceptTermsAndConditions
          acceptTerms={this.acceptTerms}
          readTerms={this.readTerms}
          termsOpened={this.state.termsOpened}
        />)
    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
      if (name==="ethereumAddress") {
        this.validateETHAddress(event.target.value)
      } if (name==="wanchainAddress") {
        this.validateWANAddress(event.target.value)
      } else if  (name==="ethereumAddressName") {
        this.validateETHAddressName(event.target.value)
      } else if  (name==="wanchainAddressName") {
        this.validateWANAddressName(event.target.value)
      }
    }
  },

})

export default (Whitelist);
