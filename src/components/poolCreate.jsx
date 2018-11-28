import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Pools from '../containers/pools';
import CustomWhitelists from '../containers/customWhitelists';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel  from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#b5b5b5' d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </SvgIcon>
  );
};

class PoolCreate extends Component {

  renderSettings() {
    return (
      <Grid item xs={12} md={5} align='left' style={{margin: '12px'}}>
        <Grid container justify="space-between" alignItems="flex-start" direction="row" >
          <Grid item xs={12}>
            <Typography variant='display3'>
              Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField required autoFocus fullWidth color="textSecondary" error={this.props.poolNameError} disabled={this.props.loading}
              id="poolName" label="Pool Name" value={this.props.poolName}
              onChange={(event) => { this.props.handleChange(event, 'poolName'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.poolNameErrorMessage}
              InputLabelProps={{ shrink: true }} placeholder='Example Pool' />
          </Grid>
          <Grid item xs={5}>
            <FormControl error={this.props.poolSecurityError} fullWidth margin="normal" required >
              <InputLabel shrink={true}>Pool Security</InputLabel>
              <Select
                fullWidth
                placeholder='Public'
                value={this.props.poolSecurity}
                onChange={this.props.selectSecurity}
                disabled={this.props.loading} >
                  {
                    this.props.poolSecurities
                    .map((security) => {
                      return (<MenuItem key={security} value={security}>{security}</MenuItem>)
                    })
                  }
              </Select>
             {this.props.poolSecurityError==true?<FormHelperText>{this.props.poolSecurityErrorMessage}</FormHelperText>:null}
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField required fullWidth color="textSecondary" error={this.props.tokenNameError} disabled={this.props.loading}
              id="tokenName" label="Token Name" value={this.props.tokenName}
              onChange={(event) => { this.props.handleChange(event, 'tokenName'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.tokenNameErrorMessage}
              InputLabelProps={{ shrink: true }} placeholder='Bloom' />
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth color="textSecondary" error={this.props.tokenAddressError} disabled={this.props.loading}
              id="tokenAddress" label="Token Address" value={this.props.tokenAddress}
              onChange={(event) => { this.props.handleChange(event, 'tokenAddress'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.tokenAddressErrorMessage}
              InputLabelProps={{ shrink: true }} placeholder='0x000000000000000000000000000000000000' />
          </Grid>
        </Grid>
      </Grid>
    )
  };

  renderOptions() {
    return (
      <Grid item xs={12} md={5} align='left' style={{margin: '12px'}}>
        <Grid container justify="space-between" alignItems="flex-start" direction="row" >
          <Grid item xs={12}>
            <Typography variant='display3'>
              Options
            </Typography>
          </Grid>
          <Grid item xs={12}><FormControlLabel
            control={
              <Checkbox
                disabled={this.props.loading}
                checked={this.props.pledgesEnabled}
                onChange={ (event) => { this.props.handleChecked(event, 'pledgesEnabled'); }}
                value='primary'
                color='primary'
              />
            }
            label="Pledges"
          />
          </Grid>
          {this.props.pledgesEnabled?
            <Grid item xs={12}>
              <TextField required fullWidth color="textSecondary" error={this.props.pledgeEndDateError} disabled={this.props.loading}
                id="pledgeEndDate" label="Pledge End Date" value={this.props.pledgeEndDate} type={'date'}
                onChange={(event) => { this.props.handleChange(event, 'pledgeEndDate'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.pledgeEndDateErrorMessage}
                InputLabelProps={{ shrink: true }} />
            </Grid>:null
          }
        </Grid>
      </Grid>
    )
  };

  renderAllocations() {
    return (<Grid item xs={12} md={5} align='left' style={{margin: '12px', marginTop: '48px'}}>
      <Grid container justify="space-between" alignItems="flex-start" direction="row" >
        <Grid item xs={12}>
          <Typography variant='display3'>
            Allocations
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField required autoFocus fullWidth color="textSecondary" error={this.props.contractCapError} disabled={this.props.loading}
            id="contractCap" label="Contract Cap" value={this.props.contractCap}
            onChange={(event) => { this.props.handleChange(event, 'contractCap'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.contractCapErrorMessage}
            InputLabelProps={{ shrink: true }} placeholder='1000 WAN' />
        </Grid>
        <Grid item xs={5}>
          <TextField required fullWidth color="textSecondary" error={this.props.yourFeeError} disabled={this.props.loading}
            id="yourFee" label="Your Fee" value={this.props.yourFee}
            onChange={(event) => { this.props.handleChange(event, 'yourFee'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.yourFeeErrorMessage}
            InputLabelProps={{ shrink: true }} placeholder='5%' />
        </Grid>
        <Grid item xs={5}>
          <TextField required fullWidth color="textSecondary" error={this.props.minCapError} disabled={this.props.loading}
            id="minCap" label="Min-Cap" value={this.props.minCap}
            onChange={(event) => { this.props.handleChange(event, 'minCap'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.minCapErrorMessage}
            InputLabelProps={{ shrink: true }} placeholder='10 WAN' />
        </Grid>
        <Grid item xs={5}>
          <TextField required fullWidth color="textSecondary" error={this.props.maxCapError} disabled={this.props.loading}
            id="maxCap" label="Max-Cap" value={this.props.maxCap}
            onChange={(event) => { this.props.handleChange(event, 'maxCap'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.maxCapErrorMessage}
            InputLabelProps={{ shrink: true }} placeholder='25 WAN' />
        </Grid>
      </Grid>
    </Grid>)
  };

  renderAddUsers() {
    return (
      <Grid item xs={12} md={5} align='left' style={{margin: '12px', marginTop: '48px'}}>
        <Grid container justify="space-between" alignItems="flex-start" direction="row" >
          <Grid item xs={12}>
            <Typography variant='display3'>
              Add Users
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField required autoFocus fullWidth color="textSecondary" error={this.props.searchUserError} disabled={this.props.loading}
              id="searchUser" label="Search User" value={this.props.searchUser}
              onChange={(event) => { this.props.handleChange(event, 'searchUser'); }} margin="normal" onKeyDown={this.props.onLoginKeyDown} helperText={this.props.searchUserErrorMessage}
              InputLabelProps={{ shrink: true }} placeholder='Clark54' />
          </Grid>
        </Grid>
      </Grid>
    )
  };

  renderCustomList() {
    return (
      <Grid item xs={12} md={5} align='left' style={{margin: '12px', marginTop: '48px'}}>
        <Grid container justify="space-between" alignItems="flex-start" direction="row" >
          <Grid item xs={12}>
            <Typography variant='display3'>
              Custom List
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <FormControl error={this.props.chooseListError} fullWidth margin="normal" required >
              <InputLabel shrink={true}>Choose List</InputLabel>
              <Select
                fullWidth
                placeholder='Telegram Chat'
                value={this.props.chooseList}
                onChange={this.props.selectAddress}
                disabled={this.props.loading} >
                  {
                    // this.props.addresses
                    // .filter((address) => {
                    //   return address.isPrimary == true
                    // })
                    // .map((address) => {
                    //   return (<MenuItem key={address.publicAddress} value={address.publicAddress}>{address.name}</MenuItem>)
                    // })
                  }
              </Select>
             {this.props.chooseListError==true?<FormHelperText>{this.props.chooseListErrorMessage}</FormHelperText>:null}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  renderAddedUsers() {
    return (
      <Grid item xs={12} align='left' style={{margin: '12px', marginTop: '48px'}}>
        <Grid container justify="space-between" alignItems="flex-start" direction="row" >
          <Grid item xs={12}>
            <Typography variant='display3'>
              Added Users
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card style={{marginTop: '12px', padding: '12px', minHeight: '200px', width:  '100%'}}>
              {this.renderChips()}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  renderChips() {
    if(!this.props.addedUsers) {
      return null
    }

    return this.props.addedUsers.map((user) => {
      return (
        <Chip label={user} color="primary" onDelete={() => {}} style={{margin: '12px'}} />
      )
    })
  };

  render() {
    return (
      <Grid container justify="space-between" alignItems="flex-start" direction="row">
        <Grid item xs={12} align='left' style={{margin: '12px', padding: '24px 0px', borderBottom: '2px solid '+this.props.theme.custom.headingBorder.color, display: 'flex' }}>
          <div style={{flex: 1}}>
            <Typography variant='display1'>
              Create Pool
            </Typography>
          </div>
          <div>
            <Button size="small" variant='contained' color="primary" onClick={this.props.handleHome}>Pool Home</Button>
            <IconButton
              style={{verticalAlign: 'top', marginRight: '-20px', marginTop: '-7px'}}
              color="primary"
              aria-label="More"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              onClick={(e) => { this.props.optionsClicked(e) }}>
              <MoreIcon  />
            </IconButton>
            <Popover
              open={this.props.open}
              anchorEl={this.anchorEl}
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
                <ListItem button onClick={() => { this.props.browsePoolsClicked() }}>
                  <ListItemText primary="Browse Pools" />
                </ListItem>
                <ListItem button onClick={() => { this.props.myInvitesClicked() }}>
                  <ListItemText primary="My Invites" />
                </ListItem>
              </List>
            </Popover>
          </div>
        </Grid>
        {this.renderSettings()}
        {this.renderOptions()}
        {this.renderAllocations()}
        <Grid item md={5}></Grid>
        {this.renderAddUsers()}
        {this.renderCustomList()}
        {this.renderAddedUsers()}
        <Grid item xs={12} align={'right'} style={{margin: '12px'}}>
          <Button variant="contained" size='large' color='primary' onClick={this.props.submitLaunchPool} disabled={this.props.loading}>
            LAUNCH POOL
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default (PoolCreate);
