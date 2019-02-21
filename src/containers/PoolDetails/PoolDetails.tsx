import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import headerItems from "../../constants/HeaderItems";
import {User} from "../../types/account";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";
import DetailsGroup from "./components/DetailsGroup";
import Button from "@material-ui/core/Button";
import {colors} from "../../theme";
import PoolPledgeDialog from "../../components/PoolPledgeDialog/PoolPledgeDialog";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import PoolContributeDialog from "../../components/PoolContributeDialog/PoolContributeDialog";
import {WithSnackBarContext, withSnackBarContext} from "../../context/SnackBarContext";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      marginTop: theme.spacing.unit * 2.5
    },
    button: {
      minWidth: 150,
      color: colors.dark
    },
    buttonSpacer: {
      margin: theme.spacing.unit
    },
  });

export interface PoolDetailsGroupItems {
  title: string;
  text: string | number;
  width: 6 | 12;
}

interface PoolDetailsGroups {
  title: string;
  items: PoolDetailsGroupItems[]
}

interface OwnProps {
  id: number;
  user: User;
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
}

interface State {
  openPledgeDialog: boolean;
  openContributeDialog: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext, WithSnackBarContext {
}

class PoolDetails extends React.Component<Props, State> {
  readonly state: State = {
    openPledgeDialog: false,
    openContributeDialog: false
  };

  componentWillMount(): void {
    const {
      id, poolingContext: {
        getAvailableFundingPools,
        availablePools
      },
      user
    } = this.props;
    if (availablePools.findIndex((pool) => Number(pool.id) === Number(id)) === -1) {
      getAvailableFundingPools(user.id);
    }
  }

  public render() {
    const {
      id, classes, ethAddresses, wanAddresses, poolingContext: {
        availablePools, availablePoolsLoading
      }
    } = this.props;
    const {
      openPledgeDialog, openContributeDialog
    } = this.state;
    const poolId = availablePools.findIndex((pool) => Number(pool.id) === Number(id));
    const pool = poolId !== -1 ? availablePools[poolId] : null;
    const groups: PoolDetailsGroups[] = [];
    let pledged = 0;
    if (pool !== null) {
      console.log(pool);
      if (pool.whitelistedUsers) {
        for (const user of pool.whitelistedUsers) {
          pledged = pledged + (user && user.pledge !== undefined?user.pledge:0);
        }
      }
      groups.push({
          title: "Settings",
          items: [
            {title: "Pool Name", text: pool.name || "Not Available", width: 6},
            {title: "Creator", text: pool.owner || "Not Available", width: 6},
            {title: "Token Name", text: pool.tokenSymbol || "Not Available", width: 6},
            {title: "Token Address", text: pool.tokenAddress, width: 12},
          ]
        }
      );
      groups.push({
        title: "Allocations",
        items: [
          {title: "Fee", text: `${pool.fee || 0} %`, width: 6},
          {title: "Min-Cap", text: `${pool.minContribution} ${pool.blockchain}`, width: 6},
          {title: "Max-Cap", text: `${pool.maxContribution} ${pool.blockchain}`, width: 6},
        ]
      });
      groups.push({
        title: "",
        items: [
          {title: "Amount Pooled", text: `${pool.totalPooled} ${pool.blockchain}`, width: 6},
          {title: "Amount Pledged", text: `${pledged} ${pool.blockchain}`, width: 6},
          {title: "Contributors", text: pool.contributorCount || 0, width: 12},
        ]
      });
    } else {
    }
    return (
      <React.Fragment>
        <Header title="Pool Details" headerItems={headerItems.pooling} loading={availablePoolsLoading} />
        <Grid container direction="row" className={classes.containerGrid} spacing={40}>
          {groups.map((group, i) => <DetailsGroup key={i} title={group.title} items={group.items} />)}
          {!availablePoolsLoading && pool !== null && <Grid item container direction="row" justify="flex-end" xs={12}>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.onBackClick}>Back</Button>
            <div className={classes.buttonSpacer} />
            {pool.status === 1 && <Button variant="contained" color="secondary" className={classes.button} onClick={this.onContributeClick}>Contribute</Button>}
            <div className={classes.buttonSpacer} />
            {pool.status === 5 && <Button variant="contained" color="secondary" className={classes.button} onClick={this.onPledgeClick}>Pledge</Button>}
          </Grid>}
        </Grid>
        <PoolPledgeDialog pool={pool} open={openPledgeDialog} onClose={this.onDialogClose} ethAddresses={ethAddresses} wanAddresses={wanAddresses} />
        <PoolContributeDialog pool={pool} open={openContributeDialog} onClose={this.onDialogClose} ethAddresses={ethAddresses} wanAddresses={wanAddresses} />
      </React.Fragment>
    )
  }

  onBackClick = () => {
    window.location.hash = "browsePools";
  };

  onPledgeClick = () => {
    this.setState({openPledgeDialog: true})
  };

  onContributeClick = () => {
    this.setState({openContributeDialog: true})
  };

  onDialogClose = () => {
    this.setState({openPledgeDialog: false, openContributeDialog: false})
  }
}

export default withStyles(styles)(withPoolingContext(withSnackBarContext(PoolDetails))) as unknown as React.ComponentClass<Props>;
