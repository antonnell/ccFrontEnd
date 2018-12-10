import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Settings from './Settings';
import Options from './Options';
import Allocations from './Allocations';
import AddUsers from './AddUsers';
import CustomList from './CustomList';
import AddedUsers from './AddedUsers';
import Header from './Header';

class PoolCreate extends React.Component {

  render() {
    const {
      poolNameError,
      loading,
      poolName,
      handleChange,
      onLoginKeyDown,
      poolNameErrorMessage,
      poolSecurityError,
      poolSecurity,
      selectSecurity,
      poolSecurities,
      poolSecurityErrorMessage,
      tokenNameError,
      tokenName,
      tokenNameErrorMessage,
      tokenAddressError,
      tokenAddress,
      tokenAddressErrorMessage,
      pledgesEnabled,
      handleChecked,
      pledgeEndDateErrorMessage,
      pledgeEndDateError,
      pledgeEndDate,
      contractCapError,
      contractCap,
      contractCapErrorMessage,
      yourFeeError,
      yourFee,
      yourFeeErrorMessage,
      minCap,
      minCapError,
      minCapErrorMessage,
      maxCap,
      maxCapError,
      maxCapErrorMessage,
      searchUser,
      searchUserError,
      searchUserErrorMessage,
      chooseList,
      chooseListError,
      chooseListErrorMessage,
      selectAddress,
      addedUsers,
      submitLaunchPool,
      myInvitesClicked,
      theme,
      handleHome,
      optionsClicked,
      open,
      optionsClosed,
      browsePoolsClicked
    } = this.props;
    return (
      <form onSubmit={submitLaunchPool}>
        <Grid
          container
          justify="space-between"
          direction="row"
        >
          <Header
            theme={ theme }
            handleHome={ handleHome }
            optionsClicked={ optionsClicked }
            open={ open }
            optionsClosed={ optionsClosed }
            browsePoolsClicked={ browsePoolsClicked }
            myInvitesClicked={ myInvitesClicked } />
          <Settings
            poolNameError={ poolNameError }
            loading={ loading }
            poolName={ poolName }
            handleChange={ handleChange }
            onLoginKeyDown={ onLoginKeyDown }
            poolNameErrorMessage={ poolNameErrorMessage }
            poolSecurityError={ poolSecurityError }
            poolSecurity={ poolSecurity }
            selectSecurity={ selectSecurity }
            poolSecurities={ poolSecurities }
            poolSecurityErrorMessage={ poolSecurityErrorMessage }
            tokenNameError={ tokenNameError }
            tokenName={ tokenName }
            tokenNameErrorMessage={ tokenNameErrorMessage }
            tokenAddressError={ tokenAddressError }
            tokenAddress={ tokenAddress }
            tokenAddressErrorMessage={ tokenAddressErrorMessage }
          />
          <Options
            loading={ loading }
            handleChange={ handleChange }
            onLoginKeyDown={ onLoginKeyDown }
            pledgesEnabled={ pledgesEnabled }
            handleChecked={ handleChecked }
            pledgeEndDateErrorMessage={ pledgeEndDateErrorMessage }
            pledgeEndDateError={ pledgeEndDateError }
            pledgeEndDate={ pledgeEndDate }
          />
          <Allocations
            loading={ loading }
            handleChange={ handleChange }
            onLoginKeyDown={ onLoginKeyDown }
            contractCapError={ contractCapError }
            contractCap={ contractCap }
            contractCapErrorMessage={ contractCapErrorMessage }
            yourFeeError={ yourFeeError }
            yourFee={ yourFee }
            yourFeeErrorMessage={ yourFeeErrorMessage }
            minCap={ minCap }
            minCapError={ minCapError }
            minCapErrorMessage={ minCapErrorMessage }
            maxCap={ maxCap }
            maxCapError={ maxCapError }
            maxCapErrorMessage={ maxCapErrorMessage }
          />
          <Grid item md={ 5 } />
          <AddUsers
            loading={ loading }
            handleChange={ handleChange }
            onLoginKeyDown={ onLoginKeyDown }
            searchUser={ searchUser }
            searchUserError={ searchUserError }
            searchUserErrorMessage={ searchUserErrorMessage }
          />
          <CustomList
            loading={ loading }
            chooseList={ chooseList }
            chooseListError={ chooseListError }
            chooseListErrorMessage={ chooseListErrorMessage }
            selectAddress={ selectAddress }
          />
          <AddedUsers
            addedUsers={ addedUsers }
          />
          <Grid item xs={ 12 } align={ 'right' } style={ { margin: '12px' } }>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              onClick={ submitLaunchPool }
              disabled={ loading }
            >
              LAUNCH POOL
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PoolCreate;
