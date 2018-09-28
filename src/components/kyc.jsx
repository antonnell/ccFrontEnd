import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {};

class KYC extends Component {

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} align='center'>

        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYC);
