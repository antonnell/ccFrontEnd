import React from 'react'
import SettingsComponent from '../components/settings'
const createReactClass = require('create-react-class')

let Settings = createReactClass({
  getInitialState() {
    return {
      error: '',
      open: false,
      tabValue: 0,
    }
  },

  render() {
    return (
      <SettingsComponent
        theme={this.props.theme}
        error={this.state.error}
        tabValue={this.state.tabValue}
        handleTabChange={this.handleTabChange}
        user={this.props.user}
        setUser={this.props.setUser}
        changeTheme={this.props.changeTheme}
      />
    )
  },

  handleTabChange(event, tabValue) {
    this.setState({ tabValue });
  },
})

export default (Settings);
