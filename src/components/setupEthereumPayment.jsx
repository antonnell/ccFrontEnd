import React, { Component } from "react";
import Dialog, { DialogActions, DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputAdornment } from 'material-ui/Input';

class SetupEthereumPayment extends Component {

  constructor(props) {
    super(props);
  };

  renderAddresses() {
    if(this.props.ethAddresses == null || this.props.ethAddresses.length == 0) {
      return (<Typography variant="subheading" >Oh no, we couldn't find any addresses for you. Why don't you create/import one?</Typography>)
    }

    return (
      <FormControl error style={{minWidth: '300px', width: '100%'}}>
        <Select
        error={this.props.accountError}
        value={this.props.accountValue}
        onChange={this.props.selectAddress}
        renderValue={(value) => {
          var selectedAddress = this.props.ethAddresses.filter((address) => {
            return address.address == value
          })[0]

          return (
            <Grid container justify="center" alignItems="center" direction="row">
              <Grid item xs={8} align='left'>
                <Typography variant='display1' noWrap color='secondary'>
                  {selectedAddress.name}
                </Typography>
                <Typography variant='subheading' noWrap style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                  {selectedAddress.address}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{borderLeft: '1px solid #dedede'}} align='center'>
                <div></div>
                <Typography variant='title' noWrap>
                  {selectedAddress.balance+" ETH"}
                </Typography>
                <Typography variant='subheading' noWrap>
                  Available Balance
                </Typography>
              </Grid>
            </Grid>)
        }} >
        {this.props.ethAddresses.map((address) => {
          return (
            <MenuItem value={address.address} key={address.address}>
              <ListItemText primary={address.name} secondary={address.address} />
              <ListItemSecondaryAction style={{right: '24px'}}>
                {address.balance+" ETH"}
              </ListItemSecondaryAction>
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{this.props.accountErrorMessage}</FormHelperText>
    </FormControl>)
  };

  renderContacts() {
    if(this.props.contacts == null || this.props.contacts.length == 0) {
      return (<Typography variant="subheading" >Oh no, we couldn't find any contacts for you. Why don't you create/import one?</Typography>)
    }

    return (
      <FormControl error style={{minWidth: '300px', width: '100%'}}>
        <Select
        error={this.props.contactError}
        value={this.props.contactValue}
        onChange={this.props.selectContact}
        style={{minWidth: '300px', width: '100%'}}
        renderValue={(value) => {
          var selectedContact = this.props.contacts.filter((contact) => {
            return contact.primaryAddress == value
          })[0]

          return (
            <Grid container justify="center" alignItems="center" direction="row">
              <Grid item xs={8} align='left'>
                <Typography variant='display1' noWrap color='secondary'>
                  {selectedContact.displayName}
                </Typography>
                <Typography variant='subheading' noWrap style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                  {selectedContact.primaryAddress}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{borderLeft: '1px solid #dedede'}} align='center'>
                <div></div>
                <Typography variant='subheading' >
                  {selectedContact.notes}
                </Typography>
              </Grid>
            </Grid>)
        }} >
        {this.props.contacts.map((contact) => {
          return (
            <MenuItem value={contact.primaryAddress} key={contact.primaryAddress}>
              <ListItemText primary={contact.displayName} secondary={contact.primaryAddress} />
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{this.props.contactErrorMessage}</FormHelperText>
    </FormControl>)
  };

  renderSelectBeneficiary() {
    return(<Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="subheading">
            Select the beneficiary*
          </Typography>
        </Grid>
        <Grid item xs={12} align='left'>
          {this.renderContacts()}
        </Grid>
      </Grid>);
  };

  renderEnterPublic() {
    return(<Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '24px'}}>
        <Grid item xs={12} align='left'>
          <div style={{background: '#dedede', width: '100%', padding: '12px', fontStyle: 'italic', marginBottom: '12px'}}>
            {this.props.disclaimer}
          </div>
          <Typography variant="subheading">
            Recipient's Public Address*
          </Typography>
          <TextField required fullWidth={false} color="textSecondary" error={this.props.publicAddressError} style={{minWidth: '300px', maxWidth: '400px', marginTop: '0px'}}
            id="publicAddress" placeholder='Address' value={this.props.publicAddress}
            onChange={(event) => { this.props.handleChange(event, 'publicAddress'); }} margin="normal"
            helperText={this.props.publicAddressErrorMessage} onBlur={(event) => { this.props.validateField(event, 'publicAddress'); }} />
        </Grid>
      </Grid>);
  };

  render() {
    return (
      <div>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='center'>
            <Typography variant="title">
              Set up your payment
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '24px'}}>
          <Grid item xs={12} align='left' style={{ borderBottom: '1px solid #aaaaaa', paddingBottom: '12px' }}>
            <Typography variant="title">
              Your details
            </Typography>
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '24px'}}>
            <Typography variant="subheading">
              Select your account*
            </Typography>
          </Grid>
          <Grid item xs={12} altign='left'>
            {this.renderAddresses()}
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '24px'}}>
            <Typography variant="subheading">
              Your reference*
            </Typography>
            <TextField required fullWidth={false} color="textSecondary" error={this.props.ownReferenceError} style={{minWidth: '300px', maxWidth: '400px', marginTop: '0px'}}
              id="ownReference" placeholder="Reference" value={this.props.ownReference}
              onChange={(event) => { this.props.handleChange(event, 'ownReference'); }} margin="normal"
              helperText={this.props.ownReferenceErrorMessage} onBlur={(event) => { this.props.validateField(event, 'ownReference'); }} />
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '48px'}}>
          <Grid item xs={12} align='left' style={{ borderBottom: '1px solid #aaaaaa', paddingBottom: '12px' }}>
            <Typography variant="title">
              Payment details
            </Typography>
          </Grid>
          <Grid item xs={12} align='left'>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="secondary"
              textColor="secondary" >
              <Tab label="Beneficiary Payment" />
              <Tab label="Public Address Payment" />
            </Tabs>
            {this.props.tabValue === 0 && this.renderSelectBeneficiary()}
            {this.props.tabValue === 1 && this.renderEnterPublic()}
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '24px'}}>
            <Typography variant="subheading">
              Their reference*
            </Typography>
            <TextField required fullWidth={false} color="textSecondary" error={this.props.beneficiaryReferenceError} style={{minWidth: '300px', maxWidth: '400px', marginTop: '0px'}}
              id="beneficiaryReference" placeholder="Reference" value={this.props.beneficiaryReference}
              onChange={(event) => { this.props.handleChange(event, 'beneficiaryReference'); }} margin="normal"
              helperText={this.props.beneficiaryReferenceErrorMessage} onBlur={(event) => { this.props.validateField(event, 'beneficiaryReference'); }} />
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '24px'}}>
            <Typography variant="subheading">
              Payment amount*
            </Typography>
            <TextField required fullWidth={false} color="textSecondary" error={this.props.amountError} style={{minWidth: '300px', maxWidth: '400px', marginTop: '0px'}}
              id="amount" placeholder="Amount" value={this.props.amount}
              onChange={(event) => { this.props.handleChange(event, 'amount'); }} margin="normal"
              helperText={this.props.amountErrorMessage} onBlur={(event) => { this.props.validateField(event, 'amount'); }} InputProps={{
                endAdornment: <InputAdornment position="end">Eth</InputAdornment>,
              }} />
          </Grid>
          <Grid item xs={12} align='left' style={{marginTop: '24px'}}>
            <Typography variant="subheading">
              Gas limit*
            </Typography>
            <TextField required fullWidth={false} color="textSecondary" error={this.props.gweiError} style={{minWidth: '300px', maxWidth: '400px', marginTop: '0px'}}
              id="gwei" placeholder="Gwei" value={this.props.gwei}
              onChange={(event) => { this.props.handleChange(event, 'gwei'); }} margin="normal"
              helperText={this.props.gweiErrorMessage} onBlur={(event) => { this.props.validateField(event, 'gwei'); }} InputProps={{
                endAdornment: <InputAdornment position="end">Gwei</InputAdornment>,
              }} />
          </Grid>
        </Grid>
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{position: 'relative', marginTop: '48px'}}>
          <Grid item xs={12} align='right'>
            <Button size="medium" variant="raised" color="primary" onClick={this.props.proceedClicked}>Proceed</Button>
          </Grid>
        </Grid>
      </div>
    );
  };
}

export default (SetupEthereumPayment);
