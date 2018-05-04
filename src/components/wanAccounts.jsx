import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Tabs, { Tab } from 'material-ui/Tabs';
import Tooltip from 'material-ui/Tooltip';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';

const styles = {};

class WanAccounts extends Component {

  constructor(props) {
    super(props);
  };

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Wanchain Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.loading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChange(event, 'primary'); }}
                value="primary"
              />
            }
            label="Make this my primary address"
          />
        </Grid>
      </Grid>
    );
  }

  renderImport() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Import Wanchain Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressError} disabled={this.props.loading}
            id="address" label="Address" value={this.props.address}
            onChange={(event) => { this.props.handleChange(event, 'address'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.loading}
            id="privateKey" label="Private Key" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.loading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChange(event, 'primary'); }}
                value="primary"
              />
            }
            label="Make this my primary address"
          />
        </Grid>
      </Grid>
    );
  };

  renderAddresses() {
    if(this.props.addresses == null) {
      return (null);
    }

    return this.props.addresses.map((address) => {
        return (
          <Grid item xs={12} xl={6} align='left'>
            <Card style={{marginTop: '12px', marginRight: '12px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Typography noWrap variant="headline" component="h2">
                      {address.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='left' style={{paddingTop: '3px'}}>
                    <Typography noWrap color="textSecondary">
                      {address.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} align='left'>
                        <Typography variant="body2">
                          {'Balance'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {address.balance}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} align='left'>
                        <Typography variant="body2">
                          {'Primary?'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {(address.isPrimary?'Yes':'No')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='right'>
                    <Button size="small" variant="flat">Update</Button>
                    <Button size="small" variant="flat" color="secondary">Send Wan</Button>
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
                Your Wanchain Addresses
              </Typography>
            </Grid>
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center'>
          <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0} style={{padding: '24px'}}>
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary" >
              <Tab label="Create Address" />
              <Tab label="Import Address" />
            </Tabs>
            {this.props.tabValue === 0 && this.renderCreate()}
            {this.props.tabValue === 1 && this.renderImport()}
          </Grid>
        </Grid>
        <Tooltip title='Create Ethereum Address'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.loading} onClick={this.props.createImportClicked}>
            +
          </Button>
        </Tooltip>
      </Grid>
    );
  }
}

export default withStyles(styles)(WanAccounts);
