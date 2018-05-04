import React from 'react'
import WanAccountsComponent from '../components/wanAccounts'
const createReactClass = require('create-react-class')

let WanAccounts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      tabValue: 0
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
        loading={this.state.loading}
        error={this.state.error}
        addresses={[{name: 'My Primary Address', address: '0xfA747eF4323a90b332768409b7794bEA00ae61f6', balance: 15.245547891, isPrimary: true}]}
      />
    )
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
