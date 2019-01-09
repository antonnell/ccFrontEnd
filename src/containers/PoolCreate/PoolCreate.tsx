import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import headerItems from "../../constants/HeaderItems";
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
import {User} from "../../types/account";
import AddedUsers from "./components/AddedUsers";
import {Contact} from "../../types/contacts";
import AddUsers from "./components/AddUsers";
import {WithWhitelistContext, withWhitelistContext} from "../../context/WhitelistContext";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      marginTop: theme.spacing.unit * 5
    },
    buttonGrid: {
      marginTop: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4,
    },
  });

export type PoolCreateHandleChange = (fieldName: keyof PoolingContract) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

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
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext, WithWhitelistContext {
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
    originalPoolingContractUsers: []
  };

  componentWillMount(): void {
    const {id, poolingContext: {getManagedFundingPoolDetails}, wanAddresses, ethAddresses} = this.props;
    id && getManagedFundingPoolDetails(id).then(poolingContract => {
      poolingContract.ownerAddress = (poolingContract.blockchain === "WAN" ? wanAddresses.find(v => v.publicAddress === (poolingContract.ownerAddress as unknown as string)) :
        ethAddresses.find(v => v.address === (poolingContract.ownerAddress as unknown as string)));
      poolingContract.pledgesEndDate = moment(poolingContract.pledgesEndDate).format("YYYY-MM-DD");
      this.setState({poolingContract, validation: {isNameValid: true, isTokenAddressValid: true, isSaleAddressValid: true}, originalPoolingContractUsers: [...poolingContract.whitelistedUsers]});
    });
  }

  render() {
    const {ethAddresses, wanAddresses, classes, id, user} = this.props;
    const {
      poolingContract: {
        saleAddress, tokenAddress, transactionFee, blockchain, ownerAddress, name, isPledgesEnabled, pledgesEndDate, minContribution, maxContribution, isWhitelistEnabled, existingWhitelistId, whitelistedUsers
      },
      validation: {
        isNameValid, isTokenAddressValid, isSaleAddressValid
      }
    } = this.state;
    const canSubmit = isNameValid && isSaleAddressValid && isTokenAddressValid;
    return (
      <React.Fragment>
        <Header title={id ? "Update Pool" : "Create Pool"} headerItems={headerItems.poolCreate} />
        <Grid container justify="space-between" className={classes.containerGrid}>
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
            id={id}
            user={user}
            existingWhitelistId={existingWhitelistId}
            isWhitelistEnabled={isWhitelistEnabled}
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
          {id && <AddUsers addUserToWhitelist={this.addUserToWhitelist} />}
          {id && <AddedUsers users={whitelistedUsers} removeUserFromWhitelist={this.removeUserFromWhitelist} />}
          <Grid container item justify="flex-end" className={classes.buttonGrid}>
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
      </React.Fragment>
    );
  }

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
      case "existingWhitelistId": {
        value = e.target.value;
        break;
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
        poolingContract = {...poolingContract, existingWhitelistId: null};
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
    const {
      poolingContext: {createPoolingContract, updatePoolingContract}, id,
      whitelistContext: {
        addUsersToPoolWhitelist,
        removeUsersFromPoolWhitelist
      }
    } = this.props;
    const {poolingContract, originalPoolingContractUsers} = this.state;
    event.preventDefault();
    console.log('SubmitCreatePool...');
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
      console.log("addUsers", addUsers);
      console.log("removeUsers", removeUsers);
      addUsersToPoolWhitelist(id || 0, addUsers.map(user => ({userId: user.userId, allocation: 0})))
      .then(() => removeUsersFromPoolWhitelist(id || 0, removeUsers.map(user => user.userId))
      .then(() => updatePoolingContract(id, poolingContract).then(res => {
        if (res.success === true) {
          window.location.hash = "pooling";
        }
      })));
    } else {
      createPoolingContract(poolingContract).then(res => {
        if (res.success === true) {
          window.location.hash = "pooling";
        }
      });
    }

  }
}

export default withStyles(styles)(withPoolingContext(withWhitelistContext(PoolCreate))) as React.ComponentClass<OwnProps>;
