import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
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
import PageLoader from './pageLoader';
import PageTItle from "./pageTitle";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing.unit * 1.5,
      display: "flex"
    },
    spacer: {
      marginLeft: theme.spacing.unit
    },
    progress: {
      marginTop: -12
    }
  });

interface State {
  optionsOpen: boolean;
}

interface OwnProps {
  title: string;
  headerItems: HeaderItem
  loading: boolean;
  theme: object
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Header extends React.Component<Props, State> {
  public anchorEl: HTMLElement = {} as HTMLElement;
  readonly state = {
    optionsOpen: false,
  };

  public render() {
    const {title, classes, headerItems, loading, theme} = this.props;
    const {optionsOpen} = this.state;
    return (
      <React.Fragment>
        <Grid container item xs={12} alignItems="center" className={classes.header}>
          <PageTItle theme={theme} root={'Invest > Pooling'} screen={title} />
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
                {headerItems.menuItems.map((menuItem, index) =>
                  <ListItem key={index} button onClick={this.handleLink(menuItem.link)}>
                    <ListItemText primary={menuItem.label} />
                  </ListItem>
                )}
              </List>
            </Popover>
          </React.Fragment>
          }
        </Grid>
        {loading && <PageLoader />}
      </React.Fragment>
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
