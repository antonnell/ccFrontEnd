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
  }
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

const setOwnerAddress = (props: Props, poolingContract: PoolingContract) => {
  const ownerAddress: EthAddress | WanAddress = poolingContract.blockChain === "ETH" ? props.ethAddresses[0] : props.wanAddresses[0];
  return {...poolingContract, ownerAddress: ownerAddress}
};

class PoolCreate extends React.Component<Props, State> {
  readonly state: State = {
    poolingContract: setOwnerAddress(this.props, initialPoolingContract),
    validation: {
      isNameValid: false,
    }
  };

  render() {
    const {ethAddresses, wanAddresses,classes} = this.props;
    const {
      poolingContract: {transactionFee,blockChain, ownerAddress, name,isPledgesEnabled,pledgesEndDate,minContribution,maxContribution},
      validation: {isNameValid}
    } = this.state;
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

  private handleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,checked?:boolean) => {
    let poolingContract = {...this.state.poolingContract};
    let value;
    switch (fieldName) {
      case "ownerAddress": {
        const {ethAddresses,wanAddresses} = this.props;
        value = poolingContract.blockChain === "ETH"?
            ethAddresses.find(address=>address.address===e.target.value):
            wanAddresses.find(address=>address.publicAddress===e.target.value);
        break;
      }
      case "blockChain": {
        value = e.target.value;
        poolingContract = {...poolingContract, blockChain: value as PoolingContractBlockChain};
        poolingContract = setOwnerAddress(this.props,poolingContract);
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

  private checkValidation = (fieldName: keyof PoolingContract, value: string | number | boolean | PoolingContractBlockChain | EthAddress| WanAddress | undefined | null) => {
    const {validation} = this.state;
    switch (fieldName) {
      case "name":
        return {...validation, isNameValid: Boolean(String(value).length > 2)};
      default:
        return {...validation};
    }
  };

  private submitCreatePool(event: React.FormEvent) {
    event.preventDefault();
    console.log('SubmitCreatePool...');
    if (this.validate()) {
      // let error = false;
      //do some validation. /care

      //get primary eth address
      // let primaryEthAddress = this.props.ethAddresses.filter(add => {
      //   return add.isPrimary;
      // });
      // if (!error) {
      //   this.setState({ loading: true, error: null });
      //   console.log(this.state);
      //   const content = this.state;
      //   content.primaryEthAddress = primaryEthAddress[0].address;
      //   console.log(content);
      //   // poolingDispatcher.dispatch({
      //   //   type: 'createPoolingContract',
      //   //   content,
      //   //   token: this.props.user.token
      //   // });
      // }
    }
  }

  private validate = () => {
    //const { poolName } = this.state;
    //poolName.length > 3 && true
    return true;
  }
}

export default withStyles(styles)(PoolCreate) as React.ComponentClass<OwnProps>;
