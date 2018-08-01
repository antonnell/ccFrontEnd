import React from 'react'
import KYCComponent from '../components/kyc'
import config from '../config'
import Abacus from "@abacusprotocol/sdk-browser";

const createReactClass = require('create-react-class')


const abacus = new Abacus({
  applicationId: config.abacusAppId
});

let KYC = createReactClass({
  getInitialState() {
    return { }
  },

  componentDidMount() {
    abacus.authorizeWithModal({
      runVerifications: true,
      onOpen: () => {
        console.log('onOpen')
      },
      onClose: () => {
        console.log('onClose')
      },
      onAuthorize: (a, b, c) => {
        console.log('onAuthorize')
        console.log(a)
        console.log(b)
        console.log(c)
      }
    });
  },

  render() {
    return (
      <KYCComponent />
    )
  },
})

export default (KYC);
