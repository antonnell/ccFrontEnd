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
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

class EthAccounts extends Component {

  constructor(props) {
    super(props);
  };

  renderCreate() {
    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <Typography variant="headline" color="inherit">
            Create Ethereum Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                disabled={this.props.createLoading}
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
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
            Import Ethereum Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.publicAddressError} disabled={this.props.createLoading}
            id="publicAddress" label="Public Address" value={this.props.publicAddress}
            onChange={(event) => { this.props.handleChange(event, 'publicAddress'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.privateKeyError} disabled={this.props.createLoading}
            id="privateKey" label="Private Key" value={this.props.privateKey}
            onChange={(event) => { this.props.handleChange(event, 'privateKey'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <TextField fullWidth={true} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.createLoading}
            id="addressName" label="Address Name" value={this.props.addressName}
            onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateImportKeyDown} />
        </Grid>
        <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
          <FormControlLabel
            control={
              <Checkbox
                disabled={this.props.createLoading}
                checked={this.props.primary}
                onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
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
      return (<Grid item xs={12} xl={12} align='left' style={{minHeight: '190px', position: 'relative'}}>
        <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
      </Grid>);
    }

    if(this.props.addresses.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1" >Oh no, we couldn't find any addresses for you. Why don't you create/import one?</Typography>
      </Grid>);
    }

    return this.props.addresses.map((address) => {
        return (
          <Grid item xs={12} xl={6} align='left' key={address.address}>
            <Card style={{marginRight: '6px', marginBottom: '6px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Typography noWrap variant="headline" component="h2" style={{minHeight: '32px'}}>
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
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Balance'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {address.balance}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={4} sm={3} md={4} lg={3} align='left'>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>
                          {'Primary?'}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={9} md={8} lg={9} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1">
                          {(address.isPrimary?'Yes':'No')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align='right'>
                    <Button size="small" variant="flat">Update</Button>
                    <Button size="small" variant="flat" color="secondary">Send Ether</Button>
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
                Your Ethereum Addresses
              </Typography>
            </Grid>
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} align='center' style={{position: 'relative', minHeight: '500px'}}>
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
            {this.props.createLoading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
          </Grid>
        </Grid>
        <Tooltip title='Create Ethereum Address'>
          <Button variant="fab" color='secondary' style={{position: 'absolute', bottom:'0px', right: '48px'}} disabled={this.props.createLoading} onClick={this.props.createImportClicked}>
            +
          </Button>
        </Tooltip>
      </Grid>
    );
  }
}

export default withStyles(styles)(EthAccounts);
