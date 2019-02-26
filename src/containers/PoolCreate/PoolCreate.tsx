import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import headerItems from "../../constants/HeaderItems";
import Settings from "./components/Settings";
import {Button, Theme, WithStyles} from "@material-ui/core";
import {initialPoolingContract, isFundingPool, PoolingContract, PoolingContractBlockChain} from "../../types/pooling";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import Options from "./components/Options";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Allocations from "./components/Allocations";
import isEthereumAddress from "is-ethereum-address";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";
import moment, {Moment} from "moment";
import {User} from "../../types/account";
import AddedUsers from "./components/AddedUsers";
import {Contact} from "../../types/contacts";
import AddUsers from "./components/AddUsers";
import {WithWhitelistContext, withWhitelistContext} from "../../context/WhitelistContext";
import {DeleteIcon, LockIcon, LockOpenIcon} from "../../theme/icons";
import Fab from "@material-ui/core/Fab";
import {WithDialogContext, withDialogContext} from "../../context/DialogContext";
import {sharedStyles} from "../../theme/theme";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withSnackBarContext, WithSnackBarContext} from "../../context/SnackBarContext";
import CustomList from "./components/CustomList";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: sharedStyles(theme).containerGrid,
    buttonGrid: {
      marginTop: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4,
    },
    deployButton: {
      marginLeft: theme.spacing.unit,
    },
    fab: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    progressFirst: {
      border: "1px solid rgba(0,0,0,0.42)",
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      boxShadow: `${theme.shadows[2]} !important`
    },
    progressMiddle: {
      border: "1px solid rgba(0,0,0,0.42)",
      borderLeft: "none",
      borderRadius: 0,
      boxShadow: `${theme.shadows[2]} !important`
    },
    progressLast: {
      border: "1px solid rgba(0,0,0,0.42)",
      borderLeft: "none",
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      boxShadow: `${theme.shadows[2]} !important`
    }
  });

export type PoolCreateHandleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type PoolCreateHandleDateChange = (fieldName: keyof PoolingContract) => (date: Moment) => void;

interface OwnProps {
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
  id: number | null;
  user: User;
}

interface State {
  poolingContract: PoolingContract;
  validation: {
    isNameValid: boolean;
    isSaleAddressValid: boolean;
    isTokenAddressValid: boolean;
  },
  originalPoolingContractUsers: Contact[];
  whitelistPoolingContractUsers: Contact[],
  manuallyAddedPoolingContractUsers: Contact[],
  loading: boolean;
  isSubmitting: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext, WithWhitelistContext, WithDialogContext, WithSnackBarContext {
}

const setOwnerAddress = (props: Props, poolingContract: PoolingContract) => {
  const ownerAddress: EthAddress | WanAddress = poolingContract.blockchain === "ETH" ? props.ethAddresses[0] : props.wanAddresses[0];
  return {...poolingContract, ownerAddress: ownerAddress}
};

class PoolCreate extends React.Component<Props, State> {
  readonly state: State = {
    poolingContract: setOwnerAddress(this.props, initialPoolingContract),
    validation: {
      isNameValid: false,
      isSaleAddressValid: false,
      isTokenAddressValid: false,
    },
    whitelistPoolingContractUsers: [],
    manuallyAddedPoolingContractUsers: [],
    originalPoolingContractUsers: [],
    loading: false,
    isSubmitting: false
  };

  componentWillMount(): void {
    const {
      id, poolingContext: {getManagedFundingPoolDetails, getManagedFundingPoolContributions}, wanAddresses, ethAddresses,
      snackBarContext: {
        snackBarPush
      }
    } = this.props;
    if (id) {
      this.setState({loading: true});
      getManagedFundingPoolDetails(id).then(poolingContract => {
        if (isFundingPool(poolingContract) && poolingContract.ownerAddress) {
          poolingContract.ownerAddress = (poolingContract.blockchain === "WAN" ? wanAddresses.find(v => v.publicAddress === (poolingContract.ownerAddress as unknown as string)) :
            ethAddresses.find(v => v.address === (poolingContract.ownerAddress as unknown as string)));
          poolingContract.pledgesEndDate = moment(poolingContract.pledgesEndDate).format("YYYY-MM-DD");
          if (poolingContract.whitelistedUsers === null) {
            poolingContract.whitelistedUsers = [];
          }
          if (poolingContract.status !== undefined && poolingContract.status > 0) {
            getManagedFundingPoolContributions(id).then(res => {
              this.setState({
                poolingContract: {...poolingContract, whitelistedUsers: res},
                validation: {
                  isNameValid: true,
                  isTokenAddressValid: true,
                  isSaleAddressValid: true
                },
                originalPoolingContractUsers: [...res],
                loading: false
              });
            });
          } else {
            this.setState({
              poolingContract,
              validation: {
                isNameValid: true,
                isTokenAddressValid: true,
                isSaleAddressValid: true
              },
              originalPoolingContractUsers: [...poolingContract.whitelistedUsers],
              loading: false
            });
          }
        } else {
          snackBarPush({key: new Date().toISOString(), message: "Something went wrong", type: "error"});
          window.location.hash = "pooling";
        }

      });
    }
  }

  componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void {
    const {
      dialogContext: {
        result,
        action,
        reset
      },
      poolingContext: {
        deletePoolingContract, setPoolLocked
      },
      id
    } = nextProps;
    if (result !== "pending" && action === "deletePoolingContract") {
      reset();
      if (result === "confirmed") {
        this.setState({isSubmitting: true});
        deletePoolingContract(id || 0).then(() => {
          this.clearState().then(() => {
            window.location.hash = "pooling";
          });
        })
      }
    } else if (result !== "pending" && action === "lockPoolingContract") {
      reset();
      if (result === "confirmed") {
        this.setState({isSubmitting: true});
        setPoolLocked(id || 0, true).then(() => {
          this.clearState().then(() => {
            window.location.hash = "pooling";
          });
        })
      }
    } else if (result !== "pending" && action === "unlockPoolingContract") {
      reset();
      if (result === "confirmed") {
        this.setState({isSubmitting: true});
        setPoolLocked(id || 0, false).then(() => {
          this.clearState().then(() => {
            window.location.hash = "pooling";
          });
        })
      }
    }
  }

  render() {
    const {ethAddresses, wanAddresses, classes, id, user} = this.props;
    const {
      loading, isSubmitting,
      poolingContract: {
        saleAddress, tokenAddress, transactionFee, blockchain, ownerAddress, name, isPledgesEnabled, pledgesEndDate,
        minContribution, maxContribution, isWhitelistEnabled, existingWhitelistId, whitelistedUsers, status: poolStatus,
        totalTokensRemaining, balance, totalTokensReceived,
        tokenSymbol, isBusy
      },
      validation: {
        isNameValid, isTokenAddressValid, isSaleAddressValid
      }
    } = this.state;
    console.log(this.state.poolingContract);
    const status = poolStatus || 0;
    const canSubmit = !isSubmitting && !loading && isNameValid && isSaleAddressValid && isTokenAddressValid && !isBusy;
    return (
      <React.Fragment>
        <Header title={id ? "Update Pool" : "Create Pool"} headerItems={headerItems.createPool} loading={loading || isSubmitting} />
        <Grid container justify="space-between" className={classes.containerGrid}>
          <Settings
            loading={loading || isSubmitting}
            status={status}
            name={name}
            poolId={id}
            isNameValid={isNameValid}
            blockChain={blockchain}
            ownerAddress={ownerAddress}
            ethAddresses={ethAddresses}
            wanAddresses={wanAddresses}
            handleChange={this.handleChange}
            saleAddress={saleAddress}
            tokenAddress={tokenAddress}
            isTokenAddressValid={isTokenAddressValid}
            isSaleAddressValid={isSaleAddressValid}
          />
          <Options
            loading={loading || isSubmitting}
            status={status}
            user={user}
            isPledgesEnabled={isPledgesEnabled}
            pledgesEndDate={pledgesEndDate}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
          />
          <Allocations
            loading={loading || isSubmitting}
            status={status}
            minContribution={minContribution}
            maxContribution={maxContribution}
            transactionFee={transactionFee}
            handleChange={this.handleChange}
          />
          <Grid container item xs={12} md={5} />
          <AddUsers status={status} addUserToWhitelist={this.addUserToWhitelist} loading={loading || isSubmitting} />
          <CustomList
            loading={loading || isSubmitting}
            id={id}
            user={user}
            existingWhitelistId={existingWhitelistId}
            isWhitelistEnabled={isWhitelistEnabled}
            handleChange={this.handleChange}
          />
          <AddedUsers status={status} users={whitelistedUsers} removeUserFromWhitelist={this.removeUserFromWhitelist} loading={loading || isSubmitting} />
          <Grid container item className={classes.buttonGrid} alignItems="center">
            <Grid item md={12} lg={6} style={{marginBottom: 16}}>
              <Button
                size="small"
                disabled={Boolean(id) || !canSubmit}
                variant="contained"
                color="primary"
                className={classes.progressFirst}
                onClick={this.submitCreatePool}
              >Create</Button>
              <Button
                size="small"
                color="primary"
                disabled={!Boolean(id) || status > 0 || !canSubmit}
                variant="contained"
                style={!Boolean(id) ? {backgroundColor: "white"} : {}}
                className={classes.progressMiddle}
                onClick={this.deployPool}
              >Deploy</Button>
              <Button
                size="small"
                disabled={true}
                variant="contained"
                color="primary"
                style={status > 0 ? {} : {backgroundColor: "white"}}
                className={classes.progressMiddle}
              >Pledges</Button>
              <Button
                size="small"
                disabled={(status !== 1 && status !== 2) || !canSubmit || balance === 0}
                variant="contained"
                color="primary"
                style={((status > 0 && status !== 5 && balance > 0) || status === 3 || status === 4 || status === 10) ? {} : {backgroundColor: "white"}}
                className={classes.progressMiddle}
                onClick={this.buyTokens}
              >Send Funds</Button>
              <Button
                size="small"
                disabled={!id || status !== 3 || !canSubmit}
                color="primary"
                variant="contained"
                style={(status === 3 || status === 4 || status === 10) ? {} : {backgroundColor: "white"}}
                className={classes.progressMiddle}
                onClick={this.confirmTokens}
              >Confirm</Button>
              <Button
                size="small"
                disabled={status !== 4 || !canSubmit}
                variant="contained"
                color="primary"
                style={(status === 4 || status === 10) ? {} : {backgroundColor: "white"}}
                className={classes.progressLast}
                onClick={this.distributeTokens}
              >Distribute</Button>
            </Grid>
            <Grid item md={12} lg={6} container justify="flex-end" style={{marginBottom: 16}} alignItems="center">
              {/*{id && status === 2 && totalTokensRemaining > 0 &&*/}
              {/*<Button*/}
                {/*className={classes.deployButton}*/}
                {/*disabled={!canSubmit}*/}
                {/*variant="contained"*/}
                {/*size="small"*/}
                {/*color="primary"*/}
                {/*onClick={this.confirmTokens}*/}
              {/*>*/}
                {/*Confirm Tokens*/}
                {/*{isSubmitting && <CircularProgress size={20} style={{position: "absolute"}} />}*/}
              {/*</Button>*/}
              {/*}*/}

              {id && status < 1 && <Fab aria-label="Delete" className={classes.fab} size="small" onClick={this.removePool} disabled={!canSubmit || loading || isSubmitting}>
                <DeleteIcon />
              </Fab>}
              {id && status === 1 && <Fab aria-label="Lock" className={classes.fab} size="small" onClick={this.lockPool} disabled={!canSubmit || loading || isSubmitting}>
                <LockIcon />
              </Fab>}
              {id && status === 2 && <Fab aria-label="Lock" className={classes.fab} size="small" onClick={this.unlockPool} disabled={!canSubmit || loading || isSubmitting}>
                <LockOpenIcon />
              </Fab>}
              {id && status !== 10 &&
              <Button
                className={classes.deployButton}
                size="small"
                disabled={!canSubmit}
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.submitCreatePool}
              >
                {id ? "UPDATE" : "CREATE"} POOL
                {isSubmitting && <CircularProgress size={20} style={{position: "absolute"}} />}
              </Button>}
              <Button
                className={classes.deployButton}
                disabled={!canSubmit}
                variant="outlined"
                size="small"
                color="secondary"
                onClick={this.cancelUpdate}
              >
                Cancel
              </Button>
            </Grid>
            {totalTokensRemaining > 0 &&
            <Grid item xs={6}>
              <Typography variant="h2">Tokens Remaining</Typography>
              <Typography variant="subtitle1" style={{marginTop: 8}}>{totalTokensRemaining} {tokenSymbol}</Typography>
            </Grid>
            }
            {totalTokensReceived > 0 &&
            <Grid item xs={6}>
              <Typography variant="h2">Tokens Received:</Typography>
              <Typography variant="subtitle1" style={{marginTop: 8}}>{totalTokensReceived} {tokenSymbol}</Typography>
            </Grid>
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  distributeTokens = () => {
    const {poolingContext: {distributeAll}, id} = this.props;
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
    })
  };

  cancelUpdate = () => {
    window.location.hash = "pooling";
  };

  removePool = () => {
    const {dialogContext: {showDialog}} = this.props;
    showDialog("confirmation", "deletePoolingContract");
  };

  lockPool = () => {
    const {dialogContext: {showDialog}} = this.props;
    showDialog(
      "confirmation",
      "lockPoolingContract",
      "Are you sure you want to lock the pool?",
      "No contributions will be able to be made while the pool is locked."
    );
  };

  unlockPool = () => {
    const {dialogContext: {showDialog}} = this.props;
    showDialog(
      "confirmation",
      "unlockPoolingContract",
      "Are you sure you want to unlock the pool?",
      "Contributions will be able to made and you will not be able to distribute the tokens while the pool is unlocked"
    );
  };

  confirmTokens = () => {
    this.setState({isSubmitting: true});
    const {
      id,
      poolingContext: {
        confirmTokens
      },
      snackBarContext: {
        snackBarPush
      }
    } = this.props;
    confirmTokens(id || 0).then(res => {
      this.setState({isSubmitting: false});
      if (res.success) {
        snackBarPush({type: "success", message: "Confirming Tokens", key: Date()});
        this.clearState().then(() => {
          window.location.hash = "pooling";
        });
      } else {
        snackBarPush({type: "error", message: res.message, key: Date()})
      }
    })
  };

  deployPool = () => {
    this.setState({isSubmitting: true});
    const {
      id,
      poolingContext: {
        deployPoolingContract
      },
      snackBarContext: {
        snackBarPush
      }
    } = this.props;
    deployPoolingContract(id || 0).then(res => {
      this.setState({isSubmitting: false});
      if (res.success) {
        snackBarPush({type: "success", message: "Pool deploying", key: Date()});
        this.clearState().then(() => {
          window.location.hash = "pooling";
        });
      } else {
        snackBarPush({type: "error", message: res.message, key: Date()})
      }
    })
  };

  buyTokens = () => {
    this.setState({isSubmitting: true});
    const {
      id,
      poolingContext: {
        sendPoolFunds
      },
      snackBarContext: {
        snackBarPush
      }
    } = this.props;
    sendPoolFunds(id || 0).then(res => {
      this.setState({isSubmitting: false});
      if (res.success) {
        snackBarPush({type: "success", message: "Sending Pool Funds", key: Date()});
        this.clearState().then(() => {
          window.location.hash = "pooling";
        });
      } else {
        snackBarPush({type: "error", message: res.message, key: Date()})
      }
    })
  };

  removeUserFromWhitelist = (contact: Contact) => {
    const {poolingContract} = this.state;
    const {whitelistedUsers: users} = poolingContract;
    const index = users.findIndex(user => user.userId === contact.userId);
    index !== -1 && users.splice(index, 1);
    this.setState({poolingContract: {...poolingContract, whitelistedUsers: [...users]}});
  };

  addUserToWhitelist = (contact: Contact) => {
    const {poolingContract} = this.state;
    const {whitelistedUsers: users} = poolingContract;
    users.findIndex(user => user.userId === contact.userId) === -1 && users.push(contact);
    this.setState({poolingContract: {...poolingContract, whitelistedUsers: [...users]}});
  };
  handleDateChange = (fieldName: keyof PoolingContract) => (date: Moment) => {
    this.setState({poolingContract: {...this.state.poolingContract, [fieldName]: date.format("YYYY-MM-DD")}});
  };

  handleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, checked?: boolean) => {
    let poolingContract = {...this.state.poolingContract};
    let value;
    switch (fieldName) {
      case "ownerAddress": {
        const {ethAddresses, wanAddresses} = this.props;
        value = poolingContract.blockchain === "ETH" ?
          ethAddresses.find(address => address.address === e.target.value) :
          wanAddresses.find(address => address.publicAddress === e.target.value);
        break;
      }
      case "blockchain": {
        value = e.target.value;
        poolingContract = {...poolingContract, blockchain: value as PoolingContractBlockChain};
        poolingContract = setOwnerAddress(this.props, poolingContract);
        break;
      }
      case "existingWhitelistId": {
        const {whitelistContext: {getUserSavedWhitelistDetails}} = this.props;
        value = e.target.value;
        if (poolingContract.existingWhitelistId !== null) {
          const existingWhitelistId = poolingContract.existingWhitelistId;
          const nextWhitelistId = Number(value);
          this.setState({loading: true, poolingContract: {...poolingContract, existingWhitelistId: nextWhitelistId}});
          getUserSavedWhitelistDetails(Number(existingWhitelistId)).then(res => {
            for (const user of res.users) {
              this.removeUserFromWhitelist(user);
            }
            getUserSavedWhitelistDetails(nextWhitelistId).then(res => {
              for (const user of res.users) {
                this.addUserToWhitelist(user);
              }
              this.setState({loading: false});
            });
          });
        } else {
          this.setState({loading: true, poolingContract: {...poolingContract, existingWhitelistId: Number(value)}});
          getUserSavedWhitelistDetails(Number(value)).then(res => {
            for (const user of res.users) {
              this.addUserToWhitelist(user);
            }
            this.setState({loading: false});
          });
        }
        return;
      }
      case "maxContribution":
      case "minContribution":
      case "transactionFee":
        value = Number(e.currentTarget.value);
        break;
      case "isPledgesEnabled":
        value = checked;
        break;
      case "isWhitelistEnabled":
        if (!checked) {
          const {whitelistContext: {getUserSavedWhitelistDetails}} = this.props;
          const existingWhitelistId = poolingContract.existingWhitelistId;
          this.setState({loading: true, poolingContract: {...poolingContract, existingWhitelistId: null, isWhitelistEnabled: false}});
          getUserSavedWhitelistDetails(Number(existingWhitelistId)).then(res => {
            for (const user of res.users) {
              this.removeUserFromWhitelist(user);
            }
            this.setState({loading: false});
          });
          return;
        } else {
          poolingContract = {...poolingContract, existingWhitelistId: null};
          value = checked;
        }
        break;
      default:
        value = e.currentTarget.value;
    }

    this.setState({
      poolingContract: {...poolingContract, [fieldName]: value},
      validation: this.checkValidation(fieldName, value)
    })
  };

  checkValidation = (fieldName: keyof PoolingContract, value: string | number | boolean | PoolingContractBlockChain | EthAddress | WanAddress | undefined | null) => {
    const {validation} = this.state;
    switch (fieldName) {
      case "name":
        return {...validation, isNameValid: Boolean(String(value).length > 2)};
      case "saleAddress":
        return {...validation, isSaleAddressValid: isEthereumAddress(value)};
      case "tokenAddress":
        return {...validation, isTokenAddressValid: isEthereumAddress(value)};
      default:
        return {...validation};
    }
  };

  submitCreatePool = (event: React.FormEvent) => {
    const {
      poolingContext: {createPoolingContract, updatePoolingContract}, id,
      whitelistContext: {
        addUsersToPoolWhitelist,
        removeUsersFromPoolWhitelist
      }
    } = this.props;
    const {poolingContract, originalPoolingContractUsers} = this.state;
    event.preventDefault();
    this.setState({isSubmitting: true});
    if (id) {
      // update users - adding new ones
      const addUsers: Contact[] = [];
      const removeUsers: Contact[] = [];
      poolingContract.whitelistedUsers.forEach(user => {
        originalPoolingContractUsers.findIndex(oUser => oUser.userId === user.userId) === -1 && addUsers.push(user);
      });
      originalPoolingContractUsers.forEach(oUser => {
        poolingContract.whitelistedUsers.findIndex(user => user.userId === oUser.userId) === -1 && removeUsers.push(oUser);
      });
      addUsersToPoolWhitelist(id || 0, addUsers.map(user => ({userId: user.userId, allocation: 0})))
      .then(() => removeUsersFromPoolWhitelist(id || 0, removeUsers.map(user => user.userId))
      .then(() => updatePoolingContract(id, poolingContract).then(res => {
        const {snackBarContext: {snackBarPush}} = this.props;
        if (res === true) {
          snackBarPush({key: new Date().toISOString(), message: "Pool Updated", type: "success"});
          window.location.hash = "pooling";
        } else {
          snackBarPush({key: new Date().toISOString(), message: "Something went wrong", type: "error"});
          window.location.hash = "pooling";
        }
      })));
    } else {
      const userIds = [];
      for (const user of poolingContract.whitelistedUsers) {
        userIds.push(user.userId);
      }
      poolingContract.whitelistUserIds = userIds;
      createPoolingContract(poolingContract).then(res => {
        if (res.success === true) {
          window.location.hash = "pooling";
        }
      });
    }
  };

  clearState = async () => {
    return this.setState({
      poolingContract: setOwnerAddress(this.props, initialPoolingContract),
      originalPoolingContractUsers: [],
      validation: {
        isSaleAddressValid: false,
        isTokenAddressValid: false,
        isNameValid: false
      }
    })
  }
}

export default withStyles(styles)(withPoolingContext(withWhitelistContext(withDialogContext(withSnackBarContext(PoolCreate))))) as React.ComponentClass<OwnProps>;


