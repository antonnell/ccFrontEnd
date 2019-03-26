import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import PrivateKeyModal from './privateKeyModal.jsx';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteAccountConfirmation from './deleteAccountConfirmation';
import WanTransactions from '../containers/wanTransactions';
import PageTItle from './pageTitle';
import PageLoader from "./pageLoader";
import SectionLoader from "./sectionLoader";
import ViewTokensModal from "./viewTokensModal";
import ReceiveModal from "./receiveModal";

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.theme?props.theme.custom.icon.color:'#888888'}
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    </SvgIcon>
  );
}

class WanAccounts extends Component {

  renderAddresses() {

    let { addresses, theme, optionsAccount, loadingAccount, editAccount, cardLoading, exportKeyAccount, privateKeyLoading } = this.props

    if (addresses == null) {
      return (
        <Grid
          item
          xs={ 12 }
          xl={ 12 }
          align="left"
          style={ { minHeight: '190px', position: 'relative' } }
        >
          <PageLoader />
        </Grid>
      );
    }

    if (addresses.length === 0) {
      return (
        <Grid
          item
          xs={ 12 }
          xl={ 12 }
          align="center"
          style={ { minHeight: '190px', paddingTop: '100px' } }
        >
          <Typography variant="h2">
            Oh no, we couldn't find any accounts for you. Why don't you
            create/import one?
          </Typography>
        </Grid>
      );
    }

    return addresses.map(address => {
      address.editing = false;
      let open = false;
      let anchorEl = null;
      var loading = <div />;

      if (optionsAccount != null) {
        if (address.publicAddress === optionsAccount.publicAddress) {
          open = true;
          anchorEl = optionsAccount.anchorEl;
        }
      }

      if (loadingAccount != null) {
        if (address.publicAddress === loadingAccount.publicAddress) {
          loading = (
            <SectionLoader />
          );
        }
      }

      if (editAccount != null) {
        if (address.publicAddress === editAccount.publicAddress) {
          address.editing = true;
          if (cardLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      if (exportKeyAccount != null) {
        if (address.publicAddress === exportKeyAccount) {
          if (privateKeyLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      return (
        <Grid item xs={12} lg={6} xl={4} key={address.publicAddress} style={{ padding: '24px' }}>
          <Card>
            <CardContent style={ { position: 'relative' } }>
              <Grid
                container
                alignItems="flex-start"
                direction="row"
                style= { { marginBottom: '6px' }}
              >
                <Grid item xs={ 11 } align="left">
                  {address.editing !== true && (
                    <Typography
                      noWrap
                      variant="h3"
                    >
                      {address.name}
                    </Typography>
                  )}
                  {address.editing !== true && address.isPrimary === true && (
                    <Typography variant='body1' style={theme.custom.primaryText}>Primary</Typography>
                  )}
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
                      disabled={
                        this.props.loadingAccount ||
                        this.props.cardLoading ||
                        this.props.privateKeyLoading
                      }
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
                  <Typography
                    noWrap
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    { address.publicAddress }
                  </Typography>
                </Grid>
                <Grid item xs={ 1 } align="right">
                  <IconButton
                    style={ {
                      verticalAlign: "top",
                      marginRight: "-20px",
                      marginTop: "-11px"
                    } }
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
                    <MoreIcon theme={theme}/>
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
                      <ListItem
                        button
                        onClick={( ) => {
                          this.props.updatePrimaryClicked(address)
                        } }
                      >
                        <ListItemText primary="Set Primary" />
                      </ListItem>
                      <ListItem
                        button
                        disabled={ !(address.wrc20Tokens && address.wrc20Tokens.length > 0) }
                        onClick={( ) => {
                          this.props.viewTokens(address)
                        } }
                      >
                        <ListItemText primary="View Tokens" />
                      </ListItem>
                      <Divider />
                      <ListItem
                        button
                        onClick={ () => {
                          this.props.deleteKeyClicked(address.publicAddress)
                        } }
                      >
                        <ListItemText primary="Delete" />
                      </ListItem>
                    </List>
                  </Popover>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                direction="row"
              >
                <Grid item xs={6}  align="left" style={{ marginTop: "6px" }}>
                  <Typography variant="h4" noWrap>
                    {address.balance + " Wan"}
                  </Typography>
                  <Typography variant="h4" noWrap>
                    {"$" + address.usdBalance.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right" style={{ height: "42px" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                    onClick={ () => {
                      this.props.sendWanchainClicked(null, address);
                    } }
                  >
                    Transact
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: '12px' }}
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                    onClick={() => {
                      this.props.viewPublicKey(address);
                    }}
                  >
                    Receive
                  </Button>
                </Grid>
              </Grid>
              { loading }
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  render() {

    let { addresses, theme, handleCreateOpen, handleImportOpen } = this.props

    if (addresses === null) {
      return (
        <Grid container justify="center" alignItems="flex-start" direction="row">
          <Grid
            item
            xs={12}
            align="left"
          >
            <PageTItle theme={theme} root={'Dashboard > Accounts'} screen={'Wanchain'} />
          </Grid>
          <Grid
            item
            xs={12}
            xl={12}
            align="left"
            style={{ minHeight: "190px", position: "relative" }}
          >
            <PageLoader />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTItle theme={theme} root={'Dashboard > Accounts'} screen={'Wanchain'} />
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={theme.custom.sectionTitle}
          >
            <Grid item xs={6} align='left'>
              <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Accounts</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleCreateOpen}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: "12px" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleImportOpen}
              >
                Import
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            style={theme.custom.accountsContainer}
          >
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={ 12 }>
          <WanTransactions
            theme={this.props.theme}
            wanAddresses={ this.props.addresses }
            wanTransactions={ this.props.wanTransactions }
            contacts={ this.props.contacts }
            size={this.props.size}
          />
        </Grid>
        <PrivateKeyModal
          isOpen={ this.props.keyOpen }
          handleClose={ this.props.handleKeyClose }
          currentAccountKey={ this.props.currentAccountKey }
          copyKey={ this.props.copyKey }
        />
        <DeleteAccountConfirmation
          isOpen={ this.props.deleteOpen }
          handleClose={ this.props.handleDeleteClose }
          confirmDelete={ this.props.confirmDelete }
          deleteLoading={ this.props.deleteLoading }
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
        <ViewTokensModal
          isOpen={this.props.viewOpen}
          handleClose={this.props.viewTokensClose}
          tokens={this.props.tokens}
          theme={this.props.theme}
          send={this.props.sendWRC20}
        />
        <ReceiveModal
          publicKey={this.props.publicKey}
          viewPublicKeyOpen={this.props.viewPublicKeyOpen}
          viewPublicKeyClosed={this.props.viewPublicKeyClosed}
          copyKey={this.props.copyKey}
          qrLoading={this.props.qrLoading}
          accountName={this.props.accountName}
        />
      </Grid>
    );
  }
}

export default WanAccounts;
