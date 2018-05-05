import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {};

class AcceptTermsAndConditions extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Welcome to CryptoCurve! We'll quickly take you through a few steps to set up your account for whitelisting.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Firstly, we need you to read through our terms and conditions. Do you accept our terms and conditions?
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" onClick={this.props.readTerms}>T's & C's</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.acceptTerms}>I Accept</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AcceptTermsAndConditions);
