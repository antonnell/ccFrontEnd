import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
          </ListItem>
        )
      })}
    </List>
  };

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">Send Ethereum</DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative'}}>
            <Grid item xs={12}>
              <Typography variant="Subheading">
                Select the account that you would like to transfer Ethereum from
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {this.renderAddresses()}
            </Grid>
          </Grid>
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
