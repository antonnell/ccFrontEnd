import React, { Component } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SectionLoader from './sectionLoader';

class CreateContactModal extends Component {
  render() {
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose}>
        <DialogContent>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={{ padding: "24px" }}
          >
            <Grid item xs={12} align="left">
              <Typography variant="h5">Add Contact</Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={9} lg={7} align="left">
              <TextField
                fullWidth={true}
                required
                color="textSecondary"
                error={this.props.usernameError}
                disabled={this.props.addLoading}
                id="username"
                label="Contact Username"
                value={this.props.username}
                onChange={event => {
                  this.props.handleChange(event, "username");
                }}
                margin="normal"
                onKeyDown={this.props.onAddKeyDown}
                onBlur={event => {
                  this.props.validateField(event, "username");
                }}
                helperText={this.props.usernameErrorMessage}
              />
              <TextField
                fullWidth={true}
                required
                color="textSecondary"
                error={this.props.displayNameError}
                disabled={this.props.addLoading}
                id="displayName"
                label="Display Name"
                value={this.props.displayName}
                onChange={event => {
                  this.props.handleChange(event, "displayName");
                }}
                margin="normal"
                onKeyDown={this.props.onAddKeyDown}
                onBlur={event => {
                  this.props.validateField(event, "displayName");
                }}
                helperText={this.props.displayNameErrorMessage}
              />
              <TextField
                fullWidth={true}
                required
                color="textSecondary"
                error={this.props.notesError}
                disabled={this.props.addLoading}
                id="notes"
                label="Notes"
                value={this.props.notes}
                onChange={event => {
                  this.props.handleChange(event, "notes");
                }}
                margin="normal"
                onKeyDown={this.props.onAddKeyDown}
                onBlur={event => {
                  this.props.validateField(event, "notes");
                }}
                helperText={this.props.notesErrorMessage}
              />
            </Grid>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              direction="row"
              spacing={0}
              style={{ minHeight: "30px" }}
            >
              <Grid item xs={12} align="left">
                <Typography style={{ color: "#f44336" }}>
                  {this.props.error}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {this.props.addLoading ? (
            <SectionLoader />
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={this.props.addLoading}
            style={{ border: "1px solid #ccc" }}
            onClick={this.props.addClicked}
            color="primary"
            autoFocus
          >
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateContactModal;
