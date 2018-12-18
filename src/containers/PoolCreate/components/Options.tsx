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


const styles = (theme: Theme) =>
    createStyles({
      title: {
        marginBottom: theme.spacing.unit * 2
      }
    });

interface OwnProps {
  isPledgesEnabled: boolean;
  pledgesEndDate: string;
  handleChange: PoolCreateHandleChange
}


interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Options extends React.Component<Props> {

  public render() {
    const {isPledgesEnabled, pledgesEndDate, handleChange, classes} = this.props;
    return (
        <Grid item xs={12} md={6}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h2">Options</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
                control={
                  <Checkbox
                      // disabled={loading}
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
              <Grid item xs={12}>
                <TextField
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
        </Grid>
    );
  }
}

export default withStyles(styles)(Options) as React.ComponentClass<OwnProps>;
