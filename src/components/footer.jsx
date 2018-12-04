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
    var linkStyle = {cursor: 'pointer', marginBottom: '6px', color: '#fff'}
    var headingStyle = {color: '#FFFFFF', marginBottom: '12px'}
    //onClick={(event) => { this.props.navClicked(event, 'registerAccount'); }}
    var aStyle = { textDecoration: 'none', color: 'white' }
    var line = { width: '30px', height: '5px', borderRadius: '3px', background: '#95e2f1', marginBottom: '12px', marginTop: '12px'}


    return (
      <Grid container justify="space-around" alignItems="flex-start" direction="row" spacing={0} style={{backgroundColor: this.props.theme.custom.footer.background, color: '#FFFFFF', position: 'relative', minHeight: '299px', paddingTop: '100px'}}>
        <Grid item xs={12} sm={4} md={4} lg={4} align='center'>
          <img src="footer-logo.png" alt="" width="150px" height="166px" />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} align='center' style={{marginBottom: '100px'}}>
          <Grid container justify="space-around" alignItems="stretch" direction="row" spacing={0}>
            <Grid item xs={3} align='left'>
              <Typography variant="subtitle1" style={headingStyle}>ACCOUNT</Typography>
              <div style={line}></div>
              <Typography  variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'welcome'); }}>{login}</Typography>
              <Typography  variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'registerAccount'); }}>Register</Typography>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant="subtitle1" style={headingStyle}>ABOUT</Typography>
              <div style={line}></div>
              <Typography  variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'privacyPolicy'); }}>Privacy Policy</Typography>
              <Typography  variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'cookiePolicy'); }}>Cookie Policy</Typography>
              <Typography  variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'termsAndConditions'); }}>Presale Ts&Cs</Typography>
              <a style={aStyle} href={'https://cryptocurve.io/about#'} target="_blank"><Typography  variant='body1' style={linkStyle} >About Us</Typography></a>
              <a style={aStyle} href={'https://www.google.co.za/search?tbm=nws&q=cryptocurve&oq=cryptocurve'} target="_blank"><Typography  variant='body1' style={linkStyle} >Press</Typography></a>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant="subtitle1" style={headingStyle}>RESOURCES</Typography>
              <div style={line}></div>
              <a style={aStyle} href={'https://cryptocurve.io/contact'} target="_blank"><Typography  variant='body1' style={linkStyle} >Contact Us</Typography></a>
              <a style={aStyle} href={'https://cryptocurve.io/blog'} target="_blank"><Typography  variant='body1' style={linkStyle} >Blog</Typography></a>
              <a style={aStyle} href={'https://cryptocurve.io/#faq'} target="_blank"><Typography  variant='body1' style={linkStyle} >FAQ</Typography></a>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align='right' style={{background: '#95e2f1', padding: '12px'}}>
          <Typography variant="body1" align='justify' style={{fontWeight:  'bold', display: 'inline-block', color: '#000', marginRight: '12px'}} >
            © 2018 CryptoCurve
          </Typography>
          <Typography variant="body1" align='justify' style={{fontWeight:  'bold', display: 'inline-block', color: '#000'}} >
            V1.1.14-beta
          </Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(Footer);
