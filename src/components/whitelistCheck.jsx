import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class WhitelistCheck extends Component {

  render() {
    return (
      <Grid container justify="space-around" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="h1">
                Check my whitelist status
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <TextField required autoFocus={true} fullWidth={true} color="textSecondary" error={this.props.emailError} disabled={this.props.loading}
                id="email" label="Email Address" value={this.props.email} onKeyDown={this.props.onWhitelistKeyDown}
                onChange={(event) => { this.props.handleChange(event, 'email'); }} margin="normal" helperText={this.props.emailErrorMessage}  />
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
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
            <Grid item xs={12} align='center'>
              <Typography style={{color: (this.props.whitelistedMessage == 'You are whitelisted!'?'#51ab63':'#f44336')}} >
                {this.props.whitelistedMessage}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '40px'}}>
            <Grid item xs={12} align='right'>
              <Button variant="contained" size='large' color='primary' onClick={this.props.submitWhitelist} disabled={this.props.loading}>
                Check status
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(WhitelistCheck);
