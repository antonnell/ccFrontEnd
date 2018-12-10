import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

class Settings extends React.Component {
  render() {
    const {
      loading,
      poolName,
      handleChange,
      onLoginKeyDown,
      poolSecurityError,
      poolSecurity,
      selectSecurity,
      poolSecurities,
      poolSecurityErrorMessage,
      tokenNameError,
      tokenName,
      tokenNameErrorMessage,
      tokenAddressError,
      tokenAddress,
      tokenAddressErrorMessage
    } = this.props;
    const poolNameError = !!(poolName && poolName.length < 3);
    return (
      <Grid item xs={12} md={5} style={{ margin: "12px" }}>
        <Grid
          container
          justify="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              fullWidth
              color="textSecondary"
              error={poolNameError}
              disabled={loading}
              id="poolName"
              label="Pool Name"
              value={poolName}
              onChange={event => {
                handleChange(event, "poolName");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={poolNameError?"Pool name should be at least 3 characters":null}
              InputLabelProps={{ shrink: true }}
              placeholder="Example Pool"
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl
              error={poolSecurityError}
              fullWidth
              margin="normal"
              required
            >
              <InputLabel shrink={true}>Pool Security</InputLabel>
              <Select
                fullWidth
                placeholder="Public"
                value={poolSecurity}
                onChange={selectSecurity}
                disabled={loading}
              >
                {poolSecurities.map(security => {
                  return (
                    <MenuItem key={security} value={security}>
                      {security}
                    </MenuItem>
                  );
                })}
              </Select>
              {poolSecurityError === true ? (
                <FormHelperText>{poolSecurityErrorMessage}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={tokenNameError}
              disabled={this.props.loading}
              id="tokenName"
              label="Token Name"
              value={tokenName}
              onChange={event => {
                handleChange(event, "tokenName");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={tokenNameErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="Bloom"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={tokenAddressError}
              disabled={loading}
              id="tokenAddress"
              label="Token Address"
              value={tokenAddress}
              onChange={event => {
                handleChange(event, "tokenAddress");
              }}
              margin="normal"
              onKeyDown={onLoginKeyDown}
              helperText={tokenAddressErrorMessage}
              InputLabelProps={{ shrink: true }}
              placeholder="0x000000000000000000000000000000000000"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Settings;
