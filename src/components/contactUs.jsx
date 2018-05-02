import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = {};

class ContactUs extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{marginTop: '100px'}}>
        <Grid item xs={10} sm={10} md={10} lg={10} align='center'>
          <div class='blueText'><strong>Contacting Us</strong></div>
          <br />
          <div class='innerText'>cryptopcurve.io</div>
          <div class='innerText'>1600 Amphitheatre Parkway</div>
          Mountain View, California 1111
          <div class='innerText'>United States</div>
          <div class='innerText'>support@cryptopcurve.io</div>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(ContactUs);
