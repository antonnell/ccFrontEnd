import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

interface OwnProps {
}


interface Props extends OwnProps {
}

class AddUsers extends React.Component<Props> {
  public render() {
    return (
        <Grid item xs={12} md={5}>
          <Grid item xs={12}>
            <Typography variant="h2">Add Users</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
                required
                fullWidth
                color="textSecondary"
                // error={ searchUserError }
                // disabled={ loading }
                id="searchUser"
                label="Search User"
                // value={ searchUser }
                // onChange={ event => {
                //   handleChange(event, 'searchUser');
                // } }
                margin="normal"
                // onKeyDown={ onLoginKeyDown }
                // helperText={ searchUserErrorMessage }
                InputLabelProps={{shrink: true}}
                placeholder="Clark54"
            />
          </Grid>
        </Grid>
    );
  }
}

export default AddUsers as React.ComponentClass<OwnProps>;
