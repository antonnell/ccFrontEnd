import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {};

class ImportPrivateTypeEthAddress extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We need to know your Ethereum address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            How would you like to give us your key?
          </Typography>
        </Grid>
        <Grid item xs={4} align='center' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={() => {this.props.navigateImportPrivateEthAddress('privateKey')}}>Private Key</Button>
        </Grid>
        <Grid item xs={4} align='center' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={() => {this.props.navigateImportPrivateEthAddress('mnemonic')}}>Mnemonic</Button>
        </Grid>
        <Grid item xs={4} align='center' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={() => {this.props.navigateImportPrivateEthAddress('jsonV3')}}>JSONv3</Button>
        </Grid>
        <Grid item xs={12} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPrivateTypeEthAddress);
