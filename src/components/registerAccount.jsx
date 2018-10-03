import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class RegisterAccount extends Component {
  /*<TextField required fullWidth={true} color="textSecondary" error={this.props.usernameError} disabled={this.props.loading}
    id="username" label="Username" value={this.props.username}
    onChange={(event) => { this.props.handleChange(event, 'username'); }} margin="normal" onKeyDown={this.props.onRegisterKeyDown} />*/
  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" color="inherit">
                Presale
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <TextField required autoFocus={true} fullWidth={true} color="textSecondary" error={this.props.emailAddressError} disabled={this.props.loading}
                id="emailAddress" label="Email Address" value={this.props.emailAddress}
                onChange={(event) => { this.props.handleChange(event, 'emailAddress'); }} margin="normal" onKeyDown={this.props.onRegisterKeyDown}
                helperText={this.props.emailAddressErrorMessage} onBlur={this.props.validateEmail()} />

              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.passwordError} disabled={this.props.loading}
                id="password" label="Password" value={this.props.password}
                onChange={(event) => { this.props.handleChange(event, 'password'); }} margin="normal" onKeyDown={this.props.onRegisterKeyDown}
                helperText={this.props.passwordErrorMessage} />
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.confirmPasswordError} disabled={this.props.loading}
                id="confirmPassword" label="Confirm Password" value={this.props.confirmPassword}
                onChange={(event) => { this.props.handleChange(event, 'confirmPassword'); }} margin="normal" onKeyDown={this.props.onRegisterKeyDown}
                helperText={this.props.confirmPasswordErrorMessage} />
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
              <Button variant="raised" size='large' color='primary' onClick={this.props.submitRegister} disabled={this.props.loading}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(RegisterAccount);
