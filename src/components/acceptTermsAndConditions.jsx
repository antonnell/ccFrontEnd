import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class AcceptTermsAndConditions extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Congratulations on being selected for the CryptoCurve presale! Just a few steps to make sure we have everything we need.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            First, we need you to read through our terms and conditions. Do you accept our terms and conditions?
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.termsOpened?"flat":"raised"} color={this.props.termsOpened?"default":"primary"} onClick={this.props.readTerms}>T's & C's</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.termsOpened?"raised":"flat"} disabled={!this.props.termsOpened} color="primary" onClick={this.props.acceptTerms}>I Accept</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AcceptTermsAndConditions);
