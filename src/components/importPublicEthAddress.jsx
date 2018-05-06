import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class ImportPublicEthAddress extends Component {

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
            Please provide us with the details of your Ethereum Address. We will store them safely on our system and you will be able to interact with your address later on.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethPublicAddressError} disabled={this.props.loading}
            id="ethPublicAddress" placeholder="Ethereum Public Address" value={this.props.ethPublicAddress}
            onChange={(event) => { this.props.handleChange(event, 'ethPublicAddress'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} />
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.importPublicEthAddress}>Import my address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPublicEthAddress);
