import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import {version} from "../version";
import ScrollArea  from 'react-scrollbar';

class AppDrawer extends Component {
  componentDidMount() {
    if (this.props.user == null) {
      window.location.hash = 'welcome';
    }
  }

  render() {
    let { user, size, open,  closeDrawer, theme } = this.props

    if (user == null) {
      return null;
    }

    return size === 'xs' || size === 'sm' ? (
      <Drawer
        open={ open }
        onClose={ closeDrawer }
      >
        <ScrollArea horizontal={false} style={{ height: '100%' }} >
          { this.renderGridList() }
        </ScrollArea>
      </Drawer>
    ) : (
      <div style={ theme.custom.drawerContainer }>
        { this.renderGridList() }
      </div>
    );
  }

  renderTop() {
    let { theme, user } = this.props
    if (theme.name === 'dark') {
      return (<Card style={ { padding: '24px', marginBottom: '8px' } }>
        <Grid container justify="center" alignItems="center" style={ { paddingTop: 24 } } direction="column">
          <Typography variant="h1" style={ { paddingBottom: 16 } }>CryptoCurve</Typography>
          <div style={ { width: '50px', height: '50px', borderRadius: '25px', background: '#dedede', position: 'relative', backgroundImage: 'url("' + user.profilePhoto + '")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' } }>
          </div>
          <Typography variant="h1" style={ { paddingTop: 16 } }>{ user.username }</Typography>
        </Grid>
      </Card>)
    } else {
      return (
        <div style={ { padding: '24px', marginBottom: '8px' } }>
          <Grid container justify="center" alignItems="center" style={ { paddingTop: 24 } } direction="column">
            <Typography variant="h1" style={ { paddingBottom: 16 } }>CryptoCurve</Typography>
            <div style={ { width: '50px', height: '50px', borderRadius: '25px', background: '#dedede', position: 'relative', backgroundImage: 'url("' + user.profilePhoto + '")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' } }>
            </div>
            <Typography variant="h1" style={ { paddingTop: 16 } }>{ user.username }</Typography>
          </Grid>
        </div>
      )
    }
  }

  renderBottom() {
    if (this.props.theme.name === 'dark') {
      return <Card>{ this.renderList() }</Card>;
    } else {
      return this.renderList();
    }
  }

  renderList() {
    let { currentScreen, navClicked, theme, logUserOut } = this.props
    const path = currentScreen.split('/')[0];

    return (
      <List style={ { height: "calc(100% - 173px)" } }>
        <ListSubheader disableSticky={ true }>MENU</ListSubheader>
        <ListItem
          selected={ ['accounts', 'aionAccounts', 'binanceAccounts', 'bitcoinAccounts', 'ethAccounts', 'tezosAccounts', 'wanAccounts'].includes(path) }
          button
          onClick={ event => {
            navClicked(event, 'accounts');
          } }
        >
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem
          selected={ ['browsePools', 'poolDetails', 'createPool', 'updatePool', 'pooling'].includes(path) }
          button
          onClick={ event => {
            navClicked(event, 'browsePools');
          } }
        >
          <ListItemText primary="Pooling" />
        </ListItem>
        <ListItem
          selected={ ['staking'].includes(path) }
          button
          onClick={ event => {
            navClicked(event, 'staking');
          } }
        >
          <ListItemText primary="Staking" />
        </ListItem>
        <ListItem
          selected={ ['tokenSwap'].includes(path) }
          button
          onClick={ event => {
            navClicked(event, 'tokenSwap');
          } }
        >
          <ListItemText primary="Token Swap" />
        </ListItem>

        <Divider />
        <ListSubheader disableSticky={ true }>PROFILE</ListSubheader>
        <ListItem
          selected={ path === 'contacts' }
          button
          onClick={ event => {
            navClicked(event, 'contacts');
          } }
        >
          <ListItemText primary="Contacts" />
        </ListItem>
        <ListItem
          selected={ path === 'settings' }
          button
          onClick={ event => {
            navClicked(event, 'settings');
          } }
        >
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={ event => {
            logUserOut();
          } }
          style={theme.custom.logout}
        >
          <ListItemText primary="Log Out" style={theme.custom.logoutText} />
        </ListItem>
        <Typography
          variant="body1"
          align="justify"
          style={{
            marginTop: '24px',
            color: "#fff",
            fontSize: '14px'
          }}
        >
          V{version}-beta
        </Typography>
      </List>
    );
  }

  renderGridList() {
    return (
      <div style={ this.props.theme.custom.drawer }>
        { this.renderTop() }
        { this.renderBottom() }
      </div>
    );
  }
}

export default AppDrawer;
