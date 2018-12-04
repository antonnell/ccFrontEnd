import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {};

class ComingSoon extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '150px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <Typography variant="h5">Coming Soon...</Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ComingSoon);
