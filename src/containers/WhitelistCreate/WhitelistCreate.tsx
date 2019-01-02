import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import headerItems from "../../constants/HeaderItems";
import {Button, Theme, WithStyles} from "@material-ui/core";
import {EthAddress} from "../../types/eth";
import {WanAddress} from "../../types/wan";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Settings from "./components/Settings";
import {initialWhitelist, Whitelist} from "../../types/whitelist";
import AddUsers from "./components/AddUsers";
import AddedUsers from "./components/AddedUsers";
import {WithContactsContext, withContactsContext} from "../../context/ContactsContext";

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
export type WhitelistCreateHandleChange = (fieldName: keyof Whitelist) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

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

interface Props extends OwnProps, WithStyles<typeof styles>, WithContactsContext {
}

class WhitelistCreate extends React.Component<Props, State> {
  readonly state: State = {
    whitelist: initialWhitelist,
    validation: {
      isNameValid: false,
    }
  };

  // componentWillMount(): void {
  //   const {contactsContext:{searchContacts}} = this.props;
  //   searchContacts("a7e6ff26-8380-4be2-83c4-97fa55308f6a").then(contacts=>console.log(contacts));
  // }

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

  private handleChange = (fieldName: keyof Whitelist) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {whitelist} = this.state;
    let value;

    switch (fieldName) {
      default:
        value = e.currentTarget.value;
    }

    this.setState({
      whitelist: {...whitelist, [fieldName]: value},
      validation: this.checkValidation(fieldName, value)
    })
  };

  private checkValidation = (fieldName: keyof Whitelist, value: string) => {
    const {validation} = this.state;
    switch (fieldName) {
      case "name":
        return {...validation, isNameValid: Boolean(String(value).length > 2)};
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

export default withStyles(styles)(withContactsContext(WhitelistCreate)) as React.ComponentClass<OwnProps>;
