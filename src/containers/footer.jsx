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
        navClicked={this.props.navClicked}
      />
    )
  },

})

export default (Footer);
