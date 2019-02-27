import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {Contact} from "../../../types/contacts";
import Chip from "@material-ui/core/Chip";

const styles = (theme: Theme) =>
    createStyles({
      outerGrid: {
        marginTop: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit
      },
      card: {
        marginTop: theme.spacing.unit * 1.5,
        padding: theme.spacing.unit,
        minHeight: 200,
      },
      chips: {
        margin: theme.spacing.unit
      }
    });

interface OwnProps {
  users: Contact[]
  removeUserFromWhitelist: (contact: Contact) => void;
  loading: boolean;
  status: number;
  totalTokensReceived: number;
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class AddedUsers extends React.Component<Props> {
  public render() {
    const {classes, users,loading,status,totalTokensReceived} = this.props;
    return (
        <Grid item xs={12} className={classes.outerGrid}>
          <Grid item xs={12}>
            <Typography variant="h2">Added Users</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              {users.map((user, i) => {
                return (
                    <Chip key={i} label={user.userName} color="primary"
                          onDelete={(status === 10 || loading || totalTokensReceived > 0)?undefined:this.removeUser(user)} className={classes.chips}
                    />
                );
              })}
            </Card>
          </Grid>
        </Grid>
    );
  }

  removeUser = (contact: Contact) => () => {
    const {removeUserFromWhitelist} = this.props;
    removeUserFromWhitelist(contact);
  }
}

// @ts-ignore
export default withStyles(styles)(AddedUsers) as React.ComponentClass<OwnProps>;
