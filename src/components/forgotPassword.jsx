import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" color="inherit">
                Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
              <Typography variant="body2" color="inherit" style={{marginTop: '24px'}}>
                Enter your email address associated with your account to receive a password reset email.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" error={this.props.emailAddressError} disabled={this.props.loading}
                id="emailAddress" label="Email Address" value={this.props.emailAddress}
                onChange={(event) => { this.props.handleChange(event, 'emailAddress'); }} margin="normal" onKeyDown={this.props.onResetKeyDown} />
            </Grid>
          </Grid>
          {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
            <Grid item xs={12} align='center'>
              <Typography style={{color: '#f44336'}} >
                {this.props.error}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '40px'}}>
            <Grid item xs={6} align='left'>
              <Button variant="flat" size='large' color='primary' onClick={this.props.submitLoginNavigate} disabled={this.props.loading}>
                Back
              </Button>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button variant="raised" size='large' color='primary' onClick={this.props.submitReset} disabled={this.props.loading}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ForgotPassword);
