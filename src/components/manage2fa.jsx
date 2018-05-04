import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

var QRCode = require('qrcode');
var authenticator = require('authenticator');

const styles = {};

class Enable2FA extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {

    var formattedKey = authenticator.generateKey();
    var formattedToken = authenticator.generateToken(formattedKey);

    authenticator.verifyToken(formattedKey, formattedToken);
    authenticator.verifyToken(formattedKey, '000 000');

    var emailAddress = 'john.doe@email.com';
    var company = 'CryptoCurve';

    var text = authenticator.generateTotpUri(formattedKey, emailAddress, company, 'SHA1', 6, 30);

    var canvas = document.getElementById('canvas')
    QRCode.toCanvas(canvas, text, function (error) {
      if (error) console.error(error)
    })
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="headline" color="inherit">
                Enable 2FA
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="body2" color="inherit" style={{marginTop: '24px'}}>
                1. Add CryptoCurve to Google Authenticator
              </Typography>
              <Typography variant="body1" color="inherit" style={{marginTop: '6px'}}>
                Open Google Authenticator and add CryptoCurve by scanning the QR Code shown.
              </Typography>
              <Typography variant="body2" color="inherit" style={{marginTop: '24px'}}>
                2. Enter the 6 digit code that Google Authenticator generates
              </Typography>
              <Typography variant="body1" color="inherit" style={{marginTop: '6px'}}>
                Verify that CryptoCurve is added correctly in Google Authenticator by entering the 6 digit code which Google Authenticator generates for CryptoCurve below, and then click Enable.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <canvas id='canvas'></canvas>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" error={this.props.codeError} disabled={this.props.loading}
                id="code" label="Enter Code" value={this.props.code}
                onChange={(event) => { this.props.handleChange(event, 'code'); }} margin="normal" onKeyDown={this.props.onCodeKeyDown} />
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
              <Button variant="raised" size='large' color='primary' onClick={this.props.submitEnable}>
                Enable
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Enable2FA);
