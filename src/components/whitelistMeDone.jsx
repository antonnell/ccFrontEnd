import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class WhitelistMeDone extends Component {

  render() {
    var forgotPasswordClicked = this.props.submitForgotPasswordNavigate
    var registerClicked = this.props.submitRegisterNavigate
    if(this.props.loading) {
      forgotPasswordClicked = null
      registerClicked = null
    }
    return (
      <Grid container justify="space-around" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1">
                You have been added
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} style={{marginTop: '50px'}} align="center">
              <Typography variant="subheading">
                Thank you for filling out our whitelist application form.
              </Typography>
              <Typography variant="subheading" style={{marginTop: '12px'}}>
                We will keep in contact with you via your provided email address
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '40px'}}>
            <Grid item xs={12} align='left'>
              <Button variant="flat" size='large' color='primary' onClick={this.props.submitBack} disabled={this.props.loading}>
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(WhitelistMeDone);
