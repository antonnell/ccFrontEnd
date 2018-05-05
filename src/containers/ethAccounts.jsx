import React from 'react'
import EthAccountsComponent from '../components/ethAccounts'
const createReactClass = require('create-react-class')

let ethEmitter = require('../store/ethStore.js').default.emitter
let ethDispatcher = require('../store/ethStore.js').default.dispatcher

let EthAccounts = createReactClass({
  getInitialState() {
    return {
      dataLoading: true,
      createLoading: false,
      error: null,
      tabValue: 0,
      ethAccounts: []
    }
  },
  render() {
    return (
      <EthAccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        tabValue={this.state.tabValue}
        dataLoading={this.state.dataLoading}
        createLoading={this.state.createLoading}
        error={this.state.error}
        addresses={this.state.ethAddresses}
      />
    )
  },

  componentWillMount() {
    ethEmitter.on('getEthAddress', this.getEthAddressReturned);

    var content = {id: this.props.user.id};
    ethDispatcher.dispatch({type: 'getEthAddress', content, token: this.props.user.token });
  },

  getEthAddressReturned(error, data) {
    this.setState({dataLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({ethAddresses: data.ethAddresses})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  onCreateImportKeyDown(event) {
    if (event.which == 13) {
      this.createImportClicked()
    }
  },

  createImportClicked() {
    //ok?
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (EthAccounts);
