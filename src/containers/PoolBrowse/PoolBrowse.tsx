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
import {FundingPool} from "../../types/pooling";
import PoolPledgeDialog from "../../components/PoolPledgeDialog/PoolPledgeDialog";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      paddingRight: theme.spacing.unit * 3
    }
  });

interface OwnProps {
  user: User;
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
}
interface State {
  openPledgeDialog: boolean;
  selectedPool: FundingPool | null;
}


interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

class PoolBrowse extends React.Component<Props,State> {

  readonly state:State = {
    openPledgeDialog: false,
    selectedPool: null
  };

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
    const {poolingContext: {availablePools,availablePoolsLoading}, classes,ethAddresses,wanAddresses} = this.props;
    const {selectedPool,openPledgeDialog} = this.state;
    return (
      <React.Fragment>
        <Header title="Browse Pools" headerItems={headerItems.pooling} loading={availablePoolsLoading}/>
        <Grid container direction="row" className={classes.containerGrid} spacing={32}>
          {availablePools.map(pool=>
            <Grid item xs={6} key={pool.id}>
              <PoolCard pool={pool} onPledgeClick={this.onPledgeClick(pool)}/>
            </Grid>
          )}
        </Grid>
        <PoolPledgeDialog pool={selectedPool} open={openPledgeDialog} onClose={this.onPledgeDialogClose} ethAddresses={ethAddresses} wanAddresses={wanAddresses}/>
      </React.Fragment>)
  }

  onPledgeClick = (pool:FundingPool) => ()=> {
    this.setState({openPledgeDialog: true,selectedPool: pool})
  };

  onPledgeDialogClose = () => {
    this.setState({openPledgeDialog: false,selectedPool: null})
  }

}

export default withStyles(styles)(withPoolingContext(PoolBrowse)) as unknown as React.ComponentClass<Props>;
