import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = {};

class HaveWanAddress extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
            <Grid item xs={12} align='center'>
              <Typography variant="display1">
                Do you have a Wanchain Address?
              </Typography>
            </Grid>
            <Grid item xs={6} align='left' style={{marginTop: '24px '}}>
              <Button size="small" variant="flat" onClick={this.props.navigateImportWanAddress}>I have one</Button>
            </Grid>
            <Grid item xs={6} align='right' style={{marginTop: '24px '}}>
              <Button size="small" variant="flat" color="secondary" onClick={this.props.navigateCreateWanAddress}>I would like to make one</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    );
  }
}

export default withStyles(styles)(HaveWanAddress);
