import React from 'react'
import DrawerComponent from '../components/drawer'
const createReactClass = require('create-react-class')

let Drawer = createReactClass({
  getInitialState() {
    return { }
  },
  render() {
    return (
      <DrawerComponent
        navClicked={this.props.navClicked}
        closeDrawer={this.props.closeDrawer}
        user={this.props.user}
        open={this.props.open}
      />
    )
  },

})

export default (Drawer);
