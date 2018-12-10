import React from 'react'
import DrawerComponent from '../components/drawer'
const createReactClass = require('create-react-class');

let Drawer = createReactClass({
  getInitialState() {
    return {
      ethOpen: false,
      wanOpen: false
    }
  },
  render() {
    return (
      <DrawerComponent
        canWhitelist={this.props.canWhitelist}
        currentScreen={this.props.currentScreen}
        navClicked={this.props.navClicked}
        closeDrawer={this.props.closeDrawer}
        ethOpen={this.state.ethOpen}
        wanOpen={this.state.wanOpen}
        openEth={this.openEth}
        openWan={this.openWan}
        user={this.props.user}
        open={this.props.open}
        size={this.props.size}
        theme={this.props.theme}
      />
    )
  },
  openEth() {
    this.setState({ethOpen: !this.state.ethOpen})
  },
  openWan() {
    this.setState({wanOpen: !this.state.wanOpen})
  }

});

export default (Drawer);
