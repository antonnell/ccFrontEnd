import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner'

const styles = {};

class WhitelistJoined extends Component {

  render() {
    if (this.props.cryptocurveWallet) {
      return this.renderDone()
    } else {
      return this.renderSelf()
    }
  };

  renderDone() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="h6">
            That's it, you're done. We will take care of the rest. We will send you proof of payment as soon as its processed.
          </Typography>
        </Grid>
        <Grid item xs={12} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="contained" color="primary" onClick={this.props.done}>Go to my account</Button>
        </Grid>
      </Grid>
    )
  };

  renderSelf() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="h6">
            Whitelist joined!
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <Typography variant="body1">
            The Ethereum address you will be sending ETH from:
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="h6" noWrap>
              Whitelisted Address: {this.props.ethPublicAddress}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <Typography variant="body1">
            The maximum allocation you are allowed to send:
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="h6" noWrap>
              Maximum Allocation: {this.props.allocation} ETH
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <Typography variant="body1">
            Your Curve tokens will be sent to the following Wanchain address
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="h6" noWrap>
              Wanchain Address: {this.props.wanPublicAddress}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <Typography variant="body1">
            You have been added to the whitelist. An email will be sent to you confirming your participation.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            {this.props.loadingAddress?<Loader type="Bars" color="#000" height="25"	width="25" />:<Typography variant="h6" noWrap>Contribution Address: {this.props.contributionAddress}</Typography>}
          </div>
        </Grid>
        {!this.props.loadingAddress?
          <Grid container style={{marginTop: '24px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="body1">
                <Button size="small" variant="contained" color="primary" onClick={this.props.sendFromMEW}>Send from MyEtherWallet</Button>
              </Typography>
            </Grid>
          </Grid>
          :<div></div>}
        <Grid item xs={12} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="contained" color="primary" onClick={this.props.done}>Go to my account</Button>
        </Grid>
      </Grid>
    )
  };
}

export default withStyles(styles)(WhitelistJoined);
