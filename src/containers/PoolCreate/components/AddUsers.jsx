import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class AddUsers extends React.Component {
  render() {
    const {
      loading,
      handleChange,
      onLoginKeyDown,
      searchUser,
      searchUserError,
      searchUserErrorMessage,
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
            <Typography variant="h2">Add Users</Typography>
          </Grid>
          <Grid item xs={ 8 }>
            <TextField
              required
              fullWidth
              color="textSecondary"
              error={ searchUserError }
              disabled={ loading }
              id="searchUser"
              label="Search User"
              value={ searchUser }
              onChange={ event => {
                handleChange(event, 'searchUser');
              } }
              margin="normal"
              onKeyDown={ onLoginKeyDown }
              helperText={ searchUserErrorMessage }
              InputLabelProps={ { shrink: true } }
              placeholder="Clark54"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default AddUsers;
