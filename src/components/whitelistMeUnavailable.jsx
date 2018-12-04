import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class WhitelistMeUnabailable extends Component {

  render() {
    if(this.props.ipLoading === true) {
      return(<Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '150px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
        </Grid>
      </Grid>)
    }
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '150px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <Typography variant="h5">{this.props.rejectionReason}</Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(WhitelistMeUnabailable);
