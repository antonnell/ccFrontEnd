import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class StoreEthAddress extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Do you want us to store your Ethereum key?
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Would you like us to store your private key for you? We wil keep it safe, and you can retrieve it whenever you would like.
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateImportPublicEthAddress} style={{marginRight: '12px'}}>No, thank you</Button>
          <Button size="small" variant="contained" color="primary" onClick={this.props.navigateImportPrivateTypeEthAddress}>Yes, please</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StoreEthAddress);
