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

      ownAccountValue: '',
      ownAccountValid: true,
      ownAccount: null,
      ownAccountError: false,
      ownAccountErrorMessage: '',

      amount: '',
      amountValid: false,
      amountError: false,
      amountErrorMessage: '',

      gwei: '200',
      gweiValid: true,
      gweiError: false,
      gweiErrorMessage: '',

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
    wanEmitter.on('sendWan', this.sendWanchainReturned);
  },

  componentWillUnmount() {
    wanEmitter.removeAllListeners('sendWan');
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
          selectOwnAddress={this.selectOwnAddress}
          selectContact={this.selectContact}

          wanAddresses={this.props.wanAddresses}
          contacts={this.props.contacts}

          tabValue={this.state.tabValue}

          accountValue={this.state.accountValue}
          account={this.state.account}
          accountError={this.state.accountError}
          accountErrorMessage={this.state.accountErrorMessage}

          ownAccountValue={this.state.ownAccountValue}
          ownAccount={this.state.ownAccount}
          ownAccountError={this.state.ownAccountError}
          ownAccountErrorMessage={this.state.ownAccountErrorMessage}

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
          ownAccount={this.state.ownAccount}
          contact={this.state.contact}

          amount={this.state.amount}
          gwei={this.state.gwei}
          publicAddress={this.state.publicAddress}
          />)
        case 'completeWanchainPayment':
          return (<CompleteWanchainPayment
            error={this.state.error}
            accountClicked={this.accountClicked}
            paymentClicked={this.paymentClicked}
            transactionID={this.state.transactionID}/>)
        default:
          return(<SetupWanchainPayment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}

            error={this.state.error}
            loading={this.state.loading}

            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectOwnAddress={this.selectOwnAddress}
            selectContact={this.selectContact}

            wanAddresses={this.props.wanAddresses}
            contacts={this.props.contacts}

            tabValue={this.state.tabValue}

            accountValue={this.state.accountValue}
            account={this.state.account}
            accountError={this.state.accountError}
            accountErrorMessage={this.state.accountErrorMessage}

            ownAccountValue={this.state.ownAccountValue}
            ownAccount={this.state.ownAccount}
            ownAccountError={this.state.ownAccountError}
            ownAccountErrorMessage={this.state.ownAccountErrorMessage}

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

  selectOwnAddress(event) {
    var selectedAccount = this.props.wanAddresses.filter((address) => {
      return address.publicAddress == event.target.value
    })
    if(selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0]
    } else {
      selectedAccount = null
    }
    this.setState({ownAccountValue: selectedAccount.publicAddress, ownAccount: selectedAccount, ownAccountValid: true});

    this.validateOwnAccount(selectedAccount)
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
    this.validateAmount()
    this.validateGas()
    this.validatePublicAddress()
    this.validateAccount()
    this.validateOwnAccount()
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
    } else if (this.state.tabValue == 2) {
      content = {
        fromAddress: this.state.accountValue,
        toAddress: this.state.ownAccountValue,
        amount: this.state.amount,
        gwei: this.state.gwei
      }
    } else {
      this.setState({loading: false});
      return false;
    }

    console.log(content)
    wanDispatcher.dispatch({type: 'sendWan', content, token: this.props.user.token})
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
  paymentClicked() {
    this.setState({
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

      ownAccountValue: '',
      ownAccountValid: true,
      ownAccount: null,
      ownAccountError: false,
      ownAccountErrorMessage: '',

      amount: '',
      amountValid: false,
      amountError: false,
      amountErrorMessage: '',

      gwei: '200',
      gweiValid: true,
      gweiError: false,
      gweiErrorMessage: '',

      publicAddress: '',
      publicAddressValid: true,
      publicAddressError: false,
      publicAddressErrorMessage: '',

      setupPaymentValid: false,

      transactionID: '',

      sendWRC20Symbol: '',
      tokenValid: false,
      tokenError: false,
      tokenErrorMessage: ''
    })
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {

      if(name==='amount') {
        if(event.target.value.charAt(0) == '.') {
          event.target.value = '0'+event.target.value
        }
        if(!this.isNumeric(event.target.value) && event.target.value != '')
          return false
      } else if (name==='gwei') {
        if(event.target.value.charAt(0) == '.') {
          event.target.value = '0'+event.target.value
        }
        if(!this.isNumeric(event.target.value) && event.target.value != '')
          return false
      }

      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleTabChange(event, tabValue) {
    if(tabValue == 0) {
      this.setState({ tabValue, publicAddress: '', publicAddressError: false, publicAddressErrorMessage: '', ownAccount: null, ownAccountValue: '', ownAccountError: false, ownAccountErrorMessage: '', publicAddressValid: true, contactValid: false, ownAccountValid: true});
    } else if (tabValue == 1) {
      this.setState({ tabValue, contact: null, contactValue: '', contactError: false, contactErrorMessage: '', ownAccount: null, ownAccountValue: '', ownAccountError: false, ownAccountErrorMessage: '', publicAddressValid: false, contactValid: true, ownAccountValid: true});
    } else if (tabValue == 2) {
      this.setState({ tabValue, contact: null, contactValue: '', contactError: false, contactErrorMessage: '', publicAddress: '', publicAddressError: false, publicAddressErrorMessage: '', publicAddressValid: true, contactValid: true, ownAccountValid: false});
    } else {
      this.setState({ tabValue });
    }

    this.validateSetupPayment()
  },

  validateField(event, name) {
    if (name==="amount") {
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
    var valid = (this.state.accountValid && this.state.ownAccountValid && this.state.contactValid &&
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

  validateOwnAccount(value) {
    this.setState({ownAccountError: false, ownAccountErrorMessage:''});
    if(value == null) {
      if(this.state.tabValue !== 2) {
        return true;
      }
      value = this.state.ownAccount;
    }

    if(value == null) {
      this.setState({ownAccountError: true, ownAccountErrorMessage:'Your account is required'});
      return false;
    }

    return true;
  },

  validateContact(value) {
    this.setState({contactError: false, contactErrorMessage:''});
    if(value == null) {
      if(this.state.tabValue !== 0) {
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
      if(this.state.tabValue !== 1) {
        return true;
      }
      value = this.state.publicAddress;
    }

    if(value == null || value == '') {
      this.setState({publicAddressError: true, publicAddressErrorMessage:'Public address is requred'});
      return false;
    } else {
      this.setState({ publicAddressValid: true })
    }

    return true;
  },

  validateAmount(value) {
    this.setState({amountError: false, amountErrorMessage:''});
    if(value == null) {
      value = this.state.amount;
    }

    if(value == '' || value == '0') {
      this.setState({amountValid: false, amountError: true, amountErrorMessage:'Amount is requred'});
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({amountValid: false, amountError: true, amountErrorMessage:'Invalid amount'});
      return false;
    } else if (this.state.account!=null && this.state.account.balance < value) {
      this.setState({amountValid: false, amountError: true, amountErrorMessage:'Amount greater than current balance'});
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
      this.setState({gweiValid: false, gweiError: true, gweiErrorMessage:'Gas is requred'});
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({gweiValid: false, gweiError: true, gweiErrorMessage:'Invalid gas'});
      return false;
    } else if (value < 200) {
      this.setState({gweiValid: false, gweiError: true, gweiErrorMessage:'Minimum gas amount is 200'});
    } else {
      this.setState({ gweiValid: true })
    }

    return true;
  }

})

export default (SendWanchain);
