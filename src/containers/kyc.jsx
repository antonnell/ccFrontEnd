import React from 'react'
import KYCComponent from '../components/kyc'
import config from '../config'

const createReactClass = require('create-react-class')

let KYC = createReactClass({
  getInitialState() {
    return { }
  },

  componentDidMount() {
  
  },

  render() {
    return (
      <KYCComponent />
    )
  },
})

export default (KYC);
