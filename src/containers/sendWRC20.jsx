import React from 'react'
import SetupWRC20Payment from '../components/setupWRC20Payment'
import ConfirmWRC20Payment from '../components/confirmWRC20Payment'
import CompleteWRC20Payment from '../components/completeWRC20Payment'
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Grid from 'material-ui/Grid';
import Card, {  CardContent } from 'material-ui/Card';

const createReactClass = require('create-react-class')
let wanEmitter = require('../store/wanStore.js').default.emitter
let wanDispatcher = require('../store/wanStore.js').default.dispatcher
const isEthereumAddress  = require('is-ethereum-address');

let SendWRC20 = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: 'setupWRC20Payment',
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

      disclaimer: 'CryptoCurve accepts no responsibility for funds transferred to an incorrect public address. Please ensure that the address entered is the correct Wanchcain Public Address of your recipient.',

      sendWRC20Symbol: '',
      tokenValid: false,
      tokenError: false,
      tokenErrorMessage: ''
    };
  },

  componentWillMount() {
    wanEmitter.on('sendWRC20', this.sendWRC20Returned);
  },

  componentWillUnmount() {
    wanEmitter.removeAllListeners('sendWRC20');
  },

  componentDidMount() {
    if(this.props.sendWRC20Contact != null) {
      this.setState({
        contact: this.props.sendWRC20Contact,
        contactValue: this.props.sendWRC20Contact.primaryWanAddress,
        contactValid: true
      })
    }
    if(this.props.sendWRC20Account != null) {
      this.setState({
        account: this.props.sendWRC20Account,
        accountValue: this.props.sendWRC20Account.publicAddress,
        accountValid: true
      })
    }
    if(this.props.sendWRC20Symbol != null) {
      this.setState({
        sendWRC20Symbol: this.props.sendWRC20Symbol
      })
    }
  },

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'setupWRC20Payment':
        return(<SetupWRC20Payment
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
          wrc20Tokens={this.props.wrc20Tokens}

          sendWRC20Symbol={this.state.sendWRC20Symbol}
          selectToken={this.selectToken}
          tokenError={this.state.tokenError}
          tokenErrorMessage={this.state.tokenErrorMessage}
        />)
      case 'confirmWRC20Payment':
        return (<ConfirmWRC20Payment
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

          sendWRC20Symbol={this.state.sendWRC20Symbol}
          />)
        case 'completeWRC20Payment':
          return (<CompleteWRC20Payment
            error={this.state.error}
            accountClicked={this.accountClicked}
            transactionID={this.state.transactionID}/>)
        default:
          return(<SetupWRC20Payment
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

  selectToken(event) {
    var selectedToken = this.props.wrc20Tokens.filter((token) => {
      return token.symbol == event.target.value
    })
    if(selectedToken.length > 0) {
      selectedToken = selectedToken[0]
    } else {
      selectedToken = null
    }
    this.setState({sendWRC20Symbol: selectedToken.symbol, symbolValid: true});

    this.validateToken(selectedToken)
    this.validateSetupPayment();
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
    this.validateToken()
    this.validateContact()

    if(this.validateSetupPayment()) {
      var completed = this.state.completed
      completed[0] = true
      this.setState({currentScreen: 'confirmWRC20Payment', activeStep: 1, completed})
    }
  },

  confirmClicked() {
    this.setState({error: null, loading: true});
    var tokenAddress
    if(this.state.sendWRC20Symbol) {
      tokenAddress = this.props.wrc20Tokens.filter((token) => { return token.symbol == this.state.sendWRC20Symbol })[0].contractAddress
    } else {
      return false;
    }

    var content = {
      fromAddress: this.state.accountValue,
      amount: this.state.amount,
      gwei: this.state.gwei,
      tokenAddress: tokenAddress
    }

    if(this.state.tabValue == 0) { //beneficiary payment
      content.contactUserName = this.state.contact.userName
    } else if (this.state.tabValue == 1) { //public address payment
      content.toAddress = this.state.publicAddress
    } else {
      return false;
    }

    wanDispatcher.dispatch({type: 'sendWRC20', content, token: this.props.user.token})
  },

  sendWRC20Returned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    var completed = this.state.completed
    completed[1] = true
    if(data.success) {

      this.setState({currentScreen: 'completeWRC20Payment', activeStep: 2, completed, transactionID: data.transactionId})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg, currentScreen: 'completeWRC20Payment', activeStep: 2, completed});
    } else {
      this.setState({error: data.statusText, currentScreen: 'completeWRC20Payment', activeStep: 2, completed})
    }
  },

  backClicked() {
    var completed = this.state.completed
    completed[0] = false
    this.setState({currentScreen: 'setupWRC20Payment', activeStep: 1, completed})
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
      this.state.amountValid && this.state.gweiValid && this.state.publicAddressValid
      && this.state.tokenValid);
    this.setState({ setupPaymentValid: valid });
    return valid;
  },

  validateToken(value) {
    this.setState({tokenError: false, tokenErrorMessage:''});
    if(value == null || value == '') {
      value = this.state.sendWRC20Symbol;
    }

    if(value == null || value == '') {
      this.setState({tokenError: true, tokenErrorMessage:'The token is required'});
      return false;
    } else {
      this.setState({ tokenValid: true })
    }

    return true;
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
      this.setState({publicAddressError: true, publicAddressErrorMessage:'Invalid WRC20 public address'});
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

export default (SendWRC20);
