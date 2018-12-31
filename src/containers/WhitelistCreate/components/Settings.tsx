import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {WhitelistCreateHandleChange} from "../WhitelistCreate";

const styles = (theme: Theme) =>
    createStyles({
      title: {
        marginBottom: theme.spacing.unit * 2
      }
    });

interface OwnProps {
  name: string;
  isNameValid: boolean;
  handleChange: WhitelistCreateHandleChange;
}


interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Settings extends React.Component<Props> {
  public render() {
    const {name, isNameValid,classes,handleChange} = this.props;
    const nameError = Boolean(name.length) && !isNameValid;
    return (
        <Grid item xs={12} md={5}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2">List Name</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
                required
                autoFocus
                fullWidth
                error={nameError}
                label="List Name"
                value={name}
                onChange={handleChange("name")}
                helperText={nameError ? "List name should be at least 3 characters" : null}
                InputLabelProps={{shrink: true}}
                placeholder="Example List"
            />
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(Settings) as React.ComponentClass<OwnProps>;
