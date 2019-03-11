import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {PoolCreateHandleChange, PoolCreateHandleDateChange} from "../PoolCreate";
import {User} from "../../../types/account";
import DatePicker from 'material-ui-pickers/DatePicker';
import moment from "moment";


const styles = (theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing.unit * 2
    },
    datePicker: {
      overflow: "visible"
    }
  });

interface OwnProps {
  status: number;
  isPledgesEnabled: boolean;
  pledgesEndDate: string;
  handleChange: PoolCreateHandleChange;
  handleDateChange: PoolCreateHandleDateChange;
  user: User;
  loading: boolean;
}


interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Options extends React.Component<Props> {

  public render() {
    const {
      isPledgesEnabled, pledgesEndDate, handleChange, classes, status, loading, handleDateChange
    } = this.props;
  console.log(pledgesEndDate);
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
            <DatePicker
              disabled={status > 0 || loading}
              name="pledgesEndDate"
              value={moment(pledgesEndDate)||moment.utc().add(1,'days')}
              onChange={handleDateChange("pledgesEndDate")}
              minDate={status > 0 || loading?null:moment.utc().add(1,'days')}
              format="YYYY-MM-DD"
            />
          </Grid>
        ) : null}
      </Grid>
    );
  }
}

export default withStyles(styles)(Options) as React.ComponentClass<OwnProps>;
