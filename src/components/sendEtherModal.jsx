import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';

class SendEtherModal extends Component {

  constructor(props) {
    super(props);
  };

  renderAddresses() {
    if(this.props.ethAddresses == null || this.props.ethAddresses.length == 0) {
      return (<Typography variant="Subheading" >Oh no, we couldn't find any addresses for you. Why don't you create/import one?</Typography>)
    }

    return <List component="nav">
      {this.props.ethAddresses.map((address) => {
        return (
          <ListItem key={address.address} button onClick={(event) => { this.props.selectAddress(address); }}>
            <ListItemText primary={address.name} secondary={address.address} />
            <ListItemSecondaryAction>
              {address.balance+" ETH"}
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  };

  renderContacts() {
    if(this.props.contacts == null || this.props.contacts.length == 0) {
      return (<Typography variant="Subheading" >Oh no, we couldn't find any contacts for you. Why don't you create/import one?</Typography>)
    }

    return <List component="nav">
      {this.props.contacts.map((contact) => {
        return (
          <ListItem key={contact.primaryAddress} button onClick={(event) => { this.props.selectContact(contact); }}>
            <ListItemText primary={contact.displayName} secondary={contact.primaryAddress} />
          </ListItem>
        )
      })}
    </List>
  };

  renderPage() {
    if(this.props.account == null) {
      return (<div>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative'}}>
          <Grid item xs={12}>
            <Typography variant="subheading">
              Which account would you like to transfer Ethereum from?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {this.renderAddresses()}
          </Grid>
        </Grid>
      </div>)
    }

    if(this.props.contact == null) {
      return (<div>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative'}}>
          <Grid item xs={12}>
            <Typography variant="subheading">
              Who would you like to transfer Ethereum to?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {this.renderContacts()}
          </Grid>
        </Grid>
      </div>)
    }

    if(this.props.amount == null || this.props.gwei == null) {
      return (<div>
        <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative'}}>
          <Grid item xs={12}>
            <Typography variant="subheading">
              Who would you like to transfer Ethereum to?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {this.renderContacts()}
          </Grid>
        </Grid>
      </div>)
    }

    return (<div>
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative'}}>
        <Grid item xs={12}>
          <Typography variant="subheading">
            Please confirm the transaction
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Show Account transferred from
        </Grid>
        <Grid item xs={12}>
          Show Contact transferring to
        </Grid>
      </Grid>
    </div>)
  };

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">Send Ethereum</DialogTitle>
        <DialogContent>
          {this.renderPage()}
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (SendEtherModal);
