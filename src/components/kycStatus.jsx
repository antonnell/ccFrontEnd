import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {};

class KYC extends Component {

  returnStatus() {
    let kycState = 'pending'

    switch(this.props.kycState) {
      case 'hold':
        kycState = 'Your KYC process is on hold while we take a closer look at your documents. Once all documents have been reviewed, you will be notified on this page.'
        break;
      case 'post_processing':
        kycState = 'Your KYC documents are being reviewed by Netki. Once all documents have been reviewed, you will be notified on this page.'
        break;
      case 'completed':
        kycState = 'Your KYC process has completed successfullly.'
        break;
      case 'pending':
        kycState = 'Your KYC documents are pending review. Once all documents have been reviewed, you will be notified on this page.'
        break;
      case 'failed':
        kycState = 'Your KYC documents are unfortunately not valid.'
        break;
      case 'restarted':
        kycState = 'Your KYC documents are unfortunately not valid.'
        break;
      default:
        kycState = 'Your KYC process is '+this.props.kycState
        break;
    }

    return kycState
  }

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '100px', marginBottom: '100px'}}>
        <Grid item xs={10} sm={6} md={4} lg={3} align='left'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1" >
                KYC
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="title" align='justify'>
                {this.returnStatus()}
              </Typography>
            </Grid>
            <Grid item xs={12} align='center' style={{marginTop: '50px'}}>
              <Typography variant="title" align='justify'>
                {this.props.kycState=='completed'?
                  'Thank you for verifying your KYC documents with us. You may now participate in the Curve ICO in the Wanchain Accounts screen.':
                  this.props.kycState!=null?
                  'Your documents will usually be verified within 24 hours. You will only be able to contribute to the Curve ICO once your documents are verified. You are able to continue and interact with the Curve Wallet until then.':
                  ''}
              </Typography>
            </Grid>
            <Grid item xs={12} align='center' style={{marginTop: '50px'}}>
              <Button size="small" variant={this.props.kycState!='failed'&&(this.props.kycState=='completed'||this.props.kycClicked)?"flat":"contained"} disabled={this.props.loading||this.props.kycClicked||(['completed', 'hold', 'post_processing', 'failed', 'restarted'].includes(this.props.kycState))} color="primary" onClick={this.props.KYC}>KYC</Button>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            <Grid item xs={6} align='left' style={{marginTop: '24px '}}>
              <Button size="small" variant="flat" onClick={this.props.navigateSkip}>{this.props.kycState==null?'Skip':'Wanchain Accounts'}</Button>
            </Grid>
            <Grid item xs={6} align='right' style={{marginTop: '24px '}}>
              <Button size="small" variant={this.props.kycClicked?"contained":"flat"} disabled={(!this.props.kycClicked)||this.props.loading} color="primary" onClick={this.props.navigateSkip}>Confirm</Button>
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="body2">
                {this.props.kycState!='completed'?
                  'Note: You will not be able to participate in the token sale until KYC is complete.':
                  ''}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYC);
