import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class StoreEthAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We need to know your Ethereum address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Would you like us to store your private key for you? We wil keep it safe, and you can retrieve it whenever you would like to.
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" onClick={this.props.navigateImportPublicEthAddress} style={{marginRight: '12px'}}>No</Button>
          <Button size="small" variant="raised" color="primary" onClick={this.props.navigateImportPrivateTypeEthAddress}>Yes</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StoreEthAddress);
