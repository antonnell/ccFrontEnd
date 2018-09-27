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
import PrivateKeyModal from './privateKeyModal.jsx';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import DeleteAccountConfirmation from './deleteAccountConfirmation';

const styles = {};

function ExpandMoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </SvgIcon>
  );
}

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </SvgIcon>
  );
};

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

function KeyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" />
    </SvgIcon>
  );
}

class WanAccounts extends Component {

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Wanchain Account
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
            id="addressName" label="Account Name" value={this.props.addressName}
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
            label="Make this my primary account"
          />
        </Grid>
        <Tooltip title='Create Wanchain Account'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.createLoading} onClick={this.props.createImportClicked}>
            +
          </Button>
        </Tooltip>
        <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
          <Grid item xs={12} align='left'>
            <Typography style={{color: '#f44336'}} >
              {this.props.error}
            </Typography>
          </Grid>
        </Grid>
        <PrivateKeyModal isOpen={this.props.keyOpen} handleClose={this.props.handleKeyClose} currentAccountKey={this.props.currentAccountKey} copyKey={this.props.copyKey} />
      </Grid>
    );
  };

  renderImportCommingSoon() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px',  position: 'relative'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Import Wanchain Account
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='center'>
          <Typography variant='headline' style={{marginTop: '48px'}}>Coming Soon...</Typography>
        </Grid>
      </Grid>
    )
  };

  renderImport() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px',  position: 'relative'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Import Wanchain Account
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
            id="addressName" label="Account Name" value={this.props.addressName}
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
            label="Make this my primary account"
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
        <Typography variant="display1">Oh no, we couldn't find any accounts for you. Why don't you create/import one?</Typography>
      </Grid>);
    }

    return this.props.addresses.map((address) => {

      address.editing = false
      let open = false
      let anchorEl = null
      var loading = <div></div>

      if(this.props.optionsAccount != null) {
        if(address.publicAddress == this.props.optionsAccount.publicAddress) {
          open = true
          anchorEl = this.props.optionsAccount.anchorEl
        }
      }

      if(this.props.loadingAccount != null) {
        if(address.publicAddress == this.props.loadingAccount.publicAddress)  {
          loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
        }
      }

      if(this.props.editAccount != null) {
        if(address.publicAddress == this.props.editAccount.publicAddress)  {
          address.editing = true
          if(this.props.cardLoading) {
            loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
          }
        }
      }

      if(this.props.exportKeyAccount != null) {
        if(address.publicAddress == this.props.exportKeyAccount)  {
          if(this.props.privateKeyLoading) {
            loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
          }
        }
      }

      let wrc20 = <div></div>
      if(address.wrc20Tokens) {
        wrc20 = (
        <ExpansionPanel style={{boxShadow: 'none', marginLeft: '-24px'}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>WRC20 Tokens</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell numeric>Balance</TableCell>
                    <TableCell numeric>Send</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {address.wrc20Tokens.map(n => {
                    return (
                      <TableRow key={n.symbol}>
                        <TableCell component="th" scope="row">
                          {n.symbol}
                        </TableCell>
                        <TableCell numeric>{n.balance+' '+n.symbol}</TableCell>
                        <TableCell numeric><Button size="small" variant="raised" color="primary" onClick={(event) => { this.props.sendWRC20(n.symbol, address); }}>Send</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>)
      }

      return (
        <Grid item xs={12} xl={6} align='left' key={address.publicAddress}>
          <Card style={{marginRight: '6px', marginBottom: '6px'}}>
            <CardContent style={{position: 'relative'}}>
              <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                <Grid item xs={11} align='left'>
                  {address.editing!==true&& <Typography noWrap variant="headline" component="h2" style={{minHeight: '32px', display: 'inline-block'}}>
                    {address.isPrimary===true&& <Tooltip title='This is your primary Wanchain account'><PrimaryIcon style={{ marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}}/></Tooltip>}
                    {address.isPrimary===false&& <Tooltip title='Make this account my primary Wanchain account'><SetPrimaryIcon onClick={() => { this.props.updatePrimaryClicked(address) }} style={{ cursor: 'pointer', marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}} /></Tooltip>}
                    {address.name}
                  </Typography>}
                  {address.editing===true&& <TextField autoFocus={true} style={{display: 'inline-block', marginTop: '0px', marginBottom: '5px'}} fullWidth={true} required
                    color="textSecondary" error={this.props.editAddressNameError} disabled={this.props.cardLoading} id="editAddressName" value={this.props.editAddressName}
                    onChange={(event) => { this.props.handleChange(event, 'editAddressName'); }} margin="normal" onKeyDown={(event) => { this.props.onEditAddressNameKeyDown(event, address) }}
                    helperText={this.props.editAddressNameErrorMessage} />}
                </Grid>
                <Grid item xs={1} align='right'>
                  <IconButton
                    style={{verticalAlign: 'top'}}
                    color="primary"
                    aria-label="More"
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    onClick={(e) => { this.props.optionsClicked(e, address) }}
                    disabled={this.props.loadingAccount||this.props.cardLoading||this.props.privateKeyLoading}>
                    <MoreIcon  />
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorPosition={{ top: 200, left: 400 }}
                    onClose={this.props.optionsClosed}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    >
                    <List component="nav">
                      <ListItem button onClick={() => { this.props.editNameClicked(address) }}>
                        <ListItemText primary="Update Name" />
                      </ListItem>
                      <ListItem button onClick={() => { this.props.updatePrimaryClicked(address) }}>
                        <ListItemText primary="Set Primary" />
                      </ListItem>
                      <ListItem button onClick={() => { this.props.exportWanchainKeyClicked(address.publicAddress) }}>
                        <ListItemText primary="View Private Key" />
                      </ListItem>
                      <Divider />
                      <ListItem button onClick={() => { this.props.deleteKeyClicked(address.publicAddress) }}>
                        <ListItemText primary="Delete" />
                      </ListItem>
                    </List>
                  </Popover>
                </Grid>
                <Grid item xs={12}>
                  <Typography noWrap variant="title" color="textSecondary" style={{minHeight: '32px'}}>
                    {address.publicAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6} align='left'>
                  <Typography variant="headline" noWrap>
                    {address.balance+' WAN ($'+address.usdBalance.toFixed(2)+')'}
                  </Typography>
                </Grid>
                <Grid item xs={6} align='right' >
                  <Button size="small" variant="flat" style={{border: '1px solid #ccc'}} disabled={this.props.loadingAccount||this.props.cardLoading||this.props.privateKeyLoading} onClick={() => { this.props.sendWanchainClicked(null, address) }} >Send Wan</Button>
                </Grid>
                <Grid item xs={12} align='left'>
                  {wrc20}
                </Grid>
              </Grid>
              {loading}
            </CardContent>
          </Card>
        </Grid>
      );
    })
  };

  renderICOUnavailable() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='center' style={{marginBottom: '24px'}}>
          <Typography variant="headline" color="inherit">
            Wanchain ICOS
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='headline' style={{margin: '48px'}}>Complete KYC to participate</Typography>
        </Grid>
      </Grid>)
  };

  renderICOS() {
    let headerStyle = {
      padding: '3px'
    }
    let bodyStyle = {
      padding: '3px',
      backgroundColor: '#f5f4f4',
      minHeight: '40px'
    }
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='center' style={{marginBottom: '24px'}}>
          <Typography variant="headline" color="inherit">
            Wanchain ICOS
          </Typography>
        </Grid>

        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Name
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Personal Cap
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Choose Wallet
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Amount to Invest (WAN)
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Token Amount
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={headerStyle}>
          <Typography variant="body2" color="inherit">
            Invest
          </Typography>
        </Grid>

        <Grid item xs={2} align='center' style={bodyStyle}>
          <Typography variant="body2" color="inherit" style={{lineHeight: '33px'}}>
            CryptoCurve
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={bodyStyle}>
          <Typography variant="body2" color="inherit" style={{lineHeight: '33px'}}>
            500 Wan / $700
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={bodyStyle}>
          {this.renderAddressDropdown()}
        </Grid>
        <Grid item xs={2} align='center' style={bodyStyle}>
          <TextField fullWidth={true} color="textSecondary" disabled={this.props.investLoading}
            id="investmentAmount" placeholder="Amount" value={this.props.investmentAmount}
            onChange={(event) => { this.props.handleChange(event, 'investmentAmount'); }} />
        </Grid>
        <Grid item xs={2} align='center' style={bodyStyle}>
          <Typography variant="body2" color="inherit" style={{lineHeight: '33px'}}>
            500 Curve
          </Typography>
        </Grid>
        <Grid item xs={2} align='center' style={bodyStyle}>
          <Button size="small" variant={"raised"} disabled={this.props.investLoading} color="primary" onClick={this.props.investClicked}>Invest</Button>
        </Grid>
      </Grid>
    );

  };

  renderAddressDropdown() {
    if(this.props.addresses == null || this.props.addresses.length == 0) {
      return (<MenuItem value={'none'}>None</MenuItem>)
    }

    return (<Select
      native={true}
      value={this.props.selectedAddress}
      onChange={this.props.selectAddress}
      disabled={this.props.investLoading} >
      {this.props.addresses.map((address) => {
        return (
          <option key={address.publicAddress} value={address.publicAddress}>{address.name}</option>
        )
      })}
    </Select>)
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={8} align='center'>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='center'>
              <Typography variant="headline" color="inherit" style={{marginBottom: '20px'}}>
                Wanchain Accounts
              </Typography>
            </Grid>
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center' style={{position: 'relative', minHeight: '470px'}}>
          <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary" >
              <Tab label="Create Account" />
              <Tab label="Import Account" />
            </Tabs>
            {this.props.tabValue === 0 && this.renderCreate()}
            {this.props.tabValue === 1 && this.renderImportCommingSoon()}
            {this.props.createLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Grid>
        </Grid>
        <Grid item xs={12} align='center' style={{position: 'relative', minHeight: '200px'}}>
          {(this.props.user&&this.props.user.kycDone)?this.renderICOS():this.renderICOUnavailable()}
        </Grid>
        <DeleteAccountConfirmation isOpen={this.props.deleteOpen} handleClose={this.props.handleDeleteClose} confirmDelete={this.props.confirmDelete} deleteLoading={this.props.deleteLoading} />
      </Grid>
    );
  }
}

export default withStyles(styles)(WanAccounts);
