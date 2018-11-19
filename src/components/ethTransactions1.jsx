import React, { Component } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card  from '@material-ui/core/Card';
import CircularProgress  from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

let config = require('../config')

function ExpandMoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </SvgIcon>
  );
}

class EthTransactions extends Component {

  renderTransactions() {

    if(this.props.ethTransactions == null) {
      return (
        <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
          <Grid item xs={12} align='left'>
            <Typography variant="headline"  style={{marginBottom: '20px'}}>
              Ethereum Transactions
            </Typography>
          </Grid>
          <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
        </Grid>);
    }

    if(this.props.ethTransactions.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1">We couldn't find any transactions for you.</Typography>
      </Grid>);
    }

    let headerStyle = {
      padding: '3px'
    }
    let bodyStyle = {
      padding: '3px',
      backgroundColor: '#f5f4f4',
      minHeight: '40px'
    }

    return(
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{padding: '24px'}}>
        <Grid item xs={12} align='left'>
          <ExpansionPanel style={{boxShadow: 'none', marginLeft: '-24px', marginRight: '-24px', backgroundColor: '#fafafa'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="headline"  style={{marginBottom: '20px'}}>
                Ethereum Transactions
              </Typography>
              <Typography variant="body2"  style={{marginLeft: '20px', marginBottom: '20px', lineHeight: '40px'}}>
                Filters
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={24} >
                <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
                  {this.renderAddressDropdown()}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
                  {this.renderContactDropdown()}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
                  <TextField
                    fullWidth={true}
                    id="date"
                    label="From Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.props.fromDate}
                    margin="normal"
                    onChange={(event) => { this.props.handleChange(event, 'fromDate'); }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
                  <TextField
                    fullWidth={true}
                    id="date"
                    label="To Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.props.toDate}
                    margin="normal"
                    onChange={(event) => { this.props.handleChange(event, 'toDate'); }}
                  />
                </Grid>

              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs={12} align='center'>
          <Card style={{padding: 12}}>
            <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
              <Grid item xs={2} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  Date
                </Typography>
              </Grid>
              <Grid item xs={2} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  From Account
                </Typography>
              </Grid>
              <Grid item xs={2} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  To Account
                </Typography>
              </Grid>
              <Grid item xs={1} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  Amount
                </Typography>
              </Grid>
              <Grid item xs={1} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={4} align='left' style={headerStyle}>
                <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                  Transaction ID
                </Typography>
              </Grid>
            </Grid>

            {this.props.ethTransactions.map((transaction) => {
              return this.renderTransaction(transaction, bodyStyle)
            })}
          </Card>
        </Grid>
      </Grid>
    );
  };

  renderTransaction(transaction, bodyStyle) {

    let styleA = {fontSize: '22px', fontWeight: 'bold'}
    let styleB = {lineHeight: '33px', fontSize: '18px'}
    let styleC = {minHeight: '80px'}

    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={2} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            {moment(transaction.timestamp).format('YYYY/MM/DD hh:mm')}
          </Typography>
        </Grid>
        <Grid item xs={2} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            {transaction.fromDisplayName}
          </Typography>
        </Grid>
        <Grid item xs={2} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            {transaction.toDisplayName}
          </Typography>
        </Grid>
        <Grid item xs={1} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            {transaction.value} Eth
          </Typography>
        </Grid>
        <Grid item xs={1} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            {transaction.status}
          </Typography>
        </Grid>
        <Grid item xs={4} align='left' style={bodyStyle}>
          <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
            <a href={config.etherscanUrl+transaction.transactionId} target="_blank">{transaction.transactionId}</a>
          </Typography>
        </Grid>
      </Grid>
    )
  };

  renderAddressDropdown() {
    return (
      <FormControl error={this.props.selectedAddressError}
        fullWidth={true}
        style={{paddingBottom: '13px', paddingTop: '12px'}}>
        <InputLabel shrink={true}>Address</InputLabel>
        <Select
          fullWidth={true}
          native={true}
          value={this.props.selectedAddress}
          onChange={this.props.selectAddress}
          disabled={this.props.loading} >
            <option key='' value=''><i>none</i></option>
            {
              this.props.ethAddresses?
              this.props.ethAddresses
              .map((address) => {
                return (<option key={address.publicAddress} value={address.publicAddress}>{address.name}</option>)
              }):''
            }
        </Select>
       {this.props.selectedAddressError==true?<FormHelperText>{this.props.selectedAddressErrorMessage}</FormHelperText>:null}
     </FormControl>

    )
  };

  renderContactDropdown() {
    return (
      <FormControl error={this.props.selectedContactError}
        fullWidth={true}
        style={{paddingBottom: '13px', paddingTop: '12px'}}>
        <InputLabel shrink={true}>Contact</InputLabel>
        <Select
          fullWidth={true}
          native={true}
          value={this.props.selectedContact}
          onChange={this.props.selectContact}
          disabled={this.props.loading} >
            <option key='' value=''><i>none</i></option>
            {
              this.props.contacts?
              this.props.contacts
              .map((contact) => {
                return (<option key={contact.id} value={contact.id}>{contact.displayName}</option>)
              }):''
            }
        </Select>
       {this.props.selectedContactError==true?<FormHelperText>{this.props.selectedContactErrorMessage}</FormHelperText>:null}
      </FormControl>
    )
  };

  render() {
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs ={12}>
          {this.renderTransactions()}
        </Grid>
      </Grid>
    );
  }
}

export default(EthTransactions);
