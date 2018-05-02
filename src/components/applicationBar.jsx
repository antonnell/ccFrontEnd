import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

const styles = {};

function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon>
  );
}

class ApplicationBar extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    //<img src='account-logo.png' width='158px' height='24pox' alt='CRPTOCURVE.IO'/>
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          {this.props.menuClicked != null ? (<IconButton color="inherit" aria-label="Menu" onClick={this.props.menuClicked}>
            <MenuIcon />
          </IconButton>) : null}
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            CRYPTOCURVE.IO
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(ApplicationBar);
