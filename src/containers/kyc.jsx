import React from 'react'
import KYCComponent from '../components/kyc'
import config from '../config'

const createReactClass = require('create-react-class')

let KYC = createReactClass({
  getInitialState() {
    return {
      url: 'https://daiu.app.link/yBE7efy4PI?service_code=ccv7j2'
    }
  },

  render() {
    return (
      <KYCComponent
        KYC={this.KYC}
        navigateSkip={this.navigateSkip}
        confirm={this.confirm}/>
    )
  },

  KYC() {
    window.open(this.state.url, '_blank')
  },

  navigateSkip() {
    console.log(this.props.user)
    if (this.props.user && this.props.user.username == this.props.user.email) {
      window.location.hash = 'setUsername';
    } else {
      window.location.hash = 'wanAccounts';
    }
  },

  confirm() {
    if (this.props.user && this.props.user.username == this.props.user.email) {
      window.location.hash = 'setUsername';
    } else {
      window.location.hash = 'wanAccounts';
    }
  },
})

export default (KYC);
