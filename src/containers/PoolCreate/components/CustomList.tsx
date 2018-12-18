import * as React from 'react';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

interface OwnProps {
}

// const styles = (theme: Theme) =>
const styles = () =>
    createStyles({});

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class CustomList extends React.Component<Props> {
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
              <Typography variant="h2">Custom List</Typography>
            </Grid>
            <Grid item xs={ 8 }>
              <FormControl
                  // error={ chooseListError }
                  fullWidth
                  margin="normal"
                  required
              >
                <InputLabel shrink={ true }>Choose List</InputLabel>
                <Select
                    fullWidth
                    placeholder="Telegram Chat"
                    // value={ chooseList }
                    // onChange={ selectAddress }
                    // disabled={ loading }
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
                {/*{ chooseListError === true ? (*/}
                    {/*<FormHelperText>*/}
                      {/*{ chooseListErrorMessage }*/}
                    {/*</FormHelperText>*/}
                {/*) : null }*/}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(CustomList) as React.ComponentClass<OwnProps>;
