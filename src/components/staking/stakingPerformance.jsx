import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import LineGraph from './lineGraph';

let store = require('../../store/stakingStore.js').default.store;

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.theme?props.theme.custom.icon.color:'#888888'}
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    </SvgIcon>
  );
}

class StakingPerformance extends Component {

  render() {

    let {
      theme,
      handleStake,
      optionsClicked,
      timeFrameChanged,
      currencyChanged,
      userStakes
    } = this.props

    const timeFrameOptions = store.getStore("timeFrameOptions")
    const currencyOptions = store.getStore("currencyOptions")

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
            <IconButton
              style={ {
                verticalAlign: "top",
                marginRight: "-20px",
                marginTop: "-4px"
              } }
              color="primary"
              aria-label="More"
              buttonRef={ node => {
                this.anchorEl = node;
              } }
              onClick={ optionsClicked }
              disabled={ false }
            >
              <MoreIcon theme={theme}/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Card>
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
                        $12 500.67
                      </Typography>
                      <Typography variant="subtitle2" noWrap>
                        +1 865.21 <span style={theme.custom.positive}>+1.5%</span>
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
                        $12 500.67
                      </Typography>
                      <Typography variant="subtitle2" noWrap>
                        +1 865.21 <span style={theme.custom.positive}>+1.5%</span>
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
                        {this.renderSelect(timeFrameOptions, store.getStore("timeFrame"), timeFrameChanged)}
                      </Grid>
                      <Grid item xs={1}>
                      </Grid>
                      <Grid item xs={4} md={3} lg={2}>
                        {this.renderSelect(currencyOptions, store.getStore("currency"), currencyChanged)}
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
                <option value={option.value}>{option.description}</option>
              )
            }) : ""}
        </NativeSelect>
      </Card>
    )
  }

  renderChart() {
    let data = store.getStore("data")
    let labels = store.getStore("labels")

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
