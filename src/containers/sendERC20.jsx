import React from "react";
import SetupERC20Payment from "../components/setupERC20Payment";
import ConfirmERC20Payment from "../components/confirmERC20Payment";
import CompleteERC20Payment from "../components/completeERC20Payment";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const createReactClass = require("create-react-class");
let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
const isEthereumAddress = require("is-ethereum-address");

let SendERC20 = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: "setupERC20Payment",
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

      gwei: "2",
      gweiValid: true,
      gweiError: false,
      gweiErrorMessage: "",

      publicAddress: "",
      publicAddressValid: true,
      publicAddressError: false,
      publicAddressErrorMessage: "",

      setupPaymentValid: false,

      transactionID: "",

      disclaimer:
        "CryptoCurve accepts no responsibility for funds transferred to an incorrect public address. Please ensure that the address entered is the correct Ethereum Public Address of your recipient.",

      sendERC20Symbol: "",
      tokenValid: false,
      tokenError: false,
      tokenErrorMessage: ""
    };
  },

  componentWillMount() {
    ethEmitter.on("sendERC20", this.sendERC20Returned);
  },

  componentWillUnmount() {
    ethEmitter.removeAllListeners("sendERC20");
  },

  componentDidMount() {
    if (this.props.sendERC20Contact != null) {
      this.setState({
        contact: this.props.sendERC20Contact,
        contactValue: this.props.sendERC20Contact.primaryEthAddress,
        contactValid: true
      });
    }
    if (this.props.sendERC20Account != null) {
      this.setState({
        account: this.props.sendERC20Account,
        accountValue: this.props.sendERC20Account.address,
        accountValid: true
      });
    }
    if (this.props.sendERC20Symbol != null) {
      this.setState({
        sendERC20Symbol: this.props.sendERC20Symbol
      });
    }
  },

  renderScreen() {
    switch (this.state.currentScreen) {
      case "setupERC20Payment":
        return (
          <SetupERC20Payment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            error={this.state.error}
            loading={this.state.loading}
            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectOwnAddress={this.selectOwnAddress}
            selectContact={this.selectContact}
            ethAddresses={this.props.ethAddresses}
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
            erc20Tokens={this.props.erc20Tokens}
            sendERC20Symbol={this.state.sendERC20Symbol}
            selectToken={this.selectToken}
            tokenError={this.state.tokenError}
            tokenErrorMessage={this.state.tokenErrorMessage}
          />
        );
      case "confirmERC20Payment":
        return (
          <ConfirmERC20Payment
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
            sendERC20Symbol={this.state.sendERC20Symbol}
          />
        );
      case "completeERC20Payment":
        return (
          <CompleteERC20Payment
            error={this.state.error}
            accountClicked={this.accountClicked}
            paymentClicked={this.paymentClicked}
            transactionID={this.state.transactionID}
          />
        );
      default:
        return (
          <SetupERC20Payment
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            error={this.state.error}
            loading={this.state.loading}
            proceedClicked={this.proceedClicked}
            selectAddress={this.selectAddress}
            selectContact={this.selectContact}
            ethAddresses={this.props.ethAddresses}
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
        <Grid item xs={12} sm={12} md={12} lg={9} xl={8} align="center">
          {this.renderStepper()}
        </Grid>
      </Grid>
    );
  },

  selectOwnAddress(event) {
    var selectedAccount = this.props.ethAddresses.filter(address => {
      return address.address === event.target.value;
    });
    if (selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0];
    } else {
      selectedAccount = null;
    }
    this.setState({
      ownAccountValue: selectedAccount.address,
      ownAccount: selectedAccount,
      ownAccountValid: true
    });

    this.validateOwnAccount(selectedAccount);
    this.validateSetupPayment();
  },

  selectToken(event) {
    var selectedToken = this.props.erc20Tokens.filter(token => {
      return token.symbol === event.target.value;
    });
    if (selectedToken.length > 0) {
      selectedToken = selectedToken[0];
    } else {
      selectedToken = null;
    }
    this.setState({ sendERC20Symbol: selectedToken.symbol, symbolValid: true });

    this.validateToken(selectedToken);
    this.validateSetupPayment();
  },

  selectAddress(event) {
    var selectedAccount = this.props.ethAddresses.filter(address => {
      return address.address === event.target.value;
    });
    if (selectedAccount.length > 0) {
      selectedAccount = selectedAccount[0];
    } else {
      selectedAccount = null;
    }
    this.setState({
      accountValue: selectedAccount.address,
      account: selectedAccount,
      accountValid: true
    });

    this.validateAccount(selectedAccount);
    this.validateSetupPayment();
  },

  selectContact(event) {
    var selectedContact = this.props.contacts.filter(contact => {
      return contact.primaryEthAddress === event.target.value;
    });
    if (selectedContact.length > 0) {
      selectedContact = selectedContact[0];
    } else {
      selectedContact = "";
    }
    this.setState({
      contactValue: selectedContact.primaryEthAddress,
      contact: selectedContact,
      contactValid: true
    });

    this.validateContact(selectedContact);
    this.validateSetupPayment();
  },

  proceedClicked() {
    this.validateAmount();
    this.validateGas();
    this.validatePublicAddress();
    this.validateAccount();
    this.validateToken();
    this.validateOwnAccount();
    this.validateContact();

    if (this.validateSetupPayment()) {
      var completed = this.state.completed;
      completed[0] = true;
      this.setState({
        currentScreen: "confirmERC20Payment",
        activeStep: 1,
        completed
      });
    }
  },

  confirmClicked() {
    this.setState({ error: null, loading: true });
    var tokenAddress;
    if (this.state.sendERC20Symbol) {
      tokenAddress = this.props.erc20Tokens.filter(token => {
        return token.symbol === this.state.sendERC20Symbol;
      })[0].contractAddress;
    } else {
      return false;
    }

    var content = {
      fromAddress: this.state.accountValue,
      amount: this.state.amount,
      gwei: this.state.gwei,
      tokenAddress: tokenAddress
    };

    if (this.state.tabValue === 0) {
      //beneficiary payment
      content.contactUserName = this.state.contact.userName;
    } else if (this.state.tabValue === 1) {
      //public address payment
      content.toAddress = this.state.publicAddress;
    } else if (this.state.tabValue === 2) {
      content.toAddress = this.state.ownAccountValue;
    } else {
      return false;
    }

    console.log(content);
    ethDispatcher.dispatch({
      type: "sendERC20",
      content,
      token: this.props.user.token
    });
  },

  sendERC20Returned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    var completed = this.state.completed;
    completed[1] = true;
    if (data.success) {
      this.setState({
        currentScreen: "completeERC20Payment",
        activeStep: 2,
        completed,
        transactionID: data.transactionId
      });
    } else if (data.errorMsg) {
      this.setState({
        error: data.errorMsg,
        currentScreen: "completeERC20Payment",
        activeStep: 2,
        completed
      });
    } else {
      this.setState({
        error: data.statusText,
        currentScreen: "completeERC20Payment",
        activeStep: 2,
        completed
      });
    }
  },

  backClicked() {
    var completed = this.state.completed;
    completed[0] = false;
    this.setState({
      currentScreen: "setupERC20Payment",
      activeStep: 1,
      completed
    });
  },

  accountClicked() {
    window.location.hash = "ethAccounts";
  },
  paymentClicked() {
    this.setState({
      loading: false,
      error: null,

      tabValue: 0,
      currentScreen: "setupERC20Payment",
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

      gwei: "2",
      gweiValid: true,
      gweiError: false,
      gweiErrorMessage: "",

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
      } else if (name === "gwei") {
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
    } else if (name === "gwei") {
      this.validateGas(event.target.value);
    } else if (name === "publicAddress") {
      this.validatePublicAddress(event.target.value);
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
      this.state.gweiValid &&
      this.state.publicAddressValid &&
      this.state.tokenValid;
    this.setState({ setupPaymentValid: valid });
    return valid;
  },

  validateToken(value) {
    this.setState({ tokenError: false, tokenErrorMessage: "" });
    if (value == null || value === "") {
      value = this.state.sendERC20Symbol;
    }

    if (value == null || value === "") {
      this.setState({
        tokenError: true,
        tokenErrorMessage: "The token is required"
      });
      return false;
    } else {
      this.setState({ tokenValid: true });
    }

    return true;
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
        contactErrorMessage: "Beneficiary is requred"
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
        publicAddressErrorMessage: "Public address is requred"
      });
      return false;
    } else if (!isEthereumAddress(value)) {
      this.setState({
        publicAddressError: true,
        publicAddressErrorMessage: "Invalid ERC20 public address"
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
    let tokenBalance = 0;

    if (this.state.account) {
      tokenBalance = this.state.account.erc20Tokens.filter(token => {
        return token.symbol === this.state.sendERC20Symbol;
      })[0].balance;
    }

    if (value === "" || value === "0") {
      this.setState({
        amountError: true,
        amountErrorMessage: "Amount is requred"
      });
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({
        amountError: true,
        amountErrorMessage: "Invalid amount"
      });
      return false;
    } else if (tokenBalance < value) {
      this.setState({
        amountError: true,
        amountErrorMessage: "Amount greater than current balance"
      });
      return false;
    } else {
      this.setState({ amountValid: true });
    }

    return true;
  },

  validateGas(value) {
    this.setState({ gweiError: false, gweiErrorMessage: "" });
    if (value == null) {
      value = this.state.gwei;
    }

    if (value === "") {
      this.setState({ gweiError: true, gweiErrorMessage: "Gas is requred" });
      return false;
    } else if (!this.isNumeric(value)) {
      this.setState({ gweiError: true, gweiErrorMessage: "Invalid gas" });
      return false;
    } else {
      this.setState({ gweiValid: true });
    }

    return true;
  }
});

export default SendERC20;
