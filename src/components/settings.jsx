import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs  from '@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';

import Manage2FA from '../containers/manage2fa.jsx';
import KYC from '../containers/kyc.jsx';
import UpdatePassword from '../containers/updatePassword.jsx';
import Profile from '../containers/profile.jsx';
import PageTItle from "./pageTitle";



class Settings extends Component {

  renderProfile() {
    return (
      <Profile user={this.props.user} setUser={this.props.setUser} />
    )
  };

  renderKYC() {
    return (
      <KYC user={this.props.user} setUser={this.props.setUser} />
    )
  };

  render2FA() {
    return (
      <Manage2FA user={this.props.user} setUser={this.props.setUser}  />
    )
  };

  renderUpdatePassword() {
    return (
      <UpdatePassword user={this.props.user} />
    )
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={9}
          align="left"
        >
          <PageTItle theme={this.props.theme} root={null} screen={{display: 'Settings', location: 'settings'}} />
        </Grid>
        <Grid item xs={3} align='right' style={{paddingTop: '35px'}}>
          <Tabs
            value={this.props.tabValue}
            onChange={this.props.handleTabChange}
            indicatorColor="primary"
            textColor="primary" >
            <Tab label="Profile" />
            <Tab label="Security" />
          </Tabs>
        </Grid>
        <Grid item xs={12} align='left' style={{margin: '12px'}}>
          {
            this.props.tabValue===0?
            <Grid container>
              <Grid item xs={12} md={6}>{this.renderProfile()}</Grid>
              <Grid item xs={12} md={6}>{this.renderKYC()}</Grid>
            </Grid>
            :null
          }
          {
            this.props.tabValue===1?
            <Grid container>
              <Grid item xs={12} md={6}>{this.render2FA()}</Grid>
              <Grid item xs={12} md={6}>{this.renderUpdatePassword()}</Grid>
            </Grid>
            :null
          }
        </Grid>
      </Grid>
    );
  }
}

export default (Settings);
