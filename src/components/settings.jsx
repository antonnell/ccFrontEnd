import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs  from '@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';

import Manage2FA from '../containers/manage2fa.jsx';
import KYC from '../containers/kyc.jsx';
import UpdatePassword from '../containers/updatePassword.jsx';
import Profile from '../containers/profile.jsx';
import ThemePicker from '../containers/themePicker.jsx';
import SvgIcon from '@material-ui/core/SvgIcon';

import IconButton from '@material-ui/core/IconButton';

function ThemeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#b5b5b5' d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
    </SvgIcon>
  );
}


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

  renderTheme() {
    return (
      <ThemePicker />
    )
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid item xs={12} align='left' style={{margin: '12px', padding: '24px 0px', borderBottom: '2px solid '+this.props.theme.custom.headingBorder.color, display: 'flex' }}>
          <div style={{marginRight: '12px', marginTop: '8px'}}>
            <Typography variant="h1">
              Settings
            </Typography>
          </div>
          <div style={{flex: 1}}>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary" >
              <Tab label="Profile" />
              <Tab label="Security" />
            </Tabs>
          </div>
          <div>
            <IconButton
              color="primary"
              onClick={(e) => { this.props.changeTheme() }}>
              <ThemeIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} align='left' style={{margin: '12px'}}>
          {
            this.props.tabValue===0?
            <Grid container>
              <Grid item xs={12} sm={6}>{this.renderProfile()}</Grid>
              <Grid item xs={12} sm={6}>{this.renderKYC()}</Grid>
            </Grid>
            :null
          }
          {
            this.props.tabValue===1?
            <Grid container>
              <Grid item xs={12} sm={6}>{this.render2FA()}</Grid>
              <Grid item xs={12} sm={6}>{this.renderUpdatePassword()}</Grid>
            </Grid>
            :null
          }
          {
            this.props.tabValue===2?
            <Grid container>
              <Grid item xs={12} sm={6}>{this.renderTheme()}</Grid>
            </Grid>
            :null
          }
        </Grid>
      </Grid>
    );
  }
}

export default (Settings);
