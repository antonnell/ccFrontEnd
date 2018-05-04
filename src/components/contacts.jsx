import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';
import Tooltip from 'material-ui/Tooltip';
import Card, { CardContent } from 'material-ui/Card';

const styles = {};

class Account extends Component {

  constructor(props) {
    super(props);
  };

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.usernameError} disabled={this.props.loading}
            id="username" label="Contact Username" value={this.props.username}
            onChange={(event) => { this.props.handleChange(event, 'username'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.displayNameError} disabled={this.props.loading}
            id="displayName" label="Display Name" value={this.props.displayName}
            onChange={(event) => { this.props.handleChange(event, 'displayName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.notesError} disabled={this.props.loading}
            id="notes" label="Notes" value={this.props.notes}
            onChange={(event) => { this.props.handleChange(event, 'notes'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
        </Grid>
      </Grid>
    );
  }

  renderContacts() {
    if(this.props.contacts == null) {
      return (null);
    }

    return this.props.contacts.map((contact) => {
        return (
          <Grid item xs={12} xl={6} align='left'>
            <Card style={{marginTop: '12px', marginRight: '12px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Typography noWrap variant="headline" component="h2">
                      {contact.displayName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='left' style={{paddingTop: '3px'}}>
                    <Typography noWrap color="textSecondary">
                      {contact.userName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} align='left'>
                        <Typography variant="body2">
                          {'Notes'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {contact.notes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} align='left'>
                        <Typography variant="body2">
                          {'Primary Address'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {contact.primaryAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='right'>
                    <Button size="small" variant="flat" onClick={this.props.updateClicked}>Remove</Button>
                    <Button size="small" variant="flat" color="secondary" onClick={this.props.updateClicked}>Update Note</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={8} align='center'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="headline" color="inherit">
                Your Saved contacts
              </Typography>
            </Grid>
            {this.renderContacts()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center'>
          <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary" >
              <Tab label="Create contact" />
            </Tabs>
            {this.renderCreate()}
          </Grid>
        </Grid>
        <Tooltip title='Create Contact'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.loading} onClick={this.props.createClicked}>
            +
          </Button>
        </Tooltip>
      </Grid>
    );
  }
}

export default withStyles(styles)(Account);
