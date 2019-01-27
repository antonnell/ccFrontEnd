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

interface OwnProps {
  pool: FundingPool | null;
  open: boolean;
  onClose: ()=>void;
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
}

interface State {
  amount: number | undefined;
  isSubmitting: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      minWidth: 80,
      color: colors.dark
    },
    buttonSpacer: {
      margin: theme.spacing.unit
    },
  });

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

class PoolPledgeDialog extends React.Component<Props,State> {
  readonly state: State = {
    amount: undefined,
    isSubmitting: false,
  };

  public render() {
    const {pool,open,classes} = this.props;
    const {blockchain} = pool || initialPoolingContract;
    const {amount,isSubmitting} = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {pool !== null &&
        <React.Fragment>
          <DialogTitle id="form-dialog-title">Pledge Amount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please supply the amount you would like to pledge
            </DialogContentText>
            <TextField
              autoFocus
              disabled={isSubmitting}
              required
              fullWidth
              label="Pledge Amount"
              value={amount||0}
              onChange={this.handleChange}
              margin="normal"
              InputLabelProps={{shrink: true}}
              placeholder="5"
              inputProps={{type: "number"}}
              InputProps={{endAdornment: <Typography>{blockchain}</Typography>}}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={isSubmitting} variant="contained" color="secondary" className={classes.button} size="small" onClick={this.handleClose}>
              Cancel
            </Button>
            <div className={classes.buttonSpacer} />
            <Button
              variant="outlined"
              disabled={amount === undefined || amount < 1 || isSubmitting}
              className={classes.button} color="secondary" size="small" onClick={this.handleSubmit}>
              Pledge
              {isSubmitting && <CircularProgress size={20} style={{position: "absolute"}}/>}
            </Button>
          </DialogActions>
        </React.Fragment>
        }
      </Dialog>
    );
  }

  handleSubmit = () => {
    const {wanAddresses,ethAddresses,pool,
      poolingContext: {
      pledgeToPoolingContract
    }} = this.props;
    const {amount} = this.state;
    this.setState({isSubmitting:true});
    if (pool !== null && amount !== undefined) {
      pledgeToPoolingContract(pool.id,pool.blockchain === "WAN"?wanAddresses[0].publicAddress:ethAddresses[0].address,amount).then(res=>{
        console.log(res);
        this.setState({isSubmitting:false});
        this.handleClose();
      });
    }
  };

  handleClose = () => {
    const {onClose} = this.props;
    this.setState({isSubmitting: false,amount:undefined});
    onClose();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({amount: Number(event.currentTarget.value)})
  }

}

export default withStyles(styles)(withPoolingContext(PoolPledgeDialog)) as React.ComponentClass<OwnProps>;
