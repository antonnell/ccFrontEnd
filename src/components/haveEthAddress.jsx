import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = {};

class HaveEthAddress extends Component {

  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
    this.renderAddresses = this.renderAddresses.bind(this);
  };

  renderMessage() {
    if(this.props.ethAddresses.length > 0) {
      return (<Grid item xs={12} align='center'>
        <Typography variant="body2">
          We will only accept Ethereum deposits for our whitelist from registered Ethereum addresses. We see that you already have a Ethreum address loaded on our system. Would like to use one of them, import a new Ethereum address, or would you like us to create one for you?
        </Typography>
        <List component="nav">
          {this.renderAddresses()}
        </List>
      </Grid>)
    } else {
      return (<Grid item xs={12} align='center'>
        <Typography variant="body2">
          We will only accept Ethereum deposits for our whitelist from registered Ethereum addresses. Do you have an Ethereum Address, or would you like us to create one for you?
        </Typography>
      </Grid>)
    }
  };

  renderAddresses() {
    return this.props.ethAddresses.map((address) => {
      return (
        <ListItem key={address.address} button onClick={(event) => { this.props.selectAddress(address); }}>
          <ListItemText primary={address.name} secondary={address.address} />
        </ListItem>
      )
    })
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We need to know your Ethereum address.
          </Typography>
        </Grid>
        {this.renderMessage()}
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px'}}>
          <Button size="small" variant="raised" onClick={this.props.navigateExistingEthAddress} style={{marginRight: '12px'}}>Import Address</Button>
          <Button size="small" variant="raised" color="primary" onClick={this.props.navigateCreateEthAddress}>Create Address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HaveEthAddress);
