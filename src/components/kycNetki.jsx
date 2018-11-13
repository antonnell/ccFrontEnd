import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class KYCNetki extends Component {

  /*todo:
    Figure out how we will generate the URLS to navigate the client to
    Figure out what the callback data will be.
    Create a status page which helps guide the user through the process (Using data from Netki)
    ON CLick of the KYC button, we should mark the record as "processing" on the backend so that we can show a loader/redo KYC or something. I don't know
  */

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            You're almost done.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            We are now going to go through the KYC Verification process. The KYC process is handled by our partner Netki. Please press the KYC button below and follow the instructions to provide your KYC information.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          <Button size="small" variant="contained" color="primary" onClick={this.props.onKycClick}>KYC</Button>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.kycDone?"contained":"flat"} disabled={!this.props.kycDone}  color="primary" onClick={this.props.navigateJoinWhitelist}>Whitest me now</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYCNetki);
