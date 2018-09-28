import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class StoreWanAddress extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We just need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Would you like us to store your private key for you?
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateImportPublicWanAddress} style={{marginRight: '12px'}}>No, thank you</Button>
          <Button size="small" variant="raised" color="primary" onClick={this.props.navigateImportPrivateTypeWanAddress}>Yes, please</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StoreWanAddress);
