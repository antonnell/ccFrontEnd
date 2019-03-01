import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";

class SetupWRC20Payment extends Component {
  renderTokens() {
    if (this.props.wrc20Tokens == null || this.props.wrc20Tokens.length === 0) {
      return (
        <Typography variant="subtitle1">
          Oh no, we couldn't find any supported tokens.
        </Typography>
      );
    }

    return (
      <FormControl error style={{ minWidth: "300px", width: "100%" }}>
        <Select
          error={this.props.tokenError}
          value={this.props.sendWRC20Symbol}
          onChange={this.props.selectToken}
          renderValue={value => {
            var selectedToken = this.props.wrc20Tokens.filter(token => {
              return token.symbol === value;
            })[0];

            return (
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item xs={8} align="left">
                  <Typography variant="h3" noWrap>
                    {selectedToken.name}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {selectedToken.contractAddress}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ borderLeft: "1px solid #dedede" }}
                  align="center"
                >
                  <div />
                  <Typography variant="h6" noWrap>
                    {selectedToken.symbol}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    Ticker Symbol
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        >
          {this.props.wrc20Tokens.map(token => {
            return (
              <MenuItem value={token.symbol} key={token.contractAddress}>
                <ListItemText
                  primary={token.name}
                  secondary={token.contractAddress}
                />
                <ListItemSecondaryAction style={{ right: "24px" }}>
                  <Typography>{token.symbol}</Typography>
                </ListItemSecondaryAction>
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{this.props.tokenErrorMessage}</FormHelperText>
      </FormControl>
    );
  }

  renderAddresses(accountValue, error, errorMessage, onChange, type) {
    if (
      this.props.wanAddresses == null ||
      this.props.wanAddresses.length === 0
    ) {
      return (
        <Typography variant="subtitle1">
          Oh no, we couldn't find any addresses for you. Why don't you
          create/import one?
        </Typography>
      );
    }

    return (
      <FormControl error style={{ minWidth: "300px", width: "100%" }}>
        <Select
          error={error}
          value={accountValue}
          onChange={onChange}
          renderValue={value => {
            if (!value) {
              return <div />;
            }
            var selectedAddress = this.props.wanAddresses.filter(address => {
              return address.publicAddress === value;
            })[0];

            return (
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item xs={8} align="left">
                  <Typography variant="h3" noWrap>
                    {selectedAddress.name}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {selectedAddress.publicAddress}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ borderLeft: "1px solid #dedede" }}
                  align="center"
                >
                  <div />
                  <Typography variant="h6" noWrap>
                    {this.props.sendWRC20Symbol
                      ? selectedAddress.wrc20Tokens.filter(token => {
                          return token.symbol === this.props.sendWRC20Symbol;
                        })[0].balance +
                        " " +
                        this.props.sendWRC20Symbol
                      : ""}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {this.props.sendWRC20Symbol
                      ? "Available Balance"
                      : "Select a token"}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        >
          {this.props.wanAddresses.map(address => {
            if (type === "own" && address.publicAddress === this.props.accountValue) {
              return false;
            }

            return (
              <MenuItem
                value={address.publicAddress}
                key={address.publicAddress}
              >
                <ListItemText
                  primary={address.name}
                  secondary={address.publicAddress}
                />
                <ListItemSecondaryAction style={{ right: "24px" }}>
                  <Typography>
                    {this.props.sendWRC20Symbol
                      ? address.wrc20Tokens.filter(token => {
                          return token.symbol === this.props.sendWRC20Symbol;
                        })[0].balance +
                        " " +
                        this.props.sendWRC20Symbol
                      : ""}
                  </Typography>
                </ListItemSecondaryAction>
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{this.props.accountErrorMessage}</FormHelperText>
      </FormControl>
    );
  }

  renderContacts() {
    if (this.props.contacts == null || this.props.contacts.length === 0) {
      return (
        <Typography variant="subtitle1">
          Oh no, we couldn't find any contacts for you. Why don't you
          create/import one?
        </Typography>
      );
    }

    return (
      <FormControl error style={{ minWidth: "300px", width: "100%" }}>
        <Select
          error={this.props.contactError}
          value={this.props.contactValue}
          onChange={this.props.selectContact}
          style={{ minWidth: "300px", width: "100%" }}
          renderValue={value => {
            var selectedContact = this.props.contacts.filter(contact => {
              return contact.primaryWanAddress === value;
            })[0];

            return (
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item xs={8} align="left">
                  <Typography variant="h3" noWrap>
                    {selectedContact.displayName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  >
                    {selectedContact.primaryWanAddress}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{ borderLeft: "1px solid #dedede" }}
                  align="center"
                >
                  <div />
                  <Typography variant="subtitle1">
                    {selectedContact.notes}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
        >
          {this.props.contacts.map(contact => {
            return (
              <MenuItem
                value={contact.primaryWanAddress}
                key={contact.primaryWanAddress}
              >
                <ListItemText
                  primary={contact.displayName}
                  secondary={contact.primaryWanAddress}
                />
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{this.props.contactErrorMessage}</FormHelperText>
      </FormControl>
    );
  }

  renderSelectOwn() {
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={0}
      >
        <Grid item xs={12} align="left" style={{ marginTop: "24px" }}>
          <Typography variant="subtitle1">
            Select your recipient account*
          </Typography>
        </Grid>
        <Grid item xs={12} altign="left">
          {this.renderAddresses(
            this.props.ownAccountValue,
            this.props.ownAccountError,
            this.props.ownAccountErrorMessage,
            this.props.selectOwnAddress,
            "own"
          )}
        </Grid>
      </Grid>
    );
  }

  renderSelectBeneficiary() {
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ marginTop: "24px" }}
      >
        <Grid item xs={12} align="left">
          <Typography variant="subtitle1">Select the contact*</Typography>
        </Grid>
        <Grid item xs={12} align="left">
          {this.renderContacts()}
        </Grid>
      </Grid>
    );
  }

  renderEnterPublic() {
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ marginTop: "24px" }}
      >
        <Grid item xs={12} align="left">
          <div
            style={{
              background: "#b5b5b5",
              width: "100%",
              padding: "12px",
              fontStyle: "italic",
              marginBottom: "12px"
            }}
          >
            <Typography style={{fontStyle: "italic"}}>
              {this.props.disclaimer}
            </Typography>
          </div>
          <Typography variant="subtitle1">
            Recipient's Public Address*
          </Typography>
          <TextField
            required
            fullWidth={false}
            color="textSecondary"
            error={this.props.publicAddressError}
            style={{ minWidth: "300px", maxWidth: "400px", marginTop: "0px" }}
            id="publicAddress"
            placeholder="Address"
            value={this.props.publicAddress}
            onChange={event => {
              this.props.handleChange(event, "publicAddress");
            }}
            margin="normal"
            helperText={this.props.publicAddressErrorMessage}
            onBlur={event => {
              this.props.validateField(event, "publicAddress");
            }}
          />
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={0}
          style={{ position: "relative", marginTop: "24px" }}
        >
          <Grid
            item
            xs={12}
            align="left"
            style={{ borderBottom: "1px solid #aaaaaa", paddingBottom: "12px" }}
          >
            <Typography variant="h5">Token details</Typography>
          </Grid>
          <Grid item xs={12} align="left" style={{ marginTop: "24px" }}>
            <Typography variant="subtitle1">
              Select the WRC20 token to transfer*
            </Typography>
          </Grid>
          <Grid item xs={12} altign="left">
            {this.renderTokens()}
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={0}
          style={{ position: "relative", marginTop: "48px" }}
        >
          <Grid
            item
            xs={12}
            align="left"
            style={{ borderBottom: "1px solid #aaaaaa", paddingBottom: "12px" }}
          >
            <Typography variant="h5">Your details</Typography>
          </Grid>
          <Grid item xs={12} align="left" style={{ marginTop: "24px" }}>
            <Typography variant="subtitle1">Select your account*</Typography>
          </Grid>
          <Grid item xs={12} altign="left">
            {this.renderAddresses(
              this.props.accountValue,
              this.props.accountError,
              this.props.accountErrorMessage,
              this.props.selectAddress,
              "from"
            )}
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={0}
          style={{ position: "relative", marginTop: "48px" }}
        >
          <Grid
            item
            xs={12}
            align="left"
            style={{ borderBottom: "1px solid #aaaaaa", paddingBottom: "12px" }}
          >
            <Typography variant="h5">Payment details</Typography>
          </Grid>
          <Grid item xs={12} align="left">
            <Tabs
              value={this.props.tabValue}
              onChange={this.props.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Contact Payment" />
              <Tab label="Public Address Payment" />
              <Tab label="Account Transfer" />
            </Tabs>
            {this.props.tabValue === 0 && this.renderSelectBeneficiary()}
            {this.props.tabValue === 1 && this.renderEnterPublic()}
            {this.props.tabValue === 2 && this.renderSelectOwn()}
          </Grid>
          <Grid item xs={12} align="left" style={{ marginTop: "24px" }}>
            <Typography variant="subtitle1">Payment amount*</Typography>
            <TextField
              required
              fullWidth={false}
              color="textSecondary"
              error={this.props.amountError}
              style={{ minWidth: "300px", maxWidth: "400px", marginTop: "0px" }}
              id="amount"
              placeholder="Amount"
              value={this.props.amount}
              onChange={event => {
                this.props.handleChange(event, "amount");
              }}
              margin="normal"
              helperText={this.props.amountErrorMessage}
              onBlur={event => {
                this.props.validateField(event, "amount");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {this.props.sendWRC20Symbol}
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} align="left" style={{ marginTop: "24px" }}>
            <Typography variant="subtitle1">Gas limit*</Typography>
            <TextField
              required
              fullWidth={false}
              color="textSecondary"
              error={this.props.gweiError}
              style={{ minWidth: "300px", maxWidth: "400px", marginTop: "0px" }}
              id="gwei"
              placeholder="Gwin"
              value={this.props.gwei}
              onChange={event => {
                this.props.handleChange(event, "gwei");
              }}
              margin="normal"
              helperText={this.props.gweiErrorMessage}
              onBlur={event => {
                this.props.validateField(event, "gwei");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Gwin</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={0}
          style={{ position: "relative", marginTop: "48px" }}
        >
          <Grid item xs={12} align="right">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={this.props.proceedClicked}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SetupWRC20Payment;
