import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';

class ForgotPassword extends Component {

  render() {
    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={{ marginTop: "35%", position: 'relative' }}
      >
        <Grid item xs={10} md={6} align='left'>
          <Typography variant="h5">Reset Password</Typography>
          <Typography variant="body1" style={ { marginTop: '24px', lineHeight: '35px', fontSize: '15px' } }>Enter your email address associated with your account to receive a password reset email.</Typography>
          <TextField required fullWidth={true} color="textSecondary" error={this.props.emailAddressError} disabled={this.props.loading}
            id="emailAddress" label="Email Address" value={this.props.emailAddress}
            onChange={(event) => { this.props.handleChange(event, 'emailAddress'); }} margin="normal" onKeyDown={this.props.onResetKeyDown}
            helperText={this.props.emailAddressErrorMessage} />
          <Typography style={{color: '#f44336'}} >
            {this.props.error}
          </Typography>
          <Button
            variant="contained"
            size='large'
            color='primary'
            onClick={this.props.submitReset}
            disabled={this.props.loading}
            style={{ marginTop: '24px' }}>
            Reset
          </Button>
        </Grid>
      </Grid>
    );
  };
}

export default (ForgotPassword);
