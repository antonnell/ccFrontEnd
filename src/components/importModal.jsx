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

class ImportModal extends Component {

  render() {
    const { type } = this.props

    if(type === 'bitcoin') {
      return (
        <Dialog open={this.props.isOpen} onClose={this.props.handleClose} >
          <DialogContent>
            <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
              <Grid item xs={12} align='left'>
                <Typography variant="h5" >
                  Import Account
                </Typography>
              </Grid>
              <Grid item xs={12} align='left'>
                <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
                  id="addressName" label="Account Name" value={this.props.addressName}
                  onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                  onBlur={(event) => { this.props.validateField(event, 'addressName'); }} helperText={this.props.addressNameErrorMessage} />
              </Grid>
              <Grid item xs={12} align='left'>
                <TextField fullWidth={true} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.createLoading}
                  id="privateKey" label="Private Key" value={this.props.privateKey}
                  onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                  onBlur={(event) => { this.props.validateField(event, 'privateKey'); }} helperText={this.props.privateKeyErrorMessage} />
              </Grid>
              <Grid item xs={12} align='left'>
                <TextField fullWidth={true} required color="textSecondary" error={this.props.mnemonicPhraseError} disabled={this.props.createLoading}
                  id="mnemonicPhrase" label="Mnemonic phrase" value={this.props.mnemonicPhrase}
                  onChange={(event) => { this.props.handleChange(event, 'mnemonicPhrase'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                  onBlur={(event) => { this.props.validateField(event, 'mnemonicPhrase'); }} helperText={this.props.mnemonicPhraseErrorMessage} />
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
            {this.props.importLoading?<SectionLoader />:''}
          </DialogContent>
          <DialogActions>
            <Button disabled={this.props.importLoading} style={{border: '1px solid #ccc'}} onClick={this.props.handleImport} color="primary" autoFocus>
              Import Account
            </Button>
          </DialogActions>
        </Dialog>)
    }

    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} >
        <DialogContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="h5" >
                Import Account
              </Typography>
            </Grid>
            <Grid item xs={12} align='left'>
              <TextField fullWidth={true} required color="textSecondary" error={this.props.publicAddressError} disabled={this.props.createLoading}
                id="publicAddress" label="Public Address" value={this.props.publicAddress}
                onChange={(event) => { this.props.handleChange(event, 'publicAddress'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'publicAddress'); }} helperText={this.props.publicAddressErrorMessage} />
            </Grid>
            <Grid item xs={12} align='left'>
              <TextField fullWidth={true} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.createLoading}
                id="privateKey" label="Private Key" value={this.props.privateKey}
                onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
                onBlur={(event) => { this.props.validateField(event, 'privateKey'); }} helperText={this.props.privateKeyErrorMessage} />
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
          {this.props.importLoading?<SectionLoader />:''}
        </DialogContent>
        <DialogActions>
          <Button disabled={this.props.importLoading} variant='contained' size='small' onClick={this.props.handleImport} color="primary" autoFocus>
            Import Account
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (ImportModal);
