import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CardActions  from '@material-ui/core/CardActions';
import CircularProgress  from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import PrivateKeyModal from './privateKeyModal.jsx';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteAccountConfirmation from './deleteAccountConfirmation';

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

class EthAccounts extends Component {

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Ethereum Account
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
        <Tooltip title='Create Ethereum Account'>
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
  }

  renderImport() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Import Ethereum Account
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
        <Tooltip title='Import Ethereum Account'>
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
      let loading = <div></div>

      if(this.props.optionsAccount != null) {
        if(address.address == this.props.optionsAccount.address) {
          open = true
          anchorEl = this.props.optionsAccount.anchorEl
        }
      }

      if(this.props.loadingAccount != null) {
        if(address.address == this.props.loadingAccount.address)  {
          loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
        }
      }

      if(this.props.editAccount != null) {
        if(address.address == this.props.editAccount.address)  {
          address.editing = true
          if(this.props.cardLoading) {
            loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
          }
        }
      }

      if(this.props.exportKeyAccount != null) {
        if(address.address == this.props.exportKeyAccount)  {
          if(this.props.privateKeyLoading) {
            loading = <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
          }
        }
      }

      let erc20 = <div></div>
      if(address.erc20Tokens) {
        erc20 = (
        <ExpansionPanel style={{boxShadow: 'none', marginLeft: '-24px', marginRight: '-24px'}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>ERC20 Tokens</Typography>
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
                  {address.erc20Tokens.map(n => {
                    return (
                      <TableRow key={n.symbol}>
                        <TableCell component="th" scope="row">
                          {n.symbol}
                        </TableCell>
                        <TableCell numeric>{n.balance+' '+n.symbol}</TableCell>
                        <TableCell numeric><Button size="small" variant="raised" color="primary" onClick={(event) => { this.props.sendERC20(n.symbol, address); }}>Send</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>)
      }

      return (
        <Grid item xs={12} xl={6} align='left' key={address.address}>
          <Card style={{marginRight: '6px', marginBottom: '6px'}}>
            <CardContent style={{position: 'relative'}}>
              <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                <Grid item xs={11} align='left'>
                  {address.editing!==true&& <Typography noWrap variant="headline" component="h2" style={{minHeight: '32px', display: 'inline-block'}}>
                    {address.isPrimary===true&& <Tooltip title='This is your primary Ethereum account'><PrimaryIcon style={{ marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}}/></Tooltip>}
                    {address.isPrimary===false&& <Tooltip title='Make this account my primary Ethereum account'><SetPrimaryIcon onClick={() => { this.props.updatePrimaryClicked(address) }} style={{ cursor: 'pointer', marginTop: '3.5px', marginRight: '5px', verticalAlign: 'top'}} /></Tooltip>}
                    {address.name}
                  </Typography>}
                  {address.editing===true&& <TextField autoFocus={true} style={{display: 'inline-block', marginTop: '0px', marginBottom: '5px'}} fullWidth={true} required
                    color="textSecondary" error={this.props.editAddressNameError} disabled={this.props.loadingAccount||this.props.cardLoading||this.props.privateKeyLoading} id="editAddressName" value={this.props.editAddressName}
                    onChange={(event) => { this.props.handleChange(event, 'editAddressName'); }} margin="normal" onKeyDown={(event) => { this.props.onEditAddressNameKeyDown(event, address) }}
                    helperText={this.props.editAddressNameErrorMessage} />}
                </Grid>
                <Grid item xs={1} align='right'>
                  <IconButton
                    style={{verticalAlign: 'top', marginRight: '-20px'}}
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
                      <ListItem button onClick={() => { this.props.exportEthereumKeyClicked(address.address) }}>
                        <ListItemText primary="View Private Key" />
                      </ListItem>
                      <Divider />
                      <ListItem button onClick={() => { this.props.deleteKeyClicked(address.address) }}>
                        <ListItemText primary="Delete" />
                      </ListItem>
                    </List>
                  </Popover>
                </Grid>
                <Grid item xs={12}>
                  <Typography noWrap variant="title" color="textSecondary" style={{minHeight: '32px'}}>
                    {address.address}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="headline" noWrap>
                    {address.balance+' ETH ($'+address.usdBalance.toFixed(2)+')'}
                  </Typography>
                </Grid>
                <Grid item xs={6} align='right' >
                  <Button size="small" variant="flat" style={{border: '1px solid #ccc'}} disabled={this.props.loadingAccount||this.props.cardLoading||this.props.privateKeyLoading} onClick={() => { this.props.sendEtherClicked(null, address) }} >Send Ether</Button>
                </Grid>
                <Grid item xs={12} align='left'>
                  {erc20}
                </Grid>
              </Grid>
              {loading}
            </CardContent>
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
            <Grid item xs={12} align='center'>
              <Typography variant="headline" color="inherit" style={{marginBottom: '20px'}}>
                Ethereum Accounts
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
            {this.props.tabValue === 1 && this.renderImport()}
            {this.props.createLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Grid>
        </Grid>
        <DeleteAccountConfirmation isOpen={this.props.deleteOpen} handleClose={this.props.handleDeleteClose} confirmDelete={this.props.confirmDelete} deleteLoading={this.props.deleteLoading} />
      </Grid>
    );
  }
}

export default(EthAccounts);
