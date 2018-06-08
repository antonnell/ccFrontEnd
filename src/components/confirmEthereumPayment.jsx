import React, { Component } from "react";
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

class ConfirmEthereumPayment extends Component {

  renderBeneficiary() {
    return (<Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
      To your beneficairy:
      <div style={{border: '1px solid #000', padding: '12px', marginTop: '12px'}}>
        <Typography variant="title" noWrap>
          <b>{this.props.contact.displayName}</b> ({this.props.contact.primaryAddress})
        </Typography>
      </div>
    </Grid>)
  };

  renderPublic() {
    return (<Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
      To public address:
      <div style={{border: '1px solid #000', padding: '12px'}}>
        <Typography variant="title" noWrap>
          <b>{this.props.publicAddress}</b>
        </Typography>
      </div>
    </Grid>)
  };

  render() {
    return (
      <div>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center'>
            <Typography variant="headline">
              Confirm your payment
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            You would like to send:
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <div style={{border: '1px solid #000', padding: '12px'}}>
              <Typography variant="title" noWrap>
                <b>{this.props.amount} Ethereum</b>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            From your address:
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <div style={{border: '1px solid #000', padding: '12px'}}>
              <Typography variant="title" noWrap>
                <b>{this.props.account.name}</b> ({this.props.account.address})
              </Typography>
            </div>
          </Grid>
          {this.props.tabValue===0&&this.renderBeneficiary()}
          {this.props.tabValue===1&&this.renderPublic()}
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '48px'}}>
          <Grid item xs={6} align='left'>
            <Button size="medium" variant="flat" color="primary" onClick={this.props.backClicked} disabled={this.props.loading}>Back</Button>
          </Grid>
          <Grid item xs={6} align='right'>
            <Button size="medium" variant="raised" color="primary" onClick={this.props.confirmClicked} disabled={this.props.loading}>Confirm</Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default (ConfirmEthereumPayment);
