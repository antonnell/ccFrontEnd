import React from 'react';
import StakingComponent from '../components/staking/index.jsx';

const createReactClass = require('create-react-class');

let store = require('../store/stakingStore.js').default.store;
let emitter = require('../store/stakingStore.js').default.emitter;
let dispatcher = require('../store/stakingStore.js').default.dispatcher;

let aionEmitter = require('../store/aionStore.js').default.emitter;
let bitcoinEmitter = require('../store/bitcoinStore.js').default.emitter;
let ethStore = require('../store/ethStore.js').default.store;
let ethEmitter = require('../store/ethStore.js').default.emitter;
let tezosStore = require('../store/tezosStore.js').default.store;
let tezosEmitter = require('../store/tezosStore.js').default.emitter;
let wanStore = require('../store/wanStore.js').default.store;
let wanEmitter = require('../store/wanStore.js').default.emitter;

let Staking = createReactClass({
  getInitialState() {

    let ethAccounts = ethStore.getStore('accounts')
    let tezosAccounts = tezosStore.getStore('accounts')
    let wanAccounts = wanStore.getStore('accounts')
    let stakeableCurrencies = store.getStore('stakeableCurrencies')
    let rewardHistory = store.getStore('rewardHistory')
    let transactionHistory = store.getStore('transactionHistory')

    let tokenOptions = []
    if(stakeableCurrencies) {
      tokenOptions = stakeableCurrencies.map((currency) => {
        return {
          value: currency.currency,
          description: currency.name
        }
      })
    }

    return {
      ethAccounts: ethAccounts,
      wanAccounts: wanAccounts,
      tezosAccounts: tezosAccounts,

      loading: true,
      ethLoading: ethAccounts === null ? true : false,
      wanLoading: ethAccounts === null ? true : false,
      tezosLoading: ethAccounts === null ? true : false,

      error: null,
      stakeOpen: this.props.stakeOpen,
      withdrawOpen: false,
      optionsToken: null,

      stakeableCurrencies: stakeableCurrencies ? stakeableCurrencies.map((currency) => {
        return {
          value: currency.currency,
          description: currency.name
        }
      }) : null,
      stakingNodes: store.getStore('stakingNodes'),
      userStakes: store.getStore('userStakes'),
      rewardHistory: rewardHistory,
      transactionHistory: transactionHistory,

      history: [...(rewardHistory ? rewardHistory : []), ...(transactionHistory ? transactionHistory : null)],

      tokenOptions: tokenOptions,
      tokenValue: this.props.stakingCurrency ? this.props.stakingCurrency : '',
      tokenError: null,
      tokenErrorMessage: '',

      accountOptions: this.processAccountOptions(this.props.stakingCurrency, tezosAccounts, ethAccounts),
      accountValue: '',
      accountError: null,
      accountErrorMessage: '',

      amountValue: '',
      amountError: null,
      amountErrorMessage: '',

    };
  },

  componentWillMount() {
    emitter.on("stakesUpdated", this.stakesUpdated)
    emitter.on("getStakeableCurrencies", this.getStakeableCurrenciesReturned)
    emitter.on("getStakingNodes", this.getStakingNodesReturned)

    ethEmitter.on('accountsUpdated', this.ethAccountsRefreshed)
    tezosEmitter.on('accountsUpdated', this.tezosAccountsRefreshed)
    wanEmitter.on('accountsUpdated', this.wanAccountsRefreshed)

    emitter.on('error', this.showError)
    aionEmitter.on('error', this.showError)
    bitcoinEmitter.on('error', this.showError)
    ethEmitter.on('error', this.showError)
    tezosEmitter.on('error', this.showError)
    wanEmitter.on('error', this.showError)

    const { user } = this.props;
    const content = { userId: user.id };

    dispatcher.dispatch({
      type: 'getStakingNodes',
      content,
      token: user.token
    });

    dispatcher.dispatch({
      type: 'getUserStakingSummaries',
      content,
      token: user.token
    });
  },

  componentWillUnmount() {
    emitter.removeAllListeners("stakesUpdated");
    emitter.removeAllListeners("getStakeableCurrencies");
    emitter.removeAllListeners("getStakingNodes");
  },

  showError(error) {
    this.setState({ error: error.toString() })
  },

  ethAccountsRefreshed() {
    this.setState({ ethAccounts: ethStore.getStore('accounts'), ethLoading: false })
  },

  tezosAccountsRefreshed() {
    this.setState({ tezosAccounts: tezosStore.getStore('accounts'), tezosLoading: false })
  },

  wanAccountsRefreshed() {
    this.setState({ wanAccounts: wanStore.getStore('accounts'), wanLoading: false })
  },

  stakesUpdated() {
    this.setState({
      userStakes: store.getStore('userStakes'),
      rewardHistory: store.getStore('rewardHistory'),
      transactionHistory: store.getStore('transactionHistory'),
      history: [...store.getStore('rewardHistory'), ...store.getStore('transactionHistory')],
      loading: false
    })
  },

  getStakeableCurrenciesReturned() {

    let stakeableCurrencies = store.getStore('stakeableCurrencies')

    let tokenOptions = stakeableCurrencies.map((currency) => {
      return {
        value: currency.currency,
        description: currency.name
      }
    })

    this.setState({ stakeableCurrencies, tokenOptions })
  },

  getStakingNodesReturned() {
    this.setState({ stakingNodes: store.getStore('stakingNodes') })
  },

  render() {

    let {
      theme,
      size
    } = this.props

    let {
      stakeOpen,
      withdrawOpen,
      userStakes,
      rewardHistory,
      transactionHistory,
      stakeableCurrencies,
      stakingNodes,
      tokenOptions,
      tokenValue,
      tokenError,
      tokenErrorMessage,
      accountOptions,
      accountValue,
      accountError,
      accountErrorMessage,
      amountValue,
      amountError,
      amountErrorMessage,
      ethLoading,
      wanLoading,
      tezosLoading,
      loading,
      history,
      error,
      optionsToken,
    } = this.state

    return (
      <StakingComponent
        handleStake={ this.handleStake }
        handleStakeClose={ this.handleStakeClose }
        handleStakeFinish={ this.handleStakeFinish }
        handleWithdrawClose={ this.handleWithdrawClose }
        handleWithdrawFinish={ this.handleWithdrawFinish }
        timeFrameChanged={ this.timeFrameChanged }
        currencyChanged={ this.currencyChanged }
        optionsClicked={ this.optionsClicked }
        optionsClosed={ this.optionsClosed }
        depositClicked={ this.depositClicked }
        withdrawClicked={ this.withdrawClicked }
        handleSelectChange={ this.handleSelectChange }
        onChange={ this.onChange }

        size={ size }
        theme={ theme }

        error={ error }
        loading={ loading || ethLoading || tezosLoading || wanLoading }

        stakeOpen={ stakeOpen }
        withdrawOpen={ withdrawOpen }
        userStakes={ userStakes }
        rewardHistory={ rewardHistory }
        transactionHistory={ transactionHistory }
        stakeableCurrencies={ stakeableCurrencies }
        stakingNodes={ stakingNodes }

        history={ history }

        tokenOptions={ tokenOptions }
        tokenValue={ tokenValue }
        tokenError={ tokenError}
        tokenErrorMessage={ tokenErrorMessage }

        accountOptions={ accountOptions }
        accountValue={ accountValue }
        accountError={ accountError }
        accountErrorMessage={ accountErrorMessage }

        amountValue={ amountValue }
        amountError={ amountError }
        amountErrorMessage={ amountErrorMessage }

        optionsToken={ optionsToken }
      />
    );
  },

  handleStake() {
    this.setState({ stakeOpen: true })
  },

  handleStakeClose() {
    this.setState({ stakeOpen: false })
    this.props.addStakeClosed()
  },

  handleWithdrawClose() {
    this.setState({ withdrawOpen: false })
  },

  handleWithdrawFinish() {
    if(this.validateWithdraw()) {

      this.setState({ withdrawOpen: false, loading: true })

      let {
        accountValue,
        tokenValue,
        amountValue,
        stakingNodes
      } = this.state

      let { user } = this.props

      let content = {
        userId: user.id,
        toAddress: accountValue,
        nodeId: stakingNodes.filter((node) => { return node.currency === tokenValue }).map((node) => { return node.id })[0],
        amount: amountValue
      }

      dispatcher.dispatch({
        type: 'withdrawStake',
        content,
        token: user.token
      });

      this.setState({
        accountValue: "",
        tokenValue: "",
        amountValue: ""
      })
    }
  },

  handleStakeFinish() {
    if(this.validateAdd()) {

      this.setState({ stakeOpen: false, loading: true })

      let {
        accountValue,
        tokenValue,
        amountValue,
        stakingNodes
      } = this.state

      let { user } = this.props

      let content = {
        userId: user.id,
        fromAddress: accountValue,
        nodeId: stakingNodes.filter((node) => { return node.currency === tokenValue }).map((node) => { return node.id })[0],
        amount: amountValue,
        currency: tokenValue
      }

      dispatcher.dispatch({
        type: 'addStake',
        content,
        token: user.token
      });

      this.setState({
        accountValue: "",
        tokenValue: "",
        amountValue: ""
      })
    }
  },

  validateWithdraw() {
    let {
      accountValue,
      tokenValue,
      amountValue
    } = this.state

    let error = false

    if(!accountValue || accountValue === "") {
      this.setState({ accountError: true, accountErrorMessage: "From Account is required"})
      error = true
    }

    if(!tokenValue || tokenValue === "") {
      this.setState({ tokenError: true, tokenErrorMessage: "Token is required"})
      error = true
    }

    if(!amountValue || amountValue === "") {
      this.setState({ amountError: true, amountErrorMessage: "Stake Amount is required"})
      error = true
    }

    return !error
  },

  validateAdd() {
    let {
      accountValue,
      tokenValue,
      amountValue
    } = this.state

    let error = false

    if(!accountValue || accountValue === "") {
      this.setState({ accountError: true, accountErrorMessage: "From Account is required"})
      error = true
    }

    if(!tokenValue || tokenValue === "") {
      this.setState({ tokenError: true, tokenErrorMessage: "Token is required"})
      error = true
    }

    if(!amountValue || amountValue === "") {
      this.setState({ amountError: true, amountErrorMessage: "Stake Amount is required"})
      error = true
    }

    return !error
  },

  timeFrameChanged(event) {
    store.setStore( { timeFrame: event.target.value, data: Array(30).fill().map(() => Math.random()*100) } )
  },

  currencyChanged(event) {
    store.setStore( { currency: event.target.value, data: Array(30).fill().map(() => Math.random()*100) } )
  },

  optionsClicked(event, optionsToken) {
    optionsToken.anchorEl = event.currentTarget
    this.setState({ optionsToken })
  },

  optionsClosed() {
    this.setState({ optionsToken: null })
  },

  depositClicked(token) {
    this.setState({
      stakeOpen: true,
      optionsToken: null,
      tokenValue: token.currency,
      accountOptions: this.processAccountOptions(token.currency, this.state.tezosAccounts, this.state.ethAccounts)
    })
  },

  withdrawClicked(token) {
    this.setState({
      withdrawOpen: true,
      optionsToken: null,
      tokenValue: token.currency,
      accountOptions: this.processAccountOptions(token.currency, this.state.tezosAccounts, this.state.ethAccounts)
    })
  },

  handleSelectChange(event, value) {

    let {
      tezosAccounts,
      ethAccounts
    } = this.state

    switch (event.target.name) {
      case 'token':
        this.setState({ tokenValue: event.target.value, accountValue: null, accountOptions: this.processAccountOptions(event.target.value, tezosAccounts, ethAccounts) })
        break;
      case 'account':
        this.setState({ accountValue: event.target.value })
        break;
      default:
        break
    }
  },

  processAccountOptions(tokenValue, tezosAccounts, ethAccounts) {
    let accountOptions = []
    switch (tokenValue) {
      case 'XTZ':
        accountOptions = tezosAccounts.filter((account) => {
          return account.delegatable === true
        }).map((account) => {
          return {
            value: account.address,
            description: account.name,
            balance: account.balance,
            symbol: 'XTZ'
          }
        })
        return accountOptions
      default:
        if(ethAccounts) {
          let accountOptions = ethAccounts.map((account) => {

            if(!account.tokens) {
              return null
            }

            return account.tokens.filter((token) => {
              return token.symbol === tokenValue && token.balance > 0
            })
            .map((token) => {
              return {
                value: account.address,
                description: account.name,
                balance: token.balance,
                symbol: token.symbol
              }
            })
          })

          const flattenedArray = [].concat(...accountOptions);

          return flattenedArray
        }
        break;
    }
  },

  onChange(event) {
    switch (event.target.name) {
      case 'amount':
        this.setState({ amountValue: event.target.value })
        break;
      default:
        break
    }
  },
});

export default Staking;
