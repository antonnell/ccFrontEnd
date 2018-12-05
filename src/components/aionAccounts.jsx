import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PrivateKeyModal from "./privateKeyModal.jsx";
import DeleteAccountConfirmation from "./deleteAccountConfirmation";
import AionTransactions from "../containers/aionTransactions";
import CreateModal from "./createModal";
import ImportModal from "./importModal";

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#b5b5b5"
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    </SvgIcon>
  );
}

function PrimaryIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </SvgIcon>
  );
}

function SetPrimaryIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
    </SvgIcon>
  );
}

class AionAccounts extends Component {
  renderAddresses() {
    if (this.props.addresses === null) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="left"
          style={{ minHeight: "190px", position: "relative" }}
        >
          <CircularProgress
            size={36}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12
            }}
          />
        </Grid>
      );
    }

    if (this.props.addresses.length === 0) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="center"
          style={{ minHeight: "190px", paddingTop: "100px" }}
        >
          <Typography variant="h5">
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
      let loading = <div />;

      if (this.props.optionsAccount != null) {
        if (address.address === this.props.optionsAccount.address) {
          open = true;
          anchorEl = this.props.optionsAccount.anchorEl;
        }
      }

      if (this.props.loadingAccount != null) {
        if (address.address === this.props.loadingAccount.address) {
          loading = (
            <CircularProgress
              size={36}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -12,
                marginLeft: -12
              }}
            />
          );
        }
      }

      if (this.props.editAccount != null) {
        if (address.address === this.props.editAccount.address) {
          address.editing = true;
          if (this.props.cardLoading) {
            loading = (
              <CircularProgress
                size={36}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12
                }}
              />
            );
          }
        }
      }

      if (this.props.exportKeyAccount != null) {
        if (address.address === this.props.exportKeyAccount) {
          if (this.props.privateKeyLoading) {
            loading = (
              <CircularProgress
                size={36}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12
                }}
              />
            );
          }
        }
      }

      return (
        <Grid item xs={12} lg={6} align="left" key={address.address}>
          <Card style={{ margin: "12px" }}>
            <CardContent style={{ position: "relative" }}>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={11} align="left">
                  {address.editing !== true && (
                    <Typography
                      noWrap
                      variant="h3"
                      style={{ minHeight: "32px", display: "inline-block" }}
                    >
                      {address.isPrimary === true && (
                        <Tooltip title="This is your primary Aion account">
                          <PrimaryIcon
                            style={{
                              marginTop: "3.5px",
                              marginRight: "5px",
                              verticalAlign: "top"
                            }}
                          />
                        </Tooltip>
                      )}
                      {address.isPrimary === false && (
                        <Tooltip title="Make this account my primary Aion account">
                          <SetPrimaryIcon
                            onClick={() => {
                              this.props.updatePrimaryClicked(address);
                            }}
                            style={{
                              cursor: "pointer",
                              marginTop: "3.5px",
                              marginRight: "5px",
                              verticalAlign: "top"
                            }}
                          />
                        </Tooltip>
                      )}
                      {address.name}
                    </Typography>
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
                          this.props.exportAionKeyClicked(address.address);
                        }}
                      >
                        <ListItemText primary="View Private Key" />
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
                <Grid item xs={12}>
                  <Typography
                    noWrap
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ minHeight: "32px" }}
                  >
                    {address.address}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ marginTop: "6px" }}>
                  <Typography variant="h5" noWrap>
                    {address.balance +
                      " Aion ($" +
                      address.usdBalance.toFixed(2) +
                      ")"}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Button
                    size="small"
                    variant="text"
                    style={{ border: "1px solid #ccc" }}
                    disabled={
                      this.props.loadingAccount ||
                      this.props.cardLoading ||
                      this.props.privateKeyLoading
                    }
                    onClick={() => {
                      this.props.sendAionClicked(null, address);
                    }}
                  >
                    Send Aion
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
    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
          style={{
            margin: "12px",
            padding: "24px 0px",
            borderBottom:
              "2px solid " + this.props.theme.custom.headingBorder.color,
            display: "flex"
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography variant="h6">Aion Accounts</Typography>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.props.handleCreateOpen}
            >
              Create Account
            </Button>
            <Button
              style={{ marginLeft: "12px" }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={this.props.handleImportOpen}
            >
              Import Account
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={{ paddingTop: "24px" }}
          >
            {this.renderAddresses()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AionTransactions
            aionAddresses={this.props.addresses}
            aionTransactions={this.props.aionTransactions}
            contacts={this.props.contacts}
          />
        </Grid>
        <DeleteAccountConfirmation
          isOpen={this.props.deleteOpen}
          handleClose={this.props.handleDeleteClose}
          confirmDelete={this.props.confirmDelete}
          deleteLoading={this.props.deleteLoading}
        />
        <PrivateKeyModal
          isOpen={this.props.keyOpen}
          handleClose={this.props.handleKeyClose}
          currentAccountKey={this.props.currentAccountKey}
          copyKey={this.props.copyKey}
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

export default AionAccounts;
