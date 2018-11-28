import React from 'react'
import ProfileComponent from '../components/profile'
const createReactClass = require('create-react-class')

let poolingEmitter = require('../store/poolingStore.js').default.emitter
let poolingDispatcher = require('../store/poolingStore.js').default.dispatcher

let Profile = createReactClass({
  getInitialState() {
    return {
      error: '',
    }
  },

  render() {
    return (
      <ProfileComponent
        theme={this.props.theme}
        error={this.state.error}
        user={this.props.user}
        setUser={this.props.setUser}
      />
    )
  },
})

export default (Profile);
