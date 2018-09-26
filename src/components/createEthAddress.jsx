import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

class CreateEth extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{position: 'relative', padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Good choice! Let use create an address for you.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            In order to make this as simple as possible, we just need a friendly name for your address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            What would you like to name your new Ethereum address?
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethAddressNameError} disabled={this.props.loading}
            id="ethAddressName" placeholder="Ethereum Address Name" value={this.props.ethAddressName}
            onChange={(event) => { this.props.handleChange(event, 'ethAddressName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown}
            helperText={this.props.ethAddressNameErrorMessage} />
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.ethAddressNameValid?"raised":"flat"} disabled={(!this.props.ethAddressNameValid)||this.props.loading} color="primary" onClick={this.props.createEthAddress}>Create address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateEth);
