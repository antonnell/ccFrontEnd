import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {};

class ImportPrivateEthAddress extends Component {

  componentDidMount() {
    this.props.checkIfEthPasswordProtected(this.props.ethPrivateKey)
  };

  render() {
    var input = null
    var password = null
    var unlockButton = null
    if(this.props.passwordRequired === true) {
      password = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethPasswordError} disabled={this.props.loading}
        id="ethPassword" placeholder="Password" value={this.props.ethPassword} type='password'
        onChange={(event) => { this.props.handleChange(event, 'ethPassword'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} helperText='Your key is password protected. Please provide us with the password.'/>
      unlockButton = <Button size="small" variant={this.props.ethPasswordValid?"contained":"text"} disabled={!(this.props.ethPasswordValid||this.props.unlockLoading)} color="primary" onClick={this.props.unlockPrivateEthAddress}>Unlock</Button>
    }

    switch (this.props.keyType) {
      case 'mnemonic':
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethMnemonicError} disabled={this.props.loading}
          id="ethMnemonic" placeholder="Mnemonic String" value={this.props.ethMnemonic}
          onChange={(event) => { this.props.handleChange(event, 'ethMnemonic'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} helperText={this.props.ethMnemonicErrorMessage} />
        break;
      case 'jsonV3':
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethJSONV3Error} disabled={this.props.loading}
          id="ethJSONV3" placeholder="Enter your JSON" value={this.props.ethJSONV3}
          onChange={(event) => { this.props.handleChange(event, 'ethJSONV3'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} helperText={this.props.ethJSONV3ErrorMessage} />
        break;
      default:
        input = <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.ethPrivateKeyError} disabled={this.props.loading}
          id="ethPrivateKey" placeholder="Private Key" value={this.props.ethPrivateKey}
          onChange={(event) => { this.props.handleChange(event, 'ethPrivateKey'); }} margin="normal" onKeyDown={this.props.onImportKeyDown} helperText={this.props.ethPrivateErrorMessage} />
        break;
    }

    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Great! We need to know your Ethereum address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please provide us with the details of your Ethereum Address. We will store them safely on our system and you will be able to interact with your address later on.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          {input}
        </Grid>
        <Grid item xs={12} align='center'>
          {password}
        </Grid>
        <Grid item xs={12} align='center'>
          {unlockButton}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="text" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.ethPrivateAddressValid&&this.props.passwordCorrect?"contained":"text"} disabled={!(this.props.ethPrivateAddressValid&&this.props.passwordCorrect)} color="primary" onClick={this.props.importPrivateEthAddress}>Import my address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImportPrivateEthAddress);
