import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = {};

class HaveEthAddress extends Component {

  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
    this.renderAddresses = this.renderAddresses.bind(this);

    if (this.props.ethAddresses != null && this.props.ethAddresses.length > 0) {
      this.state = {
        renderMessage: 'We noticed you had the following addresses, would you like to use one of them?'
      }
    } else {
      this.state = {
        renderMessage: 'Do you have an Ethereum Address, or would you like us to create one for you?'
      }
    }

  };

  renderMessage() {
    if(this.props.ethAddresses != null && this.props.ethAddresses.length > 0) {
      return (<List component="nav" style={{maxWidth:400}}>
        {this.renderAddresses()}
      </List>)
    } else {
      return (<div></div>)
    }
  };

  renderAddresses() {
    return this.props.ethAddresses.map((address) => {
      return (
        <ListItem key={address.address} button onClick={(event) => { this.props.selectAddress(address); }}>
          <ListItemText primary={address.name} secondary={address.address} />
            <ListItemSecondaryAction>
              {address.balance+" ETH"}
            </ListItemSecondaryAction>
        </ListItem>
      )
    })
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="h6">
            Next, we need to know your Ethereum address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body1">
            {this.state.renderMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          {this.renderMessage()}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="text" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="text" onClick={this.props.navigateExistingEthAddress} style={{marginRight: '12px'}}>I already have one</Button>
          <Button size="small" variant="contained" color="primary" onClick={this.props.navigateCreateEthAddress}>Create Ethereum Address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HaveEthAddress);
