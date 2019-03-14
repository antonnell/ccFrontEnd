import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionLoader from './sectionLoader';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
    </SvgIcon>
  );
}


class ReceiveModal extends Component {

  render() {

    let {
      publicKey,
      viewPublicKeyClosed,
      viewPublicKeyOpen,
      qrLoading,
      copyKey,
      accountName
    } = this.props

    return (
      <Dialog open={viewPublicKeyOpen} onClose={viewPublicKeyClosed} fullWidth={true} maxWidth={'sm'} TransitionComponent={Transition}>
        <DialogTitle id="alert-dialog-title">
          <Typography variant='h6' align='center'>
            Receive funds in {accountName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} align='center'>
              <canvas id='canvas' style={ { minHeight: '400px', width: '400px' } }/>
            </Grid>
            <Grid item xs={12} align='center'>
              <div style={{lineHeight: '46px', display: 'inline-block'}} id='currentAccountKey'>
                <Typography variant='body1'>
                  {publicKey}
                </Typography>
              </div>
              <Tooltip style={{display: 'inline-block'}} title='Copy Private Key' placement="right">
                <IconButton style={{ verticalAlign: 'top', marginTop: '-12px'}} onClick={() => { copyKey(this.props.currentAccountKey) }}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          {qrLoading && <SectionLoader />}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={viewPublicKeyClosed} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ReceiveModal;
