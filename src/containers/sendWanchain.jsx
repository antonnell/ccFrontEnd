import React from 'react'
import SetupWanchainPayment from '../components/setupWanchainPayment'
import ConfirmWanchainPayment from '../components/confirmWanchainPayment'
import CompleteWanchainPayment from '../components/completeWanchainPayment'
import Stepper  from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Grid from '@material-ui/core/Grid';
import Card  from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const createReactClass = require('create-react-class')
let wanEmitter = require('../store/wanStore.js').default.emitter
let wanDispatcher = require('../store/wanStore.js').default.dispatcher
const isEthereumAddress  = require('is-ethereum-address');

let SendWanchain = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: 'setupWanchainPayment',
      steps: ['Set up your payment', 'Confirm the details', 'Results of the payment'],
      activeStep:  0,
      completed: {},

      contactValue: '',
      contactValid: false,
      contact: null,
      contactError: false,
      contactErrorMessage: '',

      accountValue: '',
      accountValid: false,
      account: null,
      accountError: false,
      accountErrorMessage: '',

      amount: '',
      amountValid: false,
      amountError: false,
      amountErrorMessage: '',

      gwei: '2',
      gweiValid: true,
      gweiError: false,
      gweiErrorMessage: '',

      ownReference: '',
      ownReferenceValid: false,
      ownReferenceError: false,
      ownReferenceErrorMessage: '',

      beneficiaryReference: '',
      beneficiaryReferenceValid: false,
      beneficiaryReferenceError: false,
      beneficiaryReferenceErrorMessage: '',

      publicAddress: '',
      publicAddressValid: true,
      publicAddressError: false,
      publicAddressErrorMessage: '',

      setupPaymentValid: false,

      transactionID: '',

      disclaimer: 'CryptoCurve accepts no responsibility for funds transferred to an incorrect public address. Please ensure that the address entered is the correct Wanchain Public Address of your recipient.'
    };
  },

  componentWillMount() {
    wanEmitter.on('sendWanchain', this.sendWanchainReturned);
  },

  componentWillUnmount() {
    wanEmitter.removeAllListeners('sendWanchain');
  },

  componentDidMount() {
    if(this.props.sendWanchainContact != null) {
      this.setState({
        contact: this.props.sendWanchainContact,
        contactValue: this.props.sendWanchainContact.primaryWanAddress,
        contactValid: true
      })
    }
    if(this.props.sendWanchainAccount != null) {
      this.setState({
        account: this.props.sendWanchainAccount,
        accountValue: this.props.sendWanchainAccount.publicAddress,
        accountValid: true
      })
    }
  },

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'setupWanchainPayment':
        return(<SetupWanchainPayment
          handleChange={this.handleChange}
          handleTabChange={this.handleTabChange}

          error={this.state.error}
          loading={this.state.loading}

          proceedClicked={this.proceedClicked}
          selectAddress={this.selectAddress}
          selectContact={this.selectContact}

          wanAddresses={this.props.wanAddresses}
          contacts={this.props.contacts}

          tabValue={this.state.tabValue}

          accountValue={this.state.accountValue}
          account={this.state.account}
          accountError={this.state.accountError}
          accountErrorMessage={this.state.accountErrorMessage}
          contactValue={this.state.contactValue}
          contact={this.state.contact}
          contactError={this.state.contactError}
          contactErrorMessage={this.state.contactErrorMessage}

          amount={this.state.amount}
          amountError={this.state.amountError}
          amountErrorMessage={this.state.amountErrorMessage}
          gwei={this.state.gwei}
          gweiError={this.state.gweiError}
          gweiErrorMessage={this.state.gweiErrorMessage}
          ownReference={this.state.ownReference}
          ownReferenceError={this.state.ownReferenceError}
          ownReferenceErrorMessage={this.state.ownReferenceErrorMessage}
          beneficiaryReference={this.state.beneficiaryReference}
          beneficiaryReferenceError={this.state.beneficiaryReferenceError}
          beneficiaryReferenceErrorMessage={this.state.beneficiaryReferenceErrorMessage}
          publicAddress={this.state.publicAddress}
          publicAddressError={this.state.publicAddressError}
          publicAddressErrorMessage={this.state.publicAddressErrorMessage}

          setupPaymentValid={this.state.setupPaymentValid}
          disclaimer={this.state.disclaimer}
          validateField={this.validateField}
        />)
      case 'confirmWanchainPayment':
        return (<ConfirmWanchainPayment
          confirmClicked={this.confirmClicked}
          backClicked={this.backClicked}

          loading={this.state.loading}

          tabValue={this.state.tabValue}

          account={this.state.account}
          contact={this.state.contact}

          amount={this.state.amount}
          gwei={this.state.gwei}
          ownReference={this.state.ownReference}
          beneficiaryReference={this.state.beneficiaryReference}
          publicAddress={this.state.publicAddress}
          />)
        case 'completeWanchainPayment':
          return (<CompleteWanchainPayment
            error={this.state.error}
            accountClicked={this.accountClicked}
            transactionID={this.state.transactionID}/>)
        default:
          return(<SetupWanchainPayment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}

            error={this.state.error}
            loading={this.state.loading}

            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectContact={this.selectContact}

            wanAddresses={this.props.wanAddresses}
            contacts={this.props.contacts}

            tabValue={this.state.tabValue}

            accountValue={this.state.accountValue}
            account={this.state.account}
            accountError={this.state.accountError}
            accountErrorMessage={this.state.accountErrorMessage}
            contactValue={this.state.contactValue}
            contact={this.state.contact}
            contactError={this.state.contactError}
            contactErrorMessage={this.state.contactErrorMessage}

            amount={this.state.amount}
            amountError={this.state.amountError}
            amountErrorMessage={this.state.amountErrorMessage}
            gwei={this.state.gwei}
            gweiError={this.state.gweiError}
            gweiErrorMessage={this.state.gweiErrorMessage}
            ownReference={this.state.ownReference}
            ownReferenceError={this.state.ownReferenceError}
            ownReferenceErrorMessage={this.state.ownReferenceErrorMessage}
            beneficiaryReference={this.state.beneficiaryReference}
            beneficiaryReferenceError={this.state.beneficiaryReferenceError}
            beneficiaryReferenceErrorMessage={this.state.beneficiaryReferenceErrorMessage}
            publicAddress={this.state.publicAddress}
            publicAddressError={this.state.publicAddressError}
            publicAddressErrorMessage={this.state.publicAddressErrorMessage}

            setupPaymentValid={this.state.setupPaymentValid}
            disclaimer={this.state.disclaimer}
            validateField={this.validateField}
          />)
    }
  },

  renderStepper() {
    if(['xs', 'sm'].includes(this.props.size)) {
      return (
        <Card style={{padding: '0px'}}>
          <CardContent>
            <Stepper orientation="vertical" steps={this.state.steps.length} activeStep={this.state.activeStep} style={{background: 'inherit', padding: '0px'}}>
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

  render() {
    return (
      <Grid container justify="center" alignItems="center" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={6} align='center'>
          {this.renderStepper()}
        </Grid>
      </Grid>
    )
  },

  selectAddress(event) {
    var selectedAccount = this.props.wanAddresses.filter((address) => {
      return address.publicAddress == event.target.value
    })
    if(selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0]
    } else {
      selectedAccount = null
    }
    this.setState({accountValue: selectedAccount.publicAddress, account: selectedAccount, accountValid: true});

    this.validateAccount(selectedAccount)
    this.validateSetupPayment();
  },

  selectContact(event) {
    var selectedContact = this.props.contacts.filter((contact) => {
      return contact.primaryWanAddress == event.target.value
    })
    if(selectedContact.length > 0) {
      selectedContact = selectedContact[0]
    } else {
      selectedContact = ''
    }
    this.setState({contactValue: selectedContact.primaryWanAddress, contact: selectedContact, contactValid: true});

    this.validateContact(selectedContact);
    this.validateSetupPayment();
  },

  proceedClicked() {
    this.validateOwnReference()
    this.validateBeneficiaryReference()
    this.validateAmount()
    this.validateGas()
    this.validatePublicAddress()
    this.validateAccount()
    this.validateContact()

    if(this.validateSetupPayment()) {
      var completed = this.state.completed
      completed[0] = true
      this.setState({currentScreen: 'confirmWanchainPayment', activeStep: 1, completed})
    }
  },

  confirmClicked() {
    this.setState({error: null, loading: true});
    var content = {}
    if(this.state.tabValue == 0) { //beneficiary payment
      content = {
        fromAddress: this.state.accountValue,
        contactUserName: this.state.contact.userName,
        amount: this.state.amount,
        gwei: this.state.gwei
      }
    } else if (this.state.tabValue == 1) { //public address payment
      content = {
        fromAddress: this.state.accountValue,
        toAddress: this.state.publicAddress,
        amount: this.state.amount,
        gwei: this.state.gwei
      }
    } else {
      return false;
    }

    //console.log(content)
    wanDispatcher.dispatch({type: 'sendWanchain', content, token: this.props.user.token})
  },

  sendWanchainReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    var completed = this.state.completed
    completed[1] = true
    if(data.success) {

      this.setState({currentScreen: 'completeWanchainPayment', activeStep: 2, completed, transactionID: data.transactionId})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, currentScreen: 'completeWanchainPayment', activeStep: 2, completed});
    } else {
      this.setState({error: data.statusText, currentScreen: 'completeWanchainPayment', activeStep: 2, completed})
    }
  },

  backClicked() {
    var completed = this.state.completed
    completed[0] = false
    this.setState({currentScreen: 'setupWanchainPayment', activeStep: 1, completed})
  },

  accountClicked() {
    window.location.hash = 'wanAccounts'
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {

      if(name==='amount') {
        if(!this.isNumeric(event.target.value))
          return false
      } else if (name==='gwei') {
        if(!this.isNumeric(event.target.value))
          return false
      }

      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleTabChange(event, tabValue) {
    if(tabValue == 0) {
      this.setState({ tabValue, publicAddress: '', publicAddressError: false, publicAddressErrorMessage: '', publicAddressValid: true, contactValid: false});
    } else if (tabValue == 1) {
      this.setState({ tabValue, contact: null, contactValue: '', contactError: false, contactErrorMessage: '', publicAddressValid: false, contactValid: true});
    } else {
      this.setState({ tabValue });
    }

    this.validateSetupPayment()
  },

  validateField(event, name) {
    if (name==="ownReference") {
      this.validateOwnReference(event.target.value)
    } if (name==="beneficiaryReference") {
      this.validateBeneficiaryReference(event.target.value)
    } else if (name==="amount") {
      this.validateAmount(event.target.value)
    } else if (name==="gwei") {
      this.validateGas(event.target.value)
    } else if (name==='publicAddress') {
      this.validatePublicAddress(event.target.value)
    }

    this.validateSetupPayment()
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  validateSetupPayment() {
    var valid = (this.state.accountValid && this.state.ownReferenceValid &&
      this.state.contactValid && this.state.beneficiaryReferenceValid &&
      this.state.amountValid && this.state.gweiValid && this.state.publicAddressValid);
    this.setState({ setupPaymentValid: valid });
    return valid;
  },

  validateAccount(value) {
    this.setState({accountError: false, accountErrorMessage:''});
    if(value == null) {
      value = this.state.account;
    }

    if(value == null) {
      this.setState({accountError: true, accountErrorMessage:'Your account is required'});
      return false;
    }

    return true;
  },

  validateOwnReference(value) {
    this.setState({ownReferenceError: false, ownReferenceErrorMessage:''});
    if(value == null) {
      value = this.state.ownReference;
    }

    if(value == '') {
      this.setState({ownReferenceError: true, ownReferenceErrorMessage:'Your reference is requred'});
      return false;
    } else {
      this.setState({ ownReferenceValid: true })
    }

    return true;
  },

  validateContact(value) {
    this.setState({contactError: false, contactErrorMessage:''});
    if(value == null) {
      if(this.state.tabValue === 1) {
        return true;
      }
      value = this.state.contact;
    }

    if(value == null) {
      this.setState({contactError: true, contactErrorMessage:'Beneficiary is requred'});
      return false;
    }

    return true;
  },

  validatePublicAddress(value) {
    this.setState({publicAddressError: false, publicAddressErrorMessage:''});
    if(value == null) {
      if(this.state.tabValue === 0) {
        return true;
      }
      value = this.state.publicAddress;
    }

    if(value == null) {
      this.setState({publicAddressError: true, publicAddressErrorMessage:'Public address is requred'});
      return false;
    } else if (!isEthereumAddress(value)) {
      this.setState({publicAddressError: true, publicAddressErrorMessage:'Invalid Wanchain public address'});
      return false;
    } else {
      this.setState({ publicAddressValid: true })
    }

    return true;
  },

  validateBeneficiaryReference(value) {
    this.setState({beneficiaryReferenceError: false, beneficiaryReferenceErrorMessage:''});
    if(value == null) {
      value = this.state.beneficiaryReference;
    }

    if(value == '') {
      this.setState({beneficiaryReferenceError: true, beneficiaryReferenceErrorMessage:'Their reference is requred'});
      return false;
    } else {
      this.setState({ beneficiaryReferenceValid: true })
    }

    return true;
  },

  validateAmount(value) {
    this.setState({amountError: false, amountErrorMessage:''});
    if(value == null) {
      value = this.state.amount;
    }

    if(value == '') {
      this.setState({amountError: true, amountErrorMessage:'Amount is requred'});
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({amountError: true, amountErrorMessage:'Invalid amount'});
      return false;
    } else if (this.state.account!=null && this.state.account.balance < value) {
      this.setState({amountError: true, amountErrorMessage:'Amount greater than current balance'});
      return false;
    } else {
      this.setState({ amountValid: true })
    }

    return true;
  },

  validateGas(value) {
    this.setState({gweiError: false, gweiErrorMessage:''});
    if(value == null) {
      value = this.state.gwei;
    }

    if(value == '') {
      this.setState({gweiError: true, gweiErrorMessage:'Gas is requred'});
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({gweiError: true, gweiErrorMessage:'Invalid gas'});
      return false;
    } else {
      this.setState({ gweiValid: true })
    }

    return true;
  }

})

export default (SendWanchain);
