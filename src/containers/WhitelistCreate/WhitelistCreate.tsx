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
import {Contact} from "../../types/contacts";
import {WithWhitelistContext, withWhitelistContext} from "../../context/WhitelistContext";
import {DeleteIcon} from "../../theme/icons";
import Fab from "@material-ui/core/Fab";
import {WithDialogContext, withDialogContext} from "../../context/DialogContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      marginTop: theme.spacing.unit * 5
    },
    buttonGrid: {
      marginTop: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit
    },
    buttonSpacing: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
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
  },
  originalWhitelist: Whitelist;
  loading: boolean;
  isSubmitting: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithWhitelistContext, WithDialogContext {
}

class WhitelistCreate extends React.Component<Props, State> {
  readonly state: State = {
    whitelist: initialWhitelist,
    validation: {
      isNameValid: false,
    },
    originalWhitelist: initialWhitelist,
    isSubmitting: false,
    loading: false
  };

  componentWillMount(): void {
    const {id, whitelistContext: {getUserSavedWhitelistDetails}} = this.props;
    if (id) {
      this.setState({loading: true});
      getUserSavedWhitelistDetails(id).then(whitelist => this.setState(
        {
          whitelist,
          validation: {isNameValid: true}, originalWhitelist: {...whitelist, users: [...whitelist.users]},
          loading: false
        }));
    }
  }

  componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void {
    const {
      dialogContext: {
        result,
        action,
        reset
      },
      whitelistContext: {
        deleteSavedWhitelist
      },
      id
    } = nextProps;
    if (result !== "pending" && action === "deleteWhitelist") {
      reset();
      if (result === "confirmed") {
        this.setState({isSubmitting: true});
        deleteSavedWhitelist(id || 0).then(() => {
          this.clearState().then(() => {
            window.location.hash = "pooling";
          });
        })
      }
    }
  }

  render() {
    const {classes, id} = this.props;
    const {
      loading,
      isSubmitting,
      whitelist: {
        name,
        users
      },
      validation: {
        isNameValid
      }
    } = this.state;
    return (
      <React.Fragment>
        <Header title={`${id ? "Update" : "Create"} Whitelist`} headerItems={headerItems.poolCreate} loading={loading || isSubmitting} />
        <Grid container justify="space-between" className={classes.containerGrid}>
          <Settings
            loading={loading || isSubmitting}
            name={name}
            isNameValid={isNameValid}
            handleChange={this.handleChange}
          />
          <AddUsers addUserToWhitelist={this.addUserToWhitelist} loading={loading || isSubmitting} />
          <AddedUsers users={users} removeUserFromWhitelist={this.removeUserFromWhitelist} loading={loading || isSubmitting}/>
          <Grid item xs={12} className={classes.buttonGrid}>
            <Grid container justify="flex-end">
              <Button
                className={classes.buttonSpacing}
                disabled={!isNameValid || loading || isSubmitting}
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                onClick={this.submitCreateWhitelist}
              >
                {id ? "Update" : "Create"} Whitelist
                {isSubmitting && <CircularProgress size={20} style={{position: "absolute"}} />}
              </Button>
              {id && <Fab aria-label="Delete" className={classes.buttonSpacing} size="small" onClick={this.removeWhitelist} disabled={loading || isSubmitting}>
                <DeleteIcon />
              </Fab>}
              <Button
                className={classes.buttonSpacing}
                disabled={loading || isSubmitting}
                variant="outlined"
                size="large"
                color="secondary"
                onClick={this.cancelUpdate}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  cancelUpdate = () => {
    this.clearState().then(() => {
      window.location.hash = "pooling";
    });
  };

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

  addUserToWhitelist = (contact: Contact) => {
    const {whitelist} = this.state;
    const users = whitelist.users;
    users.findIndex(user => user.userId === contact.userId) === -1 && users.push(contact);
    this.setState({whitelist: {...whitelist, users: [...users]}});
  };

  removeUserFromWhitelist = (contact: Contact) => {
    const {whitelist} = this.state;
    const users = whitelist.users;
    const index = users.findIndex(user => user.userId === contact.userId);
    index !== -1 && users.splice(index, 1);
    this.setState({whitelist: {...whitelist, users: [...users]}});
  };


  submitCreateWhitelist = (event: React.FormEvent) => {
    event.preventDefault();
    const {whitelistContext: {createSavedWhitelist, addUsersToSavedWhitelist, removeUsersFromSavedWhitelist, updateSavedWhitelist}, id} = this.props;
    const {whitelist, originalWhitelist} = this.state;
    this.setState({isSubmitting: true});
    if (id) {
      // update users - adding new ones
      const addUsers: Contact[] = [];
      const removeUsers: Contact[] = [];
      whitelist.users.forEach(user => {
        originalWhitelist.users.findIndex(oUser => oUser.userId === user.userId) === -1 && addUsers.push(user);
      });
      originalWhitelist.users.forEach(oUser => {
        whitelist.users.findIndex(user => user.userId === oUser.userId) === -1 && removeUsers.push(oUser);
      });
      addUsersToSavedWhitelist(whitelist.id || 0, addUsers.map(user => user.userId))
      .then(() => removeUsersFromSavedWhitelist(whitelist.id || 0, removeUsers.map(user => user.userId))
      .then(() => updateSavedWhitelist(whitelist)
      .then(() => {
        this.clearState().then(() => {
          window.location.hash = "pooling";
        });
      })))
    } else {
      createSavedWhitelist(whitelist).then(() => {
        this.clearState().then(() => {
          window.location.hash = "pooling";
        });
      });
    }
  };

  removeWhitelist = () => {
    const {dialogContext: {showDialog}} = this.props;
    showDialog("confirmation", "deleteWhitelist");
  };

  clearState = async () => {
    return this.setState({whitelist: initialWhitelist, originalWhitelist: initialWhitelist, validation: {isNameValid: false}})
  }
}

export default withStyles(styles)(withWhitelistContext(withDialogContext(WhitelistCreate))) as React.ComponentClass<OwnProps>;
