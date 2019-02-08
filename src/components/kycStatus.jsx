import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";

function PositiveIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#19e564"
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
      />
    </SvgIcon>
  );
}
function NegativeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#e9194d"
        d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
      />
    </SvgIcon>
  );
}

class KYC extends Component {
  returnStatus() {
    let kycState = "pending";

    switch (this.props.kycState) {
      case "":
        kycState = "Unconfirmed"
        break;
      case "hold":
      case "post_processing":
      case "pending":
        kycState = "Pending review";
        break;
      case "completed":
        kycState = "Approved";
        break;
      case "failed":
      case "restarted":
        kycState = "Invalid";
        break;
      default:
        kycState = this.props.kycState;
        break;
    }

    return kycState;
  }

  render() {
    let kycIcon = (
      <NegativeIcon style={{ verticalAlign: "bottom", marginLeft: "12px" }} />
    );

    if (this.props.kycState === "completed") {
      kycIcon = (
        <PositiveIcon style={{ verticalAlign: "bottom", marginLeft: "12px" }} />
      );
    }
    return (
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        direction="row"
        spacing={0}
        style={{ marginTop: "24px" }}
      >
        <Grid item xs={12} sm={10} md={10} lg={10} align="left">
          <Typography variant="h3">KYC</Typography>
          <Typography
            variant="body1"
            align="justify"
            style={{ marginTop: "48px", fontWeight: "bold" }}
          >
            Status
          </Typography>
          <Typography
            variant="body1"
            align="justify"
            style={{ marginTop: "6px" }}
          >
            {this.returnStatus()}
            {kycIcon}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
//<Button size="small" variant={this.props.kycState!='failed'&&(this.props.kycState=='completed'||this.props.kycClicked)?"text":"contained"} disabled={this.props.loading||this.props.kycClicked||(['completed', 'hold', 'post_processing', 'failed', 'restarted'].includes(this.props.kycState))} color="primary" onPledgeClick={this.props.KYC}>KYC</Button>

export default KYC;
