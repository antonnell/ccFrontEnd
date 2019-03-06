import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import config from "../config";

class CompleteBitcoinPayment extends Component {
  renderError() {
    return (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ position: "relative", marginTop: "24px" }}
      >
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            Your payment was unfortunately <b>not</b> successfully processed.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            If the problem persists, please contact CryptoCurve support with the
            following error
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="subtitle1" style={{ color: "#f44336" }}>
            {this.props.error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderSuccess() {
    const url = config.bitcoinscanURL + this.props.transactionID;
    return (
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        direction="row"
        spacing={0}
        style={{ position: "relative", marginTop: "24px" }}
      >
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            Your payment was successfully processed.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            Please wait while the transaction is being mined. Once completed,
            the funds will relect on your account.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" style={{ marginTop: "12px" }}>
          <Typography variant="body1">
            You can view the progress of your transaction using the following
            transaction ID:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {this.props.transactionID}
            </a>
          </Typography>
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
            <Typography variant="h5">Payment Results</Typography>
          </Grid>
        </Grid>
        {this.props.error == null && this.renderSuccess()}
        {this.props.error != null && this.renderError()}
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          spacing={0}
          style={{ position: "relative", marginTop: "48px" }}
        >
          <Grid item xs={6} align="left">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={this.props.paymentClicked}
            >
              Set up another payment
            </Button>
          </Grid>
          <Grid item xs={6} align="right">
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={this.props.accountClicked}
            >
              Back to accounts
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CompleteBitcoinPayment;