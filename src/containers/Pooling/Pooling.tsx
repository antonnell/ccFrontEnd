import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Pools from "./components/Pools";
import WhiteLists from "./components/WhiteLists/WhiteLists";
import Header from "../../components/Header";
import headerItems from "../../constants/HeaderItems";
import {User} from "../../types/account";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {sharedStyles} from "../../theme/theme";

const styles = (theme: Theme) =>
    createStyles({
      containerGrid: sharedStyles(theme).containerGrid
    });

interface OwnProps {
  user: User;
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Pooling extends React.Component<Props> {

  public render() {
    const {user, classes} = this.props;
    return (
        <React.Fragment>
          <Header title="Pooling" headerItems={headerItems.pooling} loading={false}/>
          <Grid container direction="row" className={classes.containerGrid} spacing={40}>
              <Pools user={user} />
              <WhiteLists user={user} />
          </Grid>
        </React.Fragment>)
  }
}

export default withStyles(styles)(Pooling) as React.ComponentClass<Props>;
