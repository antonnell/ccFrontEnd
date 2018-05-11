import React from 'react'
import UpdatePasswordComponent from '../components/updatePassword'
import UpdatePasswordDoneComponent from '../components/updatePasswordDone'
const createReactClass = require('create-react-class')
let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let UpdatePassword = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      passwordUpdated: false,

      password: '',
      passwordError: false,
      passwordErrorMessage: '',

      confirmPassword: '',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
    };
  },

  componentWillMount() {
    emitter.on('updatePassword', this.updatePasswordReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners('updatePassword');
  },

  render() {
    if(this.state.passwordUpdated === true) {
      return(<UpdatePasswordDoneComponent
          submitUpdatePasswordNavigate={this.submitUpdatePasswordNavigate}
        />)
    }
    return (
      <UpdatePasswordComponent
        handleChange={this.handleChange}
        onUpdateKeyDown={this.onUpdateKeyDown}
        submitUpdatePassword={this.submitUpdatePassword}
        password={this.state.password}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordErrorMessage}
        confirmPassword={this.state.confirmPassword}
        confirmPasswordError={this.state.confirmPasswordError}
        confirmPasswordErrorMessage={this.state.confirmPasswordErrorMessage}
        error={this.state.error}
        loading={this.state.loading}
        validateField={this.validateField}
      />
    )
  },

  onUpdateKeyDown(event) {
    if (event.which == 13) {
      this.submitUpdatePassword();
    }
  },

  validatePassword(value) {
    this.setState({ passwordValid: false, passwordError: false, passwordErrorMessage:'' });
    if(value==null) {
      value = this.state.password;
    }
    if(value == '') {
      this.setState({ passwordError: true, passwordErrorMessage:'Password is required' });
      return false;
    } else if (value.length < 8) {
      this.setState({ passwordError: true, passwordErrorMessage: 'Your password needs to be at least 8 characaters long'});
      return false;
    }
    this.setState({ passwordValid: true });
    return true;
  },

  validateConfirmPassword(value) {
    this.setState({ confirmPasswordValid: false, confirmPasswordError: false, confirmPasswordErrorMessage:'' });
    if(value==null) {
      value = this.state.confirmPassword;
    }
    if(value == '') {
      this.setState({ confirmPasswordError: true, confirmPasswordErrorMessage:'Please confirm your password' });
      return false;
    } else if(this.state.password != value) {
      this.setState({ passwordError: true, confirmPasswordError: true, confirmPasswordErrorMessage: 'Your passwords to do not match'});
      return false;
    }
    this.setState({ confirmPasswordValid: true });
    return true;
  },

  submitUpdatePassword() {
    if(this.validatePassword() & this.validateConfirmPassword()) {
      this.setState({loading: true});
      var content = {username: this.props.user.username, password: this.state.password};
      dispatcher.dispatch({type: 'updatePassword', content, token: this.props.user.token});
    }
  },

  updatePasswordReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({passwordUpdated: true})

    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  submitUpdatePasswordNavigate(error, data) {
    window.location.hash = 'ethAccounts';
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  validateField (event, name) {
    if (name==="validatePassword") {
      this.validatePassword(event.target.value)
    } if (name==="confirmPassword") {
      this.validateConfirmPassword(event.target.value)
    }
  }

})

export default (UpdatePassword);
