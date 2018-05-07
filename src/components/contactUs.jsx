import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = {};

class ContactUs extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '50px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <Typography variant='headline'>Contact Us</Typography>
          <br />
          <Typography variant='Subheading' style={{fontWeight: 'bold'}}>CryptopCurve</Typography>
          <br />
          <Typography variant='Subheading'>1600 Amphitheatre Parkway</Typography>
          <Typography variant='Subheading'>Mountain View, California 1111</Typography>
          <Typography variant='Subheading'>United States</Typography>
          <br />
          <Typography variant='Subheading'>support@cryptopcurve.io</Typography>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ContactUs);
