import React from 'react'
import EthAccountsComponent from '../components/ethAccounts'
const createReactClass = require('create-react-class')

let EthAccounts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      tabValue: 0
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
        loading={this.state.loading}
        error={this.state.error}
        addresses={[{name: 'My Primary Address', address: '0xb258aD4125e84068F3A47fbBC4F6aCeD2bC148EC', balance: 1.245547891, isPrimary: true}, {name: 'Moms Address', address: '0xc2s8yD2125e84068F3A47fbBC4F6a3fJ2bD188LT', balance: 0.6546312, isPrimary: false}]}
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

export default (EthAccounts);
