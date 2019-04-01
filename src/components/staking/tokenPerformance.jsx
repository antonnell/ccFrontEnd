import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LineGraph from './lineGraph';
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

let store = require('../../store/stakingStore.js').default.store;

class TokenPerformance extends Component {

  render() {

    let {
      theme,
      timeFrameChanged,
      currencyChanged
    } = this.props

    const timeFrameOptions = store.getStore("timeFrameOptions")

    const currencyOptions = store.getStore("currencyOptions")

    return (
      <Grid
        item
        xs={12}
        align="left"
      >
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          style={theme.custom.sectionTitle}
        >
          <Grid item xs={6} align='left'>
            <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Token Performance</Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <Grid
              container
              justify="flex-end"
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={4} md={3} lg={2}>
                {this.renderSelect(timeFrameOptions, store.getStore("timeFrame"), timeFrameChanged)}
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                {this.renderSelect(currencyOptions, store.getStore("currency"), currencyChanged)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} align='left'>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              direction="row"
              style={theme.custom.accountsContainer}
            >
              { this.renderTokenPerformanceCard("Staking Balance", "1352.51", "+56.20", "+2.7%") }
              { this.renderTokenPerformanceCard("Staking Rewards", "545.37", "+207.89", "+8.6%") }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderTokenPerformanceCard(title, amount, change, changePercent) {
    const { theme } = this.props
    return (
      <Grid item xs={12} lg={6} key={Math.random()} style={{ padding: '24px' }}>
        <Card>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            direction="row">
            <Grid item xs={4}>
              <div style={{padding: '20%'}}>
                <Typography variant="h4" nowrap>
                  {title}
                </Typography>
                <Typography variant="h4" noWrap>
                  {amount}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {change} <span style={theme.custom.positive}>{changePercent}</span>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              { this.renderChart() }
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }

  renderChart() {
    let data = store.getStore("data")
    let labels = store.getStore("labels")

    return <LineGraph labels={ labels } data={ data } height={ 200 } hideY={ true } padding={ 50 } thickness={ 3 } marginTop={ 0 } />
  }

  renderSelect(options, value, onChange) {
    return (
      <Card>
        <NativeSelect
          value={value}
          onChange={onChange}
          input={<BootstrapInput name="age" id="age-customized-native-simple" />}
          fullWidth={true}
        >
          {options
            ? options.map(option => {
              return (
                <option key={option.value} value={option.value}>{option.description}</option>
              )
            }) : ""}
        </NativeSelect>
      </Card>
    )
  }
}

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    position: 'relative',
    fontSize: 14,
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Montserrat-Medium'
    ].join(','),
    '&:focus': {
    },
  },
}))(InputBase);

export default TokenPerformance;
