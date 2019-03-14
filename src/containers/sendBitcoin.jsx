import React from "react";
import SetupBitcoinPayment from "../components/setupBitcoinPayment";
import ConfirmBitcoinPayment from "../components/confirmBitcoinPayment";
import CompleteBitcoinPayment from "../components/completeBitcoinPayment";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PageTItle from "../components/pageTitle";

const createReactClass = require("create-react-class");
let bitcoinEmitter = require("../store/bitcoinStore.js").default.emitter;
let bitcoinDispatcher = require("../store/bitcoinStore.js").default.dispatcher;

let SendBitcoin = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: "setupBitcoinPayment",
      steps: [
        "Set up your payment",
        "Confirm the details",
        "Results of the payment"
      ],
      activeStep: 0,
      completed: {},

      contactValue: "",
      contactValid: false,
      contact: null,
      contactError: false,
      contactErrorMessage: "",

      accountValue: "",
      accountValid: false,
      account: null,
      accountError: false,
      accountErrorMessage: "",

      ownAccountValue: "",
      ownAccountValid: true,
      ownAccount: null,
      ownAccountError: false,
      ownAccountErrorMessage: "",

      amount: "",
      amountValid: false,
      amountError: false,
      amountErrorMessage: "",

      publicAddress: "",
      publicAddressValid: true,
      publicAddressError: false,
      publicAddressErrorMessage: "",

      setupPaymentValid: false,

      transactionID: "",

      useNewChangeAddress: true,

      disclaimer:
        "CryptoCurve accepts no responsibility for funds transferred to an incorrect public address. Please ensure that the address entered is the correct Bitcoin Public Address of your recipient."
    };
  },

  componentWillMount() {
    bitcoinEmitter.on("sendBitcoin", this.sendBitcoinReturned);
  },

  componentWillUnmount() {
    bitcoinEmitter.removeAllListeners("sendBitcoin");
  },

  componentDidMount() {
    if (this.props.sendBitcoinContact) {
      this.setState({
        contact: this.props.sendBitcoinContact,
        contactValue: this.props.sendBitcoinContact.displayName,
        contactValid: true
      });
    }
    if (this.props.sendBitcoinAccount) {
      this.setState({
        account: this.props.sendBitcoinAccount,
        accountValue: this.props.sendBitcoinAccount.id,
        accountValid: true
      });
    }
  },

  renderScreen() {
    switch (this.state.currentScreen) {
      case "setupBitcoinPayment":
        return (
          <SetupBitcoinPayment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            error={this.state.error}
            loading={this.state.loading}
            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectOwnAddress={this.selectOwnAddress}
            selectContact={this.selectContact}
            bitcoinAddresses={this.props.bitcoinAddresses}
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
            publicAddress={this.state.publicAddress}
            publicAddressError={this.state.publicAddressError}
            publicAddressErrorMessage={this.state.publicAddressErrorMessage}
            setupPaymentValid={this.state.setupPaymentValid}
            disclaimer={this.state.disclaimer}
            validateField={this.validateField}
            handleChecked={this.handleChecked}
          />
        );
      case "confirmBitcoinPayment":
        return (
          <ConfirmBitcoinPayment
            confirmClicked={this.confirmClicked}
            backClicked={this.backClicked}
            loading={this.state.loading}
            tabValue={this.state.tabValue}
            account={this.state.account}
            ownAccount={this.state.ownAccount}
            contact={this.state.contact}
            amount={this.state.amount}
            publicAddress={this.state.publicAddress}
          />
        );
      case "completeBitcoinPayment":
        return (
          <CompleteBitcoinPayment
            error={this.state.error}
            accountClicked={this.accountClicked}
            paymentClicked={this.paymentClicked}
            transactionID={this.state.transactionID}
          />
        );
      default:
        return (
          <SetupBitcoinPayment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            error={this.state.error}
            loading={this.state.loading}
            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectContact={this.selectContact}
            bitcoinAddresses={this.props.bitcoinAddresses}
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
            publicAddress={this.state.publicAddress}
            publicAddressError={this.state.publicAddressError}
            publicAddressErrorMessage={this.state.publicAddressErrorMessage}
            setupPaymentValid={this.state.setupPaymentValid}
            disclaimer={this.state.disclaimer}
            validateField={this.validateField}
          />
        );
    }
  },

  renderStepper() {
    if (["xs", "sm"].includes(this.props.size)) {
      return (
        <Card style={{ padding: "0px" }}>
          <CardContent>
            <Stepper
              orientation="vertical"
              steps={this.state.steps.length}
              activeStep={this.state.activeStep}
              style={{ background: "inherit", padding: "0px" }}
            >
              {this.state.steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel completed={this.state.completed[index]}>
                      {label}
                    </StepLabel>
                    <StepContent>{this.renderScreen()}</StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <div>
          <Stepper
            alternativeLabel
            activeStep={this.state.activeStep}
            style={{ background: "inherit" }}
          >
            {this.state.steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel completed={this.state.completed[index]}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Card>
            <CardContent>{this.renderScreen()}</CardContent>
          </Card>
        </div>
      );
    }
  },

  render() {
    return (
      <Grid container justify="center" alignItems="center" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTItle theme={this.props.theme} root={'Accounts > Bitcoin'} screen={'Send'} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9} xl={8} align="center">
          {this.renderStepper()}
        </Grid>
      </Grid>
    );
  },

  selectOwnAddress(event) {
    var selectedAccount = this.props.bitcoinAddresses.filter(address => {
      return address.id === event.target.value;
    });
    if (selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0];
    } else {
      selectedAccount = null;
    }
    this.setState({
      ownAccountValue: selectedAccount.id,
      ownAccount: selectedAccount,
      ownAccountValid: true
    });

    this.validateOwnAccount(selectedAccount);
    this.validateSetupPayment();
  },

  selectAddress(event) {
    var selectedAccount = this.props.bitcoinAddresses.filter(address => {
      return address.id === event.target.value;
    });
    if (selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0];
    } else {
      selectedAccount = null;
    }
    this.setState({
      accountValue: selectedAccount.id,
      account: selectedAccount,
      accountValid: true
    });

    this.validateAccount(selectedAccount);
    this.validateSetupPayment();
  },

  selectContact(event) {
    var selectedContact = this.props.contacts.filter(contact => {
      return contact.displayName === event.target.value;
    });
    if (selectedContact.length > 0) {
      selectedContact = selectedContact[0];
    } else {
      selectedContact = "";
    }
    this.setState({
      contactValue: selectedContact.displayName,
      contact: selectedContact,
      contactValid: true
    });

    this.validateContact(selectedContact);
    this.validateSetupPayment();
  },

  proceedClicked() {
    this.validateAmount();
    this.validatePublicAddress();
    this.validateAccount();
    this.validateOwnAccount();
    this.validateContact();

    if (this.validateSetupPayment()) {
      var completed = this.state.completed;
      completed[0] = true;
      this.setState({
        currentScreen: "confirmBitcoinPayment",
        activeStep: 1,
        completed
      });
    }
  },

  handleChecked(event, name) {
    this.setState({ [name]: event.target.checked });
  },

  confirmClicked() {
    this.setState({ error: null, loading: true });
    var content = {};
    if (this.state.tabValue === 0) {
      //beneficiary payment
      content = {
        walletId: this.state.accountValue,
        contactUserName: this.state.contact.userName,
        value: this.state.amount,
        useNewChangeAddress: this.state.useNewChangeAddress
      };
    } else if (this.state.tabValue === 1) {
      //public address payment
      content = {
        walletId: this.state.accountValue,
        recipientAddress: this.state.publicAddress,
        value: this.state.amount,
        useNewChangeAddress: this.state.useNewChangeAddress
      };
    } else if (this.state.tabValue === 2) {
      content = {
        walletId: this.state.accountValue,
        recipientWalletId: this.state.ownAccountValue,
        value: this.state.amount,
        useNewChangeAddress: this.state.useNewChangeAddress
      };
    } else {
      return false;
    }

    bitcoinDispatcher.dispatch({
      type: "sendBitcoin",
      content,
      token: this.props.user.token
    });
  },

  sendBitcoinReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    var completed = this.state.completed;
    completed[1] = true;
    if (data.success) {
      this.setState({
        currentScreen: "completeBitcoinPayment",
        activeStep: 2,
        completed,
        transactionID: data.transactionId
      });
    } else if (data.errorMsg) {
      this.setState({
        error: data.errorMsg,
        currentScreen: "completeBitcoinPayment",
        activeStep: 2,
        completed
      });
    } else {
      this.setState({
        error: data.statusText,
        currentScreen: "completeBitcoinPayment",
        activeStep: 2,
        completed
      });
    }
  },

  backClicked() {
    var completed = this.state.completed;
    completed[0] = false;
    this.setState({
      currentScreen: "setupBitcoinPayment",
      activeStep: 1,
      completed
    });
  },

  accountClicked() {
    window.location.hash = "bitcoinAccounts";
  },
  paymentClicked() {
    this.setState({
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: "setupBitcoinPayment",
      steps: [
        "Set up your payment",
        "Confirm the details",
        "Results of the payment"
      ],
      activeStep: 0,
      completed: {},

      contactValue: "",
      contactValid: false,
      contact: null,
      contactError: false,
      contactErrorMessage: "",

      accountValue: "",
      accountValid: false,
      account: null,
      accountError: false,
      accountErrorMessage: "",

      ownAccountValue: "",
      ownAccountValid: true,
      ownAccount: null,
      ownAccountError: false,
      ownAccountErrorMessage: "",

      amount: "",
      amountValid: false,
      amountError: false,
      amountErrorMessage: "",

      publicAddress: "",
      publicAddressValid: true,
      publicAddressError: false,
      publicAddressErrorMessage: "",

      setupPaymentValid: false,

      transactionID: "",

      sendWRC20Symbol: "",
      tokenValid: false,
      tokenError: false,
      tokenErrorMessage: ""
    });
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      if (name === "amount") {
        if (event.target.value.charAt(0) === ".") {
          event.target.value = "0" + event.target.value;
        }
        if (!this.isNumeric(event.target.value) && event.target.value !== "")
          return false;
      }

      this.setState({
        [name]: event.target.value
      });
    }
  },

  handleTabChange(event, tabValue) {
    if (tabValue === 0) {
      this.setState({
        tabValue,
        publicAddress: "",
        publicAddressError: false,
        publicAddressErrorMessage: "",
        ownAccount: null,
        ownAccountValue: "",
        ownAccountError: false,
        ownAccountErrorMessage: "",
        publicAddressValid: true,
        contactValid: false,
        ownAccountValid: true
      });
    } else if (tabValue === 1) {
      this.setState({
        tabValue,
        contact: null,
        contactValue: "",
        contactError: false,
        contactErrorMessage: "",
        ownAccount: null,
        ownAccountValue: "",
        ownAccountError: false,
        ownAccountErrorMessage: "",
        publicAddressValid: false,
        contactValid: true,
        ownAccountValid: true
      });
    } else if (tabValue === 2) {
      this.setState({
        tabValue,
        contact: null,
        contactValue: "",
        contactError: false,
        contactErrorMessage: "",
        publicAddress: "",
        publicAddressError: false,
        publicAddressErrorMessage: "",
        publicAddressValid: true,
        contactValid: true,
        ownAccountValid: false
      });
    } else {
      this.setState({ tabValue });
    }

    this.validateSetupPayment();
  },

  validateField(event, name) {
    if (name === "amount") {
      this.validateAmount(event.target.value);
    } else if (name === 'publicAddress') {
      this.validatePublicAddress(event.target.value)
    }

    this.validateSetupPayment();
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  validateSetupPayment() {
    var valid =
      this.state.accountValid &&
      this.state.ownAccountValid &&
      this.state.contactValid &&
      this.state.amountValid &&
      this.state.publicAddressValid;

    this.setState({ setupPaymentValid: valid });
    return valid;
  },

  validateAccount(value) {
    this.setState({ accountError: false, accountErrorMessage: "" });
    if (value == null) {
      value = this.state.account;
    }

    if (value == null) {
      this.setState({
        accountError: true,
        accountErrorMessage: "Your account is required"
      });
      return false;
    }

    return true;
  },

  validateOwnAccount(value) {
    this.setState({ ownAccountError: false, ownAccountErrorMessage: "" });
    if (value == null) {
      if (this.state.tabValue !== 2) {
        return true;
      }
      value = this.state.ownAccount;
    }

    if (value == null) {
      this.setState({
        ownAccountError: true,
        ownAccountErrorMessage: "Your account is required"
      });
      return false;
    }

    return true;
  },

  validateContact(value) {
    this.setState({ contactError: false, contactErrorMessage: "" });
    if (value == null) {
      if (this.state.tabValue !== 0) {
        return true;
      }
      value = this.state.contact;
    }

    if (value == null) {
      this.setState({
        contactError: true,
        contactErrorMessage: "Beneficiary is required"
      });
      return false;
    }

    return true;
  },

  validatePublicAddress(value) {
    this.setState({ publicAddressError: false, publicAddressErrorMessage: "" });
    if (value == null) {
      if (this.state.tabValue !== 1) {
        return true;
      }
      value = this.state.publicAddress;
    }

    if (value == null || value === "") {
      this.setState({
        publicAddressError: true,
        publicAddressErrorMessage: "Public address is required"
      });
      return false;
    } else {
      this.setState({ publicAddressValid: true });
    }

    return true;
  },

  validateAmount(value) {
    this.setState({ amountError: false, amountErrorMessage: "" });
    if (value == null) {
      value = this.state.amount;
    }

    if (value === "" || value === "0") {
      this.setState({
        amountError: true,
        amountErrorMessage: "Amount is required"
      });
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({
        amountError: true,
        amountErrorMessage: "Invalid amount"
      });
      return false;
    } else if (
      this.state.account != null &&
      this.state.account.balance < value
    ) {
      this.setState({
        amountError: true,
        amountErrorMessage: "Amount greater than current balance"
      });
      return false;
    } else {
      this.setState({ amountValid: true });
    }

    return true;
  }

});

export default SendBitcoin;
