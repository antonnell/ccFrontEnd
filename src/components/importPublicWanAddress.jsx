import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class ImportPublicWanAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Perfect! Then we just need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please provide us your Wanchain Address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.wanPublicAddressAddressError} disabled={this.props.loading}
            id="wanPublicAddress" placeholder="Wanchain Public Address" value={this.props.wanPublicAddress}
            onChange={(event) => { this.props.handleChange(event, 'wanPublicAddress'); }} margin="normal" onKeyDown={this.props.onImportKeyDown}
            helperText={this.props.wanPublicAddressAddressErrorMessage} />
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.wanPublicAddressValid?"raised":"flat"} disabled={!this.props.wanPublicAddressValid} color="primary" onClick={this.props.importPublicWanAddress}>Import my address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPublicWanAddress);
