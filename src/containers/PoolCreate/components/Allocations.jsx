import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class Allocations extends React.Component {
  render() {
    const {
      loading,
      handleChange,
      onLoginKeyDown,
      contractCapError,
      contractCap,
      contractCapErrorMessage,
      yourFeeError,
      yourFee,
      yourFeeErrorMessage,
      minCap,
      minCapError,
      minCapErrorMessage,
      maxCap,
      maxCapError,
      maxCapErrorMessage,
    } = this.props;
    return (
      <Grid
        item
        xs={12}
        md={5}
        align="left"
        style={{ margin: "12px", marginTop: "48px" }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Allocations</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={contractCapError}
              disabled={loading}
              id="contractCap"
              label="Contract Cap"
              value={contractCap}
              onChange={event => {
                handleChange(event, "contractCap");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={contractCapErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="1000 WAN"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={yourFeeError}
              disabled={loading}
              id="yourFee"
              label="Your Fee"
              value={yourFee}
              onChange={event => {
                handleChange(event, "yourFee");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={yourFeeErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="5%"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={minCapError}
              disabled={loading}
              id="minCap"
              label="Min-Cap"
              value={minCap}
              onChange={event => {
                handleChange(event, "minCap");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={minCapErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="10 WAN"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={maxCapError}
              disabled={loading}
              id="maxCap"
              label="Max-Cap"
              value={maxCap}
              onChange={event => {
                handleChange(event, "maxCap");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={maxCapErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="25 WAN"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Allocations;
