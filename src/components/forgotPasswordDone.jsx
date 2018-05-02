import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = {};

class ForgotPasswordDone extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" color="inherit">
                Reset Password
              </Typography>
            </Grid>
          </Grid>
          <Grid containe justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}}>
              <Typography color="inherit" variant="Body2" >If the chosen email address exists, password reset instructions have been send to the address provided.</Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '40px'}}>
            <Grid item xs={12} align='left'>
              <Button variant="flat" size='large' color='primary' onClick={this.props.submitLoginNavigate}>
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
