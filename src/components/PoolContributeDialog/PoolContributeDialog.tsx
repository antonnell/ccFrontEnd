import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {FundingPool, initialPoolingContract} from "../../types/pooling";
import {colors} from "../../theme";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {WithSnackBarContext, withSnackBarContext} from "../../context/SnackBarContext";

interface OwnProps {
  pool: FundingPool | null;
  open: boolean;
  onClose: () => void;
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
}

interface State {
  amount: number | undefined;
  gwei: number | undefined;
  walletId: number | null;
  isSubmitting: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      minWidth: 100,
      color: colors.dark
    },
    buttonSpacer: {
      margin: theme.spacing.unit
    },
    balanceText: {
      minHeight: 50,
      display: "flex",
      flex: 1,
      alignItems: "center",
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit
    }
  });

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext,WithSnackBarContext {
}

class PoolContributeDialog extends React.Component<Props, State> {
  readonly state: State = {
    amount: undefined,
    gwei: 2,
    walletId: null,
    isSubmitting: false,
  };

  public render() {
    const {pool, open, classes, ethAddresses, wanAddresses} = this.props;
    const {blockchain} = pool || initialPoolingContract;
    const {amount, isSubmitting, walletId,gwei} = this.state;
    const wallets = blockchain === "ETH" ? ethAddresses.map(address => (
      {
        id: address.id,
        address: address.address,
        balance: address.balance,
        name: address.name
      })) : wanAddresses.map(address => (
      {
        id: address.id,
        address: address.publicAddress,
        balance: address.balance,
        name: address.name
      }));
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {pool !== null &&
        <React.Fragment>
          <DialogTitle id="form-dialog-title">Contribute</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please choose a wallet and the amount you would like to contribute
            </DialogContentText>
            <Grid container spacing={40} style={{marginTop: 8}}>
              <Grid item xs={6}>
                <Typography variant="h5">Wallet</Typography>
                <FormControl fullWidth required margin="normal">
                  <InputLabel shrink={true}>Wallet</InputLabel>
                  <Select fullWidth value={walletId || 0}
                          onChange={this.handleChange("walletId")}>
                    {wallets.map((wallet,index) =>
                      <MenuItem key={wallet.id} value={index}>{wallet.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">Balance</Typography>
                <Typography variant="body1" className={classes.balanceText}>{wallets[walletId||0].balance} {blockchain}</Typography>
              </Grid>
            </Grid>
            <TextField
              autoFocus
              disabled={isSubmitting}
              required
              fullWidth
              label="Contribute Amount"
              value={amount || ""}
              onChange={this.handleChange("amount")}
              margin="normal"
              InputLabelProps={{shrink: true}}
              placeholder="5"
              inputProps={{type: "number"}}
              InputProps={{endAdornment: <Typography>{blockchain}</Typography>}}
              helperText={`You are allowed to contribute between ${pool.minContribution} and ${pool.maxContribution} ${pool.blockchain}`}
            />
            {blockchain === "ETH" &&
            <TextField
              disabled={isSubmitting}
              required
              fullWidth
              label="Gas Limit"
              value={gwei || ""}
              onChange={this.handleChange("gwei")}
              margin="normal"
              InputLabelProps={{shrink: true}}
              placeholder="5"
              inputProps={{type: "number"}}
              InputProps={{endAdornment: <Typography>GWEI</Typography>}}
            />}
          </DialogContent>
          <DialogActions>
            <Button disabled={isSubmitting} variant="contained" color="secondary" className={classes.button} size="small" onClick={this.handleClose}>
              Cancel
            </Button>
            <div className={classes.buttonSpacer} />
            <Button
              variant="outlined"
              disabled={amount === undefined || amount === 0 || isSubmitting}
              className={classes.button} color="secondary" size="small" onClick={this.handleSubmit}>
              Contribute
              {isSubmitting && <CircularProgress size={20} style={{position: "absolute"}} />}
            </Button>
          </DialogActions>
        </React.Fragment>
        }
      </Dialog>
    );
  }

  handleSubmit = () => {
    const {
      wanAddresses, ethAddresses, pool,
      poolingContext: {
        depositToPoolingContract
      },
      snackBarContext: {
        snackBarPush
      }
    } = this.props;
    const {amount,walletId,gwei} = this.state;
    this.setState({isSubmitting: true});
    if (pool !== null && amount !== undefined) {
      depositToPoolingContract(
        pool.id,
        pool.blockchain === "WAN" ? wanAddresses[walletId||0].publicAddress : ethAddresses[walletId||0].address,
        amount,pool.blockchain === "ETH"?gwei||0:0).then(res => {
        snackBarPush({key: new Date().toISOString(), message: !res.success?res.message:"Deposit successful", type: !res.success?"error":"success"});
        this.setState({isSubmitting: false});
        this.handleClose();
      });
    }
  };

  handleClose = () => {
    const {onClose} = this.props;
    this.setState({isSubmitting: false, amount: undefined,walletId: null});
    onClose();
  };

  handleChange = (field: keyof State) => (event: React.ChangeEvent<any>) => {
    switch (field) {
      case "walletId":
        this.setState({walletId: event.target.value});
        break;
      case "amount":
        this.setState({amount: event.currentTarget.value});
        break;
      case "gwei":
        this.setState({gwei: event.currentTarget.value});
        break;
    }
  }

}

export default withStyles(styles)(withPoolingContext(withSnackBarContext(PoolContributeDialog))) as React.ComponentClass<OwnProps>;
