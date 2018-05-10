import React from 'react'
import SetupEthereumPayment from '../components/setupEthereumPayment'
import ConfirmEthereumPayment from '../components/confirmEthereumPayment'
import CompleteEthereumPayment from '../components/completeEthereumPayment'
import Stepper, { Step, StepButton, StepLabel, StepContent } from 'material-ui/Stepper';
import MobileStepper from 'material-ui/MobileStepper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, {  CardContent } from 'material-ui/Card';

const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let SendEther = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: 'setupEthereumPayment',
      steps: ['Set up your payment', 'Confirm the details', 'Results of the payment'],
      activeStep:  0,
      completed: {},

      accountValue: '',
      contactValue: '',

      contact: null,
      account: null,
      handleClose: null,

      amount: '',
      amountError: false,
      amountErrorMessage: '',

      gwei: '2',
      gweiError: false,
      gweiErrorMessage: '',

      ownReference: '',
      ownReferenceError: false,
      ownReferenceErrorMessage: '',

      beneficairyReference: '',
      beneficairyReferenceError: false,
      beneficairyReferenceErrorMessage: '',

      publicAddress: '',
      publicAddressError: false,
      publicAddressErrorMessage: '',

      disclaimer: 'CryptoCurve accepts no responsibility for funds transferred to an incorrect public address. Please ensure that the address entered is the correct Ethereum Public Address of your recipient.'
    };
  },

  componentDidMount() {
    if(this.props.sendEtherContact != null) {
      this.setState({
        contact: this.props.sendEtherContact,
        contactValue: this.props.sendEtherContact.primaryAddress
      })
    }
    if(this.props.sendEtherAccount != null) {
      this.setState({
        account: this.props.sendEtherAccount,
        accountValue: this.props.sendEtherAccount.address
      })
    }
  },

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'setupEthereumPayment':
        return(<SetupEthereumPayment
          handleChange={this.handleChange}
          handleTabChange={this.handleTabChange}

          error={this.state.error}
          loading={this.state.loading}
          handleClose={this.state.handleClose}

          proceedClicked={this.proceedClicked}
          selectAddress={this.selectAddress}
          selectContact={this.selectContact}

          ethAddresses={this.props.ethAddresses}
          contacts={this.props.contacts}

          tabValue={this.state.tabValue}

          accountValue={this.state.accountValue}
          account={this.state.account}
          contactValue={this.state.contactValue}
          contact={this.state.contact}

          amount={this.state.amount}
          amountError={this.state.amountError}
          amountErrorMessage={this.state.amountErrorMessage}
          gwei={this.state.gwei}
          gweiError={this.state.gweiError}
          gweiErrorMessage={this.state.gweiErrorMessage}
          ownReference={this.state.ownReference}
          ownReferenceError={this.state.ownReferenceError}
          ownReferenceErrorMessage={this.state.ownReferenceErrorMessage}
          beneficairyReference={this.state.beneficairyReference}
          beneficairyReferenceError={this.state.beneficairyReferenceError}
          beneficairyReferenceErrorMessage={this.state.beneficairyReferenceErrorMessage}
          publicAddress={this.state.publicAddress}
          publicAddressError={this.state.publicAddressError}
          publicAddressErrorMessage={this.state.publicAddressErrorMessage}

          disclaimer={this.state.disclaimer}
        />)
      case 'confirmEthereumPayment':
        return (<ConfirmEthereumPayment
          confirmClicked={this.confirmClicked}
          backClicked={this.backClicked}

          loading={this.state.loading}

          tabValue={this.state.tabValue}

          account={this.state.account}
          contact={this.state.contact}

          amount={this.state.amount}
          gwei={this.state.gwei}
          ownReference={this.state.ownReference}
          beneficairyReference={this.state.beneficairyReference}
          publicAddress={this.state.publicAddress}
          />)
        case 'ethereumPaymentResult':
          return (<CompleteEthereumPayment
            accountClicked={this.accountClicked}/>)
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
    var selectedAddress = this.props.ethAddresses.filter((address) => {
      return address.address == event.target.value
    })
    if(selectedAddress.length > 0) {
      selectedAddress = selectedAddress[0]
    } else {
      selectedAddress: ''
    }
    this.setState({accountValue: selectedAddress.address, account: selectedAddress})
  },

  selectContact(event) {
    var selectedContact = this.props.contacts.filter((contact) => {
      return contact.primaryAddress == event.target.value
    })
    if(selectedContact.length > 0) {
      selectedContact = selectedContact[0]
    } else {
      selectedContact: ''
    }
    this.setState({contactValue: selectedContact.primaryAddress, contact: selectedContact})
  },

  proceedClicked() {
    var completed = this.state.completed
    completed[0] = true
    this.setState({currentScreen: 'confirmEthereumPayment', activeStep: 1, completed})
  },

  confirmClicked() {
    this.setState({loading: true});
    setTimeout(() => {
      var completed = this.state.completed
      completed[1] = true
      var that = this
      that.setState({currentScreen: 'ethereumPaymentResult', activeStep: 2, completed})
    }, 3000);
  },

  backClicked() {
    var completed = this.state.completed
    completed[0] = false
    this.setState({currentScreen: 'setupEthereumPayment', activeStep: 1, completed})
  },

  accountClicked() {
    window.location.hash = 'ethAccounts'
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },

})

export default (SendEther);
