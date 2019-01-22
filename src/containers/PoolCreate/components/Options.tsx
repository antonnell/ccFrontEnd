import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
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
    }
  });

interface OwnProps {
  status: number;
  isPledgesEnabled: boolean;
  isWhitelistEnabled: boolean;
  pledgesEndDate: string;
  existingWhitelistId: number | null;
  handleChange: PoolCreateHandleChange;
  user: User;
  id: number | null;
  loading: boolean;
}


interface Props extends OwnProps, WithStyles<typeof styles>, WithWhitelistContext {
}

class Options extends React.Component<Props> {

  componentWillMount(): void {
    const {whitelistContext: {getUserSavedWhitelists}, user} = this.props;
    getUserSavedWhitelists(user.id);
  }

  public render() {
    const {
      isPledgesEnabled, pledgesEndDate, handleChange, classes, isWhitelistEnabled, existingWhitelistId, id, status,
      whitelistContext: {
        whitelists
      },
      loading
    } = this.props;
    return (
      <Grid item xs={12} md={6}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h2">Options</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={status > 0 || loading}
                checked={isPledgesEnabled}
                onChange={handleChange("isPledgesEnabled")}
                value="primary"
                color="primary"
              />
            }
            label="Pledges"
          />
        </Grid>
        {isPledgesEnabled ? (
          <Grid item xs={10}>
            <TextField
              disabled={status > 0 || loading}
              required
              fullWidth
              id="pledgeEndDate"
              label="Pledge End Date"
              value={pledgesEndDate}
              type="date"
              onChange={handleChange("pledgesEndDate")}
              margin="normal"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        ) : null}
        {id === null && <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isWhitelistEnabled}
                onChange={handleChange("isWhitelistEnabled")}
                value="primary"
                color="primary"
              />
            }
            label="Use a whitelist"
          />
        </Grid>}
        {id === null && isWhitelistEnabled && <Grid item xs={10}>
          <FormControl fullWidth required margin="normal">
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
      </Grid>
    );
  }
}

export default withStyles(styles)(withWhitelistContext(Options)) as React.ComponentClass<OwnProps>;
