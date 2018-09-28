import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {};

class ContactUs extends Component {

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <Typography variant='headline'>Contact Us</Typography>
          <br />
          <Typography variant='Subheading' style={{fontWeight: 'bold'}}>CryptoCurve</Typography>
          <br />
          <Typography variant='Subheading'>Email us at support@cryptocurve.io</Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ContactUs);
