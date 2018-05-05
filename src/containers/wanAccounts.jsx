import React from 'react'
import WanAccountsComponent from '../components/wanAccounts'
const createReactClass = require('create-react-class')

let wanEmitter = require('../store/wanStore.js').default.emitter
let wanDispatcher = require('../store/wanStore.js').default.dispatcher

let WanAccounts = createReactClass({
  getInitialState() {
    return {
      dataLoading: true,
      createLoading: false,
      error: null,
      tabValue: 0,
      wanAccounts: []
    }
  },
  render() {
    return (
      <WanAccountsComponent
        handleChange={this.handleChange}
        handleTabChange={this.handleTabChange}
        onCreateImportKeyDown={this.onCreateImportKeyDown}
        createImportClicked={this.createImportClicked}
        tabValue={this.state.tabValue}
        dataLoading={this.state.dataLoading}
        createLoading={this.state.createLoading}
        error={this.state.error}
        addresses={this.state.wanAddresses}
      />
    )
  },

  componentWillMount() {
    wanEmitter.on('getWanAddress', this.getWanAddressReturned);

    var content = {id: this.props.user.id};
    wanDispatcher.dispatch({type: 'getWanAddress', content, token: this.props.user.token });
  },

  getWanAddressReturned(error, data) {
    this.setState({dataLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({wanAddresses: data.wanAddresses})
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

export default (WanAccounts);
