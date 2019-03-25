import React from "react";
import createReactClass from "create-react-class";
import AccountComponent from "../components/account";

let aionDispatcher = require("../store/aionStore.js").default.dispatcher;
let bitcoinDispatcher = require('../store/bitcoinStore.js').default.dispatcher;
let ethDispatcher = require("../store/ethStore.js").default.dispatcher;
let tezosDispatcher = require("../store/tezosStore.js").default.dispatcher;
let wanDispatcher = require("../store/wanStore.js").default.dispatcher;

let Account = createReactClass({
  getInitialState() {
    return {

    };
  },
  render() {
    return (
      <AccountComponent
        theme={this.props.theme}
        account={this.props.account}
        cardClicked={this.cardClicked}
        transactClicked={this.props.transactClicked}
        stakeClicked={this.props.stakeClicked}
      />
    );
  },

  cardClicked() {
    let screen = ''

    switch(this.props.account.type) {
      case 'Aion':
        screen = 'aionAccounts'
        break
      case 'Bitcoin':
        screen = 'bitcoinAccounts'
        break
      case 'Ethereum':
      case 'ERC20':
        screen = 'ethAccounts'
        break
      case 'Tezos':
        screen = 'tezosAccounts'
        break
      case 'Wanchain':
      case 'WRC20':
        screen = 'wanAccounts'
        break
    }

    window.location.hash=screen
  }
});

export default Account;
