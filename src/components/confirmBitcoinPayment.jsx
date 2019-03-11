import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class ConfirmBitcoinPayment extends Component {

  renderBeneficiary() {
    return (<Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
      <Typography>
        To your beneficairy:
      </Typography>
      <div style={{border: '1px solid #6be6fd', padding: '12px', marginTop: '12px'}}>
        <Typography variant="h5" noWrap>
          <b>{this.props.contact.displayName}</b>
        </Typography>
      </div>
    </Grid>)
  };

  renderPublic() {
    return (<Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
      <Typography>
        To public address:
      </Typography>
      <div style={{border: '1px solid #6be6fd', padding: '12px'}}>
        <Typography variant="h5" noWrap>
          <b>{this.props.publicAddress}</b>
        </Typography>
      </div>
    </Grid>)
  };

  renderOwnAccount() {
    return (<Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
      <Typography>
        To your own account:
      </Typography>
      <div style={{border: '1px solid #6be6fd', padding: '12px', marginTop: '12px'}}>
        <Typography variant="h5" noWrap>
          <b>{this.props.ownAccount.displayName}</b>
        </Typography>
      </div>
    </Grid>)
  };

  render() {
    return (
      <div>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='left' style={{ borderBottom: '1px solid #aaaaaa', paddingBottom: '12px' }}>
            <Typography variant="h5">
              Confirm your Bitcoin payment
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <Typography>
              You would like to send:
            </Typography>
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <div style={{border: '1px solid #6be6fd', padding: '12px'}}>
              <Typography variant="h5" noWrap>
                <b>{this.props.amount} Bitcoin</b>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <Typography>
              From your address:
            </Typography>
          </Grid>
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <div style={{border: '1px solid #6be6fd', padding: '12px'}}>
              <Typography variant="h5" noWrap>
                <b>{this.props.account.displayName}</b>
              </Typography>
            </div>
          </Grid>
          {this.props.tabValue===0&&this.renderBeneficiary()}
          {this.props.tabValue===1&&this.renderPublic()}
          {this.props.tabValue===2&&this.renderOwnAccount()}
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '48px'}}>
          <Grid item xs={6} align='left'>
            <Button size="medium" variant="text" color="primary" onClick={this.props.backClicked} disabled={this.props.loading}>Back</Button>
          </Grid>
          <Grid item xs={6} align='right'>
            <Button size="medium" variant="contained" color="primary" onClick={this.props.confirmClicked} disabled={this.props.loading}>Confirm</Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default (ConfirmBitcoinPayment);
