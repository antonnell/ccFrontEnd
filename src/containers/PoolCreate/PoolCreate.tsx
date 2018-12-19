import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import HeaderItems from "../../constants/HeaderItems";
import Settings from "./components/Settings";
import {Button, Theme, WithStyles} from "@material-ui/core";
import {initialPoolingContract, PoolingContract, PoolingContractBlockChain} from "../../types/pooling";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import Options from "./components/Options";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Allocations from "./components/Allocations";
import isEthereumAddress from "is-ethereum-address";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";

const styles = (theme: Theme) =>
    createStyles({
      containerGrid: {
        paddingRight: theme.spacing.unit * 3
      }
    });
export type PoolCreateHandleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

interface OwnProps {
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[]
}

interface State {
  poolingContract: PoolingContract;
  validation: {
    isNameValid: boolean;
    isSaleAddressValid: boolean;
    isTokenAddressValid: boolean;
  }
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

const setOwnerAddress = (props: Props, poolingContract: PoolingContract) => {
  const ownerAddress: EthAddress | WanAddress = poolingContract.blockChain === "ETH" ? props.ethAddresses[0] : props.wanAddresses[0];
  return {...poolingContract, ownerAddress: ownerAddress}
};

class PoolCreate extends React.Component<Props, State> {
  readonly state: State = {
    poolingContract: setOwnerAddress(this.props, initialPoolingContract),
    validation: {
      isNameValid: true,
      isSaleAddressValid: true,
      isTokenAddressValid: true,
    }
  };

  render() {
    const {ethAddresses, wanAddresses, classes} = this.props;
    const {
      poolingContract: {
        saleAddress, tokenAddress, transactionFee, blockChain, ownerAddress, name, isPledgesEnabled, pledgesEndDate, minContribution, maxContribution
      },
      validation: {
        isNameValid, isTokenAddressValid, isSaleAddressValid
      }
    } = this.state;
    const canSubmit = isNameValid && isSaleAddressValid && isTokenAddressValid;
    return (
        <form onSubmit={this.submitCreatePool}>
          <Grid container justify="space-between" className={classes.containerGrid}>
            <Header title="Create Pool" headerItems={HeaderItems.poolCreate} />
            <Settings
                name={name}
                isNameValid={isNameValid}
                blockChain={blockChain}
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
                isPledgesEnabled={isPledgesEnabled}
                pledgesEndDate={pledgesEndDate}
                handleChange={this.handleChange}
            />
            <Allocations
                minContribution={minContribution}
                maxContribution={maxContribution}
                transactionFee={transactionFee}
                handleChange={this.handleChange}
            />
            {/*<Grid item md={ 5 } />*/}
            {/*<AddUsers />*/}
            {/*<CustomList />*/}
            {/*<AddedUsers />*/}
            <Grid container item justify="flex-end">
              <Button
                  disabled={!canSubmit}
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  onClick={this.submitCreatePool}
              >
                CREATE POOL
              </Button>
            </Grid>
          </Grid>
        </form>
    );
  }

  private handleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, checked?: boolean) => {
    let poolingContract = {...this.state.poolingContract};
    let value;
    switch (fieldName) {
      case "ownerAddress": {
        const {ethAddresses, wanAddresses} = this.props;
        value = poolingContract.blockChain === "ETH" ?
            ethAddresses.find(address => address.address === e.target.value) :
            wanAddresses.find(address => address.publicAddress === e.target.value);
        break;
      }
      case "blockChain": {
        value = e.target.value;
        poolingContract = {...poolingContract, blockChain: value as PoolingContractBlockChain};
        poolingContract = setOwnerAddress(this.props, poolingContract);
        break;
      }
      case "existingWhitelistId":
      case "maxContribution":
      case "minContribution":
      case "transactionFee":
        value = Number(e.currentTarget.value);
        break;
      case "isPledgesEnabled":
      case "isWhitelistEnabled":
        value = checked;
        break;
      default:
        value = e.currentTarget.value;
    }

    this.setState({
      poolingContract: {...poolingContract, [fieldName]: value},
      validation: this.checkValidation(fieldName, value)
    })
  };

  private checkValidation = (fieldName: keyof PoolingContract, value: string | number | boolean | PoolingContractBlockChain | EthAddress | WanAddress | undefined | null) => {
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
    const {poolingContext: {createPoolingContract}} = this.props;
    const {poolingContract} = this.state;
    event.preventDefault();
    console.log('SubmitCreatePool...');
    createPoolingContract(poolingContract);
  }
}

export default withStyles(styles)(withPoolingContext(PoolCreate)) as React.ComponentClass<OwnProps>;
