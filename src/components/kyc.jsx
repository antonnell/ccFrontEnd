import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {};

class KYC extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '100px', marginBottom: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='left'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" color="inherit">
                KYC
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="title" align='justify'>
                Welcome to the Curve KYC Process powered by our partner Netki.
                Please click on the KYC button below and follow the instructions to complete the KYC process.
              </Typography>
            </Grid>
            <Grid item xs={12} align='center' style={{marginTop: '50px'}}>
              <Typography variant="title" align='justify'>
                Your documents will usually be verified within 24 hours. You will only be able to contribute to the Curve ICO once your documents are verified. You are able to continue and interact with the Curve Wallet until then.
              </Typography>
            </Grid>
            <Grid item xs={12} align='center' style={{marginTop: '50px'}}>
              <Button size="small" variant="raised" color="primary" onClick={this.props.KYC}>KYC</Button>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
              <Button size="small" variant="flat" onClick={this.props.navigateSkip}>Skip</Button>
            </Grid>
            <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
              <Button size="small" variant={this.props.kycClicked?"raised":"flat"} disabled={(!this.props.kycClicked)||this.props.loading} color="primary" onClick={this.props.navigateSkip}>Confirm</Button>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="body2">
                Note: You will not be able to participate in the token sale until KYC is complete.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYC);
