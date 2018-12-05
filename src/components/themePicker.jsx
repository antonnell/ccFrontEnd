import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ThemePicker extends Component {

  // renderDarkTheme() {
  //
  // }
  //
  // renderLightTheme() {
  //
  // }

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" style={{marginTop: '24px'}}>
        <Grid item xs={12} sm={6} md={8} lg={6} xl={4} align='left'>
          <Typography variant="h3" >
            Theme
          </Typography>

        </Grid>
      </Grid>
    );
  }
}

export default (ThemePicker);
