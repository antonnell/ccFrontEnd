import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';
import Tooltip from 'material-ui/Tooltip';
import Card, { CardContent } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';

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
          <TextField fullWidth={true} required color="textSecondary" error={this.props.usernameError} disabled={this.props.createLoading}
            id="username" label="Contact Username" value={this.props.username}
            onChange={(event) => { this.props.handleChange(event, 'username'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.displayNameError} disabled={this.props.createLoading}
            id="displayName" label="Display Name" value={this.props.displayName}
            onChange={(event) => { this.props.handleChange(event, 'displayName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.notesError} disabled={this.props.createLoading}
            id="notes" label="Notes" value={this.props.notes}
            onChange={(event) => { this.props.handleChange(event, 'notes'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown} />
        </Grid>
      </Grid>
    );
  }

  renderContacts() {

    if((this.props.contacts == null || this.props.contacts.length == 0) && this.props.dataLoading == true) {
      return (<Grid item xs={12} xl={12} align='left' style={{minHeight: '190px', position: 'relative'}}>
        {this.props.dataLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
      </Grid>);
    }

    if(this.props.contacts == null || this.props.contacts.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1" >Oh no, we couldn't find any contacts for you. Why don't you create one?</Typography>
      </Grid>);
    }

    return this.props.contacts.map((contact) => {
        return (
          <Grid item xs={12} xl={6} align='left' key={contact.address}>
            <Card style={{marginRight: '6px', marginBottom: '6px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Typography noWrap variant="headline" component="h2" style={{minHeight: '32px'}}>
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
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Notes'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {contact.notes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Primary Address'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
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
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
            <Grid item xs={12} align='left'>
              <Typography variant="headline" color="inherit" style={{marginBottom: '20px'}}>
                Your Saved contacts
              </Typography>
            </Grid>
            {this.renderContacts()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center'>
          {this.renderCreate()}
        </Grid>
        <Tooltip title='Create Contact'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.createLoading} onClick={this.props.createClicked}>
            +
          </Button>
        </Tooltip>
      </Grid>
    );
  }
}

export default withStyles(styles)(Account);
