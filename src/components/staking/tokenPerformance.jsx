import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LineGraph from './lineGraph';
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SectionLoader from "../sectionLoader";

class TokenPerformance extends Component {

  render() {

    let {
      theme,
      timeFrameChanged,
      timeFrameOptions,
      timeFrameValue,
      currencyChanged,
      currencyOptions,
      currencyValue,
    } = this.props

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
                {this.renderSelect(timeFrameOptions, timeFrameValue, timeFrameChanged)}
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={4} md={3} lg={2}>
                {this.renderSelect(currencyOptions, currencyValue, currencyChanged)}
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
              { this.renderTokenPerformanceCard('balance') }
              { this.renderTokenPerformanceCard('rewards') }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderTokenPerformanceCard(type) {

    let { theme, tokenStakeLoading, stakingPerformance } = this.props

    let title = 'Staking Balance'
    let amount = 'N/A'
    let change = 'N/A'
    let changePercent = 'N/A'


    if(stakingPerformance) {
      if(type === 'balance') {
        title = 'Staking Balance'
        amount = stakingPerformance.totalStake.toFixed(4)
        change = stakingPerformance.totalStakeDailyChange.toFixed(4)

        if(stakingPerformance.totalStake > 0) {
          changePercent = (stakingPerformance.totalStakeDailyChange * 100 / stakingPerformance.totalStake).toFixed(4)
        }
      }

      if(type === 'rewards') {
        title = 'Staking Rewards'
        amount = stakingPerformance.totalRewards.toFixed(4)
        change = stakingPerformance.totalRewardsDailyChange.toFixed(4)

        if(stakingPerformance.totalRewards > 0) {
          changePercent = (stakingPerformance.totalRewardsDailyChange * 100 / stakingPerformance.totalRewards).toFixed(4)
        }
      }
    }

    return (
      <Grid item xs={12} lg={6} key={Math.random()} style={{ padding: '24px' }}>
        <Card style={{ position: 'relative' }}>
          { tokenStakeLoading && <SectionLoader /> }
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
                  +{change} <span style={theme.custom.positive}>+{changePercent}</span>
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
    let { stakingPerformance } = this.props

    let data = []
    let labels = []
    if(stakingPerformance && stakingPerformance.stakePoints) {
      data = stakingPerformance.stakePoints.map((point) => { return point.value })
      labels = stakingPerformance.stakePoints.map((point) => { return point.timestamp })
    }

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
