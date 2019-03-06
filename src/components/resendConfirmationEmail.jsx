import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

class ResendConfirmationEmail extends Component {

  render() {

    let {
      email,
      emailError,
      emailErrorMessage,
      loading,
      handleChange,
      onSendKeyDown,
      error,
      submitResendConfirmationEmail,
      snackOpen,
      handleSnackClose
    } = this.props

    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={{ marginTop: "35%", position: 'relative' }}
      >
        <Grid item xs={10} md={6} align='left'>
          <Typography variant="h5">Resend Confirmation Email</Typography>
          <Typography variant="body1" style={ { marginTop: '24px', lineHeight: '35px', fontSize: '15px' } }>Enter your email address associated with your account to receive a new confirmation email.</Typography>
          <TextField
            autoFocus={true}
            required
            fullWidth={true}
            color="textSecondary"
            type="email"
            error={emailError}
            disabled={loading}
            id="email"
            label="Email"
            value={email}
            helperText={emailErrorMessage}
            onChange={(event) => { handleChange(event, 'email'); }} margin="normal" onKeyDown={onSendKeyDown}
          />
          <Typography style={{color: '#f44336'}} >
            {error}
          </Typography>
          <Button
            variant="contained"
            size='large'
            color='primary'
            onClick={submitResendConfirmationEmail}
            disabled={loading}
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
            open={snackOpen}
            onClose={handleSnackClose}
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
