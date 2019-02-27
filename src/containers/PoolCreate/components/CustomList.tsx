import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {PoolCreateHandleChange} from "../PoolCreate";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {WithWhitelistContext, withWhitelistContext} from "../../../context/WhitelistContext";
import {User} from "../../../types/account";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const styles = (theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing.unit * 2
    },
    separator: {
      marginTop: theme.spacing.unit * 5,
    }
  });

interface OwnProps {
  isWhitelistEnabled: boolean;
  existingWhitelistId: number | null;
  handleChange: PoolCreateHandleChange;
  user: User;
  id: number | null;
  loading: boolean;
}


interface Props extends OwnProps, WithStyles<typeof styles>, WithWhitelistContext {
}

class CustomList extends React.Component<Props> {

  componentWillMount(): void {
    const {whitelistContext: {getUserSavedWhitelists}, user} = this.props;
    getUserSavedWhitelists(user.id).then();
  }

  public render() {
    const {
      handleChange, classes, isWhitelistEnabled, existingWhitelistId, id,
      whitelistContext: {
        whitelists
      },
      loading
    } = this.props;
    return (
      <React.Fragment >
        {id === null && whitelists.length !== 0 &&
        <Grid item xs={12} md={6} className={classes.separator}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2">Custom List</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={loading}
                  checked={isWhitelistEnabled}
                  onChange={handleChange("isWhitelistEnabled")}
                  value="primary"
                  color="primary"
                />
              }
              label="Use a whitelist"
            />
          </Grid>
          {id === null && isWhitelistEnabled && <Grid item xs={10}>
            <FormControl fullWidth required margin="normal" disabled={loading}>
              <InputLabel shrink={true}>Whitelist</InputLabel>
              <Select fullWidth value={existingWhitelistId || 0}
                      onChange={handleChange("existingWhitelistId")}>
                {existingWhitelistId === null && <MenuItem value={0}>Please select a whitelist...</MenuItem>}
                {whitelists.map(wl =>
                  <MenuItem key={wl.id || 0} value={wl.id || 0}>{wl.name} - ({wl.userCount} users)</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>}
        </Grid>}
      </React.Fragment>

    );
  }
}

export default withStyles(styles)(withWhitelistContext(CustomList)) as React.ComponentClass<OwnProps>;
