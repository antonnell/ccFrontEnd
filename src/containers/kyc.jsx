import React from 'react'
import KYCComponent from '../components/kyc'
import KYCStatusComponent from '../components/kycStatus'
import config from '../config'

const createReactClass = require('create-react-class')

let KYC = createReactClass({
  getInitialState() {
    return {
      url: this.props.whitelistState!=null&&this.props.whitelistState.verificationResult!=null?this.props.whitelistState.verificationResult.url:null,
      state: this.props.whitelistState!=null&&this.props.whitelistState.verificationResult!=null?this.props.whitelistState.verificationResult.verification_result:null,
      kycClicked: false
    }
  },

  render() {
    if(this.state.state==null) {
      return (
        <KYCComponent
          KYC={this.KYC}
          navigateSkip={this.navigateSkip}
          confirm={this.confirm}
          kycState={this.state.state}
          kycClicked={this.state.kycClicked}/>
      )
    }
    return (
      <KYCStatusComponent
        KYC={this.KYC}
        navigateSkip={this.navigateSkip}
        confirm={this.confirm}
        kycState={this.state.state}
        kycClicked={this.state.kycClicked}/>
    )
  },

  KYC() {
    window.open(this.state.url, '_blank')
    this.setState({kycClicked: true, state: 'pending'})
  },

  navigateSkip() {
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
