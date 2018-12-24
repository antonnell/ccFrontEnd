import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Pools from "./components/Pools";
import WhiteLists from "./components/WhiteLists/WhiteLists";
import Header from "../../components/Header";
import HeaderItems from "../../constants/HeaderItems";
import {User} from "../../types/account";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) =>
    createStyles({
      containerGrid: {
        paddingRight: theme.spacing.unit * 3
      }
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
        <Grid container direction="row" className={classes.containerGrid}>
          <Header title="Pooling" headerItems={HeaderItems.pooling} />
          <Grid item xs={12}>
            <Pools user={user} />
          </Grid>
          <Grid item xs={12}>
            <WhiteLists whiteLists={[]} />
          </Grid>
        </Grid>)
  }
}

export default withStyles(styles)(Pooling) as React.ComponentClass<Props>;
