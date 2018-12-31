import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import headerItems from "../../constants/HeaderItems";
import {Button, Theme, WithStyles} from "@material-ui/core";
import {PoolingContract, PoolingContractBlockChain} from "../../types/pooling";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import isEthereumAddress from "is-ethereum-address";
import Settings from "./components/Settings";
import {initialWhitelist, Whitelist} from "../../types/whitelist";
import AddUsers from "./components/AddUsers";
import AddedUsers from "./components/AddedUsers";

const styles = (theme: Theme) =>
    createStyles({
      containerGrid: {
        marginTop: theme.spacing.unit * 5
      },
      buttonGrid: {
        marginTop: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit
      }
    });
export type WhitelistCreateHandleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

interface OwnProps {
  ethAddresses: EthAddress[],
  wanAddresses: WanAddress[],
  id: number | null
}

interface State {
  whitelist: Whitelist;
  validation: {
    isNameValid: boolean;
  }
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class WhitelistCreate extends React.Component<Props, State> {
  readonly state: State = {
    whitelist: initialWhitelist,
    validation: {
      isNameValid: false,
    }
  };

  render() {
    const {classes, id} = this.props;
    const {
      whitelist: {
        name
      },
      validation: {
        isNameValid
      }
    } = this.state;
    return (
        <form onSubmit={this.submitCreatePool}>
          <Header title="Create Whitelist" headerItems={headerItems.poolCreate} />
          <Grid container justify="space-between" className={classes.containerGrid}>
            <Settings
                name={name}
                isNameValid={isNameValid}
                handleChange={this.handleChange}
            />
            <AddUsers />
            <AddedUsers />
            <Grid item xs={12} className={classes.buttonGrid}>
              <Grid container justify="flex-end">
                <Button
                    disabled={!isNameValid}
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                    onClick={this.submitCreatePool}
                >
                  {id ? "Update" : "Create"} Whitelist
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
    );
  }

  private handleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, checked?: boolean) => {
    // let poolingContract = {...this.state.poolingContract};
    // let value;
    // switch (fieldName) {
    //   case "ownerAddress": {
    //     const {ethAddresses, wanAddresses} = this.props;
    //     value = poolingContract.blockchain === "ETH" ?
    //         ethAddresses.find(address => address.address === e.target.value) :
    //         wanAddresses.find(address => address.publicAddress === e.target.value);
    //     break;
    //   }
    //   case "blockchain": {
    //     value = e.target.value;
    //     poolingContract = {...poolingContract, blockchain: value as PoolingContractBlockChain};
    //     poolingContract = setOwnerAddress(this.props, poolingContract);
    //     break;
    //   }
    //   case "existingWhitelistId":
    //   case "maxContribution":
    //   case "minContribution":
    //   case "transactionFee":
    //     value = Number(e.currentTarget.value);
    //     break;
    //   case "isPledgesEnabled":
    //   case "isWhitelistEnabled":
    //     value = checked;
    //     break;
    //   default:
    //     value = e.currentTarget.value;
    // }
    //
    // this.setState({
    //   poolingContract: {...poolingContract, [fieldName]: value},
    //   validation: this.checkValidation(fieldName, value)
    // })
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
    //   const {poolingContext: {createPoolingContract, updatePoolingContract}, id} = this.props;
    //   const {poolingContract} = this.state;
    //   event.preventDefault();
    //   console.log('SubmitCreatePool...');
    //   id ? updatePoolingContract(id, poolingContract).then(res => {
    //         if (res.success === true) {
    //           window.location.hash = "pooling";
    //         }
    //       }) :
    //       createPoolingContract(poolingContract).then(res => {
    //         if (res.success === true) {
    //           window.location.hash = "pooling";
    //         }
    //       });
  }
}

export default withStyles(styles)(WhitelistCreate) as React.ComponentClass<OwnProps>;
