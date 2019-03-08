import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PrivateKeyModal from "./privateKeyModal.jsx";
import DeleteAccountConfirmation from "./deleteAccountConfirmation";
import EthTransactions from "../containers/ethTransactions";
import CreateModal from "./createModal";
import ImportModal from "./importModal";
import PageTItle from "./pageTitle";
import TableSortLabel from '@material-ui/core/TableSortLabel'
import PageLoader from "./pageLoader";
import SectionLoader from "./sectionLoader";
import ViewTokensModal from "./viewTokensModal";

function ExpandMoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.theme?props.theme.custom.icon.color:'#888888'}
        d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
      />
    </SvgIcon>
  );
}

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

class EthAccounts extends Component {
  renderAddresses() {

    let { addresses, theme, optionsAccount, loadingAccount, editAccount, cardLoading, exportKeyAccount, privateKeyLoading, sendERC20, size } = this.props

    if (addresses == null) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="left"
          style={{ minHeight: "190px", position: "relative" }}
        >
          <PageLoader />
        </Grid>
      );
    }

    if (addresses.length === 0) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="center"
          style={{ minHeight: "190px", paddingTop: "100px" }}
        >
          <Typography variant="h2">
            Oh no, we couldn't find any accounts for you. Why don't you
            create/import one?
          </Typography>
        </Grid>
      );
    }

    let index = -1

    return addresses.map(address => {
      address.editing = false;
      let open = false;
      let anchorEl = null;
      let loading = <div />;

      if (optionsAccount != null) {
        if (address.address === optionsAccount.address) {
          open = true;
          anchorEl = optionsAccount.anchorEl;
        }
      }

      if (loadingAccount != null) {
        if (address.address === loadingAccount.address) {
          loading = (
            <SectionLoader />
          );
        }
      }

      if (editAccount != null) {
        if (address.address === editAccount.address) {
          address.editing = true;
          if (cardLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      if (exportKeyAccount != null) {
        if (address.address === exportKeyAccount) {
          if (privateKeyLoading) {
            loading = (
              <SectionLoader />
            );
          }
        }
      }

      index ++

      return (
        <Grid item xs={12} lg={6} xl={4} key={address.address} style={{ padding: '24px' }}>
          <Card>
            <CardContent style={{ position: "relative" }}>
              <Grid
                container
                alignItems="flex-start"
                direction="row"
                style= { { marginBottom: '6px' }}
              >
                <Grid item xs={11} align="left">
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
                  {address.editing === true && (
                    <TextField
                      autoFocus={true}
                      style={{
                        display: "inline-block",
                        marginTop: "0px",
                        marginBottom: "5px"
                      }}
                      fullWidth={true}
                      required
                      color="textSecondary"
                      error={this.props.editAddressNameError}
                      disabled={
                        this.props.loadingAccount ||
                        this.props.cardLoading ||
                        this.props.privateKeyLoading
                      }
                      id="editAddressName"
                      value={this.props.editAddressName}
                      onChange={event => {
                        this.props.handleChange(event, "editAddressName");
                      }}
                      margin="normal"
                      onKeyDown={event => {
                        this.props.onEditAddressNameKeyDown(event, address);
                      }}
                      helperText={this.props.editAddressNameErrorMessage}
                    />
                  )}
                  <Typography
                    noWrap
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {address.address}
                  </Typography>
                </Grid>
                <Grid item xs={1} align="right">
                  <IconButton
                    style={{
                      verticalAlign: "top",
                      marginRight: "-20px",
                      marginTop: "-11px"
                    }}
                    color="primary"
                    aria-label="More"
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    onClick={e => {
                      this.props.optionsClicked(e, address);
                    }}
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                  >
                    <MoreIcon />
                  </IconButton>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorPosition={{ top: 200, left: 400 }}
                    onClose={this.props.optionsClosed}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    <List component="nav">
                      <ListItem
                        button
                        onClick={() => {
                          this.props.editNameClicked(address);
                        }}
                      >
                        <ListItemText primary="Update Name" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.updatePrimaryClicked(address);
                        }}
                      >
                        <ListItemText primary="Set Primary" />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.exportEthereumKeyClicked(address.address);
                        }}
                      >
                        <ListItemText primary="View Private Key" />
                      </ListItem>
                      <ListItem
                        button
                        disabled={ !(address.erc20Tokens && address.erc20Tokens.length > 0) }
                        onClick={( ) => {
                          this.props.viewTokens(address)
                        } }
                      >
                        <ListItemText primary="View Tokens" />
                      </ListItem>
                      <Divider />
                      <ListItem
                        button
                        onClick={() => {
                          this.props.deleteKeyClicked(address.address);
                        }}
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
                    {address.balance + " Eth"}
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
                    onClick={() => {
                      this.props.sendEtherClicked(null, address);
                    }}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
              {loading}
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
            <PageTItle theme={theme} root={'Accounts'} screen={'Ethereum'} />
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
          <PageTItle theme={theme} root={'Accounts'} screen={'Ethereum'} />
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
              <Typography variant='h2' align='left'>Accounts</Typography>
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
        <Grid item xs={12}>
          <EthTransactions
            theme={this.props.theme}
            ethAddresses={this.props.addresses}
            ethTransactions={this.props.ethTransactions}
            contacts={this.props.contacts}
            size={this.props.size}
          />
        </Grid>
        <PrivateKeyModal
          isOpen={this.props.keyOpen}
          handleClose={this.props.handleKeyClose}
          currentAccountKey={this.props.currentAccountKey}
          copyKey={this.props.copyKey}
        />
        <DeleteAccountConfirmation
          isOpen={this.props.deleteOpen}
          handleClose={this.props.handleDeleteClose}
          confirmDelete={this.props.confirmDelete}
          deleteLoading={this.props.deleteLoading}
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
          send={this.props.sendERC20}
        />
      </Grid>
    );
  }
}

export default EthAccounts;
