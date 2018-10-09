import React from 'react'
import KYCComponent from '../components/kyc'
import KYCStatusComponent from '../components/kycStatus'
import config from '../config'

let whitelistEmitter = require('../store/whitelistStore.js').default.emitter
let whitelistDispatcher = require('../store/whitelistStore.js').default.dispatcher

var sha256 = require('sha256');
var crypto = require('crypto');
var bip39 = require('bip39');


const createReactClass = require('create-react-class')

let KYC = createReactClass({
  getInitialState() {
    return {
      url: this.props.whitelistState!=null&&this.props.whitelistState.verificationResult!=null?this.props.whitelistState.verificationResult.url:null,
      kycClicked: false
    }
  },
  componentWillMount() {
    whitelistEmitter.removeAllListeners('verificationResult');
    whitelistEmitter.on('verificationResult', this.verificationResultReturned);
  },
  componentWillUnmount() {
    whitelistEmitter.removeAllListeners('verificationResult');
  },

  render() {
    let state = this.props.whitelistState!=null&&this.props.whitelistState.verificationResult!=null?this.props.whitelistState.verificationResult.verification_result:null
    if(this.state.kycClicked == true && state==null) {
      state = 'pending'
    }
    let notes = this.props.whitelistState!=null&&this.props.whitelistState.verificationResult!=null&&this.props.whitelistState.verificationResult.payload!=null&&this.props.whitelistState.verificationResult.payload.identity!=null?this.props.whitelistState.verificationResult.payload.identity.notes:null

    if(state==null) {
      return (
        <KYCComponent
          KYC={this.KYC}
          navigateSkip={this.navigateSkip}
          confirm={this.confirm}
          kycState={state}
          kycClicked={this.state.kycClicked}/>
      )
    }
    return (
      <KYCStatusComponent
        KYC={this.KYC}
        navigateSkip={this.navigateSkip}
        confirm={this.confirm}
        kycState={state}
        kycClicked={this.state.kycClicked}
        notes={notes}/>
    )
  },

  KYC() {
    window.open(this.state.url, '_blank')
    this.setState({kycClicked: true})

    whitelistDispatcher.dispatch({ type: 'verificationResult', content:{ username: this.props.user.username }, token: this.props.user.whitelistToken, tokenKey: this.props.user.whitelistTokenKey })
  },

  verificationResultReturned(error, data)  {
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      var verificationResult = this.decodeWhitelistResponse(data.message)

      console.log(verificationResult)
      let whitelistState = this.props.whitelistState
      whitelistState.verificationResult = verificationResult

      this.props.setWhitelistState(whitelistState)

      if(!whitelistState.verificationResult || whitelistState.verificationResult.verification_result != 'complete') {
        setTimeout(() => {
          whitelistDispatcher.dispatch({ type: 'verificationResult', content:{ username: this.props.user.username }, token: this.props.user.whitelistToken, tokenKey: this.props.user.whitelistTokenKey })
        }, 60000);
      }
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
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

  decodeWhitelistResponse(message) {
    const mnemonic = message.m.hexDecode()
    const encrypted = message.e.hexDecode()
    const signature = message.s

    const sig = {
      e: message.e,
      m: message.m,
      u: message.u,
      p: message.p,
      t: message.t
    }
    const seed = JSON.stringify(sig)
    const compareSignature = sha256(seed)

    if (compareSignature !== signature) {
      return null
    }

    const payload = decrypt(encrypted, mnemonic)
    var data = null
    try {
      data = JSON.parse(payload)
    } catch (ex) {
      return null
    }

    return data;
  },
})


function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

export default (KYC);
