import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import PageLoader from "./pageLoader";
import WelcomeImage from "../assets/images/welcome.png";

import Login from "../containers/login.jsx";
import Register from "../containers/registerAccount.jsx";
import ResendConfirmationEmail from '../containers/resendConfirmationEmail.jsx';
import RegisterCompleted from '../containers/registerCompleted.jsx';
import ForgotPassword from '../containers/forgotPassword.jsx';
import ForgotPasswordDone from '../containers/forgotPasswordDone.jsx';
import ResetPassword from '../containers/resetPassword.jsx';
import VerifyAccount from '../containers/VerifyAccount/VerifyAccount';
import Auth from '../containers/auth';
import Snackbar from './snackbar';

class Welcome extends Component {
  render() {
    let { theme, loading } = this.props

    if(!theme) {
      return null
    }

    return (
      <Grid container style={theme.custom.welcomeBase}>
        {loading && (<PageLoader />)}
        {this.renderBase()}
        <Grid item xs={12} md={6} style={ { height: '100vh' } }>
          {this.renderScreen()}
        </Grid>
      </Grid>
    )
  }

  renderScreen() {
    let { currentScreen, theme, navigate, setUser, email, setEmail, startLoading, stopLoading, uriParameters, token, code, credentials, setCredentials, setError } = this.props

    switch(currentScreen) {
      case 'login' :
        return (<Login theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } setCredentials={ setCredentials } setError={ setError } />)
      case 'otp' :
        return (<Auth theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } credentials={ credentials } setError={ setError } />)
      case 'register' :
        return (<Register theme={ theme } navigate={ navigate } setEmail={ setEmail } startLoading={ startLoading } stopLoading={ stopLoading } setError={ setError } />)
      case 'registrationSuccessful' :
        return (<RegisterCompleted theme={ theme } email={ email } />)
      case 'resendConfirmationEmail' :
        return (<ResendConfirmationEmail theme={ theme } navigate={ navigate } setEmail={ setEmail } startLoading={ startLoading } stopLoading={ stopLoading } setError={ setError } />)
      case 'forgotPassword' :
        return (<ForgotPassword theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } setError={ setError } />)
      case 'forgotPasswordDone' :
        return (<ForgotPasswordDone theme={ theme } navigate={ navigate } />)
      case 'resetPassword' :
        return (<ResetPassword theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } uriParameters={ uriParameters } setError={ setError } />)
      case 'verifyAccount' :
        return (<VerifyAccount theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } token={ token } code={ code } />)
      default:
        return (<Login theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } />)

    }
  }

  renderBase() {
    let { theme, error } = this.props

    return (
      <Grid item xs={12} md={6} style={ { padding: '80px', backgroundImage: "url(" + WelcomeImage + ")", backgroundSize: 'cover', minHeight: '100%', position: 'relative' } }>
        <Typography style={ theme.custom.welcomeCurve }>Curve</Typography>

        {this.renderGenText()}
        {this.renderButton()}

        {error && <Snackbar open={true} type={'Error'} message={error} />}
      </Grid>
    )
  }

  renderButton() {
    let { currentScreen, navigate } = this.props

    let button = (
      <Button
        variant="contained"
        size="large"
        onClick={() => { navigate('register') } }
      >
        Create an account
      </Button>
    )

    if(currentScreen !== 'login') {
      button =
        <Button
          variant="contained"
          size="large"
          onClick={() => { navigate('login') } }
          style={
            {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)'
            }
          }
        >
          Login
        </Button>
    }

    return button

  }

  renderGenText() {
    let { currentScreen, theme } = this.props

    let nextGenText = (
      <div style={ theme.custom.welcomeContent }>
        <Typography style={ theme.custom.welcomeText }>Next-Gen Wallet.</Typography>
        <Typography style={ theme.custom.welcomeText }>Next-Gen Features.</Typography>
      </div>
    )

    if(currentScreen !== 'login') {
      nextGenText = (
        <div style={ theme.custom.welcomeContent }>
        </div>
      )
    }

    return nextGenText
  }
}

export default Welcome;
