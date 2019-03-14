import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PageTitle from '../pageTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import StakingPerformance from './stakingPerformance';
import TokenPerformance from './tokenPerformance';
import StakedTokens from './stakedTokens';
import RewardsTransactions from './rewardsTransactions';
import AddPopup from './addPopup';

class Staking extends Component {

  render() {

    let { store } = this.props

    if(!store.tokens || store.tokens.length == 0) {
      return this.renderStartStaking()
    } else {
      return this.renderStaking()
    }
  }

  renderStartStaking() {
    let { theme, handleStake, stakeOpen, handleStakeClose, handleStakeFinish, store, handleCheck } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={6}
          align="left"
        >
          <PageTitle theme={theme} root={'Invest > Staking'} screen={'Dashboard'} />
        </Grid>
        <Grid
          item
          xs={6}
          align="right"
        >
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleStake}
            style={ { marginTop: '41px', marginRight: '24px' } }
          >
            Stake
          </Button>
        </Grid>
        <Grid
          item
          xs={ 12 }
          align="center"
          style={ { minHeight: '190px', paddingTop: '100px' } }
        >
          <Typography variant="h2">
            Stake a token to get started
          </Typography>
        </Grid>
        <AddPopup
          theme={ theme }
          isOpen={ stakeOpen }
          handleClose={ handleStakeClose }
          handleStakeFinish={ handleStakeFinish }
          store={ store }
          handleCheck={ handleCheck }
        />
      </Grid>
    )
  }

  renderStaking() {
    let { theme, handleStake, stakeOpen, handleStakeClose, handleStakeFinish, store, handleCheck } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={'Invest > Staking'} screen={'Dashboard'} />
        </Grid>
        <StakingPerformance
          theme={ theme }
          handleStake={ handleStake }
          store={ store }
        />
        <TokenPerformance
          theme={ theme }
          store={ store }
        />
        <StakedTokens
          theme={ theme }
          store={ store }
        />
        <RewardsTransactions
          theme={ theme }
        />
        <AddPopup
          theme={ theme }
          isOpen={ stakeOpen }
          handleClose={ handleStakeClose }
          handleStakeFinish={ handleStakeFinish }
          store={ store }
          handleCheck={ handleCheck }
        />
      </Grid>
    );
  }
}

export default Staking;
