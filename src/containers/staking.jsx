import React from 'react';
import StakingComponent from '../components/staking/index.jsx';

const createReactClass = require('create-react-class');

let store = require('../store/stakingStore.js').default.store;
let emitter = require('../store/stakingStore.js').default.emitter;

let Staking = createReactClass({
  getInitialState() {
    return {
      store: store.store,
      stakeOpen: false
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

    let tokens = store.getStore('tokens')
    let coins = store.getStore('coins')

    let newTokens = coins.filter((coin) => {
      return coin.checked === true
    }).map((coin) => {
      return {
        name: coin.name,
        totalRewards: (Math.random()*100).toFixed(0),
        rewardsToday: (Math.random()*10).toFixed(0),
        totalStaked: (Math.random()*10000).toFixed(0),
        age: (Math.random()*100).toFixed(0)+'D'
      }
    })
    store.setStore({ tokens: newTokens })
  },

  handleCheck(coin) {
    let newCoins = store.store.coins.map((i) => {
      if(coin.uuid == i.uuid) {
        i.checked = !i.checked
      }

      return i;
    })

    store.setStore({ coins: newCoins })
  }
});

export default Staking;
