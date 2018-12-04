import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class ForgotPasswordDone extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={ 0 } style={ { marginTop: '100px' } }>
        <Grid item xs={ 10 } sm={ 6 } md={ 4 } lg={ 3 } align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={ 0 }>
            <Grid item xs={ 12 } align='center'>
              <Typography variant="h1" >
                Reset Password
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={ 0 }>
            <Grid item xs={ 12 } style={ { marginTop: '50px' } }>
              <Typography variant="body1">If the chosen email address exists, password reset instructions have been send to the address provided.</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={ 0 } style={ { marginTop: '40px' } }>
            <Grid item xs={ 12 } align='left'>
              <Button variant="text" size='large' color='primary' onClick={ this.props.submitLoginNavigate }>
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ForgotPasswordDone);
