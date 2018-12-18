import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Options extends React.Component {
  render() {
    const {
      loading,
      handleChange,
      onLoginKeyDown,
      pledgesEnabled,
      handleChecked,
      pledgeEndDateErrorMessage,
      pledgeEndDateError,
      pledgeEndDate,
    } = this.props;
    return (
      <Grid item xs={12} md={5} align="left" style={{ margin: "12px" }}>
        <Grid
          container
          justify="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Options</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={loading}
                  checked={pledgesEnabled}
                  onChange={event => {
                    handleChecked(event, "pledgesEnabled");
                  }}
                  value="primary"
                  color="primary"
                />
              }
              label="Pledges"
            />
          </Grid>
          {pledgesEnabled ? (
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                color="textSecondary"
                error={pledgeEndDateError}
                disabled={loading}
                id="pledgeEndDate"
                label="Pledge End Date"
                value={pledgeEndDate}
                type={"date"}
                onChange={event => {
                  handleChange(event, "pledgeEndDate");
                }}
                margin="normal"
                onKeyDown={onLoginKeyDown}
                helperText={pledgeEndDateErrorMessage}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

export default Options;
