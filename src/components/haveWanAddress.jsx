import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = {};

class HaveWanAddress extends Component {

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
        renderMessage: 'Do you have an Wanchain Address, or would you like us to create one for you?'
      }
    }
  };

  renderMessage() {
    if(this.props.wanAddresses != null && this.props.wanAddresses.length > 0) {
      return (<List component="nav">
        {this.renderAddresses()}
      </List>)
    } else {
      return (<div></div>)
    }
  };

  renderAddresses() {
    return this.props.wanAddresses.map((address) => {
      return (
        <ListItem key={address.publicAddress} button onClick={(event) => { this.props.selectAddress(address); }}>
          <ListItemText primary={address.name} secondary={address.publicAddress} />
        </ListItem>
      )
    })
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Next, we need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2" noWrap>
            This will be the address that receives your Curve tokens.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            {this.state.renderMessage}
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          {this.renderMessage()}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateExistingWanAddress} style={{marginRight: '12px'}}>I have one</Button>
          <Button size="small" variant="raised" color="primary" onClick={this.props.navigateCreateWanAddress}>Create Wanchain Address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HaveWanAddress);
