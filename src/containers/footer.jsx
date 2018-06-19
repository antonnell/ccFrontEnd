import React from 'react'
import FooterComponent from '../components/footer'
const createReactClass = require('create-react-class')

let Footer = createReactClass({
  getInitialState() {
    return { }
  },
  render() {
    return (
      <FooterComponent
        user={this.props.user}
        navClicked={this.props.navClicked}
        ipValid={this.props.ipValid}
      />
    )
  },

})

export default (Footer);
