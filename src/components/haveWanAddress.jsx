import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class HaveWanAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            Next, we need to know your Wanchain address.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <div style={{border: '1px solid #000', padding: '12px'}}>
            <Typography variant="title" noWrap>
              This will be the address that receives your Curve tokens.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
             Do you already have a Wanchain Address, or would you like us to create one for you?
          </Typography>
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateExistingWanAddress} style={{marginRight: '12px'}}>I have one</Button>
          <Button size="small" variant="raised" color="primary" onClick={this.props.navigateCreateWanAddress}>Create Wanchain Address</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HaveWanAddress);
