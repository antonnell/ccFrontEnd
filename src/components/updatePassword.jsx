import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class UpdatePassword extends Component {

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="headline" color="inherit">
                Update Password
              </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
              <Typography variant="body2" color="inherit" style={{marginTop: '24px'}}>
                Enter your new password below.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.passwordError} disabled={this.props.loading}
                id="password" label="Password" value={this.props.password}
                onChange={(event) => { this.props.handleChange(event, 'password'); }} margin="normal" onKeyDown={this.props.onUpdateKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'password'); }} helperText={this.props.passwordErrorMessage} />
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.confirmPasswordError} disabled={this.props.loading}
                id="confirmPassword" label="Confirm Password" value={this.props.confirmPassword}
                onChange={(event) => { this.props.handleChange(event, 'confirmPassword'); }} margin="normal" onKeyDown={this.props.onUpdateKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'confirmPassword'); }} helperText={this.props.confirmPasswordErrorMessage} />
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
            <Grid item xs={12} align='center'>
              <Button variant="raised" size='large' color='primary' onClick={this.props.submitUpdatePassword}>
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(UpdatePassword);
