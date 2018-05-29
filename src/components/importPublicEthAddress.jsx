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
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Next, we need to know your Ethereum address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please provide us with your Ethereum Address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethPublicAddressError} disabled={this.props.loading}
            id="ethPublicAddress" placeholder="Ethereum Public Address" value={this.props.ethPublicAddress}
            onChange={(event) => { this.props.handleChange(event, 'ethPublicAddress'); }} onBlur={this.props.validateETHAddress} margin="normal" onKeyDown={this.props.importPublicEthAddressKeyDown}
            helperText={this.props.ethPublicAddressErrorMessage} />
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.ethPublicAddressValid?"raised":"flat"} disabled={!this.props.ethPublicAddressValid} color="primary" onClick={this.props.importPublicEthAddress}>Next</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPublicEthAddress);
