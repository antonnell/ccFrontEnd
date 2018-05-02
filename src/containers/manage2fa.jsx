import React from 'react'
import Manage2FAComponent from '../components/manage2fa'
const createReactClass = require('create-react-class')

let Manage2FA = createReactClass({
  getInitialState() {
    return {
      code: ''
    }
  },
  render() {
    return (
      <Manage2FAComponent
        handleChange={this.handleChange}
        code={this.state.code}
        codeError={this.state.codeError}
        onCodeKeyDown={this.onCodeKeyDown}
        submitEnable={this.submitEnable}
      />
    )
  },

  onCodeKeyDown(event) {
    if (event.which == 13) {
      this.submitEnable();
    }
  },

  submitEnable() {
    //ok?
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (Manage2FA);
