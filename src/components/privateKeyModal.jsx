import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
    </SvgIcon>
  );
}

class PrivateKeyModal extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} title="Export" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='h6' align='center'>
            Export private keys at your own risk
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography align='center'>
            Your Private Key:
          </Typography>
          <div style={{lineHeight: '46px', display: 'inline-block'}} id='currentAccountKey'>
            {this.props.currentAccountKey}
          </div>
          <Tooltip style={{display: 'inline-block'}} title='Copy Private Key' placement="right">
            <IconButton style={{ verticalAlign: 'top'}} onClick={() => { this.props.copyKey(this.props.currentAccountKey) }}>
              <CopyIcon />
            </IconButton>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (PrivateKeyModal);
