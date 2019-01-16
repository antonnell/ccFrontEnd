import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {poolingBlockChainOptions, PoolingContractBlockChain} from "../../../types/pooling";
import MenuItem from "@material-ui/core/MenuItem";
import {EthAddress} from "../../../types/eth";
import {WanAddress} from "../../../types/wan";
import {PoolCreateHandleChange} from "../PoolCreate";

const styles = (theme: Theme) =>
    createStyles({
      title: {
        marginBottom: theme.spacing.unit * 2
      }
    });

interface OwnProps {
  name: string;
  status: number;
  poolId: number | null;
  isNameValid: boolean;
  blockChain: PoolingContractBlockChain,
  ownerAddress: EthAddress | WanAddress | null | undefined;
  ethAddresses: EthAddress[];
  wanAddresses: WanAddress[];
  handleChange: PoolCreateHandleChange;
  saleAddress: string;
  tokenAddress: string;
  isTokenAddressValid: boolean;
  isSaleAddressValid: boolean;
}


interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Settings extends React.Component<Props> {
  public render() {
    const {name, poolId, isNameValid, ownerAddress, blockChain, handleChange, classes, ethAddresses, wanAddresses, tokenAddress, saleAddress, isSaleAddressValid, isTokenAddressValid,status} = this.props;
    const nameError = Boolean(name.length) && !isNameValid;
    const saleAddressError = Boolean(saleAddress.length) && !isSaleAddressValid;
    const tokenAddressError = Boolean(tokenAddress.length) && !isTokenAddressValid;
    return (
        <Grid item xs={12} md={5}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2">Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                autoFocus
                fullWidth
                error={nameError}
                label="Pool Name"
                value={name}
                onChange={handleChange("name")}
                helperText={nameError ? "Pool name should be at least 3 characters" : null}
                InputLabelProps={{shrink: true}}
                placeholder="Example Pool"
            />
          </Grid>
          <Grid item xs={12}>
            {poolId ? <TextField
                    required
                    fullWidth
                    label="Blockchain"
                    value={blockChain}
                    InputLabelProps={{shrink: true}}
                    disabled
                    margin="normal"
                /> :
                <FormControl fullWidth required margin="normal">
                  <InputLabel shrink={true}>Blockchain</InputLabel>
                  <Select fullWidth value={blockChain} onChange={handleChange("blockchain")}>
                    {poolingBlockChainOptions.map(option => {
                      return (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
            }
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required margin="normal" disabled={status > 0}>
              <InputLabel shrink={true}>Owner Address</InputLabel>
              <Select fullWidth value={(ownerAddress as EthAddress).address !== undefined ? (ownerAddress as EthAddress).address : (ownerAddress as WanAddress).publicAddress}
                      onChange={handleChange("ownerAddress")}>
                {blockChain === "ETH" ? ethAddresses.map(address =>
                    <MenuItem key={address.address} value={address.address}>{address.name}</MenuItem>
                ) : wanAddresses.map(address =>
                    <MenuItem key={address.publicAddress} value={address.publicAddress}>{address.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
                required
                fullWidth
                disabled={status > 0}
                error={saleAddressError}
                label="Sale Address"
                value={saleAddress}
                margin="normal"
                onChange={handleChange("saleAddress")}
                helperText={saleAddressError ? "Invalid address provided" : null}
                InputLabelProps={{shrink: true}}
                placeholder="0xA57E3290D0b7cb2748Ed410C19c1D58F7F192bc0"
            />
            <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  disabled={status > 0}
                  error={tokenAddressError}
                  label="Token Address"
                  value={tokenAddress}
                  margin="normal"
                  onChange={handleChange("tokenAddress")}
                  helperText={tokenAddressError ? "Invalid address provided" : null}
                  InputLabelProps={{shrink: true}}
                  placeholder="0xA57E3290D0b7cb2748Ed410C19c1D58F7F192bc0"
              />
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(Settings) as React.ComponentClass<OwnProps>;
