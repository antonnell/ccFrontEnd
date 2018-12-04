import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {};

class CreateWan extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="h6">
            Good choice! Let's create a new Wanchain account.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body1">
            In order to make this as simple as possible, we just need a friendly name for your address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body1">
             What would you like to name your new Wanchain address?
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} autoFocus required color="textSecondary" error={this.props.wanAddressNameError} disabled={this.props.loading}
            id="wanAddressName" placeholder="Wanchain Address Name" value={this.props.wanAddressName}
            onChange={(event) => { this.props.handleChange(event, 'wanAddressName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown}
            helperText={this.props.wanAddressNameErrorMessage} />
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
          <Grid item xs={12} align='center'>
            <Typography style={{color: '#f44336'}} >
              {this.props.error}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="text" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.wanAddressNameValid?"contained":"text"} disabled={(!this.props.wanAddressNameValid)||this.props.loading} color="primary" onClick={this.props.createWanAddress}>Create address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateWan);
