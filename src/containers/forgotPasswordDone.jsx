import React from 'react'
import ForgotPasswordDoneComponent from '../components/forgotPasswordDone'
const createReactClass = require('create-react-class')

let ForgotPasswordDone = createReactClass({
  getInitialState() {
    return { }
  },
  render() {
    return (
      <ForgotPasswordDoneComponent
        submitLoginNavigate={this.submitLoginNavigate}
        theme={ this.props.theme }
      />
    )
  },

  submitLoginNavigate() {
    window.location.hash = 'welcome';
  },
})

export default (ForgotPasswordDone);
