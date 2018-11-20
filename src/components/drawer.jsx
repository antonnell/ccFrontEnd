import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = {};

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
      <path fill="#fff" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
    </SvgIcon>
  );
}
function Manage2FAIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#fff" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
    </SvgIcon>
  );
}
function PoolIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#fff" d="M2,18C4.22,17 6.44,16 8.67,16C10.89,16 13.11,18 15.33,18C17.56,18 19.78,16 22,16V19C19.78,19 17.56,21 15.33,21C13.11,21 10.89,19 8.67,19C6.44,19 4.22,20 2,21V18M2,12C4.22,11 6.44,10 8.67,10C10.89,10 13.11,12 15.33,12C17.56,12 19.78,10 22,10V13C19.78,13 17.56,15 15.33,15C13.11,15 10.89,13 8.67,13C6.44,13 4.22,14 2,15V12M2,6C4.22,5 6.44,4 8.67,4C10.89,4 13.11,6 15.33,6C17.56,6 19.78,4 22,4V7C19.78,7 17.56,9 15.33,9C13.11,9 10.89,7 8.67,7C6.44,7 4.22,8 2,9V6Z" />
    </SvgIcon>
  );
}
function PasswordIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#fff" d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z" />
    </SvgIcon>
  );
}
function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#fff" d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />
    </SvgIcon>
  );
}
function KYCIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#fff" d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z" />
    </SvgIcon>
  )
}

class AppDrawer extends Component {

  componentDidMount() {
    if(this.props.user == null) {
      window.location.hash = 'welcome'
    }
  };

  /*
  <ListItem style={this.props.currentScreen=='accounts'?{background: '#DDDDDD'}:{}} button onClick={(event) => { this.props.navClicked(event, 'accounts'); }}>
    <ListItemIcon>
      <WanchainIcon />
    </ListItemIcon>
    <ListItemText primary="Accounts" />
  </ListItem>
  <ListItem style={this.props.currentScreen=='manageEthPools'?{background: '#DDDDDD'}:{}} button onClick={(event) => { this.props.navClicked(event, 'manageEthPools'); }}>
    <ListItemIcon>
      <PoolIcon />
    </ListItemIcon>
    <ListItemText primary="Ethereum Pools" />
  </ListItem>

  {this.props.canWhitelist===true && <ListItem style={this.props.currentScreen=='whitelist'?{background: '#DDDDDD'}:{}} button onClick={(event) => { this.props.navClicked(event, 'whitelist'); }}>
    <ListItemIcon>
      <WhitelistIcon />
    </ListItemIcon>
    <ListItemText primary="Join Whitelist" />
  </ListItem>}
  {this.props.canWhitelist && <Divider />}


  <ListItem style={this.props.currentScreen=='sendWRC20'?{background: '#DDDDDD'}:{}} button onClick={(event) => { this.props.navClicked(event, 'sendWRC20'); }}>
    <ListItemIcon>
      <WanIconPng />
    </ListItemIcon>
    <ListItemText primary="Send WRC20" />
  </ListItem>

  */

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
        <div style={{minWidth: '300px', marginRight: '24px'}}>
          {this.renderGridList()}
        </div>

    );
  };

  renderGridList() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card style={{height: '210px', padding: '24px', position: 'relative', marginBottom: '8px'}} >
            <img src='./footer-logo.png' alt='' style={{position: 'absolute', left: '0px', bottom: '0px', top: '0px', right: '0px', opacity: '0.1', margin: 'auto', maxWidth: '100%', maxHeight: '100%'}} />
            <Typography variant="body2" style={{position: 'absolute', bottom: '22px', color: '#FFFFFF', fontSize: '30px'}}>
              {this.props.user.username}
            </Typography>
            <Typography variant="body2" style={{position: 'absolute', bottom: '12px', color: '#FFFFFF'}}>
              {this.props.user.email}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <List>
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
              <ListSubheader>Profile</ListSubheader>
              <ListItem selected={this.props.currentScreen=='contacts'} button onClick={(event) => { this.props.navClicked(event, 'contacts'); }}>
                <ListItemIcon>
                  <ContactIcon />
                </ListItemIcon>
                <ListItemText primary="Contacts" />
              </ListItem>
              <ListItem selected={this.props.currentScreen=='kyc'} button onClick={(event) => { this.props.navClicked(event, 'kyc'); }}>
                <ListItemIcon>
                  <KYCIcon />
                </ListItemIcon>
                <ListItemText primary="KYC" />
              </ListItem>
              <ListItem selected={this.props.currentScreen=='updatePassword'} button onClick={(event) => { this.props.navClicked(event, 'updatePassword'); }}>
                <ListItemIcon>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="Update Password" />
              </ListItem>
              <ListItem selected={this.props.currentScreen=='manage2FA'} button onClick={(event) => { this.props.navClicked(event, 'manage2FA'); }}>
                <ListItemIcon>
                  <Manage2FAIcon />
                </ListItemIcon>
                <ListItemText primary="Manage 2FA" />
              </ListItem>
              <Divider />
              <ListItem button onClick={(event) => { this.props.navClicked(event, 'logOut'); }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    )

  }
}

export default withStyles(styles)(AppDrawer);
