import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

const styles = {};

function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#fff' d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon>
  );
}

class ApplicationBar extends Component {

  render() {
    //<img src='account-logo.png' width='158px' height='24pox' alt='CRPTOCURVE.IO'/>
    if(this.props.size == 'xs' || this.props.size == 'sm') {
      return (<div>
        {this.props.menuClicked != null ? (<IconButton aria-label="Menu" onClick={this.props.menuClicked}>
          <MenuIcon />
        </IconButton>) : null}
        <img style={{verticalAlign: 'middle'}} src="./cryptocurve-logo-white2.png" alt="CryptoCurve.io" heigth="43px" width="164px" />
      </div>
          )
    }
    return (
      <div></div>
    );
  };
}

export default withStyles(styles)(ApplicationBar);
