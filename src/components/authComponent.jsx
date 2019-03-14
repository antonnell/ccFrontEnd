import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AuthComponent extends Component {

  render() {
    const inputStyle = { fontSize: '20px', fontFamily: 'Montserrat-SemiBold', textAlign: 'center' }

    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={
          {
            marginTop: '50vh',
            transform: 'translate(0%,-50%)'
          }
        }
      >
        <Grid item xs={8} md={6} align='left'>
          <Typography variant="h5">Two Factor Authentication Required</Typography>
          <Typography variant="body1" style={ { marginTop: '24px', lineHeight: '35px', fontSize: '15px' } }>Enter the 6 digit code that Google Authenticator generates for your CryptoCurve account</Typography>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={8}>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required autoFocus={true} fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code1" value={this.props.code1}
                onChange={(event) => { this.props.handleChange(event, 'code1'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code2" value={this.props.code2}
                onChange={(event) => { this.props.handleChange(event, 'code2'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code3" value={this.props.code3}
                onChange={(event) => { this.props.handleChange(event, 'code3'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code4" value={this.props.code4}
                onChange={(event) => { this.props.handleChange(event, 'code4'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code5" value={this.props.code5}
                onChange={(event) => { this.props.handleChange(event, 'code5'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={2} style={{marginTop: '50px'}}>
              <TextField required fullWidth={true} color="textSecondary" disabled={this.props.loading} id="code6" value={this.props.code6}
                onChange={(event) => { this.props.handleChange(event, 'code6'); }} margin="normal"
                onKeyDown={this.props.onLoginKeyDown}
                inputProps={{ style: inputStyle }}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{color: 'rgb(244, 67, 54)', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.46429em', minHeight: '30px'}}>
                {this.props.codeErrorMessage}
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" size='large' color='primary' onClick={this.props.submitLogin} disabled={(this.props.loading||!this.props.codeValid)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  };
}

export default (AuthComponent);
