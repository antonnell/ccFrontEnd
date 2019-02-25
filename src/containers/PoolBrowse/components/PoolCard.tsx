import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {colors} from "../../../theme";
import Button from "@material-ui/core/Button";
import {FundingPool, PoolingContractStatus} from "../../../types/pooling";

interface OwnProps {
  pool: FundingPool;
  onPledgeClick: () => void;
  onContributeClick: () => void;
  managedPool?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 3,
      position: "relative"
    },
    tokenText: {
      color: theme.palette.secondary.main,
      textTransform: "uppercase",
      marginLeft: theme.spacing.unit
    },
    authorText: {
      marginTop: theme.spacing.unit
    },
    gridSecondRow: {
      marginTop: theme.spacing.unit * 4
    },
    daysText: {
      marginTop: theme.spacing.unit
    },
    progressGrid: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    progress: {
      color: colors["robin-s-egg"],
      transform: "rotate(-130deg) !important",
    },
    button: {
      minWidth: 100,
      color: colors.dark
    },
    buttonSpacer: {
      margin: theme.spacing.unit
    },
    buttonRow: {
      marginTop: theme.spacing.unit
    },
    shareButton: {
      position: "absolute",
      top: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    },
    textMinHeight: {
      minHeight: 30
    }
  });

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class PoolCard extends React.Component<Props> {
  static defaultProps = {
    managedPool: false
  };

  public render() {
    const {classes, pool, managedPool} = this.props;
    const {name, owner, blockchain, contributorCount, totalPooled, status, totalPledged,whitelistedUsers} = pool;
    let pledged = 0;
    let contribution = 0;
    if (whitelistedUsers) {
      for (const user of whitelistedUsers) {
        pledged = pledged + (user && user.pledge !== undefined?user.pledge:0);
        contribution = contribution + (user && user.value !== undefined?user.value:0);
      }
    }
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item xs={6} container direction="column">
              <Grid container direction="row" alignItems="baseline">
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1" className={classes.tokenText}>{blockchain}</Typography>
              </Grid>
              <Typography variant="subtitle1" className={classes.authorText}><b>{owner}</b></Typography>
            </Grid>
            <Grid item xs={6} container direction="column">
              {/*<Grid className={classes.progressGrid}>*/}
              {/*<CircularProgress size={80} className={classes.progress} variant="static" value={95} />*/}
              {/*<Typography variant="h5" style={{position: "absolute"}}>95%</Typography>*/}
              {/*</Grid>*/}
            </Grid>
            <Grid item xs={6} className={classes.gridSecondRow}>
              <Typography variant="subtitle1"><strong>{contributorCount}</strong> Contributors</Typography>
              <Typography variant="subtitle1" className={classes.textMinHeight}>
                {((managedPool && pledged > 0) || (!managedPool && totalPledged > 0)) && <React.Fragment><strong>{managedPool?pledged:totalPledged}</strong> Pledged</React.Fragment>}
              </Typography>
              {/*<Typography variant="subtitle1" className={classes.daysText}><b>51</b> days left</Typography>*/}
            </Grid>
            <Grid item xs={6} className={classes.gridSecondRow}>
              <Typography align="center" variant="subtitle1"><b>{managedPool?contribution:totalPooled}</b> Raised</Typography>
            </Grid>
            <Grid item xs={12} container direction="row" justify="flex-end" alignItems="center" className={classes.buttonRow}>
              {managedPool && <div style={{flex: 1}}>
                <Typography variant="subtitle1">{PoolingContractStatus[status]}</Typography>
              </div>}
              {managedPool && <Button variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onUpdateClick}>Update</Button>}
              {status === 1 && !managedPool && <Button variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onContributeClick}>Contribute</Button>}
              {status === 5 && !managedPool && <Button variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onPledgeClick}>Pledge</Button>}
              <div className={classes.buttonSpacer} />
              <Button variant="outlined" className={classes.button} color="secondary" size="small" onClick={this.handleViewClick}>view</Button>
            </Grid>
          </Grid>
          {/*<IconButton className={classes.shareButton}><ShareIcon /></IconButton>*/}
        </Paper>
      </React.Fragment>
    );
  }

  handleViewClick = () => {
    const {pool: {id}} = this.props;
    window.location.hash = `poolDetails/${id}`;
  };

  onPledgeClick = () => {
    const {onPledgeClick} = this.props;
    onPledgeClick();
  };

  onContributeClick = () => {
    const {onContributeClick} = this.props;
    onContributeClick();
  };

  onUpdateClick = () => {
    const {pool: {id}} = this.props;
    window.location.hash = `updatePool/${id}`;
  };

}

export default withStyles(styles)(PoolCard) as React.ComponentClass<OwnProps>;
