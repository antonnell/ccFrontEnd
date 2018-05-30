import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';
import Loader from 'react-loader-spinner'

const styles = {};

class WhitelistJoined extends Component {

  constructor(props) {
    super(props);
  };

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
          <Typography variant="title">
            That's it, you're done. We will take care of the rest. We will send you proof of payment as soon as its processed.
          </Typography>
        </Grid>
        <Grid item xs={12} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.done}>Go to my account</Button>
        </Grid>
      </Grid>
    )
  };

  renderSelf() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Last steps!
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <Typography variant="body2">
            The Ethereum address you will be sending ETH from:
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="title" noWrap>
              Whitelisted Address: {this.props.ethPublicAddress}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <Typography variant="body2">
            The maximum allocation you are allowed to send:
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="title" noWrap>
              Maximum Allocation: {this.props.allocation} ETH
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <Typography variant="body2">
            Your Curve tokens will be sent to the following Wanchain address
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="title" noWrap>
              Wanchain Address: {this.props.wanPublicAddress}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <Typography variant="body2">
            As soon as you have been added to the whitelist the contribution address will be emailed and appear below
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            {this.props.loadingAddress?<Loader type="Bars" color="#000" height="25"	width="25" />:<Typography variant="title" noWrap>{this.props.contributionAddress}</Typography>}
          </div>
        </Grid>
        {!this.props.loadingAddress?
          <Grid container style={{marginTop: '12px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="body2">
                <Button size="small" variant="raised" color="primary" onClick={this.props.sendFromMEW}>Send from MyEtherWallet</Button>
              </Typography>
            </Grid>
          </Grid>
          :<div></div>}
        <Grid item xs={6} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={6} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.done}>Go to my account</Button>
        </Grid>
      </Grid>
    )
  };
}

export default withStyles(styles)(WhitelistJoined);
