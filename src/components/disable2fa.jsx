import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress  from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';

function PositiveIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#19e564' d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
    </SvgIcon>
  );
}
function NegativeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#e9194d' d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </SvgIcon>
  );
}

class Disable2FA extends Component {

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" style={{marginTop: '24px'}}>
        <Grid item xs={12} sm={10} align='left'>
          <Typography variant="h3">
            2FA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} style={{marginTop: '24px'}}>
          <Typography variant="body1" align='justify' style={{marginTop: '24px', fontWeight:  'bold'}}>
            Status
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '6px'}}>
            Activated {<PositiveIcon style={{verticalAlign: 'bottom', marginLeft: '12px'}} />}
          </Typography>
          <Typography variant="h3" style={{fontSize: '16px', cursor: 'pointer', textDecoration: 'underline', marginTop: '6px', width: '100px'}} onClick={this.props.submitDisable}>
            Deactivate
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} align='center'>
          <Typography style={{color: '#f44336'}} >
            {this.props.error}
          </Typography>
        </Grid>
        {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
      </Grid>
    );
  }
}

export default(Disable2FA);
