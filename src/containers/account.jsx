import React from "react";
import createReactClass from "create-react-class";
import AccountComponent from "../components/account";

let Account = createReactClass({
  getInitialState() {
    return {

    };
  },
  render() {
    return (
      <AccountComponent
        theme={ this.props.theme }
        account={ this.props.account }
        cardClicked={ this.cardClicked }
        transactClicked={ this.props.transactClicked }
        stakeClicked={ this.props.stakeClicked }
        stakeableCurrencies={ this.props.stakeableCurrencies }
        viewMode={ this.props.viewMode }
      />
    );
  },

  cardClicked() {
    let screen = ''

    switch(this.props.account.type) {
      case 'Aion':
        screen = 'aionAccounts'
        break
      case 'Binance':
      case 'BEP2':
        screen = 'binanceAccounts'
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
      default:
        break
    }

    window.location.hash=screen
  }
});

export default Account;
