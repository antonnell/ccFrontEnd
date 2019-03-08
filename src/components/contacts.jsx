import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddModal from "./createContactModal";
import PageTItle from "./pageTitle";
import PageLoader from "./pageLoader";

import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Contacts extends Component {
  renderContacts() {
    if (this.props.contacts == null) {
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

    if (this.props.contacts.length === 0) {
      return (
        <Grid
          item
          xs={12}
          xl={12}
          align="center"
          style={{ minHeight: "190px", paddingTop: "100px" }}
        >
          <Typography variant="h2">
            Oh no, we couldn't find any contacts for you. Why don't you add one?
          </Typography>
        </Grid>
      );
    }

    let index = -1

    return this.props.contacts.map(contact => {

      index ++

      let { theme, size } = this.props

      let open = false;
      let anchorEl = null;

      if (this.props.optionsContact != null) {
        if (contact.displayName === this.props.optionsContact.displayName) {
          open = true;
          anchorEl = this.props.optionsContact.anchorEl;
        }
      }

      return (
        <Grid item xs={12} lg={6} xl={4} key={contact.userName} style={{ padding: '24px' }}>
          <Card>
            <CardContent>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={6} align="left">
                  <Tooltip placement="top-start" title={contact.userName}>
                    <Typography
                      noWrap
                      variant="h3"
                      style={{ lineHeight: '33px' }}
                    >
                      {contact.displayName}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={6} align="right">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    onClick={e => {
                      this.props.optionsClicked(e, contact);
                    }}
                  >
                    Send
                  </Button>
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
                    <List component="nav" style={{ background: "#0FCEF3" }}>
                      <ListItem
                        disabled={
                          contact.primaryAionAddress === "No primary aion address set"
                        }
                        button
                        onClick={() => {
                          this.props.sendAionClicked(contact);
                        }}
                      >
                        <ListItemText primary="Send Aion" />
                      </ListItem>
                      <ListItem
                        disabled={
                          contact.hasBitcoinWallet !== true
                        }
                        button
                        onClick={() => {
                          this.props.sendBitcoinClicked(contact);
                        }}
                      >
                        <ListItemText primary="Send Bitcoin" />
                      </ListItem>
                      <ListItem
                        disabled={
                          contact.primaryEthAddress === "No primary eth address set"
                        }
                        button
                        onClick={() => {
                          this.props.sendEtherClicked(contact);
                        }}
                      >
                        <ListItemText primary="Send Ether" />
                      </ListItem>
                      <ListItem
                        disabled={
                          contact.primaryWanAddress === "No primary wan address set"
                        }
                        button
                        onClick={() => {
                          this.props.sendWanClicked(contact);
                        }}
                      >
                        <ListItemText primary="Send Wan" />
                      </ListItem>
                    </List>
                  </Popover>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                  variant="subtitle1"
                  color="textSecondary">
                    {contact.notes}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ marginTop: "0px" }}
      >
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTItle theme={this.props.theme} root={'Profile'} screen={'Contacts'} />
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={this.props.theme.custom.sectionTitle}
          >
            <Grid item xs={6} align='left'>
              <Typography variant='h2' align='left'>Contacts</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={this.props.handleAddOpen}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            direction="row"
          >
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

export default Contacts;
