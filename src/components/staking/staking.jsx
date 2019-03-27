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
import WithdrawPopup from './withdrawPopup';
import PageLoader from '../pageLoader';
import Snackbar from '../snackbar';

class Staking extends Component {

  render() {

    let { userStakes } = this.props

    if(!userStakes) {
      return this.renderLoading()
    } else if(userStakes.length === 0) {
      return this.renderStartStaking()
    } else {
      return this.renderStaking()
    }
  }

  renderLoading() {
    let {
      theme,
      loading
    } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        {loading?<PageLoader />:''}
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={'Staking'} screen={'Dashboard'} />
        </Grid>
      </Grid>
    )
  }

  renderStartStaking() {
    let {
      theme,
      handleStake,
      handleSelectChange,
      onChange,
      stakeOpen,
      handleStakeClose,
      handleStakeFinish,
      tokenOptions,
      tokenValue,
      tokenError,
      tokenErrorMessage,
      accountOptions,
      accountValue,
      accountError,
      accountErrorMessage,
      amountValue,
      amountError,
      amountErrorMessage,
      loading,
    } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        {loading?<PageLoader />:''}
        <Grid
          item
          xs={6}
          align="left"
        >
          <PageTitle theme={theme} root={'Staking'} screen={'Dashboard'} />
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
          handleSelectChange={ handleSelectChange }
          onChange={ onChange }

          tokenOptions={ tokenOptions }
          tokenValue={ tokenValue }
          tokenError={ tokenError}
          tokenErrorMessage={ tokenErrorMessage }

          accountOptions={ accountOptions }
          accountValue={ accountValue }
          accountError={ accountError }
          accountErrorMessage={ accountErrorMessage }

          amountValue={ amountValue }
          amountError={ amountError }
          amountErrorMessage={ amountErrorMessage }
        />
      </Grid>
    )
  }

  renderStaking() {
    let {
      theme,
      handleStake,
      stakeOpen,
      handleStakeClose,
      handleStakeFinish,
      handleSelectChange,
      withdrawOpen,
      handleWithdrawClose,
      handleWithdrawFinish,
      onChange,
      timeFrameChanged,
      currencyChanged,
      optionsClicked,
      optionsClosed,
      depositClicked,
      withdrawClicked,
      tokenOptions,
      tokenValue,
      tokenError,
      tokenErrorMessage,
      accountOptions,
      accountValue,
      accountError,
      accountErrorMessage,
      amountValue,
      amountError,
      amountErrorMessage,
      loading,
      userStakes,
      history,
      size,
      error,
      optionsToken,
    } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        {loading?<PageLoader />:''}
        { error && <Snackbar open={true} type={'Error'} message={error} /> }
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={'Staking'} screen={'Dashboard'} />
        </Grid>
        <StakingPerformance
          theme={ theme }
          handleStake={ handleStake }
          timeFrameChanged={ timeFrameChanged }
          currencyChanged={ currencyChanged }
          userStakes={ userStakes }
        />
        <TokenPerformance
          theme={ theme }
          timeFrameChanged={ timeFrameChanged }
          currencyChanged={ currencyChanged }
        />
        <StakedTokens
          theme={ theme }
          optionsClicked={ optionsClicked }
          optionsClosed={ optionsClosed }
          depositClicked={ depositClicked }
          withdrawClicked={ withdrawClicked }
          userStakes={ userStakes }
          optionsToken={ optionsToken }
        />
        <RewardsTransactions
          theme={ theme }
          size={ size }
          history={ history }
        />
        <AddPopup
          theme={ theme }
          isOpen={ stakeOpen }
          handleClose={ handleStakeClose }
          handleStakeFinish={ handleStakeFinish }
          handleSelectChange={ handleSelectChange }
          onChange={ onChange }

          tokenOptions={ tokenOptions }
          tokenValue={ tokenValue }
          tokenError={ tokenError}
          tokenErrorMessage={ tokenErrorMessage }

          accountOptions={ accountOptions }
          accountValue={ accountValue }
          accountError={ accountError }
          accountErrorMessage={ accountErrorMessage }

          amountValue={ amountValue }
          amountError={ amountError }
          amountErrorMessage={ amountErrorMessage }
        />
      <WithdrawPopup
          theme={ theme }
          isOpen={ withdrawOpen }
          handleClose={ handleWithdrawClose }
          handleWithdrawFinish={ handleWithdrawFinish }
          handleSelectChange={ handleSelectChange }
          onChange={ onChange }

          tokenOptions={ tokenOptions }
          tokenValue={ tokenValue }
          tokenError={ tokenError}
          tokenErrorMessage={ tokenErrorMessage }

          accountOptions={ accountOptions }
          accountValue={ accountValue }
          accountError={ accountError }
          accountErrorMessage={ accountErrorMessage }

          amountValue={ amountValue }
          amountError={ amountError }
          amountErrorMessage={ amountErrorMessage }
        />
      </Grid>
    );
  }
}

export default Staking;
