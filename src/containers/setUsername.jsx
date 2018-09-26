import React from 'react'
import SetUsernameComponent from '../components/setUsername'

const createReactClass = require('create-react-class')

let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let SetUsername = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      username: '',
      usernameError: false,
      usernameErrorMessage: false,
    }
  },

  componentWillMount() {

    if(this.props.user && this.props.user.username != this.props.user.email) {
      window.location.hash = 'wanAccounts'
    }

    emitter.on('updateUsername', this.updateUsernameReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('updateUsername');
  },

  render() {
    return (
      <SetUsernameComponent
        loading={this.state.loading}
        error={this.state.error}

        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}

        handleChange={this.handleChange}
        onUpdateKeyDown={this.onUpdateKeyDown}
        submitUpdateUsername={this.submitUpdateUsername}
        />
    )
  },

  onUpdateKeyDown(event) {
    if (event.which == 13) {
      this.submitUpdateUsername();
    }
  },

  validateUsername(value) {
    this.setState({ usernameError: false, usernameErrorMessage:'' });
    if(value==null) {
      value = this.state.username;
    }
    if(value == '') {
      this.setState({ usernameError: true, usernameErrorMessage:'Username is required' });
      return false;
    } else if (value.length < 3) {
      this.setState({ usernameError: true, usernameErrorMessage: 'Your username needs to be at least 3 characaters long'});
      return false;
    }
    return true;
  },

  submitUpdateUsername() {
    if(this.validateUsername()) {
      this.setState({loading: true});
      var content = {username: this.props.user.username, usernameNew: this.state.username};
      dispatcher.dispatch({type: 'updateUsername', content, token: this.props.user.token});
    }
  },

  updateUsernameReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      window.location.hash = 'wanAccounts'
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (SetUsername);
