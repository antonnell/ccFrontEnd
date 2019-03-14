import React from 'react';
import StakingComponent from '../components/staking/index.jsx';

const createReactClass = require('create-react-class');

let store = require('../store/stakingStore.js').default.store;
let emitter = require('../store/stakingStore.js').default.emitter;

let Staking = createReactClass({
  getInitialState() {
    return {
      store: store.store,
      stakeOpen: false,
      optionsToken: null
    };
  },

  componentWillMount() {
    emitter.on("StoreUpdated", () => {
      this.setState({ store: store.store })
    });
  },

  componentWillUnmount() {
    emitter.removeAllListeners("StoreUpdated");
  },

  render() {
    return (
      <StakingComponent
        theme={ this.props.theme }
        handleStake={ this.handleStake }
        handleStakeClose={ this.handleStakeClose }
        handleStakeFinish={ this.handleStakeFinish }
        store={ this.state.store }
        stakeOpen={ this.state.stakeOpen }
        handleCheck={ this.handleCheck }
        timeFrameChanged={ this.timeFrameChanged }
        currencyChanged={ this.currencyChanged }
        optionsClicked={ this.optionsClicked }
        optionsClosed={ this.optionsClosed }
        optionsToken={ this.optionsToken }
        depositClicked={ this.depositClicked }
        withdrawClicked={ this.withdrawClicked }
      />
    );
  },

  handleStake() {
    this.setState({ stakeOpen: true })
  },

  handleStakeClose() {
    this.setState({ stakeOpen: false })
  },

  handleStakeFinish() {
    this.setState({ stakeOpen: false })

    let coins = store.getStore('coins')
    let tokens = store.getStore('tokens')

    let newTokens = coins.filter((coin) => {
      return coin.checked === true
    }).map((coin) => {

      let theToken = tokens.filter((token) => {
        return token.uuid == coin.uuid
      })

      if(theToken.length > 0) {
        return theToken[0]
      }

      return {
        uuid: coin.name,
        name: coin.name,
        totalRewards: 0,
        rewardsToday: 0,
        totalStaked: 0,
        age: 0,
        anchorEl: null,
        optionsOpen: false,
      }
    })
    store.setStore({ tokens: newTokens })
  },

  handleCheck(coin) {
    let newCoins = store.store.coins.map((i) => {
      if(coin.uuid === i.uuid) {
        i.checked = !i.checked
      }

      return i;
    })

    store.setStore({ coins: newCoins })
  },

  timeFrameChanged(event) {
    store.setStore( { timeFrame: event.target.value, data: Array(30).fill().map(() => Math.random()*100) } )
  },

  currencyChanged(event) {
    store.setStore( { currency: event.target.value, data: Array(30).fill().map(() => Math.random()*100) } )
  },

  optionsClicked(event, token) {
    let tokens = store.getStore('tokens')
    let newTokens = tokens.map((i) => {
      if(token.uuid === i.uuid) {
        i.anchorEl = event.currentTarget
        i.optionsOpen = true
      }
      return i
    })
    store.setStore({ tokens: newTokens })
  },

  optionsClosed(event, token) {
    let tokens = store.getStore('tokens')
    let newTokens = tokens.map((i) => {
      i.anchorEl = null
      i.optionsOpen = false
      return i
    })
    store.setStore({ tokens: newTokens })
  },

  depositClicked(token) {
    this.optionsClosed(null, token)

    let tokens = store.getStore('tokens')
    let newTokens = tokens.map((i) => {
      if(token.uuid === i.uuid) {
        i.totalRewards = (Math.random()*100).toFixed(0)
        i.rewardsToday = (Math.random()*10).toFixed(0)
        i.totalStaked = (Math.random()*10000).toFixed(0)
        i.age = (Math.random()*100).toFixed(0)+'D'
      }
      return i
    })

    store.setStore({ tokens: newTokens })
  },

  withdrawClicked(token) {
    this.optionsClosed(null, token)

    let tokens = store.getStore('tokens')
    let newTokens = tokens.map((i) => {
      if(token.uuid === i.uuid) {
        i.totalRewards = 0
        i.rewardsToday = 0
        i.totalStaked = 0
        i.age = 0
      }
      return i
    })

    store.setStore({ tokens: newTokens })
  }
});

export default Staking;
