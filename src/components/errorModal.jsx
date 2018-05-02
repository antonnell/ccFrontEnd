import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


const styles = {};

class ErrorModal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };
  handleClose = () => {
    this.props.handleClose();
  };

  render() {

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Oops!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ErrorModal);
