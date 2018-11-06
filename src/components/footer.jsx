import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {};

class Footer extends Component {

  render() {
    var login = 'Login'
    if(this.props.user != null) {
      login = 'Logout'
    }
    var linkStyle = {cursor: 'pointer', marginBottom: '6px'}
    var headingStyle = {color: '#FFFFFF', marginBottom: '12px'}
    //onClick={(event) => { this.props.navClicked(event, 'registerAccount'); }}
    var aStyle = { textDecoration: 'none', color: 'white' }

    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '12px', backgroundColor: '#000000', color: '#FFFFFF', position: 'relative'}}>
        <Grid item xs={12} sm={4} md={4} lg={4} align='center' style={{padding: '40px'}}>
          <img src="footer-logo.png" alt="" width="150px" height="166px" />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} align='center'>
          <Grid container justify="space-around" alignItems="stretch" direction="row" spacing={0}>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>ACCOUNT</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'welcome'); }}>{login}</Typography>
              <Typography color="inherit" variant='body1' style={{marginBottom: '6px', textDecoration: 'line-through'}} >Register</Typography>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>ABOUT</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'privacyPolicy'); }}>Privacy Policy</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'cookiePolicy'); }}>Cookie Policy</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'termsAndConditions'); }}>Presale Ts&Cs</Typography>
              <a style={aStyle} href={'https://cryptocurve.io/about#'} target="_blank"><Typography color="inherit" variant='body1' style={linkStyle} >About Us</Typography></a>
              <a style={aStyle} href={'https://www.google.co.za/search?tbm=nws&q=cryptocurve&oq=cryptocurve'} target="_blank"><Typography color="inherit" variant='body1' style={linkStyle} >Press</Typography></a>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>RESOURCES</Typography>
              <a style={aStyle} href={'https://cryptocurve.io/contact'} target="_blank"><Typography color="inherit" variant='body1' style={linkStyle} >Contact Us</Typography></a>
              <a style={aStyle} href={'https://cryptocurve.io/blog'} target="_blank"><Typography color="inherit" variant='body1' style={linkStyle} >Blog</Typography></a>
              <a style={aStyle} href={'https://cryptocurve.io/#faq'} target="_blank"><Typography color="inherit" variant='body1' style={linkStyle} >FAQ</Typography></a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography style={{color:'#FFFFFF'}}>
            © 2018 CryptoCurve All Rights Reserved
          </Typography>
        </Grid>
        <div style={{position: 'absolute', bottom: '0px', right: '3px'}}>
          <Typography style={{color:'#FFFFFF'}}>
            Version: 1.1.13
          </Typography>
        </div>
      </Grid>
    );
  };
}

export default withStyles(styles)(Footer);
