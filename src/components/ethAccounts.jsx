import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';
import Tooltip from 'material-ui/Tooltip';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';

const styles = {};

function PrimaryIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </SvgIcon>
  );
}

function SetPrimaryIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
    </SvgIcon>
  );
}

function EditIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
    </SvgIcon>
  );
}

class EthAccounts extends Component {

  constructor(props) {
    super(props);
  };

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Ethereum Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'addressName'); }} helperText={this.props.addressNameErrorMessage} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                disabled={this.props.createLoading}
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
                value="primary"
              />
            }
            label="Make this my primary address"
          />
        </Grid>
      </Grid>
    );
  }

  renderImport() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Import Ethereum Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.publicAddressError} disabled={this.props.createLoading}
            id="publicAddress" label="Public Address" value={this.props.publicAddress}
            onChange={(event) => { this.props.handleChange(event, 'publicAddress'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'publicAddress'); }} helperText={this.props.publicAddressErrorMessage} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.createLoading}
            id="privateKey" label="Private Key" value={this.props.privateKey}
            onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'privateKey'); }} helperText={this.props.privateKeyErrorMessage} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'addressName'); }} helperText={this.props.addressNameErrorMessage} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                disabled={this.props.createLoading}
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
                value="primary"
              />
            }
            label="Make this my primary address"
          />
        </Grid>
      </Grid>
    );
  };

  renderAddresses() {

    if(this.props.addresses == null) {
      return (<Grid item xs={12} xl={12} align='left' style={{minHeight: '190px', position: 'relative'}}>
        <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
      </Grid>);
    }

    if(this.props.addresses.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1" >Oh no, we couldn't find any addresses for you. Why don't you create/import one?</Typography>
      </Grid>);
    }

    return this.props.addresses.map((address) => {

      address.editing = false
      if(this.props.editAccount != null) {
        if(address.address == this.props.editAccount.address)  {
          address.editing = true
        }
      }

      return (
        <Grid item xs={12} xl={6} align='left' key={address.address}>
          <Card style={{marginRight: '6px', marginBottom: '6px'}}>
            <CardContent>
              <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                <Grid item xs={9} align='left'>
                  {address.editing!==true&& <Typography noWrap variant="headline" component="h2" style={{minHeight: '32px', display: 'inline-block'}}>
                    {address.isPrimary===true&& <Tooltip title='This is your primary Ethereum account'><PrimaryIcon style={{ marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}}/></Tooltip>}
                    {address.isPrimary===false&& <Tooltip title='Make this account my primary Ethereum account'><SetPrimaryIcon onClick={() => { this.props.updatePrimaryClicked(address) }} style={{ cursor: 'pointer', marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}} /></Tooltip>}
                    {address.name}
                    <Tooltip style={{verticalAlign: 'top'}} title='Edit name'><IconButton style={{ marginTop: '-8px', verticalAlign: 'top'}} onClick={() => { this.props.editNameClicked(address) }}><EditIcon /></IconButton></Tooltip>
                  </Typography>}
                  {address.editing===true&& <TextField autoFocus={true} style={{display: 'inline-block', marginTop: '0px', marginBottom: '5px'}} fullWidth={true} required
                    color="textSecondary" error={this.props.editAddressNameError} disabled={this.props.cardLoading} id="editAddressName" value={this.props.editAddressName}
                    onChange={(event) => { this.props.handleChange(event, 'editAddressName'); }} margin="normal" onKeyDown={(event) => { this.props.onEditAddressNameKeyDown(event, address) }}
                    onBlur={(event) => { this.props.onEditAddressNameBlur(event, address); }} helperText={this.props.editAddressNameErrorMessage} />}
                </Grid>
                <Grid item xs={3} align='right'>
                  <Typography variant="headline" noWrap>
                    {address.balance+' ETH'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography noWrap color="textSecondary">
                    {address.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                <Grid item xs={12} align='right' >
                  <Button size="small" variant="flat" style={{border: '1px solid #ccc'}} onClick={() => { this.props.sendEtherClicked(null, address) }} >Send Ether</Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      );
    })
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={8} align='center'>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="headline" color="inherit" style={{marginBottom: '20px'}}>
                Your Ethereum Addresses
              </Typography>
            </Grid>
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center' style={{position: 'relative', minHeight: '500px'}}>
          <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary" >
              <Tab label="Create Address" />
              <Tab label="Import Address" />
            </Tabs>
            {this.props.tabValue === 0 && this.renderCreate()}
            {this.props.tabValue === 1 && this.renderImport()}
            {this.props.createLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Grid>
        </Grid>
        <Tooltip title='Create Ethereum Address'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.createLoading} onClick={this.props.createImportClicked}>
            +
          </Button>
        </Tooltip>
      </Grid>
    );
  }
}

export default withStyles(styles)(EthAccounts);
