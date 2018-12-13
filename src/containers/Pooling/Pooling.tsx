import * as React from "react";
import {User} from "../../types/account";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import createStyles from "@material-ui/core/es/styles/createStyles";
import {WithStyles} from "@material-ui/core/es";
import {colors} from "../../theme";
import {MoreIcon} from "../../theme/icons";
import withStyles from "@material-ui/core/styles/withStyles";

// const styles = (theme: Theme) =>
const styles = () =>
    createStyles({
      header: {
        margin: "12px",
        padding: "24px 0px",
        borderBottom: ["2px", "solid", colors.dodgerBlue].join(" "),
        display: "flex"
      }
    });

interface OwnProps {
  user: User
}

interface State {
  optionsOpen: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Pooling extends React.Component<Props, State> {

  public anchorEl:HTMLElement = {} as HTMLElement;

  readonly state = {
    optionsOpen: false,
  };

  // public shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
  //   // This is used to prevent reRenders
  //   if (odiff(this.props,nextProps).length) {
  //     console.log(odiff(this.props,nextProps));
  //     return false;
  //   } else {
  //     return false;
  //   }
  // }

  public render() {
    const {classes} = this.props;
    const {optionsOpen} = this.state;

    return (
        <Grid container direction="row">
          <Grid container item xs={12} alignItems="center" className={classes.header}>
            <Typography variant="h5" style={{flexGrow: 1}}>Pooling</Typography>
            <Button
                size="small"
                variant="contained"
                color="primary"
                // onClick={this.props.handleNewPool}
            >New Pool</Button>
            <IconButton color="primary" buttonRef={node => this.anchorEl = node} onClick={this.optionsClicked}>
              <MoreIcon />
            </IconButton>
            <Popover
                open={optionsOpen}
                anchorEl={this.anchorEl}
                onClose={this.optionsClosed}
            >
              <List component="nav">
                <ListItem
                    button
                    // onClick={() => {
                    //   this.props.browsePoolsClicked();
                    // }}
                >
                  <ListItemText primary="Browse Pools" />
                </ListItem>
                <ListItem
                    button
                    // onClick={() => {
                    //   this.props.myInvitesClicked();
                    // }}
                >
                  <ListItemText primary="My Invites" />
                </ListItem>
              </List>
            </Popover>
          </Grid>
          {/*{this.renderPools()}*/}
          {/*{this.renderWhitelists()}*/}
        </Grid>)
  }

  private optionsClicked = () => {
    this.setState({optionsOpen: true})
  };

  private optionsClosed = () => {
    this.setState({optionsOpen: false})
  }
}

export default withStyles(styles)(Pooling) as React.ComponentClass<Props>;
