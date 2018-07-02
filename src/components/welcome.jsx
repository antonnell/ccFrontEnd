import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';


const styles = {};

class Welcome extends Component {

  render() {
    var forgotPasswordClicked = this.props.submitForgotPasswordNavigate
    var registerClicked = this.props.submitRegisterNavigate
    if(this.props.loading) {
      forgotPasswordClicked = null
      registerClicked = null
    }
    return (
      <Grid container justify="space-around" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} >
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" color="inherit">
                Login
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <TextField required autoFocus={true} fullWidth={true} color="textSecondary" error={this.props.usernameError} disabled={this.props.loading}
                id="username" label="Email Address" value={this.props.username}
                onChange={(event) => { this.props.handleChange(event, 'username'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.usernameErrorMessage}  />
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.passwordError} disabled={this.props.loading}
                id="password" label="Password" value={this.props.password}
                onChange={(event) => { this.props.handleChange(event, 'password'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} />
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='right'>
              <Typography color="inherit" style={{fontSize: '12px', cursor: 'pointer'}} onClick={forgotPasswordClicked}>
                Forgot Password
              </Typography>
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
              <Button variant="raised" size='large' color='primary' onClick={this.props.submitLogin} disabled={this.props.loading}>
                LOGIN
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '40px'}}>
            <Grid item xs={12} align='center'>
              <Typography color="inherit" style={{fontSize: '12px', display: 'inline-block'}}>
                No account yet? Sorry, registrations are currently closed, but will be opening up soon!
              </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
              <Typography color="inherit" style={{fontSize: '12px', cursor: 'pointer', display: 'inline-block', marginTop: '20px'}} onClick={registerClicked}>
                Approved presale participant? Click here to get your account details
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(Welcome);
