import React from 'react'
import TokenSwapComponent from '../components/tokenSwap'
const createReactClass = require('create-react-class')

let ethEmitter = require("../store/ethStore.js").default.emitter;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let ethStore = require("../store/ethStore.js").default.store;

let wanEmitter = require("../store/wanStore.js").default.emitter;
let wanDispatcher = require("../store/wanStore.js").default.dispatcher;
let wanStore = require("../store/wanStore.js").default.store;

let bnbEmitter = require("../store/binanceStore.js").default.emitter;
let bnbDispatcher = require("../store/binanceStore.js").default.dispatcher;
let bnbStore = require("../store/binanceStore.js").default.store;

let TokenSwap = createReactClass({
  getInitialState() {
    const ethAccounts = ethStore.getStore('accounts')
    const wanAccounts = wanStore.getStore('accounts')
    const bnbAccounts = bnbStore.getStore('accounts')

    return {
      ethLoading: true,
      wanLoading: true,
      bnbLoading: true,
      error: null,
      message: '',
      ethAccountValue: '',
      ethAccountError: false,
      ethAccountErrorMessage: '',
      ethAccountOptions: ethAccounts,
      wanAccountValue: '',
      wanAccountError: false,
      wanAccountErrorMessage: '',
      wanAccountOptions: wanAccounts,
      bnbAccountValue: '',
      bnbAccountError: false,
      bnbAccountErrorMessage: '',
      bnbAccountOptions: bnbAccounts,
      amountValue: '',
      amountError: false,
      amountErrorMessage: '',
      curveBalance: null,
      ethCurveBalance: null,
      tabValue: 0,
      tokenOptions: [
        { value: 'Binance', description: "Binance", icon: "Binance"},
        { value: 'Ethereum', description: "ERC-20", icon: "Ethereum"},
        { value: 'Wanchain', description: "WRC-20", icon: "Wanchain"}
      ],
      sendToken: 'Wanchain',
      receiveToken: "Ethereum",
      sendValue: '0',
      receiveValue: '0'
    }
  },

  render() {

    const {
      ethLoading,
      wanLoading,
      bnbLoading,
      error,
      ethAccountValue,
      ethAccountError,
      ethAccountErrorMessage,
      ethAccountOptions,
      wanAccountValue,
      wanAccountError,
      wanAccountErrorMessage,
      wanAccountOptions,
      bnbAccountValue,
      bnbAccountError,
      bnbAccountErrorMessage,
      bnbAccountOptions,
      amountValue,
      amountError,
      amountErrorMessage,
      curveBalance,
      ethCurveBalance,
      message,
      tabValue,
      tokenOptions,
      sendToken,
      receiveToken,
      sendValue,
      receiveValue,
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
        handleTabChange={ this.handleTabChange }

        theme={ theme }
        user={ user }

        error={ error }
        message={ message }
        loading={ ethLoading || wanLoading || bnbLoading }
        ethAccountValue={ ethAccountValue }
        ethAccountError={ ethAccountError }
        ethAccountErrorMessage={ ethAccountErrorMessage }
        ethAccountOptions={ ethAccountOptions }
        wanAccountValue={ wanAccountValue }
        wanAccountError={ wanAccountError }
        wanAccountErrorMessage={ wanAccountErrorMessage }
        wanAccountOptions={ wanAccountOptions }
        bnbAccountValue={ bnbAccountValue }
        bnbAccountError={ bnbAccountError }
        bnbAccountErrorMessage={ bnbAccountErrorMessage }
        bnbAccountOptions={ bnbAccountOptions }
        amountValue={ amountValue }
        amountError={ amountError }
        amountErrorMessage={ amountErrorMessage }
        curveBalance={ curveBalance }
        ethCurveBalance={ ethCurveBalance }
        tabValue={ tabValue }
        tokenOptions={ tokenOptions }
        sendToken={ sendToken }
        receiveToken={ receiveToken }
        sendValue={ sendValue }
        receiveValue={ receiveValue }
      />
    )
  },


  componentWillMount() {
    ethEmitter.removeAllListeners('accountsUpdated');
    wanEmitter.removeAllListeners("accountsUpdated");
    bnbEmitter.removeAllListeners("accountsUpdated");

    wanEmitter.on('accountsUpdated', this.wanAccountsRefreshed);
    ethEmitter.on('accountsUpdated', this.ethAccountsRefreshed);
    bnbEmitter.on('accountsUpdated', this.bnbAccountsRefreshed);

    wanEmitter.removeAllListeners("convertCurve");
    ethEmitter.removeAllListeners("convertCurve");
    bnbEmitter.removeAllListeners("convertCurve")
    wanEmitter.on('convertCurve', this.convertCurveReturned)
    ethEmitter.on('convertCurve', this.convertCurveReturned)
    bnbEmitter.on('convertCurve', this.convertCurveReturned)

    this.getAllAccounts()
  },

  convertCurveReturned(err, data) {
    if(data.success) {
      this.setState({ message: 'Transaction successfully submitted', ethAccountValue: '', wanAccountValue: '', bnbAccountValue: '', amountValue: '', sendValue: '', receiveValue: '' })
    } else {
      this.setState({ error: data.errorMsg })
    }
  },

  bnbAccountsRefreshed() {
    const accounts = bnbStore.getStore('accounts')
    let val = null;
    if(accounts) {
      val = accounts.map((acc) => {
        let token = acc.balances.filter((tokenAccount) => {
          return tokenAccount.symbol === 'CURV-80B'
        })

        let balance = null

        if(token.length > 0) {
          balance = token[0].free
        }

        return {
          description: acc.name,
          value: acc.address,
          balance: balance,
          symbol: 'CURV-80B'
        }
      })
    }
    this.setState({
      bnbAccounts: accounts,
      bnbAccountOptions: val,
      bnbLoading: false,
    })
  },

  ethAccountsRefreshed() {
    const accounts = ethStore.getStore('accounts')
    let val = null;
    if(accounts) {
      val = accounts.map((acc) => {
        let token = acc.tokens.filter((tokenAccount) => {
          return tokenAccount.name === 'Curve'
        })

        let balance = null

        if(token.length > 0) {
          balance = token[0].balance
        }

        return {
          description: acc.name,
          value: acc.address,
          balance: balance,
          symbol: 'CURV'
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
        let token = acc.tokens.filter((tokenAccount) => {
          return tokenAccount.name === 'Curve'
        })

        let balance = null

        if(token.length > 0) {
          balance = token[0].balance
        }

        return {
          description: acc.name,
          value: acc.publicAddress,
          balance: balance,
          symbol: 'CURV'
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
    bnbDispatcher.dispatch({
      type: 'getBinanceAddress',
      content,
      token: user.token
    });
  },

  handleSelectChange(event) {
    let balance = 0
    switch (event.target.name) {
      case 'ethAccount':
        this.setState({ ethAccountValue: event.target.value })
        break;
      case 'wanAccount':
        this.setState({ wanAccountValue: event.target.value })
        break;
      case 'bnbAccount':
        this.setState({ bnbAccountValue: event.target.value })
        break;
      case 'sendToken':
        this.setState({ sendToken: event.target.value })
        break;
      case 'receiveToken':
        this.setState({ receiveToken: event.target.value })
        break;
      default:

    }
  },

  handleChange(event) {
    switch (event.target.name) {
      case 'amount':
        this.setState({ amountValue: event.target.value })
        break;
      case 'send':
        this.setState({ sendValue: event.target.value, receiveValue: event.target.value })
        break;
      default:

    }
  },

  validateSwap() {
    // this.setState({ wanAccountError: false, wanAccountErrorMessage: "", ethAccountError: false, ethAccountErrorMessage: "", amountError: false, amountErrorMessage: ""})

    // const {
    //   sendToken,
    //   receiveToken,
    //   sendValue,
    //   ethAccountValue,
    //   wanAccountValue,
    //   bnbAccountValue
    // } = this.state

    let error = false
    //
    // if(sendValue === null || sendValue === "") {
    //   this.setState({ sendError: true, sendErrorMessage: 'Amount is required' })
    //   error = true
    // }

    return !error
  },

  swapTokens() {
    if (this.validateSwap()) {

      const { user } = this.props

      const {
        sendToken,
        receiveToken,
        sendValue,
        ethAccountValue,
        wanAccountValue,
        bnbAccountValue
      } = this.state

      let content = null

      switch (sendToken) {
        case 'Ethereum':
          content = {
            amount: sendValue,
            sourceAddress: ethAccountValue,
            destinationAddress: receiveToken === 'Binance' ? bnbAccountValue : wanAccountValue,
            destinationChain: receiveToken === 'Binance' ? "BINANCE" : "ETH",
            id: user.id
          }

          this.setState({ ethLoading: true, error: null })

          ethDispatcher.dispatch({
            type: "convertCurve",
            content,
            token: user.token
          });
          break;
        case 'Wanchain':
          content = {
            amount: sendValue,
            sourceAddress: wanAccountValue,
            destinationAddress: receiveToken === 'Ethereum' ? ethAccountValue : bnbAccountValue,
            destinationChain: receiveToken === 'Ethereum' ? "ETH" : "BINANCE",
            id: user.id
          }

          this.setState({ wanLoading: true, error: null })

          wanDispatcher.dispatch({
            type: "convertCurve",
            content,
            token: user.token
          });
          break;
        case 'Binance':
          content = {
            amount: sendValue,
            sourceAddress: bnbAccountValue,
            destinationAddress: receiveToken === 'Ethereum' ? ethAccountValue : wanAccountValue,
            destinationChain: receiveToken === 'Ethereum' ? "ETH" : "WAN",
            id: user.id
          }

          this.setState({ bnbLoading: true, error: null })

          bnbDispatcher.dispatch({
            type: "convertCurve",
            content,
            token: user.token
          });
          break;
        default:
          return false
      }
    }
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },

})

export default (TokenSwap);
