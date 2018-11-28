import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {};

class KYC extends Component {
  render() {

    let onClick = this.props.KYC
    let text = 'Start KYC'

    return (
      <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
        <Grid item xs={12} sm={10} md={10} lg={10} align='left'>
          <Typography variant="display2">
            KYC
          </Typography>
          <Typography variant="body2" align='justify' style={{marginTop: '24px', fontWeight:  'bold'}}>
            Status
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '6px'}}>
            Unconfirmed
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10} align='left'>
          <Button size="small" variant="text" color="primary" onClick={onClick} style={{marginTop: '24px'}}>{text}</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYC);
