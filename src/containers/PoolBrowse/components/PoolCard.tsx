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
import {User} from "../../../types/account";
import {DialogActions, WithDialogContext, withDialogContext} from "../../../context/DialogContext";
import {DialogActionResult} from "../../../types/dialog";
import {WithSnackBarContext, withSnackBarContext} from "../../../context/SnackBarContext";
import {WithPoolingContext, withPoolingContext} from "../../../context/PoolingContext";

interface OwnProps {
  pool: FundingPool;
  onPledgeClick: () => void;
  onContributeClick: () => void;
  managedPool?: boolean;
  completedPool?: boolean;
  user: User
}

interface State {
  isSubmitting: boolean;
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
    buttonWidth: {
      minWidth: 100,
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
    },
    whiteLabel: {
      color: colors.white
    }
  });

interface Props extends OwnProps, WithStyles<typeof styles>, WithDialogContext, WithSnackBarContext, WithPoolingContext {
}

class PoolCard extends React.Component<Props, State> {
  readonly state: State = {
    isSubmitting: false
  };

  static defaultProps = {
    managedPool: false
  };

  componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): void {
    const {
      dialogContext: {
        result,
        action,
        details,
      }
    } = nextProps;
    if (result !== "pending") {
      this.dialogReturns(action, result, details as { id: number });
    }
  }

  public render() {
    const {classes, pool, managedPool, completedPool} = this.props;
    const {isSubmitting} = this.state;
    const {name, owner, blockchain, contributorCount, totalPooled, status, totalPledged, whitelistedUsers, isBusy, balance, totalTokensRemaining, totalTokensReceived, userContribution} = pool;
    let pledged = 0;
    let contribution = 0;
    if (whitelistedUsers) {
      for (const user of whitelistedUsers) {
        pledged = pledged + (user && user.pledge !== undefined ? user.pledge : 0);
        contribution = contribution + (user && user.value !== undefined ? user.value : 0);
      }
    }
    const theme = localStorage.getItem("cc_theme");
    const myContribution = userContribution ? userContribution.contribution : 0;
    // console.log("managedPool",managedPool,myContribution,pool);
    console.log(theme);
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item xs={12} container direction="column">
              <Grid container direction="row" alignItems="baseline">
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1" className={classes.tokenText}>{blockchain}</Typography>
              </Grid>
              <div style={{minHeight: 36}}><Typography variant="subtitle1" className={classes.authorText}>Owner: <b>{owner}</b></Typography></div>
              {(managedPool || completedPool) && <div style={{minHeight: 36}}>
                <Typography variant="subtitle1">Status: <b>{PoolingContractStatus[status]}</b></Typography>
              </div>}
            </Grid>
            <Grid item xs={6} className={classes.gridSecondRow}>
              <Typography variant="subtitle1"><strong>{contributorCount}</strong> Contributors</Typography>
              <Typography variant="subtitle1" className={classes.textMinHeight}>
                {((managedPool && pledged > 0) || (!managedPool && totalPledged > 0)) && <React.Fragment><strong>{managedPool ? pledged : totalPledged}</strong> Pledged</React.Fragment>}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.gridSecondRow} style={{paddingLeft: 16}}>
              <Typography variant="subtitle1"><b>{managedPool ? contribution : totalPooled}</b> Raised</Typography>
              <Typography variant="subtitle1" className={classes.textMinHeight}>
                {myContribution !== 0 && <React.Fragment><strong>{myContribution}</strong> Contributed</React.Fragment>}
              </Typography>
            </Grid>
            <Grid item xs={12} container direction="row" justify="flex-end" alignItems="center" className={classes.buttonRow}>
              {managedPool && status === 0 && <React.Fragment>
                <Button
                  size="small"
                  color="primary"
                  disabled={isBusy || isSubmitting}
                  variant="contained"
                  className={classes.buttonWidth}
                  onClick={this.deployPool}
                >Deploy</Button>
                <div className={classes.buttonSpacer} />
              </React.Fragment>}
              {managedPool && balance > 0 && <React.Fragment>
                <Button
                  size="small"
                  disabled={isBusy || balance === 0 || isSubmitting}
                  variant="contained"
                  color="primary"
                  className={classes.buttonWidth}
                  onClick={this.buyTokens}
                >Send Funds</Button>
                <div className={classes.buttonSpacer} />
              </React.Fragment>}
              {managedPool && totalTokensRemaining > 0 && totalTokensReceived === 0 && <React.Fragment>
                <Button
                  size="small"
                  disabled={isBusy || totalTokensRemaining === 0 || isSubmitting}
                  color="primary"
                  variant="contained"
                  className={classes.buttonWidth}
                  onClick={this.confirmTokens}
                >Confirm</Button>
                <div className={classes.buttonSpacer} />
              </React.Fragment>}
              {managedPool && totalTokensReceived > 0 && <React.Fragment>
                <Button
                  size="small"
                  disabled={isBusy || totalTokensReceived === 0 || isSubmitting}
                  variant="contained"
                  color="primary"
                  className={classes.buttonWidth}
                  onClick={this.distributeTokens}
                >Distribute</Button>
                <div className={classes.buttonSpacer} />
              </React.Fragment>}
              {managedPool && !completedPool && <Button disabled={isBusy || isSubmitting} variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onUpdateClick}>Update</Button>}
              {status === 1 && !managedPool && <Button disabled={isBusy || isSubmitting} variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onContributeClick}>Contribute</Button>}
              {status === 5 && !managedPool && <Button disabled={isBusy || isSubmitting} variant="contained" color="secondary" className={classes.button} size="small" onClick={this.onPledgeClick}>Pledge</Button>}
              <div className={classes.buttonSpacer} />
              <Button classes={theme === "dark"?{label: classes.whiteLabel}:{}}
                      variant="outlined" className={classes.button} color="secondary" size="small" onClick={this.handleViewClick}>view</Button>
            </Grid>
          </Grid>
          {/*<IconButton className={classes.shareButton}><ShareIcon /></IconButton>*/}
        </Paper>
      </React.Fragment>
    );
  }

  distributeTokens = () => {
    const {dialogContext: {showDialog}, pool: {id}} = this.props;
    showDialog(
      "confirmation",
      "distributeTokens",
      "Are you sure you want to distribute the tokens?",
      "This action cannot be undone once confirmed.",
      {id}
    );
  };

  confirmTokens = () => {
    const {dialogContext: {showDialog}, pool: {id}} = this.props;
    showDialog(
      "confirmation",
      "confirmTokens",
      "Are you sure you want to confirm the tokens?",
      "This action cannot be undone once confirmed.",
      {id});
  };

  deployPool = () => {
    const {dialogContext: {showDialog}, pool: {id}} = this.props;
    showDialog(
      "confirmation",
      "deployPool",
      "Are you sure you want to deploy the pool?",
      "This action cannot be undone once confirmed.",
      {id}
    );
  };

  buyTokens = () => {
    const {dialogContext: {showDialog}, pool: {id}} = this.props;
    showDialog(
      "confirmation",
      "buyTokens",
      "Are you sure you want to send the funds?",
      "This action cannot be undone once confirmed.",
      {id});
  };

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

  dialogReturns = (action: DialogActions, result: DialogActionResult, details: { id: number }) => {
    const {
      dialogContext: {
        reset
      },
      poolingContext: {
        deployPoolingContract,
        sendPoolFunds,
        confirmTokens,
        distributeAll
      },
      pool: {id},
      snackBarContext: {
        snackBarPush
      },
      managedPool
    } = this.props;
    if (result === "confirmed" && id === details.id && managedPool) {
      reset();
      switch (action) {
        case "deployPool":
          this.setState({isSubmitting: true});
          deployPoolingContract(id || 0).then(res => {
            if (res.success) {
              snackBarPush({type: "success", message: "Pool deploying", key: Date()});
              window.location.hash = "pooling";
            } else {
              this.setState({isSubmitting: false});
              snackBarPush({type: "error", message: res.message, key: Date()})
            }
          });
          break;
        case "buyTokens":
          this.setState({isSubmitting: true});
          sendPoolFunds(id || 0).then(res => {
            if (res.success) {
              snackBarPush({type: "success", message: "Sending Pool Funds", key: Date()});
              window.location.hash = "pooling";
            } else {
              this.setState({isSubmitting: false});
              snackBarPush({type: "error", message: res.message, key: Date()})
            }
          });
          break;
        case "confirmTokens":
          this.setState({isSubmitting: true});
          confirmTokens(id || 0).then(res => {
            if (res.success) {
              snackBarPush({type: "success", message: "Confirming Tokens", key: Date()});
              window.location.hash = "pooling";
            } else {
              this.setState({isSubmitting: false});
              snackBarPush({type: "error", message: res.message, key: Date()})
            }
          });
          break;
        case "distributeTokens":
          this.setState({isSubmitting: true});
          distributeAll(id || 0).then(res => {
            const {snackBarContext: {snackBarPush}} = this.props;
            if (res === true) {
              snackBarPush({key: new Date().toISOString(), message: "Tokens Distributed", type: "success"});
              window.location.hash = "pooling";
            } else {
              snackBarPush({key: new Date().toISOString(), message: "Something went wrong", type: "error"});
              window.location.hash = "pooling";
            }
          });
          break;
      }
    }
  };
}

export default withStyles(styles)(withDialogContext(withSnackBarContext(withPoolingContext(PoolCard)))) as React.ComponentClass<OwnProps>;
