import React, { Component } from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress  from '@material-ui/core/CircularProgress';

class EditEmailModal extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} >
        <DialogContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="headline">
                Update Email Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
              <TextField fullWidth={true} required color="textSecondary" error={this.props.emailAddressError} disabled={this.props.addLoading}
                id="emailAddress" label="New Email Address" value={this.props.emailAddress}
                onChange={(event) => { this.props.handleChange(event, 'emailAddress'); }} margin="normal" onKeyDown={this.props.onUpdateKeyDown}
                helperText={this.props.emailAddressErrorMessage} />
            </Grid>
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
              <Grid item xs={12} align='left'>
                <Typography style={{color: '#f44336'}} >
                  {this.props.error}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {this.props.addLoading?<CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>:''}
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.addLoading} style={{border: '1px solid #ccc'}} onClick={this.props.updateClicked} color="primary" autoFocus>
            Update Email
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (EditEmailModal);
