import * as React from 'react';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

interface OwnProps {
}

// const styles = (theme: Theme) =>
const styles = () =>
    createStyles({});

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class AddUsers extends React.Component<Props> {
  public render() {
    return (
        <Grid
            item
            xs={ 12 }
            md={ 5 }
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
                  InputLabelProps={ { shrink: true } }
                  placeholder="Clark54"
              />
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(AddUsers) as React.ComponentClass<OwnProps>;
