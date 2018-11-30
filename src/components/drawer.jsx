import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import SvgIcon from '@material-ui/core/SvgIcon';
import List  from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';

function EthIconPng(props) {
  return (
    <div style={{marginLeft: '4px', overflow: 'hidden'}}>
      <img src='/ethereum-logo.png' width='16px' height='24px' />
    </div>
  )
}
function WanIconPng(props) {
  return (
    <div style={{overflow: 'hidden'}}>
      <img src='/wanchain-logo.png' width='24px' height='24px' />
    </div>
  )
}
function AionIconPng(props) {
  return (
    <div style={{overflow: 'hidden'}}>
      <img src='/aion-logo.png' width='24px' height='24px' />
    </div>
  )
}


function ContactIcon(props) {
  return (
    <SvgIcon {...props} >
      <path fill={props.color} d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
    </SvgIcon>
  );
}
function SettingsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill={props.color} d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    </SvgIcon>
  );
}
function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill={props.color} d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />
    </SvgIcon>
  );
}
function PoolingIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill={props.color} d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
    </SvgIcon>
  )
}
function IcoIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill={props.color} d="M9.29,21H12.12L21,12.12V9.29M19,21C19.55,21 20.05,20.78 20.41,20.41C20.78,20.05 21,19.55 21,19V17L17,21M5,3A2,2 0 0,0 3,5V7L7,3M11.88,3L3,11.88V14.71L14.71,3M19.5,3.08L3.08,19.5C3.17,19.85 3.35,20.16 3.59,20.41C3.84,20.65 4.15,20.83 4.5,20.92L20.93,4.5C20.74,3.8 20.2,3.26 19.5,3.08Z" />
    </SvgIcon>
  )
}

class AppDrawer extends Component {

  componentDidMount() {
    if(this.props.user == null) {
      window.location.hash = 'welcome'
    }
  };

  render() {
    if(this.props.user == null) {
      return null;
    }

    return (

      this.props.size=='xs'||this.props.size=='sm'?
        <Drawer open={this.props.open} onClose={this.props.closeDrawer} style={{minWidth: '300px'}}>
          {this.renderGridList()}
        </Drawer>
        :
        <div style={{minWidth: '300px', marginRight: '24px', display: 'flex'}}>
          {this.renderGridList()}
        </div>

    );
  };

  renderTop() {
    if(this.props.theme.name == 'dark') {
      return (<Card style={{height: '210px', padding: '24px', position: 'relative', marginBottom: '8px'}} >
        <img src='./footer-logo.png' alt='' style={{position: 'absolute', left: '0px', bottom: '0px', top: '0px', right: '0px', opacity: '0.1', margin: 'auto', maxWidth: '100%', maxHeight: '100%'}} />
        <Typography variant="subheading" style={{position: 'absolute', bottom: '22px', fontSize: '30px'}}>
          {this.props.user.username}
        </Typography>
        <Typography variant="subheading" style={{position: 'absolute', bottom: '12px'}}>
          {this.props.user.email}
        </Typography>
      </Card>)
    } else {
      return (
        <div style={{height: '210px', padding: '24px', position: 'relative', marginBottom: '8px'}} >
          <img src='./footer-logo.png' alt='' style={{position: 'absolute', left: '0px', bottom: '0px', top: '0px', right: '0px', opacity: '0.1', margin: 'auto', maxWidth: '100%', maxHeight: '100%'}} />
          <Typography variant="subheading" style={{position: 'absolute', bottom: '22px', fontSize: '30px'}}>
            {this.props.user.username}
          </Typography>
          <Typography variant="subheading" style={{position: 'absolute', bottom: '12px'}}>
            {this.props.user.email}
          </Typography>
        </div>
      )
    }
  }

  renderBottom() {
    if(this.props.theme.name == 'dark') {
      return (<Card>
        {this.renderList()}
      </Card>)
    } else {
      return this.renderList()
    }
  }

  renderList() {
    return (<List>
      <ListSubheader>Accounts</ListSubheader>
      <ListItem selected={this.props.currentScreen=='aionAccounts'} button onClick={(event) => { this.props.navClicked(event, 'aionAccounts'); }}>
        <ListItemIcon>
          <AionIconPng />
        </ListItemIcon>
        <ListItemText primary="Aion Accounts" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='ethAccounts'} button onClick={(event) => { this.props.navClicked(event, 'ethAccounts'); }}>
        <ListItemIcon>
          <EthIconPng />
        </ListItemIcon>
        <ListItemText primary="Ethereum Accounts" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='wanAccounts'} button onClick={(event) => { this.props.navClicked(event, 'wanAccounts'); }}>
        <ListItemIcon>
          <WanIconPng />
        </ListItemIcon>
        <ListItemText primary="Wanchain Accounts" />
      </ListItem>
      <ListSubheader>Transact</ListSubheader>
      <ListItem selected={this.props.currentScreen=='sendAion'} button onClick={(event) => { this.props.navClicked(event, 'sendAion'); }}>
        <ListItemIcon>
          <AionIconPng />
        </ListItemIcon>
        <ListItemText primary="Send Aion" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='sendEthereum'} button onClick={(event) => { this.props.navClicked(event, 'sendEthereum'); }}>
        <ListItemIcon>
          <EthIconPng />
        </ListItemIcon>
        <ListItemText primary="Send Ethereum" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='sendERC20'} button onClick={(event) => { this.props.navClicked(event, 'sendERC20'); }}>
        <ListItemIcon>
          <EthIconPng />
        </ListItemIcon>
        <ListItemText primary="Send ERC20" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='sendWanchain'} button onClick={(event) => { this.props.navClicked(event, 'sendWanchain'); }}>
        <ListItemIcon>
          <WanIconPng />
        </ListItemIcon>
        <ListItemText primary="Send Wanchain" />
      </ListItem>
      <ListSubheader>Invest</ListSubheader>
      <ListItem selected={this.props.currentScreen=='ico'} button onClick={(event) => { this.props.navClicked(event, 'ico'); }}>
        <ListItemIcon>
          <IcoIcon color={this.props.theme.custom.drawerIcon.color} />
        </ListItemIcon>
        <ListItemText primary="ICO Contributions" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='pooling'} button onClick={(event) => { this.props.navClicked(event, 'pooling'); }}>
        <ListItemIcon>
          <PoolingIcon color={this.props.theme.custom.drawerIcon.color} />
        </ListItemIcon>
        <ListItemText primary="Pooling" />
      </ListItem>
      <ListSubheader>Profile</ListSubheader>
      <ListItem selected={this.props.currentScreen=='contacts'} button onClick={(event) => { this.props.navClicked(event, 'contacts'); }}>
        <ListItemIcon>
          <ContactIcon color={this.props.theme.custom.drawerIcon.color} />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
      </ListItem>
      <ListItem selected={this.props.currentScreen=='settings'} button onClick={(event) => { this.props.navClicked(event, 'settings'); }}>
        <ListItemIcon>
          <SettingsIcon color={this.props.theme.custom.drawerIcon.color} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <Divider />
      <ListItem button onClick={(event) => { this.props.navClicked(event, 'logOut'); }}>
        <ListItemIcon>
          <LogoutIcon color={this.props.theme.custom.drawerIcon.color} />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </List>)
  }

  renderGridList() {
    return (
      <div style={this.props.theme.custom.drawer}>
        {this.renderTop()}
        {this.renderBottom()}
      </div>
    )

  }
}

export default (AppDrawer);
