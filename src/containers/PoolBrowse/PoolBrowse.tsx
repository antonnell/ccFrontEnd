import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import headerItems from "../../constants/HeaderItems";
import {User} from "../../types/account";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import PoolCard from "./components/PoolCard";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      paddingRight: theme.spacing.unit * 3
    }
  });

interface OwnProps {
  user: User;
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

class PoolBrowse extends React.Component<Props> {

  componentWillMount(): void {
    const {
      poolingContext: {
        getAvailableFundingPools
      },
      user
    } = this.props;
    getAvailableFundingPools(user.id);
  }

  public render() {
    const {poolingContext: {availablePools}, classes} = this.props;
    return (
      <React.Fragment>
        <Header title="Browse Pools" headerItems={headerItems.pooling} />
        <Grid container direction="row" className={classes.containerGrid} spacing={32}>
          {availablePools.map(pool=>
            <Grid item xs={6} key={pool.id}>
              <PoolCard pool={pool}/>
            </Grid>
          )}
        </Grid>
      </React.Fragment>)
  }
}

export default withStyles(styles)(withPoolingContext(PoolBrowse)) as unknown as React.ComponentClass<Props>;
