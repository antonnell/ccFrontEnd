import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Disable2FaConfirmation extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} title="Disclaimer" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">{"Disable 2FA"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: '#333'}}>
            Are you sure you would like to disable Two Factor Authentication?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" >
            No
          </Button>
          <Button onClick={this.props.confirmDisable} color="primary" variant='contained' >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (Disable2FaConfirmation);
