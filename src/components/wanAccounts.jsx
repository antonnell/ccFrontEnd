import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import PrivateKeyModal from './privateKeyModal.jsx';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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
import DeleteAccountConfirmation from './deleteAccountConfirmation';
import TermsModalComponent from './termsModalICO';
import ThankYouICOModal from './thankYouICO';
import WanTransactions from '../containers/wanTransactions';
import CreateModal from './createModal';
import ImportModal from './importModal';

const styles = {};

function ExpandMoreIcon(props) {
  return (
    <SvgIcon { ...props }>
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </SvgIcon>
  );
}

function MoreIcon(props) {
  return (
    <SvgIcon { ...props }>
      <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </SvgIcon>
  );
}

function PrimaryIcon(props) {
  return (
    <SvgIcon { ...props }>
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </SvgIcon>
  );
}

function SetPrimaryIcon(props) {
  return (
    <SvgIcon { ...props }>
      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
    </SvgIcon>
  );
}

// function EditIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
//     </SvgIcon>
//   );
// }

// function KeyIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" />
//     </SvgIcon>
//   );
// }

class WanAccounts extends Component {
  // <Grid item xs={12} sm={10} md={9} lg={7} align='left'>
  //   <FormControlLabel
  //     control={
  //       <Checkbox
  //         disabled={this.props.createLoading}
  //         checked={this.props.primary}
  //         onChange={ (event) => { this.props.handleChecked(event, 'primary'); }}
  //         value="primary"
  //       />
  //     }
  //     label="Make this my primary account"
  //   />
  // </Grid>
  //

  renderCreate() {
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={ 0 }
        style={ { padding: '24px' } }
      >
        <Grid item xs={ 12 } align="left">
          <Typography variant="h5" color="inherit">
            Create Wanchain Account
          </Typography>
        </Grid>
        <Grid item xs={ 12 } sm={ 10 } md={ 9 } lg={ 7 } align="left">
          <TextField
            fullWidth={ true }
            required
            color="textSecondary"
            error={ this.props.addressNameError }
            disabled={ this.props.createLoading }
            id="addressName"
            label="Account Name"
            value={ this.props.addressName }
            onChange={ event => {
              this.props.handleChange(event, 'addressName');
            } }
            margin="normal"
            onKeyDown={ this.props.onCreateImportKeyDown }
            onBlur={ event => {
              this.props.validateField(event, 'addressName');
            } }
            helperText={ this.props.addressNameErrorMessage }
          />
        </Grid>
        <Tooltip title="Create Wanchain Account">
          <Button
            variant="fab"
            color="secondary"
            style={ { position: 'absolute', bottom: '0px', right: '48px' } }
            disabled={ this.props.createLoading }
            onClick={ this.props.createImportClicked }
          >
            +
          </Button>
        </Tooltip>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="row"
          spacing={ 0 }
          style={ { minHeight: '30px' } }
        >
          <Grid item xs={ 12 } align="left">
            <Typography style={ { color: '#f44336' } }>
              { this.props.error }
            </Typography>
          </Grid>
        </Grid>
        <PrivateKeyModal
          isOpen={ this.props.keyOpen }
          handleClose={ this.props.handleKeyClose }
          currentAccountKey={ this.props.currentAccountKey }
          copyKey={ this.props.copyKey }
        />
      </Grid>
    );
  }

  static renderImportCommingSoon() {
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={ 0 }
        style={ { padding: '24px', position: 'relative' } }
      >
        <Grid item xs={ 12 } align="left">
          <Typography variant="h5" color="inherit">
            Import Wanchain Account
          </Typography>
        </Grid>
        <Grid item xs={ 12 } sm={ 10 } md={ 9 } lg={ 7 } align="center">
          <Typography variant="h5" style={ { marginTop: '48px' } }>
            Coming Soon...
          </Typography>
        </Grid>
      </Grid>
    );
  }

  // renderImport() {
  //   return (
  //     <Grid
  //       container
  //       justify="flex-start"
  //       alignItems="flex-start"
  //       direction="row"
  //       spacing={0}
  //       style={{ padding: "24px", position: "relative" }}
  //     >
  //       <Grid item xs={12} align="left">
  //         <Typography variant="h5" color="inherit">
  //           Import Wanchain Account
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={12} sm={10} md={9} lg={7} align="left">
  //         <TextField
  //           fullWidth={true}
  //           required
  //           color="textSecondary"
  //           error={this.props.publicAddressError}
  //           disabled={this.props.createLoading}
  //           id="publicAddress"
  //           label="Public Address"
  //           value={this.props.publicAddress}
  //           onChange={event => {
  //             this.props.handleChange(event, "publicAddress");
  //           }}
  //           margin="normal"
  //           onKeyDown={this.props.onCreateImportKeyDown}
  //           onBlur={event => {
  //             this.props.validateField(event, "publicAddress");
  //           }}
  //           helperText={this.props.publicAddressErrorMessage}
  //         />
  //       </Grid>
  //       <Grid item xs={12} sm={10} md={9} lg={7} align="left">
  //         <TextField
  //           fullWidth={true}
  //           required
  //           color="textSecondary"
  //           error={this.props.privateKeyError}
  //           disabled={this.props.createLoading}
  //           id="privateKey"
  //           label="Private Key"
  //           value={this.props.privateKey}
  //           onChange={event => {
  //             this.props.handleChange(event, "privateKey");
  //           }}
  //           margin="normal"
  //           onKeyDown={this.props.onCreateImportKeyDown}
  //           onBlur={event => {
  //             this.props.validateField(event, "privateKey");
  //           }}
  //           helperText={this.props.privateKeyErrorMessage}
  //         />
  //       </Grid>
  //       <Grid item xs={12} sm={10} md={9} lg={7} align="left">
  //         <TextField
  //           fullWidth={true}
  //           required
  //           color="textSecondary"
  //           error={this.props.addressNameError}
  //           disabled={this.props.createLoading}
  //           id="addressName"
  //           label="Account Name"
  //           value={this.props.addressName}
  //           onChange={event => {
  //             this.props.handleChange(event, "addressName");
  //           }}
  //           margin="normal"
  //           onKeyDown={this.props.onCreateImportKeyDown}
  //           onBlur={event => {
  //             this.props.validateField(event, "addressName");
  //           }}
  //           helperText={this.props.addressNameErrorMessage}
  //         />
  //       </Grid>
  //       <Grid item xs={12} sm={10} md={9} lg={7} align="left">
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               disabled={this.props.createLoading}
  //               checked={this.props.primary}
  //               onChange={event => {
  //                 this.props.handleChecked(event, "primary");
  //               }}
  //               value="primary"
  //             />
  //           }
  //           label="Make this my primary account"
  //         />
  //       </Grid>
  //     </Grid>
  //   );
  // }

  renderAddresses() {
    if (this.props.addresses == null) {
      return (
        <Grid
          item
          xs={ 12 }
          xl={ 12 }
          align="left"
          style={ { minHeight: '190px', position: 'relative' } }
        >
          <CircularProgress
            size={ 36 }
            style={ {
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12
            } }
          />
        </Grid>
      );
    }

    if (this.props.addresses.length === 0) {
      return (
        <Grid
          item
          xs={ 12 }
          xl={ 12 }
          align="center"
          style={ { minHeight: '190px', paddingTop: '100px' } }
        >
          <Typography variant="h4">
            Oh no, we couldn't find any accounts for you. Why don't you
            create/import one?
          </Typography>
        </Grid>
      );
    }

    return this.props.addresses.map(address => {
      address.editing = false;
      let open = false;
      let anchorEl = null;
      var loading = <div />;

      if (this.props.optionsAccount != null) {
        if (address.publicAddress === this.props.optionsAccount.publicAddress) {
          open = true;
          anchorEl = this.props.optionsAccount.anchorEl;
        }
      }

      if (this.props.loadingAccount != null) {
        if (address.publicAddress === this.props.loadingAccount.publicAddress) {
          loading = (
            <CircularProgress
              size={ 36 }
              style={ {
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12
              } }
            />
          );
        }
      }

      if (this.props.editAccount != null) {
        if (address.publicAddress === this.props.editAccount.publicAddress) {
          address.editing = true;
          if (this.props.cardLoading) {
            loading = (
              <CircularProgress
                size={ 36 }
                style={ {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12
                } }
              />
            );
          }
        }
      }

      if (this.props.exportKeyAccount != null) {
        if (address.publicAddress === this.props.exportKeyAccount) {
          if (this.props.privateKeyLoading) {
            loading = (
              <CircularProgress
                size={ 36 }
                style={ {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12
                } }
              />
            );
          }
        }
      }

      let wrc20 = (
        <ExpansionPanel
          style={ {
            boxShadow: 'none',
            marginLeft: '-24px',
            marginRight: '-24px'
          } }
        >
          <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
            <Typography>WRC20 Tokens</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>Updating WRC20 tokens</ExpansionPanelDetails>
        </ExpansionPanel>
      );

      if (address.wrc20Tokens) {
        wrc20 = (
          <ExpansionPanel
            style={ {
              boxShadow: 'none',
              marginLeft: '-24px',
              marginRight: '-24px'
            } }
          >
            <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
              <Typography>WRC20 Tokens</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell numeric>Balance</TableCell>
                    <TableCell numeric>Send</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { address.wrc20Tokens.map(n => {
                    return (
                      <TableRow key={ n.symbol }>
                        <TableCell component="th" scope="row">
                          { n.name }
                        </TableCell>
                        <TableCell numeric>
                          { n.balance + ' ' + n.symbol }
                        </TableCell>
                        <TableCell numeric>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            disabled
                            onClick={ () => {
                              this.props.sendWRC20(n.symbol, address);
                            } }
                          >
                            Send
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }) }
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }

      // <ListItem button onPledgeClick={() => { this.props.updatePrimaryClicked(address) }}>
      //   <ListItemText primary="Set Primary" />
      // </ListItem>
      // <Divider />
      // <ListItem button onPledgeClick={() => { this.props.deleteKeyClicked(address.publicAddress) }}>
      //   <ListItemText primary="Delete" />
      // </ListItem>

      return (
        <Grid item xs={ 12 } xl={ 6 } align="left" key={ address.publicAddress }>
          <Card style={ { marginRight: '6px', marginBottom: '6px' } }>
            <CardContent style={ { position: 'relative' } }>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                direction="row"
                spacing={ 0 }
              >
                <Grid item xs={ 11 } align="left">
                  { address.editing !== true && (
                    <Typography
                      noWrap
                      variant="h5"
                      component="h2"
                      style={ { minHeight: '32px', display: 'inline-block' } }
                    >
                      { address.isPrimary === true && (
                        <Tooltip title="This is your primary Wanchain account">
                          <PrimaryIcon
                            style={ {
                              marginTop: '3.5px',
                              marginRight: '5px',
                              verticalAlign: 'top'
                            } }
                          />
                        </Tooltip>
                      ) }
                      { address.isPrimary === false && (
                        <Tooltip title="Wanchain account">
                          <SetPrimaryIcon
                            onClick={ () => {
                              /*this.props.updatePrimaryClicked(address)*/
                            } }
                            style={ {
                              cursor: 'pointer',
                              marginTop: '3.5px',
                              marginRight: '5px',
                              verticalAlign: 'top'
                            } }
                          />
                        </Tooltip>
                      ) }
                      { address.name }
                    </Typography>
                  ) }
                  { address.editing === true && (
                    <TextField
                      autoFocus={ true }
                      style={ {
                        display: 'inline-block',
                        marginTop: '0px',
                        marginBottom: '5px'
                      } }
                      fullWidth={ true }
                      required
                      color="textSecondary"
                      error={ this.props.editAddressNameError }
                      disabled={ this.props.cardLoading }
                      id="editAddressName"
                      value={ this.props.editAddressName }
                      onChange={ event => {
                        this.props.handleChange(event, 'editAddressName');
                      } }
                      margin="normal"
                      onKeyDown={ event => {
                        this.props.onEditAddressNameKeyDown(event, address);
                      } }
                      helperText={ this.props.editAddressNameErrorMessage }
                    />
                  ) }
                </Grid>
                <Grid item xs={ 1 } align="right">
                  <IconButton
                    style={ { verticalAlign: 'top', marginRight: '-20px' } }
                    color="primary"
                    aria-label="More"
                    buttonRef={ node => {
                      this.anchorEl = node;
                    } }
                    onClick={ e => {
                      this.props.optionsClicked(e, address);
                    } }
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                  >
                    <MoreIcon />
                  </IconButton>
                  <Popover
                    open={ open }
                    anchorEl={ anchorEl }
                    anchorPosition={ { top: 200, left: 400 } }
                    onClose={ this.props.optionsClosed }
                    anchorOrigin={ {
                      vertical: 'top',
                      horizontal: 'left'
                    } }
                    transformOrigin={ {
                      vertical: 'top',
                      horizontal: 'left'
                    } }
                  >
                    <List component="nav">
                      <ListItem
                        button
                        onClick={ () => {
                          this.props.editNameClicked(address);
                        } }
                      >
                        <ListItemText primary="Update Name" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={ () => {
                          this.props.exportWanchainKeyClicked(
                            address.publicAddress
                          );
                        } }
                      >
                        <ListItemText primary="View Private Key" />
                      </ListItem>
                    </List>
                  </Popover>
                </Grid>
                <Grid item xs={ 12 }>
                  <Typography
                    noWrap
                    variant="h6"
                    color="textSecondary"
                    style={ { minHeight: '32px' } }
                  >
                    { address.publicAddress }
                  </Typography>
                </Grid>
                <Grid item xs={ 6 } align="left">
                  <Typography variant="h5" noWrap>
                    { address.balance +
                    ' WAN ($' +
                    address.usdBalance.toFixed(2) +
                    ')' }
                  </Typography>
                </Grid>
                <Grid item xs={ 6 } align="right">
                  <Button
                    size="small"
                    variant="text"
                    style={ { border: '1px solid #ccc' } }
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                    onClick={ () => {
                      this.props.sendWanchainClicked(null, address);
                    } }
                  >
                    Send Wan
                  </Button>
                </Grid>
                <Grid item xs={ 12 } align="left">
                  { wrc20 }
                </Grid>
              </Grid>
              { loading }
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  renderICOUnavailable() {
    if (
      this.props.user == null ||
      this.props.user.verificationResult !== 'completed'
    ) {
      return (
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={ 0 }
          style={ { padding: '24px' } }
        >
          <Grid item xs={ 12 } align="left" style={ { marginBottom: '24px' } }>
            <Typography variant="h5" color="inherit">
              Wanchain ICOs
            </Typography>
          </Grid>
          <Grid item xs={ 12 } align="center">
            <Typography variant="h5" style={ { margin: '48px' } }>
              Complete KYC to participate
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={ 0 }
          style={ { padding: '24px' } }
        >
          <Grid item xs={ 12 } align="left" style={ { marginBottom: '24px' } }>
            <Typography variant="h5" color="inherit">
              Wanchain ICOs
            </Typography>
          </Grid>
          <Grid item xs={ 12 } align="center">
            <Typography variant="h5" style={ { margin: '48px' } }>
              Once your wanchain account is whitelisted, you will be able to
              contribute to the ICO
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  renderICOS() {

    if (this.props.crowdsales == null || this.props.crowdsales.length === 0) {
      return (
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={ 0 }
          style={ { padding: '24px' } }
        >
          <Grid item xs={ 12 } align="left" style={ { marginBottom: '24px' } }>
            <Typography variant="h5" color="inherit">
              Wanchain ICOs
            </Typography>
          </Grid>
          <Grid item xs={ 12 } align="center">
            <Typography variant="h5" style={ { margin: '48px' } }>
              There are no available Wanchain ICOs at this moment
            </Typography>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={ 0 }
        style={ { padding: '24px' } }
      >
        <Grid item xs={ 12 } align="left" style={ { marginBottom: '24px' } }>
          <Typography variant="h5" color="inherit">Wanchain ICOs</Typography>
        </Grid>

        { this.props.crowdsales.map((crowdSale, index) => {
          return this.renderICO(crowdSale, index);
        }) }

        <Grid item xs={ 12 } align="right">
          <Typography style={ { color: '#f44336' } }>
            { this.props.ICOError }
          </Typography>
        </Grid>
        <Grid item xs={ 12 } align="right">
          <Typography style={ { color: '#4BB543' } }>
            { this.props.ICOSuccess }
          </Typography>
        </Grid>
        <Grid item xs={ 12 } align="center">
          <Typography
            style={ {
              background: '#dedede',
              width: '100%',
              padding: '12px',
              fontStyle: 'italic',
              marginBottom: '12px',
              marginTop: '12px'
            } }
          >
            Please ensure that you provide enough allocation for gas fees.
          </Typography>
        </Grid>
      </Grid>
    );

  }

  renderICO(crowdSale, index) {
    const styleC = { minHeight: '80px' };
    return (
      <Grid item xs={ 12 } align="center" key={ index }>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={ 0 }
        >
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Name</Typography>
            <Typography variant="body1" color="inherit">{ crowdSale.name }</Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">ICO Dates</Typography>
            <Typography variant="body1" color="inherit">
              { moment(crowdSale.startDate).format('YYYY/MM/DD hh:mm') +
              ' - ' +
              moment(crowdSale.endDate).format('YYYY/MM/DD hh:mm') }
            </Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Personal Cap</Typography>
            <Typography variant="body1" color="inherit">
              { crowdSale.userCap === 0
                ? 'Unlimited'
                : this.props.minContribution +
                ' Wan - ' +
                crowdSale.userCap / 1000000000000000000 +
                ' Wan' }
            </Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Choose Wallet</Typography>
            { this.renderAddressDropdown(crowdSale) }
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Token Amount</Typography>
            <Typography variant="body1" color="inherit">{ this.props.investmentAmount * crowdSale.tokenRatio } Curve</Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Amount to Invest (WAN)</Typography>
            <TextField
              fullWidth={ true }
              color="textSecondary"
              disabled={
                true ||
                this.props.investLoading ||
                this.props.user.whitelistStatus == null ||
                this.props.user.whitelistStatus !== 'completed' ||
                (crowdSale.totalContribution >=
                  crowdSale.userCap / 1000000000000000000 &&
                  crowdSale.userCap !== 0)
              }
              error={ this.props.investmentAmountError }
              id="investmentAmount"
              placeholder="Amount"
              value={ this.props.investmentAmount }
              helperText={ this.props.investmentAmountErrorMessage }
              onChange={ event => {
                this.props.handleChange(event, 'investmentAmount');
              } }
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Contributed Amount</Typography>
            <Typography variant="body1" color="inherit">{ crowdSale.totalContribution } Wan</Typography>
          </Grid>
          <Grid item xs={ 12 } sm={ 6 } align="left" style={ styleC }>
            <Typography variant="h5" color="inherit">Invest</Typography>
            <Button
              size="small"
              variant={ 'contained' }
              disabled={
                true ||
                this.props.investLoading ||
                this.props.user.whitelistStatus == null ||
                this.props.user.whitelistStatus !== 'completed' ||
                (crowdSale.totalContribution >=
                  crowdSale.userCap / 1000000000000000000 &&
                  crowdSale.userCap !== 0)
              }
              color="primary"
              onClick={ () => {
                this.props.investClicked(crowdSale.contractAddress);
              } }
            >
              Invest
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );

  }

  renderAddressDropdown(crowdsale) {
    if (this.props.addresses == null || this.props.addresses.length === 0) {
      return <MenuItem value={ 'none' }>None</MenuItem>;
    }

    return (
      <FormControl
        error={ this.props.selectedAddressError }
        fullWidth={ true }
        style={ { paddingBottom: '13px', paddingTop: '12px' } }
      >
        <Select
          fullWidth={ true }
          native={ true }
          value={ this.props.selectedAddress }
          onChange={ this.props.selectAddress }
          disabled={
            true ||
            this.props.investLoading ||
            this.props.user.whitelistStatus == null ||
            this.props.user.whitelistStatus !== 'completed' ||
            (crowdsale.totalContribution >=
              crowdsale.userCap / 1000000000000000000 &&
              crowdsale.userCap !== 0)
          }
        >
          <option key="" value="">
            select
          </option>
          { this.props.addresses
            .filter(address => {
              return address.isPrimary === true;
            })
            .map(address => {
              return (
                <option
                  key={ address.publicAddress }
                  value={ address.publicAddress }
                >
                  { address.name }
                </option>
              );
            }) }
        </Select>
        { this.props.selectedAddressError === true ? (
          <FormHelperText>
            { this.props.selectedAddressErrorMessage }
          </FormHelperText>
        ) : null }
      </FormControl>
    );
  }

  render() {
    return (
      <Grid container justify="center" direction="row">
        <Grid
          item
          xs={ 12 }
          align="left"
          style={ {
            margin: '12px',
            padding: '24px 0px',
            borderBottom:
              '2px solid ' + this.props.theme.custom.headingBorder.color,
            display: 'flex'
          } }
        >
          <div style={ { flex: 1 } }>
            <Typography variant="h6">Wanchain Accounts</Typography>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={ this.props.handleCreateOpen }
            >
              Create Account
            </Button>
            <Button
              style={ { marginLeft: '12px' } }
              size="small"
              variant="contained"
              color="secondary"
              onClick={ this.props.handleImportOpen }
            >
              Import Account
            </Button>
          </div>
        </Grid>
        <Grid item xs={ 12 } align="center">
          <Grid
            container
            direction="row"
            spacing={ 0 }
            style={ { padding: '24px' } }
          >
            { this.renderAddresses() }
          </Grid>
        </Grid>
        <Grid
          item
          xs={ 12 }
          align="center"
          style={ { position: 'relative', minHeight: '200px' } }
        >
          { this.props.user && this.props.user.verificationResult === 'completed'
            ? this.renderICOS()
            : this.renderICOUnavailable() }
        </Grid>
        <Grid item xs={ 12 }>
          <WanTransactions
            wanAddresses={ this.props.addresses }
            wanTransactions={ this.props.wanTransactions }
            contacts={ this.props.contacts }
          />
        </Grid>
        <ThankYouICOModal
          isOpen={ this.props.thanksOpen }
          handleClose={ this.props.handleThanksClose }
          investTransacstionID={ this.props.investTransacstionID }
        />
        <DeleteAccountConfirmation
          isOpen={ this.props.deleteOpen }
          handleClose={ this.props.handleDeleteClose }
          confirmDelete={ this.props.confirmDelete }
          deleteLoading={ this.props.deleteLoading }
        />
        <TermsModalComponent
          isOpen={ this.props.termsOpen }
          handleClose={ this.props.handleTermsClose }
          handleTermsAccepted={ this.props.handleTermsAccepted }
        />
        <CreateModal
          isOpen={this.props.createOpen}
          handleClose={this.props.handleCreateClose}
          handleDone={this.props.createImportClicked}
          createLoading={this.props.createLoading}
          addressName={this.props.addressName}
          addressNameError={this.props.addressNameError}
          addressNameErrorMessage={this.props.addressNameErrorMessage}
          primary={this.props.primary}
          handleChange={this.props.handleChange}
          handleChecked={this.props.handleChecked}
          validateField={this.props.validateField}
          handleCreate={this.props.createImportClicked}
          error={this.props.error}
        />
        <ImportModal
          isOpen={this.props.importOpen}
          handleClose={this.props.handleImportClose}
          handleDone={this.props.createImportClicked}
          createLoading={this.props.createLoading}
          addressName={this.props.addressName}
          addressNameError={this.props.addressNameError}
          addressNameErrorMessage={this.props.addressNameErrorMessage}
          publicAddress={this.props.publicAddress}
          publicAddressError={this.props.publicAddressError}
          publicAddressErrorMessage={this.props.publicAddressErrorMessage}
          privateKey={this.props.privateKey}
          privateKeyError={this.props.privateKeyError}
          privateKeyErrorMessage={this.props.privateKeyErrorMessage}
          primary={this.props.primary}
          handleChange={this.props.handleChange}
          handleChecked={this.props.handleChecked}
          validateField={this.props.validateField}
          handleImport={this.props.createImportClicked}
          error={this.props.error}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(WanAccounts);
