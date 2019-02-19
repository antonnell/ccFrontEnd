import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

class ResendConfirmationEmail extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="h5" >
                Resend Confirmation Rmail
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
            <TextField
              autoFocus={true} required fullWidth={true} color="textSecondary" type="email" error={this.props.emailError} disabled={this.props.loading}
              id="email" label="Email" value={this.props.email} helperText={this.props.emailErrorMessage}
              onChange={(event) => { this.props.handleChange(event, 'email'); }} margin="normal" onKeyDown={this.props.onSendKeyDown} />
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
              <Button variant="text" size='large' color='primary' onClick={this.props.submitBack} disabled={this.props.loading}>
                Back
              </Button>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button variant="contained" size='large' color='primary' onClick={this.props.submitResendConfirmationEmail} disabled={this.props.loading}>
                Submit
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
            open={this.props.snackOpen}
            onClose={this.props.handleSnackClose}
            message={<Typography style={{color: '#000', fontWeight: 'bold'}}>
              Confirmation email sent
            </Typography>}
          />
        </Grid>
      </Grid>
    );
  };
}

export default ResendConfirmationEmail;
