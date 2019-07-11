import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  NativeSelect,
  InputBase
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SectionLoader from "../sectionLoader";

import LineGraph from './lineGraph';

class StakingPerformance extends Component {

  render() {

    let {
      theme,
      handleStake,
      timeFrameChanged,
      allStakingPerformance,
      timeFrameOptions,
      timeFrameValue,
      allStakeLoading
    } = this.props

    const stakeHead = {
      paddingRight: '24px'
    }

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
            <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Staking Performance</Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={handleStake}
            >
              Stake
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {allStakeLoading && <SectionLoader /> }
              <CardContent>
                <Grid
                  container
                  justify="flex-start"
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={3} align='left'>
                    <div style={theme.custom.inline}>
                      <Typography variant="h3" style={stakeHead}>
                        Total Balance
                      </Typography>
                    </div>
                    <div style={theme.custom.inline}>
                      <Typography variant="h4" noWrap>
                        {allStakingPerformance ? ('$' + allStakingPerformance.totalStake.toFixed(4)) : 'N/A'}
                      </Typography>
                      <Typography variant="subtitle2" noWrap style={theme.custom.positive}>
                        {allStakingPerformance ? ('+' + allStakingPerformance.totalStakeDailyChange.toFixed(4)) : 'N/A'}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} align='left'>
                    <div style={theme.custom.inline}>
                      <Typography variant="h3" style={stakeHead}>
                        Total Profit
                      </Typography>
                    </div>
                    <div style={theme.custom.inline}>
                      <Typography variant="h4" noWrap>
                        {allStakingPerformance ? ('$' + allStakingPerformance.totalRewards.toFixed(4)) : 'N/A'}
                      </Typography>
                      <Typography variant="subtitle2" noWrap style={theme.custom.positive}>
                        {allStakingPerformance ? ('+' + allStakingPerformance.totalRewardsDailyChange.toFixed(4)) : 'N/A'}
                      </Typography>
                    </div>
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
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {this.renderChart()}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
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

  renderChart() {
    let { allStakingPerformance } = this.props

    let data = []
    let labels = []
    if(allStakingPerformance && allStakingPerformance.stakePoints) {
      data = allStakingPerformance.stakePoints.map((point) => { return point.value })
      labels = allStakingPerformance.stakePoints.map((point) => { return point.timestamp })
    }

    return <LineGraph labels={ labels } data={ data } height={ 400 } hideY={ false } thickness={ 5 } marginTop={ 24 }/>
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


export default StakingPerformance;
