import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Grid from 'material-ui/Grid';

const styles = {};

function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon>
  );
}

class Footer extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    var linkStyle = {cursor: 'pointer', marginBottom: '6px'}
    var headingStyle = {color: '#FFFFFF', marginBottom: '12px'}

    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px', backgroundColor: '#333333', color: '#FFFFFF', position: 'relative'}}>
        <Grid item xs={12} sm={4} md={4} lg={4} align='center' style={{padding: '40px'}}>
          <img src="footer-logo.png" alt="" width="150px" height="166px" />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8} align='center'>
          <Grid container justify="space-around" alignItems="stretch" direction="row" spacing={0}>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>ACCOUNT</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'welcome'); }}>Login</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'registerAccount'); }}>Register</Typography>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>ABOUT</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'privacyPolicy'); }}>Privacy Policy</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'about'); }}>About Us</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'press'); }}>Press</Typography>
            </Grid>
            <Grid item xs={3} align='left'>
              <Typography variant='subheading' style={headingStyle}>RESOURCES</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'contactUs'); }}>Contact Us</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'bugBounty'); }}>Bug Bounty</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'blog'); }}>Blog</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'faq'); }}>Faq</Typography>
              <Typography color="inherit" variant='body1' style={linkStyle} onClick={(event) => { this.props.navClicked(event, 'fees'); }}>Fees</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography color='secondary' style={{position: 'absolute', bottom: '12px'}}>
          © 2018 Cryptocurve All Rights Reserved
        </Typography>
      </Grid>
    );
  };
}

export default withStyles(styles)(Footer);
