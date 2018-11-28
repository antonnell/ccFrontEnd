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
      case 'post_processing':
      case 'pending':
        kycState = 'Pending review'
        break;
      case 'completed':
        kycState = 'Approved'
        break;
      case 'failed':
      case 'restarted':
        kycState = 'Invalid'
        break;
      default:
        kycState = this.props.kycState
        break;
    }

    return kycState
  }

  render() {
    return (
      <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
        <Grid item xs={12} sm={10} md={10} lg={10} align='left'>
          <Typography variant="display1">
            KYC
          </Typography>
          <Typography variant="body2" align='justify' style={{marginTop: '24px', fontWeight:  'bold'}}>
            Status
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '6px'}}>
            {this.returnStatus()}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
//<Button size="small" variant={this.props.kycState!='failed'&&(this.props.kycState=='completed'||this.props.kycClicked)?"text":"contained"} disabled={this.props.loading||this.props.kycClicked||(['completed', 'hold', 'post_processing', 'failed', 'restarted'].includes(this.props.kycState))} color="primary" onClick={this.props.KYC}>KYC</Button>

export default withStyles(styles)(KYC);
