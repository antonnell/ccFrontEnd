import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {colors} from "../theme";
import {HeaderItem} from "../constants/HeaderItems";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {MoreIcon} from "../theme/icons";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = (theme: Theme) =>
    createStyles({
      header: {
        marginBottom: theme.spacing.unit * 1.5,
        padding: theme.spacing.unit,
        borderBottom: ["2px", "solid", colors.dodgerBlue].join(" "),
        display: "flex"
      },
      spacer: {
        marginLeft: theme.spacing.unit
      }
    });

interface State {
  optionsOpen: boolean;
}

interface OwnProps {
  title: string;
  headerItems: HeaderItem
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Header extends React.Component<Props, State> {
  public anchorEl: HTMLElement = {} as HTMLElement;
  readonly state = {
    optionsOpen: false,
  };

  public render() {
    const {title, classes, headerItems} = this.props;
    const {optionsOpen} = this.state;
    return (
        <Grid container item xs={12} alignItems="center" className={classes.header}>
          <Typography variant="h5" style={{flexGrow: 1}}>{title}</Typography>
          {headerItems.buttons.map((button, index) =>
              <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={this.handleLink(button.link)}
              >{button.label}</Button>
          )}
          {headerItems.menuItems.length &&
          <React.Fragment>
            <IconButton className={classes.spacer} color="primary" buttonRef={node => this.anchorEl = node} onClick={this.optionsClicked}>
              <MoreIcon />
            </IconButton>
            <Popover
              open={optionsOpen}
              anchorEl={this.anchorEl}
              onClose={this.optionsClosed}
            >
              <List component="nav">
                {headerItems.menuItems.map((menuItem,index)=>
                    <ListItem key={index} button onClick={this.handleLink(menuItem.link)}>
                      <ListItemText primary={menuItem.label} />
                    </ListItem>
                )}
              </List>
            </Popover>
          </React.Fragment>
          }
        </Grid>
    );
  }

  private optionsClicked = () => {
    this.setState({optionsOpen: true})
  };

  private optionsClosed = () => {
    this.setState({optionsOpen: false})
  };

  private handleLink = (link: string) => () => {
    window.location.hash = link;
  }
}

export default withStyles(styles)(Header) as React.ComponentClass<OwnProps>;
