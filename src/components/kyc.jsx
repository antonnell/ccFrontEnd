import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

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
