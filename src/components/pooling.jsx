import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Pools from "../containers/pools";
import CustomWhitelists from "../containers/customWhitelists";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

class Pooling extends Component {
  renderPools() {
    return (
      <Grid item xs={12} align="left">
        <Pools pools={this.props.whiteLists} />
      </Grid>
    );
  }

  renderWhitelists = ()=>{
    return (
      <Grid item xs={12} align="left">
        <CustomWhitelists />
      </Grid>
    );
  };

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
          style={{
            margin: "12px",
            padding: "24px 0px",
            borderBottom:
              "2px solid " + this.props.theme.custom.headingBorder.color,
            display: "flex"
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography variant="h5">Pooling</Typography>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.props.handleNewPool}
            >
              New Pool
            </Button>
            <IconButton
              style={{ verticalAlign: "top", marginTop: "-7px" }}
              color="primary"
              aria-label="More"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              onClick={e => {
                this.props.optionsClicked(e);
              }}
            >
              <MoreIcon />
            </IconButton>
            <Popover
              open={this.props.open}
              anchorEl={this.anchorEl}
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
                    this.props.browsePoolsClicked();
                  }}
                >
                  <ListItemText primary="Browse Pools" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    this.props.myInvitesClicked();
                  }}
                >
                  <ListItemText primary="My Invites" />
                </ListItem>
              </List>
            </Popover>
          </div>
        </Grid>
        {this.renderPools()}
        {this.renderWhitelists()}
      </Grid>
    );
  }
}

export default Pooling;
