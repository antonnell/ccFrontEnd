import React from 'react'
import Enable2FAComponent from '../components/enable2fa'
import Disable2FAComponent from '../components/disable2fa'
import Disable2FaConfirmation from '../components/disable2faConfirmation'
const createReactClass = require('create-react-class')

var QRCode = require('qrcode');

let emitter = require('../store/accountStore.js').default.emitter
let dispatcher = require('../store/accountStore.js').default.dispatcher

let Manage2FA = createReactClass({
  getInitialState() {
    return {
      code: '',
      codeError: false,
      password: '',
      passwordError: false,
      loading: false,
      error: null,
      disable2FAOpen: false,
      QRCodeLoading: false,
      barcodeUrl: null,
      secretKey: null
    }
  },

  componentWillMount() {
    emitter.on('enable2fa', this.enable2faReturned);
    emitter.on('disable2fa', this.disable2faReturned);
    emitter.on('generate2faKey', this.generate2faKeyReturned);
  },

  componentDidMount() {
    if(this.props.user && this.props.user.isGoogle2faEnabled !== true) {
      this.setState({ QRCodeLoading: true })
      var content = { id: this.props.user.id };
      dispatcher.dispatch({type: 'generate2faKey', content, token: this.props.user.token});
    }
  },

  componentWillUnmount() {
    emitter.removeAllListeners('enable2fa');
    emitter.removeAllListeners('disable2fa');
    emitter.removeAllListeners('generate2faKey');
  },

  render() {
    if(this.props.user && this.props.user.isGoogle2faEnabled === true) {
      return (
        <div>
          <Disable2FAComponent
            handleChange={this.handleChange}
            password={this.state.password}
            passwordError={this.state.passwordError}
            onDisableKeyDown={this.onDisableKeyDown}
            submitDisable={this.submitDisable}
            loading={this.state.loading}
            error={this.state.error}
          />
          <Disable2FaConfirmation isOpen={this.state.disable2FAOpen} confirmDisable={this.confirmDisable} handleClose={this.handleClose} />
        </div>
        )
    } else {
      return (
        <Enable2FAComponent
          handleChange={this.handleChange}
          code={this.state.code}
          codeError={this.state.codeError}
          onCodeKeyDown={this.onCodeKeyDown}
          submitEnable={this.submitEnable}
          loading={this.state.loading}
          error={this.state.error}
        />)
    }
  },

  generate2faKeyReturned(error, data) {
    this.setState({QRCodeLoading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var barcodeUrl = decodeURIComponent(data.barcodeUrl)
      this.setState({ secretKey: data.secretKey, barcodeUrl })

      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, barcodeUrl, function (error) {
        if (error) console.error(error)
      })
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  onCodeKeyDown(event) {
    if (event.which == 13) {
      this.submitEnable();
    }
  },

  submitEnable() {
    var error = false;

    if(this.state.code == '' || this.state.code.length != 6) {
      this.setState({codeError: true});
      error = true;
    }

    if(!error) {
      this.setState({loading: true});
      var content = { id: this.props.user.id, code: this.state.code, secretKey: this.state.secretKey};
      dispatcher.dispatch({type: 'enable2fa', content, token: this.props.user.token});
    }
  },

  enable2faReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.props.setUser(data.user);
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  onDisableKeyDown(event) {
    if (event.which == 13) {
      this.submitDisable();
    }
  },

  submitDisable() {
    //show popup confirming action?
    this.setState({ disable2FAOpen: true })
  },

  handleClose() {
    this.setState({ disable2FAOpen: false })
  },

  confirmDisable() {
    this.setState({disable2FAOpen: false, loading: true});
    var content = { id: this.props.user.id };
    dispatcher.dispatch({type: 'disable2fa', content, token: this.props.user.token});
  },

  disable2faReturned(error, data) {
    this.setState({loading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      //or show 'Two factor authentication has been disabled'

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

export default (Manage2FA);
