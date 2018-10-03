import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class DeleteAccountConfirmation extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} title="Disclaimer" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: '#333'}}>
            Are you sure you would like to delete this account from your profile?
          </DialogContentText>
          {this.props.deleteLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" disabled={this.props.deleteLoading} >
            No
          </Button>
          <Button onClick={this.props.confirmDelete} color="primary" variant='raised' disabled={this.props.deleteLoading} >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (DeleteAccountConfirmation);
