import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class ImportPrivateWanAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    var input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.loading}
      id="privateKey" placeholder="Private Key" value={this.props.addressName}
      onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} />

    switch (this.props.keyType) {
      case 'privateKey':
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.loading}
          id="privateKey" placeholder="Private Key" value={this.props.addressName}
          onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} />
        break;
      case 'mnemonic':
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.loading}
          id="privateKey" placeholder="Mnemonic String" value={this.props.addressName}
          onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} />
        break;
      case 'jsonV3':
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.loading}
          id="privateKey" placeholder="Enter your JSON" value={this.props.addressName}
          onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} />
        break;
      default:

    }

    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            No problems! Then we just need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please provide us with your Wanchain Address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.wanchainAddressError} disabled={this.props.loading}
            id="wanchainAddress" placeholder="Wanchain Public Address" value={this.props.wanchainAddress}
            onChange={(event) => { this.props.handleChange(event, 'wanchainAddress'); }} onBlur={this.props.validateWANAddress} margin="normal" onKeyDown={this.props.importPublicWanAddressKeyDown}
            helperText={this.props.wanchainAddressErrorMessage} />
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.wanchainAddressValid?"raised":"flat"} disabled={!this.props.wanchainAddressValid} color="primary" onClick={this.props.importPublicWanAddress}>Import my address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPrivateWanAddress);
