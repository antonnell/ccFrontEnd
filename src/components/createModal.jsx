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
import SectionLoader from './sectionLoader';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateModal extends Component {

  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} fullWidth={true} maxWidth={'sm'} TransitionComponent={Transition}>
        <DialogContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="h5" >
                Create Account
              </Typography>
            </Grid>
            <Grid item xs={12} align='left'>
              <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
                id="addressName" label="Account Name" value={this.props.addressName}
                onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'addressName'); }} helperText={this.props.addressNameErrorMessage} />
            </Grid>
            <Grid item xs={12} align='left'>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={this.props.createLoading}
                    checked={this.props.primary}
                    onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
                    value='primary'
                    color='primary'
                  />
                }
                label="Make this my primary account"
              />
            </Grid>
            <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
              <Grid item xs={12} align='left'>
                <Typography style={{color: '#f44336'}} >
                  {this.props.error}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {this.props.createLoading?<SectionLoader />:''}
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.createLoading} variant='contained' size='small' onClick={this.props.handleCreate} color="primary" autoFocus>
            Create Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (CreateModal);
