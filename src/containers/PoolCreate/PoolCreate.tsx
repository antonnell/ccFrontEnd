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
import moment from "moment";

const styles = (theme: Theme) =>
    createStyles({
      containerGrid: {
        paddingRight: theme.spacing.unit * 3
      }
    });
export type PoolCreateHandleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

interface OwnProps {
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
  id: number | null
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
  const ownerAddress: EthAddress | WanAddress = poolingContract.blockchain === "ETH" ? props.ethAddresses[0] : props.wanAddresses[0];
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

  componentWillMount(): void {
    const {id, poolingContext: {getManagedFundingPoolDetails}, wanAddresses, ethAddresses} = this.props;
    id && getManagedFundingPoolDetails(id).then(poolingContract => {
      poolingContract.ownerAddress = (poolingContract.blockchain === "WAN" ? wanAddresses.find(v => v.publicAddress === (poolingContract.ownerAddress as unknown as string)) :
          ethAddresses.find(v => v.address === (poolingContract.ownerAddress as unknown as string)));
      console.log(poolingContract);
      poolingContract.pledgesEndDate = moment(poolingContract.pledgesEndDate).format("YYYY-MM-DD");
      this.setState({poolingContract});
    });
  }

  render() {
    const {ethAddresses, wanAddresses, classes, id} = this.props;
    const {
      poolingContract: {
        saleAddress, tokenAddress, transactionFee, blockchain, ownerAddress, name, isPledgesEnabled, pledgesEndDate, minContribution, maxContribution
      },
      validation: {
        isNameValid, isTokenAddressValid, isSaleAddressValid
      }
    } = this.state;
    const canSubmit = isNameValid && isSaleAddressValid && isTokenAddressValid;
    console.log(pledgesEndDate);
    return (
        <form onSubmit={this.submitCreatePool}>
          <Grid container justify="space-between" className={classes.containerGrid}>
            <Header title={id ? "Update Pool" : "Create Pool"} headerItems={HeaderItems.poolCreate} />
            <Settings
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
                {id ? "UPDATE" : "CREATE"} POOL
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
    const {poolingContext: {createPoolingContract, updatePoolingContract}, id} = this.props;
    const {poolingContract} = this.state;
    event.preventDefault();
    console.log('SubmitCreatePool...');
    id ? updatePoolingContract(id, poolingContract).then(res => {
          if (res.success === true) {
            window.location.hash = "pooling";
          }
        }) :
        createPoolingContract(poolingContract).then(res => {
          if (res.success === true) {
            window.location.hash = "pooling";
          }
        });
  }
}

export default withStyles(styles)(withPoolingContext(PoolCreate)) as React.ComponentClass<OwnProps>;
