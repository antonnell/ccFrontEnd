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
          <PageTitle theme={theme} root={null} screen={{display: 'Staking', location: 'staking'}} />
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
      delegateOptions,
      delegateValue,
      delegateError,
      delegateErrorMessage,
      ownDelegateValue,
      ownDelegateError,
      ownDelegateErrorMessage,
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
          <PageTitle theme={theme} root={null} screen={{display: 'Staking', location: 'staking'}} />
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

          delegateValue={ delegateValue }
          delegateError={ delegateError }
          delegateErrorMessage={ delegateErrorMessage }

          delegateOptions={ delegateOptions }
          ownDelegateValue={ ownDelegateValue }
          ownDelegateError={ ownDelegateError }
          ownDelegateErrorMessage={ ownDelegateErrorMessage }
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
      delegateOptions,
      delegateValue,
      delegateError,
      delegateErrorMessage,
      ownDelegateValue,
      ownDelegateError,
      ownDelegateErrorMessage,
      loading,
      userStakes,
      history,
      size,
      error,
      optionsToken,
      allStakingPerformance,
      timeFrameValue,
      currencyValue,
      currencyOptions,
      timeFrameOptions,
      allStakeLoading,
      tokenStakeLoading,
      stakingPerformance,
      tokenTimeFrameValue,
      tokenTimeFrameChanged,
      tokenTimeFrameOptions,
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
          <PageTitle theme={theme} root={null} screen={{display: 'Staking', location: 'staking'}} />
        </Grid>
        <StakingPerformance
          theme={ theme }
          handleStake={ handleStake }
          userStakes={ userStakes }
          allStakingPerformance={ allStakingPerformance }
          allStakeLoading={ allStakeLoading }
          timeFrameChanged={ timeFrameChanged }
          timeFrameOptions={ timeFrameOptions }
          timeFrameValue={ timeFrameValue }
        />
        <TokenPerformance
          theme={ theme }
          tokenStakeLoading={ tokenStakeLoading }
          stakingPerformance={ stakingPerformance }
          timeFrameChanged={ tokenTimeFrameChanged }
          timeFrameOptions={ tokenTimeFrameOptions }
          timeFrameValue={ tokenTimeFrameValue }
          currencyChanged={ currencyChanged }
          currencyOptions={ currencyOptions }
          currencyValue={ currencyValue }
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

          delegateOptions={ delegateOptions }
          delegateValue={ delegateValue }
          delegateError={ delegateError }
          delegateErrorMessage={ delegateErrorMessage }

          ownDelegateValue={ ownDelegateValue }
          ownDelegateError={ ownDelegateError }
          ownDelegateErrorMessage={ ownDelegateErrorMessage }
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
