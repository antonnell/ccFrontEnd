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
        <Grid item xs={12} md={6} style={ { minHeight: '100%' } }>
          {this.renderScreen()}
        </Grid>
      </Grid>
    )
  }

  renderScreen() {
    let { currentScreen, theme, navigate, setUser, email, setEmail, startLoading, stopLoading, uriParameters, token, code, credentials, setCredentials } = this.props

    switch(currentScreen) {
      case 'login' :
        return (<Login theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } setCredentials={ setCredentials } />)
      case 'otp' :
        return (<Auth theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } credentials={ credentials } />)
      case 'register' :
        return (<Register theme={ theme } navigate={ navigate } setEmail={ setEmail } startLoading={ startLoading } stopLoading={ stopLoading } />)
      case 'registrationSuccessful' :
        return (<RegisterCompleted theme={ theme } email={ email } />)
      case 'resendConfirmationEmail' :
        return (<ResendConfirmationEmail theme={ theme } navigate={ navigate } setEmail={ setEmail } startLoading={ startLoading } stopLoading={ stopLoading } />)
      case 'forgotPassword' :
        return (<ForgotPassword theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } />)
      case 'forgotPasswordDone' :
        return (<ForgotPasswordDone theme={ theme } navigate={ navigate } />)
      case 'resetPassword' :
        return (<ResetPassword theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } uriParameters={ uriParameters } />)
      case 'verifyAccount' :
        return (<VerifyAccount theme={ theme } navigate={ navigate } startLoading={ startLoading } stopLoading={ stopLoading } token={ token } code={ code } />)
      default:
        return (<Login theme={ theme } navigate={ navigate } setUser={ setUser } startLoading={ startLoading } stopLoading={ stopLoading } />)

    }
  }

  renderBase() {
    let { theme } = this.props

    return (
      <Grid item xs={12} md={6} style={ { padding: '80px', backgroundImage: "url(" + WelcomeImage + ")", backgroundSize: 'cover', minHeight: '100%' } }>
        <Typography style={ theme.custom.welcomeCurve }>Curve</Typography>

        {this.renderGenText()}
        {this.renderButton()}
      </Grid>
    )
  }

  renderButton() {
    let { currentScreen, navigate } = this.props

    let button = (
      <Grid container>
        <Grid item xs={12} align='left'>
          <Button
            variant="contained"
            size="large"
            onClick={() => { navigate('register') } }
          >
            Create an account
          </Button>
        </Grid>
      </Grid>
    )

    if(currentScreen !== 'login') {
      button =
        <Grid container>
          <Grid item xs={12} align='center'>
            <Button 
              variant="contained"
              size="large"
              onClick={() => { navigate('login') } }
            >
              Login
            </Button>
          </Grid>
        </Grid>
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
