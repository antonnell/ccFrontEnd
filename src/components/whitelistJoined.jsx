import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class WhitelistJoined extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            And you're done!
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Thank you for joining the CryptoCurve whitelist. We will keep in contact with you via the email address you signed up with.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '12px' }}>
          <Typography variant="body2">
            All you need to do is send Ethereum to the address below:
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{ marginTop: '24px' }}>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="title" noWrap>
              0xa4db56b5a9d3e2c53bf518d7bc76a778666a1c3e
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="raised" color="primary" onClick={this.props.done}>Go to my account</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(WhitelistJoined);
