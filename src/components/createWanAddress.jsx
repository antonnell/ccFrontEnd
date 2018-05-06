import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, {  CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

class CreateWanAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            In order to make this as simple as possible, we just need a friendly name for your address so that you can easily find it later on. What would you like to name your new Wanchain address?
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.loading}
            id="addressName" placeholder="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.createWanAddress} disabled={this.props.loading}>Create address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateWanAddress);
