import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

class CustomList extends React.Component {
  render() {
    const {
      loading,
      chooseList,
      chooseListError,
      chooseListErrorMessage,
      selectAddress,
    } = this.props;
    return (
      <Grid
        item
        xs={ 12 }
        md={ 5 }
        align="left"
        style={ { margin: '12px', marginTop: '48px' } }
      >
        <Grid
          container
          justify="space-between"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={ 12 }>
            <Typography variant="h2">Custom List</Typography>
          </Grid>
          <Grid item xs={ 8 }>
            <FormControl
              error={ chooseListError }
              fullWidth
              margin="normal"
              required
            >
              <InputLabel shrink={ true }>Choose List</InputLabel>
              <Select
                fullWidth
                placeholder="Telegram Chat"
                value={ chooseList }
                onChange={ selectAddress }
                disabled={ loading }
              >
                {
                  // addresses
                  // .filter((address) => {
                  //   return address.isPrimary == true
                  // })
                  // .map((address) => {
                  //   return (<MenuItem key={address.publicAddress} value={address.publicAddress}>{address.name}</MenuItem>)
                  // })
                }
              </Select>
              { chooseListError === true ? (
                <FormHelperText>
                  { chooseListErrorMessage }
                </FormHelperText>
              ) : null }
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default CustomList;
