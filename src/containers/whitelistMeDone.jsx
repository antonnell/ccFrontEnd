import React from 'react'
import WhitelistMeDoneComponent from '../components/whitelistMeDone'
import ReactGA from 'react-ga';
const createReactClass = require('create-react-class')

let WhitelistMeDone = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
    };
  },

  componentDidMount() {
    ReactGA.event({
      category: 'AddToWhitelist',
      action: 'Completed'
    });
  },

  render() {
    return (
      <WhitelistMeDoneComponent
        submitBack={this.submitBack}/>
    )
  },

  submitBack() {
    window.location.hash = 'welcome'
  }
})

export default (WhitelistMeDone);
