import React from 'react'
import TokenSwapComponent from '../components/tokenSwap'
const createReactClass = require('create-react-class')

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let ethStore = require("../store/ethStore.js").default.store;

let wanEmitter = require("../store/wanStore.js").default.emitter;
let wanDispatcher = require("../store/wanStore.js").default.dispatcher;
let wanStore = require("../store/wanStore.js").default.store;

let TokenSwap = createReactClass({
  getInitialState() {
    const ethAccounts = ethStore.getStore('accounts')
    const wanAccounts = wanStore.getStore('accounts')

    return {
      ethLoading: true,
      wanLoading: true,
      error: '',
      message: '',
      ethAccountValue: '',
      ethAccountError: false,
      ethAccountErrorMessage: '',
      ethAccountOptions: ethAccounts,
      wanAccountValue: '',
      wanAccountError: false,
      wanAccountErrorMessage: '',
      wanAccountOptions: wanAccounts,
      amountValue: '',
      amountError: false,
      amountErrorMessage: '',
      curveBalance: null
    }
  },

  render() {

    const {
      ethLoading,
      wanLoading,
      error,
      ethAccountValue,
      ethAccountError,
      ethAccountErrorMessage,
      ethAccountOptions,
      wanAccountValue,
      wanAccountError,
      wanAccountErrorMessage,
      wanAccountOptions,
      amountValue,
      amountError,
      amountErrorMessage,
      curveBalance,
      message,
    } = this.state

    const {
      theme,
      user
    } = this.props

    return (
      <TokenSwapComponent
        handleSelectChange={ this.handleSelectChange }
        handleChange={ this.handleChange }
        swapTokens={ this.swapTokens }

        theme={ theme }
        user={ user }

        error={ error }
        message={ message }
        loading={ ethLoading || wanLoading }
        ethAccountValue={ ethAccountValue }
        ethAccountError={ ethAccountError }
        ethAccountErrorMessage={ ethAccountErrorMessage }
        ethAccountOptions={ ethAccountOptions }
        wanAccountValue={ wanAccountValue }
        wanAccountError={ wanAccountError }
        wanAccountErrorMessage={ wanAccountErrorMessage }
        wanAccountOptions={ wanAccountOptions }
        amountValue={ amountValue }
        amountError={ amountError }
        amountErrorMessage={ amountErrorMessage }
        curveBalance={ curveBalance }
      />
    )
  },


  componentWillMount() {
    ethEmitter.removeAllListeners('accountsUpdated');
    ethEmitter.on('accountsUpdated', this.ethAccountsRefreshed);

    wanEmitter.removeAllListeners("transactionsUpdated");
    wanEmitter.removeAllListeners("convertCurve");
    wanEmitter.on('accountsUpdated', this.wanAccountsRefreshed);
    wanEmitter.on('convertCurve', this.convertCurveReturned)

    this.getAllAccounts()
  },

  convertCurveReturned(err, data) {
    console.log(err)
    console.log(data)

    if(data.success) {
      this.setState({ message: 'Transaction successfully submitted', ethAccountValue: '', wanAccountValue: '', amountValue: '' })
    } else {
      this.setState({ error: data.errorMsg })
    }
  },

  ethAccountsRefreshed() {
    const accounts = ethStore.getStore('accounts')
    let val = null;
    if(accounts) {
      val = accounts.map((acc) => {
        return {
          description: acc.name,
          value: acc.address
        }
      })
    }
    this.setState({
      ethAccounts: accounts,
      ethAccountOptions: val,
      ethLoading: false,
    })
  },

  wanAccountsRefreshed() {
    const accounts = wanStore.getStore('accounts')
    let val = null;
    if(accounts) {
      val = accounts.map((acc) => {
        return {
          description: acc.name,
          value: acc.publicAddress
        }
      })
    }
    this.setState({
      wanAccounts: accounts,
      wanAccountOptions: val,
      wanLoading: false,
    })
  },

  getAllAccounts() {
    const { user } = this.props;
    const content = { id: user.id };

    ethDispatcher.dispatch({
      type: 'getEthAddress',
      content,
      token: user.token
    });
    wanDispatcher.dispatch({
      type: 'getWanAddress',
      content,
      token: user.token
    });
  },

  handleSelectChange(event) {
    switch (event.target.name) {
      case 'ethAccount':
        this.setState({ ethAccountValue: event.target.value })
        break;
      case 'wanAccount':
        const balance = this.state.wanAccounts.filter((acc) => {
          return acc.publicAddress === event.target.value
        }).map((acc) => {
          return acc.tokens.filter((tok) => {
            return tok.symbol === 'CURV'
          }).map((tok) => {
            return tok.balance
          })
        })
        this.setState({ wanAccountValue: event.target.value, curveBalance: balance })
        break;
    }
  },

  handleChange(event) {
    switch (event.target.name) {
      case 'amount':
        this.setState({ amountValue: event.target.value })
        break;
    }
  },

  validateSwap() {
    this.setState({ wanAccountError: false, wanAccountErrorMessage: "", ethAccountError: false, ethAccountErrorMessage: "", amountError: false, amountErrorMessage: ""})

    const {
      wanAccountValue,
      ethAccountValue,
      amountValue,
      curveBalance
    } = this.state

    let error = false

    if(wanAccountValue === null || wanAccountValue === "") {
      this.setState({ wanAccountError: true, wanAccountErrorMessage: 'Wanchain Account is required' })
      error = true
    }

    if(ethAccountValue === null || ethAccountValue === "") {
      this.setState({ ethAccountError: true, ethAccountErrorMessage: 'Ethereum Account is required' })
      error = true
    }

    if(amountValue === null || amountValue === "") {
      this.setState({ amountError: true, amountErrorMessage: 'Amount is required' })
      error = true
    }

    if(parseFloat(amountValue) > parseFloat(curveBalance)) {
      this.setState({ amountError: true, amountErrorMessage: 'Amount > Current Balance' })
      error = true
    }

    return !error
  },

  swapTokens() {

    if (this.validateSwap()) {
      this.setState({ wanLoading: true })


      const { user } = this.props

      const {
        wanAccountValue,
        ethAccountValue,
        amountValue
      } = this.state

      const content = {
        wanAddress: wanAccountValue,
        ethAddress: ethAccountValue,
        amount: amountValue,
        id: user.id
      };

      wanDispatcher.dispatch({
        type: "convertCurve",
        content,
        token: user.token
      });
    }
  }

})

export default (TokenSwap);
