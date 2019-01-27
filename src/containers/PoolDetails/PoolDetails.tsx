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
import {FundingPool, initialFundingPool} from "../../types/pooling";
import PoolPledgeDialog from "../../components/PoolPledgeDialog/PoolPledgeDialog";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";

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
  groups: PoolDetailsGroups[];
  loading: boolean;
  pool: FundingPool;
  openPledgeDialog: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

class PoolDetails extends React.Component<Props,State> {
  readonly state: State = {
    groups: [],
    loading: false,
    pool: initialFundingPool,
    openPledgeDialog:false,
  };

  componentWillMount(): void {
    const {
      id, poolingContext: {
        getManagedFundingPoolDetails
      }
    } = this.props;
    this.setState({loading: true});
    console.log(id);
    getManagedFundingPoolDetails(id).then(res => {
      this.setState({
        loading: false,
        pool: res,
        groups: [
          {
            title: "Settings",
            items: [
              {title: "Pool Name", text: res.name || "Not Available", width: 6},
              {title: "Creator", text: res.owner || "Not Available", width: 6},
              {title: "Token Name", text: res.tokenSymbol || "Not Available", width: 6},
              {title: "Token Address", text: res.tokenAddress, width: 12},
            ]
          },
          // {
          //   title: "Details",
          //   items: [
          //     {title: "Progress",text: "95% Complete",width: 12},
          //   ]
          // },
          {
            title: "Allocations",
            items: [
              // {title: "Contract Cap",text: "1000 ETH / $250,000",width: 6},
              {title: "Fee", text: `${res.fee || 0} %`, width: 6},
              {title: "Min-Cap", text: `${res.minContribution} ${res.blockchain}`, width: 6},
              {title: "Max-Cap", text: `${res.maxContribution} ${res.blockchain}`, width: 6},
            ]
          },
          {
            title: "",
            items: [
              {title: "Amount Pooled", text: `${res.balance} ${res.blockchain}`, width: 12},
              {title: "Contributors", text: res.contributorCount || 0, width: 12},
            ]
          }
        ]
      });
      console.log(res);
    });
  }

  public render() {
    const {classes,ethAddresses,wanAddresses} = this.props;
    const {
      groups, loading, openPledgeDialog, pool} = this.state;
    const {status} = pool;
    return (
      <React.Fragment>
        <Header title="Pool Details" headerItems={headerItems.pooling} loading={loading} />
        <Grid container direction="row" className={classes.containerGrid} spacing={40}>
          {groups.map((group, i) => <DetailsGroup key={i} title={group.title} items={group.items} />)}
          {!loading && <Grid item container direction="row" justify="flex-end" xs={12}>
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.onBackClick}>Back</Button>
            <div className={classes.buttonSpacer} />
            {status === 1 && <Button variant="contained" color="secondary" className={classes.button}>Contribute</Button>}
            <div className={classes.buttonSpacer} />
            {status === 5 && <Button variant="contained" color="secondary" className={classes.button} onClick={this.onPledgeClick}>Pledge</Button>}
          </Grid>}
        </Grid>
        <PoolPledgeDialog pool={pool} open={openPledgeDialog} onClose={this.onPledgeDialogClose} ethAddresses={ethAddresses} wanAddresses={wanAddresses} />
      </React.Fragment>
    )
  }

  onBackClick = () => {
    window.location.hash = "browsePools";
  };

  onPledgeClick = () => {
    this.setState({openPledgeDialog: true})
  };

  onPledgeDialogClose = () => {
    this.setState({openPledgeDialog: false})
  }
}

export default withStyles(styles)(withPoolingContext(PoolDetails)) as unknown as React.ComponentClass<Props>;
