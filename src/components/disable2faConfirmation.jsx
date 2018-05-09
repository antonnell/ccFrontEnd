import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class Disable2FaConfirmation extends Component {

  constructor(props) {
    super(props);
  };

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
          <Button onClick={this.props.confirmDisable} color="primary" variant='raised' >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (Disable2FaConfirmation);
