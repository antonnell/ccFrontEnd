import React, { Component } from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'

class ViewTokensModal extends Component {

  renderAddresses() {
    let { viewAddress } = this.props

    if(viewAddress && viewAddress.addresses && viewAddress.addresses.length > 0 ) {
      return viewAddress.addresses.map((address) => {
        return this.renderAddress(address)
      })
    } else {
      //something went wrong
    }
  }

  renderHeader() {
    let headerStyle = {
      padding: '16px',
      backgroundColor: '#2f3031'
    }
    let textStyle = {
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: '800'
    }

    return (<Grid item xs={12} align='left'>
      <Card style={{borderRadius: '3px'}}>
        <Grid container>
          <Grid item xs={2} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Token
            </Typography>
          </Grid>
          <Grid item xs={6} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Address
            </Typography>
          </Grid>
          <Grid item xs={3} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Balance
            </Typography>
          </Grid>
          <Grid item xs={1} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Txs
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>)
  }

  renderAddress(address) {

    let bodyStyle = {
      padding: '16px',
    }
    let textStyle = {
      color: '#2f3031',
      fontSize: '18px',
      fontWeight: '800'
    }
    if(this.props.theme.name=='dark') {
      textStyle = {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: '800'
      }
    }
    let subTextStyle = {
      color: '#666666',
      marginTop: '-6px'
    }
    let divStyle = {
      display: 'inline-block'
    }

    return(
      <Grid item xs={12} align='left'>
        <Card style={{marginTop:'16px', borderRadius: '3px'}} onClick={(event) => {this.props.onCardClicked(address.address) }}>
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={2} align='left' style={bodyStyle}>
              <div style={divStyle}>
                <img
                  alt=""
                  src={ require('../assets/images/bitcoin-logo.png') }
                  width="30px"
                  height="30px"
                  style={{marginRight: '12px'}}
                />
              </div>
              <div style={divStyle}>
                <Typography variant="body1" style={textStyle}>
                  Bitcoin
                </Typography>
                <Typography variant="subtitle2" style={subTextStyle}>
                  {address.isUsed?'used':'unused'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle} id={address.address}>
                {address.address}
              </Typography>
            </Grid>
            <Grid item xs={3} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle}>
                {address.balance + ' BTC'}
              </Typography>
              <Typography variant="subtitle2" style={subTextStyle}>
                {'$' + (address.usdBalance?address.usdBalance:'0.00')}
              </Typography>
            </Grid>
            <Grid item xs={1} align='left' style={bodyStyle}>
              <Typography variant="body1" style={textStyle}>
                {address.txCount}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} fullWidth={true} maxWidth={'md'}>
        <DialogContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            {this.renderHeader()}
            {this.renderAddresses()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.createLoading} style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (ViewTokensModal);
