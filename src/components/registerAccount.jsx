import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class RegisterAccount extends Component {

  render() {
    const {
      username,
      usernameError,
      usernameErrorMessage,
      handleChange,
      loading,
      onRegisterKeyDown,
      emailAddress,
      emailAddressError,
      emailAddressErrorMessage,
      password,
      passwordError,
      passwordErrorMessage,
      confirmPassword,
      confirmPasswordError,
      confirmPasswordErrorMessage,
      validateEmail,
      submitRegister,
      theme
    } = this.props;
    if(!theme) {
      return null
    }
    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={
          {
            marginTop: '50vh',
            transform: 'translate(0%,-50%)'
          }
        }
      >
        <Grid item xs={8} md={6} align='left'>
          <Typography variant="h5">Register</Typography>
          <TextField
            required
            autoFocus={true}
            fullWidth={true}
            color="textSecondary"
            error={usernameError}
            disabled={loading}
            id="username"
            label="Username"
            value={username}
            onChange={event => {
              handleChange(event, "username");
            }}
            margin="normal"
            onKeyDown={onRegisterKeyDown}
            helperText={usernameErrorMessage}
          />
          <TextField
            required
            fullWidth={true}
            color="textSecondary"
            error={emailAddressError}
            disabled={loading}
            id="emailAddress"
            label="Email Address"
            value={emailAddress}
            onChange={event => {
              handleChange(event, "emailAddress");
            }}
            margin="normal"
            onKeyDown={onRegisterKeyDown}
            helperText={emailAddressErrorMessage}
            onBlur={validateEmail()}
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
            onKeyDown={onRegisterKeyDown}
            helperText={passwordErrorMessage}
          />
          <TextField
            required
            fullWidth={true}
            color="textSecondary"
            type="password"
            error={confirmPasswordError}
            disabled={loading}
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={event => {
              handleChange(event, "confirmPassword");
            }}
            margin="normal"
            onKeyDown={onRegisterKeyDown}
            helperText={confirmPasswordErrorMessage}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={submitRegister}
            disabled={loading}
            style={{marginTop: '24px'}}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default RegisterAccount;
