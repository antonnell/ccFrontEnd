import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

class UpdatePassword extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" style={{marginTop: '24px'}}>
        <Grid item xs={12} sm={6} md={8} lg={6} xl={4} align='left'>
          <Typography variant="h3" >
            Password
          </Typography>
          <Typography variant="body1"  style={{marginTop: '48px', fontWeight: 'bold'}}>
            Change password
          </Typography>
          <Grid container justify="space-around" alignItems="flex-start" direction="row">
            <Grid item xs={12} align='left'>
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.passwordError} disabled={this.props.loading}
                id="password" label="New Password" value={this.props.password}
                onChange={(event) => { this.props.handleChange(event, 'password'); }} margin="normal" onKeyDown={this.props.onUpdateKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'password'); }} helperText={this.props.passwordErrorMessage} />
              <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.confirmPasswordError} disabled={this.props.loading}
                id="confirmPassword" label="Confirm New Password" value={this.props.confirmPassword}
                onChange={(event) => { this.props.handleChange(event, 'confirmPassword'); }} margin="normal" onKeyDown={this.props.onUpdateKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'confirmPassword'); }} helperText={this.props.confirmPasswordErrorMessage} />
            </Grid>
          </Grid>
          {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          <Typography style={{color: '#f44336', minHeight: '30px'}} >
            {this.props.error}
          </Typography>
          <Button variant="contained" size='large' color='primary' onClick={this.props.submitUpdatePassword}>
            Update Password
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
          open={this.props.snackOpen}
          onClose={this.props.handleSnackClose}
          message={<Typography style={{color: '#000', fontWeight: 'bold'}}>
            Your password has been updated
          </Typography>}
        />
      </Grid>
    );
  }
}

export default (UpdatePassword);
