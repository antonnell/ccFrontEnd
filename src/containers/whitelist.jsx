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

let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher


const isEthereumAddress  = require('is-ethereum-address');

let Whitelist = createReactClass({
  getInitialState() {
    return {
      loading: false,
      unlockLoading: false,
      error: null,
      termsOpen: false,
      steps: ['Accept Terms and Conditions', 'Setup Ethereum Address', 'Setup Wanchain Address', 'KYC', 'Join the Whitelist'],
      termsOpened: false,

      cryptocurveWallet: false,
      loadingAddress: true,
      contributionAddress: '0x4a48c693B100775d66C8E0Cf9B32663Cf1996838',

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
      wanPrivateKeyErrorMessage: '',
      wanMnemonic: '',
      wanMnemonicError: false,
      wanMnemonicErrorMessage: '',
      wanJSONV3: '',
      wanJSONV3Error: false,
      wanJSONV3ErrorMessage: '',

      idDocumentFile: null,
      idDocumentImagePreviewUrl: null,

      photoFile: null,
      photoImagePreviewUrl: null,

      ethPassword: '',
      wanPassword: '',
      isEthPasswordProtected: false,
      isWanPasswordProtected: false,
      isEthPasswordCorrect: false,
      isWanPasswordCorrect: false,
      ethPasswordValid: false,
      wanPasswordValid: false
    };
  },

  componentWillMount() {
    ethEmitter.on('createEthAddress', this.createEthAddressReturned);
    wanEmitter.on('createWanAddress', this.createWanAddressReturned);
    whitelistEmitter.on('uploadFileKYC', this.uploadFileKYCReturned);
    whitelistEmitter.on('uploadFileID', this.uploadFileIDReturned);

    wanEmitter.on('getWanAddress', this.getWanAddressReturned);
  },

  componentWillUnmount() {
    ethEmitter.removeAllListeners('createEthAddress');
    wanEmitter.removeAllListeners('createWanAddress');
    whitelistEmitter.removeAllListeners('uploadFileKYC');
    whitelistEmitter.removeAllListeners('uploadFileID');

    wanEmitter.removeAllListeners('getWanAddress');
  },

  setWhitelistStateReturned(error, data) {
    if(error) {
      console.log(error.toString())
    }
    //fire and forget.
    //Perhaps show a sncakbar if we have an error? not sure.
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
    const isEthereumValid = isEthereumAddress(wanPublicAddress)
    if (!isEthereumValid) {
      this.setState({ wanPublicAddressError: true, wanPublicAddressErrorMessage: 'Invalid Wanchain Address' });
      return false
    } else if (isEthereumValid) {
      this.setState({ wanPublicAddressValid: true, wanPublicAddressError: true, wanPublicAddressErrorMessage: 'This address is not compatible with the official wanchain wallet, are you sure you want to proceed?' });
      return true
    } else {
      this.setState({ wanPublicAddressValid: true })
    }
    return true
  },
  validateWANAddressName(wanAddressName) {
    this.setState({ wanAddressNameValid: false })
    if (!wanAddressName) {
      wanAddressName = this.state.wanAddressName;
    }
    this.setState({ wanAddressNameError: false, wanAddressNameErrorMessage: 'Just a name for your account, you will use this to identify your accounts' });
    if (wanAddressName === '') {
      this.setState({ wanAddressNameError: true, wanAddressNameErrorMessage: 'Invalid Wanchain Address Name' });
      return false;
    } else {
      this.setState({ wanAddressNameValid: true });
    }
    return true;
  },
  validateEthPrivateAddress(address) {
    this.setState({ ethPrivateKeyError: false, ethPrivateKeyErrorMessage: '', ethPrivateAddressValid: false });
    switch (this.state.ethPrivateKeyType) {
      case 'privateKey':
        if (!address) {
          address = this.state.ethPrivateKey;
        }
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid Private Key' });
          return false;
        }
        break;
      case 'mnemonic':
        if (!address) {
          address = this.state.ethMnemonic;
        }
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid Mnemonic' });
          return false;
        }
        break;
      case 'jsonV3':
        if (!address) {
          address = this.state.ethJSONV3;
        }
        if (address === '') {
          this.setState({ ethPrivateKeyError: true, ethPrivateKeyErrorMessage: 'Invalid JSON' });
          return false;
        }
        break;
      default:

    }

    this.setState({ ethPrivateKeyError: false, ethPrivateKeyErrorMessage: '', ethPrivateAddressValid: true })
    return true;
  },
  validateWanPrivateAddress(address) {
    this.setState({ wanPrivateKeyError: false, wanPrivateKeyErrorMessage: '', wanPrivateAddressValid: false });
    switch (this.state.wanPrivateKeyType) {
      case 'privateKey':
        if (!address) {
          address = this.state.wanPrivateKey;
        }
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid Private Key' });
          return false;
        }
        break;
      case 'mnemonic':
        if (!address) {
          address = this.state.wanMnemonic;
        }
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid Mnemonic' });
          return false;
        }
        break;
      case 'jsonV3':
        if (!address) {
          address = this.state.wanJSONV3;
        }
        if (address === '') {
          this.setState({ wanPrivateKeyError: true, wanPrivateKeyErrorMessage: 'Invalid JSON' });
          return false;
        }
        break;
      default:

    }
    this.setState({ wanPrivateKeyError: false, wanPrivateKeyErrorMessage: '', wanPrivateAddressValid: true });
    return true;
  },

  acceptTerms() {
    var whitelistObject = this.props.whitelistObject;
    var completed = whitelistObject.completed;
    completed[this.props.whitelistObject.activeStep] = true;
    whitelistObject.completed = completed;
    whitelistObject.activeStep = 1;

    whitelistObject.currentScreen = 'importPublicEthAddress';
    whitelistObject.termsAndConditions.accepted = true;

    this.props.setWhitelistState(whitelistObject);
  },

  navigateHaveEthAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.activeStep = 1;
    whitelistObject.currentScreen = 'haveEthAddress';

    this.props.setWhitelistState(whitelistObject);

    this.setState({cryptocurveWallet:false})
  },

  readTerms() {
    this.setState({termsOpen: true, termsOpened: true})
  },

  navigateTermsAndConditions() {

    var whitelistObject = this.props.whitelistObject;
    whitelistObject.activeStep = 1;
    whitelistObject.currentScreen = 'acceptTermsAndConditions';

    this.props.setWhitelistState(whitelistObject);
  },

  selectEthAddress(address) {
    var whitelistObject = this.props.whitelistObject;
    var completed = whitelistObject.completed;
    completed[this.props.whitelistObject.activeStep] = true;
    whitelistObject.completed = completed;
    whitelistObject.activeStep = 2;
    whitelistObject.ethAddress = address;
    whitelistObject.currentScreen = 'haveWanAddress';

    this.setState({ethPublicAddress: address.address})
    this.props.setWhitelistState(whitelistObject);
  },

  navigateExistingEthAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'storeEthAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPublicEthAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPublicEthAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPrivateTypeEthAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPrivateTypeEthAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPrivateEthAddress(type) {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPrivateEthAddress';

    this.props.setWhitelistState(whitelistObject);
    this.setState({ethPrivateKeyType: type})
  },

  navigateCreateEthAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'createEthAddress';

    this.props.setWhitelistState(whitelistObject);
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
      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 2;
      whitelistObject.ethAddress = { publicAddressName: this.state.ethAddressName };
      whitelistObject.currentScreen = 'haveWanAddress';

      this.props.setWhitelistState(whitelistObject);
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  importPublicEthAddress() {
    if (this.validateETHAddress()) {
      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 2;
      whitelistObject.ethAddress = { publicAddress: this.state.ethPublicAddress };
      whitelistObject.currentScreen = 'haveWanAddress';

      this.props.setWhitelistState(whitelistObject);
    }
  },

  importPrivateEthAddress() {
    if (this.validateEthPrivateAddress() && (this.state.isEthPasswordProtected === false || (this.state.isEthPasswordProtected === true && this.state.ethPasswordValid === true && this.state.isEthPasswordCorrect === true))) {

      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 2;
      whitelistObject.ethAddress = { privateKey: this.state.ethPrivateKey, mnemonic: this.state.ethMnemonic, jsonv3: this.state.ethJSONV3 };
      whitelistObject.currentScreen = 'haveWanAddress';

      this.props.setWhitelistState(whitelistObject);
    }
  },

  navigateHaveWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.activeStep = 2;
    whitelistObject.currentScreen = 'haveWanAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  selectWanAddress(address) {
    var whitelistObject = this.props.whitelistObject;
    var completed = whitelistObject.completed;
    completed[this.props.whitelistObject.activeStep] = true;
    whitelistObject.completed = completed;
    whitelistObject.activeStep = 3;
    whitelistObject.wanAddress = address;
    whitelistObject.currentScreen = 'kycIDDOcument';

    this.setState({wanPublicAddress: address.publicAddress})
    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPublicWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPublicWanAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPrivateTypeWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPrivateTypeWanAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportPrivateWanAddress(type) {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importPrivateWanAddress';

    this.props.setWhitelistState(whitelistObject);
    this.setState({wanPrivateKeyType: type})
  },

  navigateExistingWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'storeWanAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateImportWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'importWanAddress';

    this.props.setWhitelistState(whitelistObject);
  },

  navigateCreateWanAddress() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'createWanAddress';

    this.props.setWhitelistState(whitelistObject);
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
      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 3;
      whitelistObject.wanAddress = { publicAddressName: this.state.wanAddressName };
      whitelistObject.currentScreen = 'kycIDDOcument';

      //get ETH Addresses
      var content = {id: this.props.user.id};
      wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.props.user.token });

      this.props.setWhitelistState(whitelistObject);
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  getWanAddressReturned(error, data) {
    if(error) {
      return this.setState({error: error.toString()});
    }

    var that = this
    if(data.success) {

      console.log()
      var address = data.wanAddresses.filter((address) => {
        return address.name == that.state.wanAddressName
      })

      console.log(address)
      if(address.length > 0) {
        var whitelistObject = this.props.whitelistObject;
        whitelistObject.wanAddress.publicAddress = address[0].publicAddress;

        this.props.setWhitelistState(whitelistObject);
        this.setState({wanPublicAddress: address[0].publicAddress});
      } else {
        //eh, not sure?
      }

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, ethAddresses: []});
    } else {
      this.setState({error: data.statusText, ethAddresses: []});
    }
  },

  importPublicWanAddress() {
    if (this.validateWANAddress()) {
      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 3;
      whitelistObject.wanAddress = { publicAddress: this.state.wanPublicAddress };
      whitelistObject.currentScreen = 'kycIDDOcument';

      this.props.setWhitelistState(whitelistObject);
    }
  },

  importPrivateWanAddress() {
    if (this.validateWanPrivateAddress() && (this.state.isWanPasswordProtected === false || (this.state.isWanPasswordProtected === true && this.state.wanPasswordValid === true && this.state.isWanPasswordCorrect === true))) {

      var whitelistObject = this.props.whitelistObject;
      var completed = whitelistObject.completed;
      completed[this.props.whitelistObject.activeStep] = true;
      whitelistObject.completed = completed;
      whitelistObject.activeStep = 3;
      whitelistObject.wanAddress = { privateKey: this.state.wanPrivateKey, mnemonic: this.state.wanMnemonic, jsonV3: this.state.wanJSONV3 };
      whitelistObject.currentScreen = 'kycIDDOcument';

      this.props.setWhitelistState(whitelistObject);
    }
  },

  navigateKYCIDDocument() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'kycIDDOcument';

    this.props.setWhitelistState(whitelistObject);
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

    var data = new FormData()
    data.append('id', file)

    console.log(this.props.user)
    whitelistDispatcher.dispatch({ type: 'uploadFile', content:{ data:data, fileType: 'ID', emailAddress: this.props.user.email }, token: this.props.user.whitelistToken, tokenKey: this.props.user.whitelistTokenKey })
  },

  uploadFileIDReturned(error, data) {
    this.setState({uploadLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({idDocumentFileUuid: data.uuid})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  navigateUploadPhoto() {
    var whitelistObject = this.props.whitelistObject;
    whitelistObject.currentScreen = 'kycPhoto';

    this.props.setWhitelistState(whitelistObject);
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

    var data = new FormData()
    data.append('kyc', file)

    whitelistDispatcher.dispatch({ type: 'uploadFile', content:{ data:data, fileType: 'KYC', emailAddress: this.props.user.email }, token: this.props.user.whitelistToken, tokenKey: this.props.user.whitelistTokenKey })
  },

  uploadFileKYCReturned(error, data) {
    this.setState({uploadLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({photoFileUuid: data.uuid})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  navigateJoinWhitelist() {
    var whitelistObject = this.props.whitelistObject;
    var completed = whitelistObject.completed;
    completed[this.props.whitelistObject.activeStep] = true;
    whitelistObject.completed = completed;
    whitelistObject.activeStep = 4;
    whitelistObject.kyc = { idDocumentUuid: this.state.idDocumentFileUuid, photoUuid: this.state.photoFileUuid };
    whitelistObject.currentScreen = 'whitelistJoined';

    this.props.setWhitelistState(whitelistObject);
  },

  joinWhitelist() {
    var whitelistObject = this.props.whitelistObject;
    var completed = whitelistObject.completed;
    completed[this.props.whitelistObject.activeStep] = true;
    whitelistObject.completed = completed;
    whitelistObject.currentScreen = 'whitelistJoined';

    this.props.setWhitelistState(whitelistObject);
  },

  notNow() {
    window.location.hash = 'ethAccounts'
  },

  done() {
    window.location.hash = 'ethAccounts'
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

  importPublicWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.importPublicWanAddress();
    }
  },

  importPrivateWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.importPrivateWanAddress();
    }
  },

  createWanAddressKeyDown(event) {
    if (event.which == 13) {
      this.createWanAddress();
    }
  },

  sendFromMEW() {
    window.open('https://www.myetherwallet.com/?to='+this.state.contributionAddress+'&value='+this.props.whitelistObject.user.remainingAllocation+'#send-transaction')
  },
  sendFromCC() {
    window.open('https://wallet.cryptocurve.xyz/account/send/?to='+this.state.contributionAddress+'&value='+this.props.whitelistObject.user.remainingAllocation)
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
    if(this.props.whitelistObject == null) {
      return (<Typography variant='headline' style={{marginTop: '150px'}}>Unfortunately you do not qualify for our presale.</Typography>)
    }

    if(['xs', 'sm'].includes(this.props.size)) {
      return (
        <Card style={{padding: '0px'}}>
          <CardContent>
            <Stepper orientation="vertical" steps={this.state.steps.length} activeStep={this.props.whitelistObject.activeStep} style={{background: 'inherit'}}>
              {this.state.steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel completed={this.props.whitelistObject.completed[index]}>{label}</StepLabel>
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
          <Stepper alternativeLabel activeStep={this.props.whitelistObject.activeStep} style={{background: 'inherit'}}>
            {this.state.steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel completed={this.props.whitelistObject.completed[index]}>{label}</StepLabel>
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
    if(this.props.whitelistObject == null) {
      return null
    }
    switch (this.props.whitelistObject.currentScreen) {
      case 'acceptTermsAndConditions':
        return (<AcceptTermsAndConditions
          acceptTerms={this.acceptTerms}
          readTerms={this.readTerms}
          termsOpened={this.state.termsOpened}
        />);
      /*case 'haveEthAddress':
        return (<HaveEthAddress
          ethAddresses={this.props.ethAddresses}
          selectAddress={this.selectEthAddress}
          navigateBack={this.navigateTermsAndConditions}
          navigateExistingEthAddress={this.navigateImportPublicEthAddress}
          navigateCreateEthAddress={this.navigateCreateEthAddress}
          />);
      case 'storeEthAddress':
        return (<StoreEthAddress
          navigateBack={this.navigateHaveEthAddress}
          navigateImportPublicEthAddress={this.navigateImportPublicEthAddress}
          navigateImportPrivateTypeEthAddress={this.navigateImportPrivateTypeEthAddress}
          />);*/
      case 'importPublicEthAddress':
        return (<ImportPublicEthAddress
          navigateBack={this.navigateTermsAndConditions}
          handleChange={this.handleChange}
          ethPublicAddress={this.state.ethPublicAddress}
          ethPublicAddressError={this.state.ethPublicAddressError}
          ethPublicAddressErrorMessage={this.state.ethPublicAddressErrorMessage}
          ethPublicAddressValid={this.state.ethPublicAddressValid}
          importPublicEthAddress={this.importPublicEthAddress}
          importPublicEthAddressKeyDown={this.importPublicEthAddressKeyDown}
          handleChange={this.handleChange}
          />);
      /*case 'importPrivateTypeEthAddress':
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
          />);*/
      case 'haveWanAddress':
        return (<HaveWanAddress
          wanAddresses={this.props.wanAddresses}
          selectAddress={this.selectWanAddress}
          navigateBack={this.navigateImportPublicEthAddress}
          navigateExistingWanAddress={this.navigateImportPublicWanAddress}
          navigateCreateWanAddress={this.navigateCreateWanAddress}
          />)
      /*case 'storeWanAddress':
        return (<StoreWanAddress
          navigateBack={this.navigateHaveWanAddress}
          navigateImportPublicWanAddress={this.navigateImportPublicWanAddress}
          navigateImportPrivateTypeWanAddress={this.navigateImportPrivateTypeWanAddress}
          />)*/
      case 'importPublicWanAddress':
        return (<ImportPublicWanAddress
          navigateBack={this.navigateHaveWanAddress}
          importPublicWanAddress={this.importPublicWanAddress}
          importPublicWanAddressKeyDown={this.importPublicWanAddressKeyDown}
          handleChange={this.handleChange}
          wanPublicAddress={this.state.wanPublicAddress}
          wanPublicAddressError={this.state.wanPublicAddressError}
          wanPublicAddressErrorMessage={this.state.wanPublicAddressErrorMessage}
          wanPublicAddressValid={this.state.wanPublicAddressValid}
          />)
      /*case 'importPrivateTypeWanAddress':
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
          checkIfWanPasswordProtected={this.checkIfWanPasswordProtected}
          isWanPasswordProtected={this.state.isWanPasswordProtected}
          passwordRequired={this.state.isWanPasswordProtected}
          passwordCorrect={this.state.isWanPasswordCorrect}
          wanPassword={this.state.wanPassword}
          unlockPrivateWanAddress={this.unlockPrivateWanAddress}
          wanPrivateAddressValid={this.state.wanPrivateAddressValid}
          wanPasswordValid={this.state.wanPasswordValid}
          />)*/
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
        console.log(this.props.whitelistObject)
        return (<WhitelistJoined
          ethPublicAddress={this.props.whitelistObject.ethAddress.publicAddress}
          wanPublicAddress={this.props.whitelistObject.wanAddress.publicAddress}
          allocation={this.props.whitelistObject.user.remainingAllocation}
          contributed={this.props.whitelistObject.user.remainingAllocation}
          loadingAddress={this.state.loadingAddress}
          contributionAddress={this.state.contributionAddress}
          handleChange={this.handleChange}
          onwWallet={this.state.cryptocurveWallet}
          done={this.done}
          sendFromMEW={this.sendFromMEW}
          sendFromCC={this.sendFromCC}
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
