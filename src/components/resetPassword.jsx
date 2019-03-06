import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {};

class ResetPassword extends Component {

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
          <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.passwordError} disabled={this.props.loading}
            id="password" label="Password" value={this.props.password}
            onChange={(event) => { this.props.handleChange(event, 'password'); }} margin="normal" onKeyDown={this.props.onResetKeyDown} />
          <TextField required fullWidth={true} color="textSecondary" type="password" error={this.props.confirmPasswordError} disabled={this.props.loading}
            id="confirmPassword" label="Confirm Password" value={this.props.confirmPassword}
            onChange={(event) => { this.props.handleChange(event, 'confirmPassword'); }} margin="normal" onKeyDown={this.props.onResetKeyDown} />
          <Typography style={{color: '#f44336'}} >
            {this.props.error}
          </Typography>
          <Button
            variant="contained"
            size='large'
            color='primary'
            onClick={this.props.submitReset}
            disabled={this.props.loading}
            style={{ marginTop: '24px' }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ResetPassword);
