import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';

class CompleteEthereumPayment extends Component {

  constructor(props) {
    super(props);
  };

  renderError() {
    return (<Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
      <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
        <Typography variant="body1">
          Your payment was unfortunately <b>not</b> successfully processed.
        </Typography>
      </Grid>
      <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
        <Typography variant="body1">
          If the problem persists, please contact CryptoCurve support with the following error
        </Typography>
      </Grid>
      <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
        <Typography variant="subheading" style={{color: '#f44336'}}>
          {this.props.error}
        </Typography>
      </Grid>
    </Grid>)
  };

  renderSuccess() {
    return (<Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
      <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
        <Typography variant="body1">
          Your payment was successfully processed.
        </Typography>
      </Grid>
      <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
        <Typography variant="body1">
          Please wait while the transaction is being mined. Once completed, the funds will relect on your account.
        </Typography>
      </Grid>
    </Grid>)
  };

  render() {
    return (
      <div>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center'>
            <Typography variant="headline">
              Payment results
            </Typography>
          </Grid>
        </Grid>
        {this.props.error==null&&this.renderSuccess()}
        {this.props.error!=null&&this.renderError()}
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '48px'}}>
          <Grid item xs={12} align='right'>
            <Button size="medium" variant="raised" color="primary" onClick={this.props.accountClicked}>Back to Account</Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default (CompleteEthereumPayment);
