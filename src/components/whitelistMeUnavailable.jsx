import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = {};

class WhitelistMeUnabailable extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '150px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <Typography variant='headline'>Whitelisting is not available in your area</Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(WhitelistMeUnabailable);
