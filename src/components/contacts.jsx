import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  Tooltip,
  Card,
  CardContent
} from "@material-ui/core";
import AddModal from "./createContactModal";
import PageTItle from "./pageTitle";
import PageLoader from "./pageLoader";
import Snackbar from './snackbar';

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

    return this.props.contacts.map(contact => {

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
                    onClick={e => {
                      this.props.transactClicked(null, contact.userName);
                    }}
                  >
                    Transact
                  </Button>
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
    let { error, theme } = this.props
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
          <PageTItle theme={this.props.theme} root={null} screen={{display: 'Contacts', location: 'contacts'}} />
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={ theme.custom.sectionTitle }
          >
            <Grid item xs={6} align='left' >
              <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Contacts</Typography>
            </Grid>
            <Grid item xs={6} align='right' >
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
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            style={ theme.custom.accountsContainer }
          >
            {this.renderContacts()}
          </Grid>
        </Grid>
        { error && <Snackbar open={true} type={'Error'} message={error} /> }
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
