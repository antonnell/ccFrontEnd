import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends Component {
  render() {

    let {
      submitForgotPasswordNavigate,
      submitResendConfirmationNavigate,
      loading,
      username,
      usernameError,
      usernameErrorMessage,
      handleChange,
      onLoginKeyDown,
      password,
      passwordError,
      passwordErrorMessage,
      error,
      submitLogin,
      theme
    } = this.props

    let forgotPasswordClicked = submitForgotPasswordNavigate;
    let resendConfirmationEmail = submitResendConfirmationNavigate;
    if (loading) {
      forgotPasswordClicked = null;
      resendConfirmationEmail = null;
    }

    if(!theme) {
      return null
    }

    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={{ marginTop: "346px", position: 'relative' }}
      >
        <Grid item xs={10} md={6} align='left'>
          <Typography variant="h5">Login</Typography>
          <TextField
            required
            autoFocus={true}
            fullWidth={true}
            color="textSecondary"
            error={usernameError}
            disabled={loading}
            id="username"
            label="Username / Email"
            value={username}
            onChange={event => {
              handleChange(event, "username");
            }}
            margin="normal"
            onKeyDown={onLoginKeyDown}
            helperText={usernameErrorMessage}
          />
          <TextField
            required
            fullWidth={true}
            color="textSecondary"
            type="password"
            error={passwordError}
            disabled={loading}
            id="password"
            label="Password"
            value={password}
            onChange={event => {
              handleChange(event, "password");
            }}
            margin="normal"
            onKeyDown={onLoginKeyDown}
          />
          <Typography
            variant="body1"
            style={theme.custom.forgotPassword}
            onClick={forgotPasswordClicked}
          >
            Forgot Password?
          </Typography>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={submitLogin}
            disabled={loading}
          >
            Login
          </Button>
          <Typography
            variant="body1"
            style={theme.custom.resendConfirmationEmail}
            onClick={resendConfirmationEmail}
          >
            Didn't receive confirmation email?
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
