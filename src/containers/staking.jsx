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
// let tezosDispatcher = require('../store/tezosStore.js').default.dispatcher;
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
    let allStakingPerformance = store.getStore('allStakingPerformance')
    let stakingPerformance = store.getStore('stakingPerformance')

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

      allStakingPerformance,
      stakingPerformance,
      currencyValue: 'USD',
      timeFrameValue: 'month',

      timeFrameOptions: [
        { value: 'year', description: '1 Year' },
        { value: 'month', description: '1 Month' }
      ],

      tokenTimeFrameValue: 'month',

      tokenTimeFrameOptions: [
        { value: 'year', description: '1 Year' },
        { value: 'month', description: '1 Month' }
      ],
      currencyOptions: [ ],

      allStakeLoading: true,
      tokenStakeLoading: true,

      delegateValue: '',
      delegateError: false,
      delegateErrorMessage: '',
      delegateOptions: [],
    };
  },

  componentWillMount() {
    emitter.on("stakesUpdated", this.stakesUpdated)
    emitter.on("getStakeableCurrencies", this.getStakeableCurrenciesReturned)
    emitter.on("getStakingNodes", this.getStakingNodesReturned)
    emitter.on('getAllStakingPerformance', this.getAllStakingPerformanceReturned)
    emitter.on('getStakingPerformance', this.getStakingPerformanceRetuned)

    ethEmitter.on('accountsUpdated', this.ethAccountsRefreshed)
    tezosEmitter.on('accountsUpdated', this.tezosAccountsRefreshed)
    wanEmitter.on('accountsUpdated', this.wanAccountsRefreshed)

    tezosEmitter.on('setDelegate', this.setDelegateReturned)

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

    content.period = 'month'
    dispatcher.dispatch({
      type: 'getAllStakingPerformance',
      content,
      token: user.token
    });
  },

  componentWillUnmount() {
    emitter.removeAllListeners("stakesUpdated");
    emitter.removeAllListeners("getStakeableCurrencies");
    emitter.removeAllListeners("getStakingNodes");
    emitter.removeAllListeners("getAllStakingPerformance");
    tezosEmitter.removeAllListeners("setDelegate");
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
    const userStakes = store.getStore('userStakes')

    this.setState({
      userStakes: userStakes,
      rewardHistory: store.getStore('rewardHistory'),
      transactionHistory: store.getStore('transactionHistory'),
      history: [...store.getStore('rewardHistory'), ...store.getStore('transactionHistory')],
      loading: false,
      currencyOptions: (userStakes&&userStakes.length > 0) ? userStakes.map((stake) => {
        return  { value: stake.currency, description: stake.currency }
      }) : [],
      currencyValue: (userStakes&&userStakes.length > 0) ? userStakes[0].currency : '',
      tokenStakeLoading: true
    })


    if(userStakes && userStakes.length > 0) {
      let { user } = this.props

      const content = {
        userId: user.id,
        period: this.state.tokenTimeFrameValue,
        currency: userStakes[0].currency,
        displayCurrency: 'USD'
      }

      dispatcher.dispatch({
        type: 'getStakingPerformance',
        content,
        token: user.token
      });
    }
  },

  getAllStakingPerformanceReturned() {
    this.setState({ allStakingPerformance: store.getStore('allStakingPerformance'), allStakeLoading: false })
  },

  getStakingPerformanceRetuned() {
    this.setState({ stakingPerformance: store.getStore('stakingPerformance'), tokenStakeLoading: false })
  },

  setDelegateReturned() {
    this.setState({ loading: false, accountValue: '', tokenValue: '', amount: '', delegateValue: '', ownDelegateValue: '' })

    let { user } = this.props

    const content = {
      userId: user.id,
      period: this.state.tokenTimeFrameValue,
      currency: store.getStore('userStakes')[0].currency,
      displayCurrency: 'USD'
    }

    dispatcher.dispatch({
      type: 'getStakingPerformance',
      content,
      token: user.token
    });
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
      allStakingPerformance,
      currencyValue,
      timeFrameValue,
      tokenTimeFrameValue,
      currencyOptions,
      timeFrameOptions,
      tokenTimeFrameOptions,
      allStakeLoading,
      tokenStakeLoading,
      stakingPerformance,
      delegateOptions,
      delegateValue,
      delegateError,
      delegateErrorMessage,
      ownDelegateValue,
      ownDelegateError,
      ownDelegateErrorMessage,
    } = this.state

    return (
      <StakingComponent
        handleStake={ this.handleStake }
        handleStakeClose={ this.handleStakeClose }
        handleStakeFinish={ this.handleStakeFinish }
        handleWithdrawClose={ this.handleWithdrawClose }
        handleWithdrawFinish={ this.handleWithdrawFinish }
        timeFrameChanged={ this.timeFrameChanged }
        tokenTimeFrameChanged={ this.tokenTimeFrameChanged }
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
        allStakeLoading={ allStakeLoading }

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

        delegateOptions={ delegateOptions }
        delegateValue={ delegateValue }
        delegateError={ delegateError }
        delegateErrorMessage={ delegateErrorMessage }

        ownDelegateValue={ ownDelegateValue }
        ownDelegateError={ ownDelegateError }
        ownDelegateErrorMessage={ ownDelegateErrorMessage }

        optionsToken={ optionsToken }

        allStakingPerformance={ allStakingPerformance }
        currencyValue={ currencyValue }
        timeFrameValue={ timeFrameValue }
        tokenTimeFrameValue={ tokenTimeFrameValue }
        currencyOptions={ currencyOptions }
        timeFrameOptions={ timeFrameOptions }
        tokenTimeFrameOptions={ tokenTimeFrameOptions }

        tokenStakeLoading={ tokenStakeLoading }
        stakingPerformance={ stakingPerformance }
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
        stakingNodes,
        delegateValue,
        ownDelegateValue
      } = this.state

      let { user } = this.props
      let content = {}

      if(tokenValue === "XTZ") {
        content = {
          userId: user.id,
          fromAddress: accountValue,
          nodeId: (delegateValue&&delegateValue!=="")?delegateValue:ownDelegateValue,
          amount: amountValue,
          currency: tokenValue
        }

        console.log(content)

        dispatcher.dispatch({
          type: 'addStake',
          content,
          token: user.token
        });
        // content = {
        //   address: accountValue,
        //   delegateAddress: (delegateValue!=null&&delegateValue!='')?delegateValue:ownDelegateValue,
        // }
        //
        // tezosDispatcher.dispatch({
        //   type: 'setDelegate',
        //   content,
        //   token: user.token
        // });
      } else {
        content = {
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
      }

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
      amountValue,
      delegateValue,
      ownDelegateValue
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

    //validate stake amount

    if(tokenValue === 'XTZ') {
      if((!delegateValue || delegateValue === "") && (!ownDelegateValue || delegateValue === "")) {
        this.setState({ delegateError: true, ownDelegateError: true, delegateErrorMessage: "Delegate or Own Delegate is required" })
      }
    }

    return !error
  },

  timeFrameChanged(event) {
    this.setState( { timeFrameValue: event.target.value, allStakeLoading: true } )

    let { user } = this.props

    const content = {
      userId: user.id,
      period: event.target.value
    }

    dispatcher.dispatch({
      type: 'getAllStakingPerformance',
      content,
      token: user.token
    });
  },

  tokenTimeFrameChanged(event) {
    this.setState( { tokenTimeFrameValue: event.target.value, tokenStakeLoading: true } )

    let { user } = this.props

    const content = {
      userId: user.id,
      period: event.target.value,
      currency: this.state.currencyValue,
      displayCurrency: 'USD'
    }

    dispatcher.dispatch({
      type: 'getStakingPerformance',
      content,
      token: user.token
    });
  },

  currencyChanged(event) {
    this.setState( { currencyValue: event.target.value, tokenStakeLoading: true } )

    let { user } = this.props

    const content = {
      userId: user.id,
      period: this.state.timeFrameValue,
      currency: event.target.value,
      displayCurrency: 'USD'
    }

    dispatcher.dispatch({
      type: 'getStakingPerformance',
      content,
      token: user.token
    });
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
      ethAccounts,
      stakingNodes,
    } = this.state

    switch (event.target.name) {
      case 'token':

        let delegateOptions = []

        if(stakingNodes) {
          delegateOptions = stakingNodes.filter((node) => {
            return node.currency === event.target.value
          })
          .map((node) => {
            return { value: node.id, description: 'Cryptocurve Node'}
          })
        }

        this.setState({ tokenValue: event.target.value, accountValue: null, accountOptions: this.processAccountOptions(event.target.value, tezosAccounts, ethAccounts), delegateOptions })
        break;
      case 'account':
        this.setState({ accountValue: event.target.value })
        break;
      case 'delegate':
        this.setState({ delegateValue: event.target.value })
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
          return account.delegatable === false
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
