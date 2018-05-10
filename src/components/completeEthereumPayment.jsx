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

  render() {
    return (
      <div>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center'>
            <Typography variant="title">
              Payment results
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
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
          <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
            <Typography variant="body1">

            </Typography>
          </Grid>
        </Grid>
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
