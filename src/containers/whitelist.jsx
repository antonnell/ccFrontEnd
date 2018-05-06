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

let ethEmitter = require('../store/ethStore.js').default.emitter
let ethDispatcher = require('../store/ethStore.js').default.dispatcher

let wanEmitter = require('../store/wanStore.js').default.emitter
let wanDispatcher = require('../store/wanStore.js').default.dispatcher


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

      termsOpened: false,
      cryptocurveWallet: false,
      allocation: 1000,
      loadingAddress: true,
      contributionAddress: '	0x4a48c693B100775d66C8E0Cf9B32663Cf1996838',

      ethAddressName: '',
      ethAddressNameError: false,
      ethAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts',
      ethAddressNameValid: false,
      ethPublicAddress: '',
      ethPublicAddressError: false,
      ethPublicAddressErrorMessage: '',
      ethPublicAddressValid: false,
      ethPrivateKey: '',
      ethPrivateKeyError: false,
      ethPrivateKeyErrorMessage: '',
      ethMnemonic: '',
      ethMnemonicError: false,
      ethMnemonicErrorMessage: '',
      ethJSONV3: '',
      ethJSONV3Error: false,
      ethJSONV3ErrorMessage: '',

      wanAddressName: '',
      wanAddressNameError: false,
      wanAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts',
      wanAddressNameValid: false,
      wanPublicAddress: '',
      wanPublicAddressError: false,
      wanPublicAddressErrorMessage: '',
      wanPrivateKey: '',
      wanPrivateKeyError: false,
      wanMnemonic: '',
      wanMnemonicError: false,
      wanJSONV3: '',
      wanJSONV3Error: false,

      idDocumentFile: null,
      idDocumentImagePreviewUrl: null,

      photoFile: null,
      photoImagePreviewUrl: null,

      whitelistObjet: {
        user: {
          emailAddress: '',
          maxAllocation: '',
          remainingAllocation: '',
          totalAllocation: '',
          whitelisted: true/false,
          canWhitelist: true/false
        },
        termsAndConditions: {
          accepted: true,
        },
        ethAddress: {
          publicAddress: '',
          publicAddressName: '',
          privateKey: '',
          privateKeyPassword: '',
          mnemonic:'',
          mnemonicPassword: '',
          jsonv3: '',
          jsonv3Password: ''
        },
        wanAddress: {
          publicAddress: '',
          publicAddressName: '',
          privateKey: '',
          privateKeyPassword: '',
          mnemonic:'',
          mnemonicPassword: '',
          jsonv3: '',
          jsonv3Password: ''
        },
        kyc: {
          idDocumentUuid: '',
          photoUuid: ''
        },
        currentScreen: ''
      }
    };
  },

  componentWillMount() {
    ethEmitter.on('createEthAddress', this.createEthAddressReturned);
    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
  },

  validateEthPassword() {
    this.setState({ ethPasswordValid: true })
  },
  validateWanPassword() {
    this.setState({ wanPasswordValid: true })
  },

  validateETHAddress(ethPublicAddress) {
    this.setState({ ethPublicAddressValid: false })
    if (!ethPublicAddress) {
      ethPublicAddress = this.state.ethPublicAddress
    }
    this.setState({ ethPublicAddressError: false, ethPublicAddressErrorMessage: '' });
    if (!isEthereumAddress(ethPublicAddress)) {
      this.setState({ ethPublicAddressError: true, ethPublicAddressErrorMessage: 'Invalid Ethereum Address' });
      return false
    } else {
      this.setState({ ethPublicAddressValid: true })
    }
    return true
  },
  validateETHAddressName(ethAddressName) {
    this.setState({ ethAddressNameValid: false })
    if (!ethAddressName) {
      ethAddressName = this.state.ethAddressName
    }
    this.setState({ ethAddressNameError: false, ethAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts' });
    if (ethAddressName === '') {
      this.setState({ ethAddressNameError: true, ethAddressNameErrorMessage: 'Invalid Ethereum Address Name' });
      return false
    } else {
      this.setState({ ethAddressNameValid: true })
    }
    return true
  },
  validateWANAddress(wanPublicAddress) {
    this.setState({ wanPublicAddressValid: false })
    if (!wanPublicAddress) {
      wanPublicAddress = this.state.wanPublicAddress
    }
    this.setState({ wanPublicAddressError: false, wanPublicAddressErrorMessage: '' });
    /*const isEthereumValid = isEthereumAddress(wanPublicAddress)
    if (!isEthereumValid) {
      this.setState({ wanPublicAddressError: true, wanPublicAddressErrorMessage: 'Invalid Wanchain Address' });
      return false
    } else if (isEthereumValid) {
      this.setState({ wanPublicAddressValid: true, wanPublicAddressError: true, wanPublicAddressErrorMessage: 'This address is not compatible with the official wanchain wallet, are you sure you want to proceed?' });
      return true
    } else {*/
      this.setState({ wanPublicAddressValid: true })
    //}
    return true
  },
  validateWANAddressName(wanAddressName) {
    this.setState({ wanAddressNameValid: false })
    if (!wanAddressName) {
      wanAddressName = this.state.wanAddressName
    }
    this.setState({ wanAddressNameError: false, wanAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts' });
    if (wanAddressName === '') {
      this.setState({ wanAddressNameError: true, wanAddressNameErrorMessage: 'Invalid Wanchain Address Name' });
      return false
    } else {
      this.setState({ wanAddressNameValid: true })
    }
    return true
  },
  validateEthPrivateAddress(address) {
    this.setState({ ethPrivateKeyError: false, ethPrivateKeyErrorMessage: '', ethPrivateAddressValid: false });
    switch (this.state.ethPrivateKeyType) {
      case 'privateKey':
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid Private Key' });
          return false
        }
        break;
      case 'mnemonic':
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid Mnemonic' });
          return false
        }
        break;
      case 'jsonV3':
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid JSON' });
          return false
        }
        break;
      default:

    }

    this.setState({ ethPrivateKeyError: false, ethPrivateKeyErrorMessage: '', ethPrivateAddressValid: true })

  },
  validateWanPrivateAddress(address) {
    this.setState({ wanPrivateKeyError: false, wanPrivateKeyErrorMessage: '', wanPrivateAddressValid: false });
    switch (this.state.wanPrivateKeyType) {
      case 'privateKey':
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid Private Key' });
          return false
        }
        break;
      case 'mnemonic':
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid Mnemonic' });
          return false
        }
        break;
      case 'jsonV3':
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid JSON' });
          return false
        }
        break;
      default:

    }

    this.setState({ wanPrivateKeyError: false, wanPrivateKeyErrorMessage: '', wanPrivateAddressValid: true })
  },

  acceptTerms() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.termsAndConditions.accepted = true;

    this.setState({whitelistScreen: 'haveEthAddress', activeStep: 1, completed, whitelistObjet})
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

  selectEthAddress(address) {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.ethAddress = address;

    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed, whitelistObjet})
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

  onCreateEthAddressKeyDown(event) {
    if (event.which == 13) {
      this.createEthAddress()
    }
  },

  createEthAddress() {
    if (this.validateETHAddressName()) {
      this.setState({loading: true});
      var content = { username: this.props.user.username, name: this.state.ethAddressName, isPrimary: true };
      ethDispatcher.dispatch({type: 'createEthAddress', content, token: this.props.user.token });
    }
  },

  createEthAddressReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;

      var whitelistObjet = this.state.whitelistObjet;
      whitelistObjet.ethAddress = { name: this.state.ethAddressName };

      this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed, whitelistObjet})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importPublicEthAddress() {
    if (this.validateETHAddress()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;

      var whitelistObjet = this.state.whitelistObjet;
      whitelistObjet.ethAddress = { publicAddress: this.state.ethPublicAddress };

      this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed, whitelistObjet})
    }
  },

  importPrivateEthAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.wanAddress = { privateKey: this.state.wanPrivateKey, mnemonic: this.state.wanMnemonic, jsonV3: this.state.jsonV3 };

    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2, completed, whitelistObjet})
  },

  navigateHaveWanAddress() {
    this.setState({whitelistScreen: 'haveWanAddress', activeStep: 2})
  },

  selectWanAddress(address) {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.wanAddress = address;

    this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed, whitelistObjet})
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

  onCreateWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.createWanAddress()
    }
  },

  createWanAddress() {
    if (this.validateWANAddressName()) {
      this.setState({loading: true});
      var content = { username: this.props.user.username, name: this.state.wanAddressName, isPrimary: true };
      wanDispatcher.dispatch({type: 'createWanAddress', content, token: this.props.user.token });
    }
  },

  createWanAddressReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;

      var whitelistObjet = this.state.whitelistObjet;
      whitelistObjet.wanAddress = { name: this.state.wanAddressName };

      this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed, whitelistObjet})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importPublicWanAddress() {
    if (this.validateWANAddress()) {
      var completed = this.state.completed;
      completed[this.state.activeStep] = true;

      var whitelistObjet = this.state.whitelistObjet;
      whitelistObjet.wanAddress = { publicAddress: this.state.wanPublicAddress };

      this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed, whitelistObjet})
    }
  },

  importPrivateWanAddress() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.wanAddress = { privateKey: this.state.wanPrivateKey, mnemonic: this.state.wanMnemonic, jsonV3: this.state.jsonV3 };

    this.setState({whitelistScreen: 'kycIDDOcument', activeStep: 3, completed, whitelistObjet})
  },

  navigateKYCIDDocument() {
    this.setState({whitelistScreen: 'kycIDDOcument'})
  },

  uploadIDDocument(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        idDocumentFile: file,
        idDocumentImagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  },

  navigateUploadPhoto() {
    this.setState({whitelistScreen: 'kycPhoto'})
  },

  uploadPhoto(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photoFile: file,
        photoImagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  },

  navigateJoinWhitelist() {
    var completed = this.state.completed;
    completed[this.state.activeStep] = true;

    var whitelistObjet = this.state.whitelistObjet;
    whitelistObjet.kyc = { idDocument: this.state.idDocumentFile, photo: this.state.photoFile };

    this.setState({whitelistScreen: 'whitelistJoined', activeStep: 4, completed, whitelistObjet})
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

  checkIfEthPasswordProtected(value) {
    var isEthPasswordProtected = false;
    var isEthPasswordCorrect = false;
    switch (this.state.ethPrivateKeyType) {
      case 'privateKey':
        if(value.length == 128 || value.length == 132) {
          isEthPasswordProtected = true;
        } else {
          isEthPasswordCorrect = true;
        }
        break;
      case 'mnemonic':
        isEthPasswordProtected = true;
        break;
      case 'jsonV3':
        isEthPasswordProtected = true;
        break;
      default:

    }

    this.setState({isEthPasswordProtected, isEthPasswordCorrect})
  },

  checkIfWanPasswordProtected(value) {
    var isWanPasswordProtected = false;
    var isWanPasswordCorrect = false;
    switch (this.state.wanPrivateKeyType) {
      case 'privateKey':
        if(value.length == 128 || value.length == 132) {
          isWanPasswordProtected = true;
        } else {
          isWanPasswordCorrect = true;
        }
        break;
      case 'mnemonic':
        isWanPasswordProtected = true;
        break;
      case 'jsonV3':
        isWanPasswordProtected = true;
        break;
      default:

    }

    this.setState({isWanPasswordProtected, isWanPasswordCorrect})
  },

  unlockPrivateEthAddress() {
    switch (this.state.ethPrivateKeyType) {
      case 'privateKey':
        this.setState({isEthPasswordCorrect: true})
        break;
      case 'mnemonic':
        this.setState({isEthPasswordCorrect: true})
        break;
      case 'jsonV3':
        this.setState({isEthPasswordCorrect: true})
        break;
      default:

    }
  },

  unlockPrivateWanAddress() {
    switch (this.state.wanPrivateKeyType) {
      case 'privateKey':
        this.setState({isWanPasswordCorrect: true})
        break;
      case 'mnemonic':
        this.setState({isWanPasswordCorrect: true})
        break;
      case 'jsonV3':
        this.setState({isWanPasswordCorrect: true})
        break;
      default:

    }
  },

  renderStepper() {
    if(['xs', 'sm'].includes(this.props.size)) {
      return (
        <Card style={{padding: '0px'}}>
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
    console.log(this.state.whitelistObjet)
    switch (this.state.whitelistScreen) {
      case 'acceptTermsAndConditions':
        return (<AcceptTermsAndConditions
          acceptTerms={this.acceptTerms}
          readTerms={this.readTerms}
          termsOpened={this.state.termsOpened}
        />);
      case 'haveEthAddress':
        return (<HaveEthAddress
          ethAddresses={this.props.ethAddresses}
          selectAddress={this.selectEthAddress}
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
          ethPublicAddress={this.state.ethPublicAddress}
          ethPublicAddressError={this.state.ethPublicAddressError}
          ethPublicAddressErrorMessage={this.state.ethPublicAddressErrorMessage}
          ethPublicAddressValid={this.state.ethPublicAddressValid}
          importPublicEthAddress={this.importPublicEthAddress}
          importPublicEthAddressKeyDown={this.importPublicEthAddressKeyDown}
          handleChange={this.handleChange}
          />);
      case 'importPrivateTypeEthAddress':
        return (<ImportPrivateTypeEthAddress
          navigateBack={this.navigateExistingEthAddress}
          navigateImportPrivateEthAddress={this.navigateImportPrivateEthAddress}
          />);
      case 'importPrivateEthAddress':
        return (<ImportPrivateEthAddress
          handleChange={this.handleChange}
          navigateBack={this.navigateImportPrivateTypeEthAddress}
          importPrivateEthAddress={this.importPrivateEthAddress}
          onImportKeyDown={this.importPrivateEthAddressKeyDown}
          keyType={this.state.ethPrivateKeyType}
          ethPrivateKey={this.state.ethPrivateKey}
          ethPrivateKeyError={this.state.ethPrivateKeyError}
          ethMnemonic={this.state.ethMnemonic}
          ethMnemonicError={this.state.ethMnemonicError}
          ethMnemonicErrorMessage={this.state.ethMnemonicErrorMessage}
          ethJSONV3={this.state.ethJSONV3}
          ethJSONV3Error={this.state.ethJSONV3Error}
          ethJSONV3ErrorMessage={this.state.ethJSONV3ErrorMessage}
          checkIfEthPasswordProtected={this.checkIfEthPasswordProtected}
          isEthPasswordProtected={this.state.isEthPasswordProtected}
          passwordRequired={this.state.isEthPasswordProtected}
          passwordCorrect={this.state.isEthPasswordCorrect}
          ethPassword={this.state.ethPassword}
          unlockPrivateEthAddress={this.unlockPrivateEthAddress}
          ethPrivateAddressValid={this.state.ethPrivateAddressValid}
          ethPasswordValid={this.state.ethPasswordValid}
          />);
      case 'createEthAddress':
        return (<CreateEthAddres
          loading={this.state.loading}
          handleChange={this.handleChange}
          createEthAddress={this.createEthAddress}
          navigateBack={this.navigateHaveEthAddress}
          onCreateKeyDown={this.createEthAddressKeyDown}
          ethAddressName={this.state.ethAddressName}
          ethAddressNameError={this.state.ethAddressNameError}
          ethAddressNameErrorMessage={this.state.ethAddressNameErrorMessage}
          ethAddressNameValid={this.state.ethAddressNameValid}
          />);
      case 'haveWanAddress':
        return (<HaveWanAddress
          wanAddresses={this.props.wanAddresses}
          selectAddress={this.selectWanAddress}
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
          wanPublicAddress={this.state.wanPublicAddress}
          wanPublicAddressError={this.state.wanPublicAddressError}
          wanPublicAddressErrorMessage={this.state.wanPublicAddressErrorMessage}
          wanPublicAddressValid={this.state.wanPublicAddressValid}
          />)
      case 'importPrivateTypeWanAddress':
        return (<ImportPrivateTypeWanAddress
          navigateBack={this.navigateExistingWanAddress}
          navigateImportPrivateWanAddress={this.navigateImportPrivateWanAddress}
          />)
      case 'importPrivateWanAddress':
        return (<ImportPrivateWanAddress
          handleChange={this.handleChange}
          navigateBack={this.navigateImportPrivateTypeWanAddress}
          importPrivateWanAddress={this.importPrivateWanAddress}
          onImportKeyDown={this.importPrivateWanAddressKeyDown}
          keyType={this.state.wanPrivateKeyType}
          wanPrivateKey={this.state.wanPrivateKey}
          wanPrivateKeyError={this.state.wanPrivateKeyError}
          wanPrivateKeyErrorMessage={this.state.wanPrivateKeyErrorMessage}
          wanMnemonic={this.state.wanMnemonic}
          wanMnemonicError={this.state.wanMnemonicError}
          wanMnemonicErrorMessage={this.state.wanMnemonicErrorMessage}
          wanJSONV3={this.state.wanJSONV3}
          wanJSONV3Error={this.state.wanJSONV3Error}
          wanJSONV3ErrorMessage={this.state.wanJSONV3ErrorMessage}
          passwordRequired={this.state.isWanPasswordProtected}
          isWanPasswordProtected={this.state.isWanPasswordProtected}
          passwordCorrect={this.state.isWanPasswordCorrect}
          wanPassword={this.state.wanPassword}
          unlockPrivateWanAddress={this.unlockPrivateWanAddress}
          wanPrivateAddressValid={this.state.wanPrivateAddressValid}
          wanPasswordValid={this.state.wanPasswordValid}
          />)
      case 'createWanAddress':
        return (<CreateWanAddress
          loading={this.state.loading}
          handleChange={this.handleChange}
          createWanAddress={this.createWanAddress}
          navigateBack={this.navigateHaveWanAddress}
          onCreateKeyDown={this.createWanAddressKeyDown}
          wanAddressName={this.state.wanAddressName}
          wanAddressNameError={this.state.wanAddressNameError}
          wanAddressNameErrorMessage={this.state.wanAddressNameErrorMessage}
          wanAddressNameValid={this.state.wanAddressNameValid}
          />)
      case 'kycIDDOcument':
        return (<KYCIDDocument
          navigateBack={this.navigateHaveWanAddress}
          uploadIDDocument={this.uploadIDDocument}
          navigateUploadPhoto={this.navigateUploadPhoto}
          idDocumentFile={this.state.idDocumentFile}
          idDocumentImagePreviewUrl={this.state.idDocumentImagePreviewUrl}
          />)
      case 'kycPhoto':
        return (<KYCPhoto
          navigateBack={this.navigateKYCIDDocument}
          uploadPhoto={this.uploadPhoto}
          navigateJoinWhitelist={this.navigateJoinWhitelist}
          photoFile={this.state.photoFile}
          photoImagePreviewUrl={this.state.photoImagePreviewUrl}
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
          ethPublicAddress={this.state.ethPublicAddress}
          ethAddressName={this.state.ethAddressName}
          wanPublicAddress={this.state.wanPublicAddress}
          wanAddressName={this.state.wanAddressName}
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
      if (name==="ethPublicAddress") {
        this.validateETHAddress(event.target.value)
      } if (name==="wanPublicAddress") {
        this.validateWANAddress(event.target.value)
      } else if  (name==="ethAddressName") {
        this.validateETHAddressName(event.target.value)
      } else if  (name==="wanAddressName") {
        this.validateWANAddressName(event.target.value)
      } else if (['ethPrivateKey', 'ethMnemonic', 'ethJSONV3'].includes(name)) {
        this.validateEthPrivateAddress(event.target.value)
        this.checkIfEthPasswordProtected(event.target.value)
      } else if (['wanPrivateKey', 'wanMnemonic', 'wanJSONV3'].includes(name)) {
        this.validateWanPrivateAddress(event.target.value)
        this.checkIfWanPasswordProtected(event.target.value)
      } else if (name==='ethPassword') {
        this.validateEthPassword(event.target.value)
      } else if (name==='wanPassword') {
        this.validateWanPassword(event.target.value)
      }
    }
  },

})

export default (Whitelist);
