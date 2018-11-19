import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class Enable2FA extends Component {

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="headline" >
                2 Factor Authentication
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="body2"  style={{marginTop: '24px'}}>
                1. Add CryptoCurve to Google Authenticator
              </Typography>
              <Typography variant="body1"  style={{marginTop: '6px'}}>
                Open Google Authenticator and add CryptoCurve by scanning the QR Code shown.
              </Typography>
              <Typography variant="body2"  style={{marginTop: '24px'}}>
                2. Enter the 6 digit code that Google Authenticator generates
              </Typography>
              <Typography variant="body1"  style={{marginTop: '6px'}}>
                Verify that CryptoCurve is added correctly in Google Authenticator by entering the 6 digit code which Google Authenticator generates for CryptoCurve below, and then click Enable.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '24px'}}>
            <Grid item xs={12} style={{position: 'relative', minHeight: '228px', marginTop: '50px'}}>
              <canvas id='canvas' style={{minHeight: '228px'}}></canvas>
              {this.props.QRCodeLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '24px'}}>
            <Grid item xs={12} style={{position: 'relative'}}>
              {this.props.secretKey}
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={8}>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required autoFocus={true} fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code1" value={this.props.code1}
                onChange={(event) => { this.props.handleChange(event, 'code1'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code2" value={this.props.code2}
                onChange={(event) => { this.props.handleChange(event, 'code2'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code3" value={this.props.code3}
                onChange={(event) => { this.props.handleChange(event, 'code3'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code4" value={this.props.code4}
                onChange={(event) => { this.props.handleChange(event, 'code4'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code5" value={this.props.code5}
                onChange={(event) => { this.props.handleChange(event, 'code5'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code6" value={this.props.code6}
                onChange={(event) => { this.props.handleChange(event, 'code6'); }} margin="normal"
                InputProps={{ classes: { input: 'big-input', }, }} onKeyDown={this.props.onCodeKeyDown}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="display1" style={{color: 'rgb(244, 67, 54)', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.46429em', minHeight: '30px'}}>
                {this.props.codeErrorMessage}
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
              <Button variant="contained" size='large' color='primary' onClick={this.props.submitEnable} disabled={this.props.loading||!this.props.codeValid}>
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
