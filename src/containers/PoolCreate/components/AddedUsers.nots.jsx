import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';

class AddedUsersNots extends React.Component {
  render() {
    const {
      addedUsers
    } = this.props;
    return (
      <Grid
        item
        xs={ 12 }
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
            <Typography variant="h2">Added Users</Typography>
          </Grid>
          <Grid item xs={ 12 }>
            <Card
              style={ {
                marginTop: '12px',
                padding: '12px',
                minHeight: '200px',
                width: '100%'
              } }
            >
              { addedUsers.map((user, i) => {
                return (
                  <Chip
                    key={ i }
                    label={ user }
                    color="primary"
                    onDelete={ () => {
                    } }
                    style={ { margin: '12px' } }
                  />
                );
              }) }
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default AddedUsersNots;
