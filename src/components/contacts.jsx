import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CircularProgress  from '@material-ui/core/CircularProgress';

const styles = {};

class Contacts extends Component {

  /*

  <TextField fullWidth={true} required color="textSecondary" error={this.props.emailAddressError} disabled={this.props.addLoading}
  id="emailAddress" label="Contact Email Address" value={this.props.emailAddress}
  onChange={(event) => { this.props.handleChange(event, 'emailAddress'); }} margin="normal" onKeyDown={this.props.onAddKeyDown}
  onBlur={(event) => { this.props.validateField(event, 'emailAddress'); }} helperText={this.props.emailAddressErrorMessage} />

  */

  renderAdd() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Add Contact
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.usernameError} disabled={this.props.addLoading}
            id="username" label="Contact Username" value={this.props.username}
            onChange={(event) => { this.props.handleChange(event, 'username'); }} margin="normal" onKeyDown={this.props.onAddKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'username'); }} helperText={this.props.usernameErrorMessage} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.displayNameError} disabled={this.props.addLoading}
            id="displayName" label="Display Name" value={this.props.displayName}
            onChange={(event) => { this.props.handleChange(event, 'displayName'); }} margin="normal" onKeyDown={this.props.onAddKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'displayName'); }} helperText={this.props.displayNameErrorMessage} />
          <TextField fullWidth={true} required color="textSecondary" error={this.props.notesError} disabled={this.props.addLoading}
            id="notes" label="Notes" value={this.props.notes}
            onChange={(event) => { this.props.handleChange(event, 'notes'); }} margin="normal" onKeyDown={this.props.onAddKeyDown}
            onBlur={(event) => { this.props.validateField(event, 'notes'); }} helperText={this.props.notesErrorMessage} />
        </Grid>
        <Tooltip title='Add Contact'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.addLoading} onClick={this.props.addClicked}>
            +
          </Button>
        </Tooltip>
        <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} style={{minHeight: '30px'}}>
          <Grid item xs={12} align='left'>
            <Typography style={{color: '#f44336'}} >
              {this.props.error}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderContacts() {
    if(this.props.contacts == null) {
      return (<Grid item xs={12} xl={12} align='left' style={{minHeight: '190px', position: 'relative'}}>
        <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
      </Grid>);
    }

    if(this.props.contacts.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1" >Oh no, we couldn't find any contacts for you. Why don't you add one?</Typography>
      </Grid>);
    }

    return this.props.contacts.map((contact) => {
        return (
          <Grid item xs={12} xl={6} align='left' key={contact.userName}>
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
                          {'Note'}
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
                          {'Wanchain Address'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1" noWrap>
                          {contact.primaryWanAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Ethereum Address'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1" noWrap>
                          {contact.primaryEthAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Aion Address'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1" noWrap>
                          {contact.primaryAionAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='right' style={{marginTop: '12px'}}>
                    <Button disabled={contact.primaryEthAddress=='No primary eth address set'} size="small" variant="flat" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendEtherClicked(contact) }}>Send Ether</Button>
                    <Button disabled={contact.primaryWanAddress=='No primary wan address set'} size="small" variant="flat" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendWanClicked(contact) }}>Send Wan</Button>
                    <Button disabled={contact.primaryAionAddress=='No primary aion address set'} size="small" variant="flat" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendAionClicked(contact) }}>Send Aion</Button>
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
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center' style={{position: 'relative', minHeight: '500px'}}>
          {this.renderAdd()}
          {this.props.addLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Contacts);
