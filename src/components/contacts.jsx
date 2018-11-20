import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CircularProgress  from '@material-ui/core/CircularProgress';
import AddModal from './createContactModal';

class Contacts extends Component {
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
            <Card style={{margin: '12px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Tooltip placement='top-start' title={contact.userName}>
                      <Typography noWrap variant="display2" style={{minHeight: '32px'}}>
                        {contact.displayName}
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} align='left' style={{marginTop: '2px'}}>
                    <Typography variant="body1">
                      {contact.notes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="subheading">
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
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="subheading">
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
                        <Typography variant="subheading">
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
                  <Grid item xs={12} align='right' style={{marginTop: '12px'}}>
                    <Button disabled={contact.primaryEthAddress=='No primary eth address set'} size="small" variant="text" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendEtherClicked(contact) }}>Send Ether</Button>
                    <Button disabled={contact.primaryWanAddress=='No primary wan address set'} size="small" variant="text" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendWanClicked(contact) }}>Send Wan</Button>
                    <Button disabled={contact.primaryAionAddress=='No primary aion address set'} size="small" variant="text" style={{border: '1px solid #ccc', marginLeft: '12px'}} color="primary" onClick={() => { this.props.sendAionClicked(contact) }}>Send Aion</Button>
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
        <Grid item xs={12} align='left' style={{margin: '12px', padding: '24px 0px', borderBottom: '2px solid #6be6fd', display: 'flex' }}>
          <div style={{flex: 1}}>
            <Typography variant='display1'>
              Your contacts
            </Typography>
          </div>
          <div>
            <Button size="small" variant='contained' color="primary" onClick={this.props.handleAddOpen}>Add Contact</Button>
          </div>
        </Grid>
        <Grid item xs={12} align='center'>
          <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '24px'}}>
            {this.renderContacts()}
          </Grid>
        </Grid>
        <AddModal
          isOpen={this.props.addOpen}
          handleClose={this.props.handleAddClose}
          addClicked={this.props.addClicked}
          addLoading={this.props.addLoading}
          username={this.props.username}
          usernameError={this.props.usernameError}
          usernameErrorMessage={this.props.usernameErrorMessage}
          displayName={this.props.displayName}
          displayNameError={this.props.displayNameError}
          displayNameErrorMessage={this.props.displayNameErrorMessage}
          notes={this.props.notes}
          notesError={this.props.notesError}
          notesErrorMessage={this.props.notesErrorMessage}
          handleChange={this.props.handleChange}
          validateField={this.props.validateField}
          error={this.props.error}
        />
      </Grid>
    );
  }
}

export default (Contacts);
