import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import HeaderItems from "../../constants/HeaderItems";

class PoolCreate extends React.Component {

  render() {
    const {
      // poolNameError,
      // loading,
      // poolName,
      // handleChange,
      // onLoginKeyDown,
      // poolNameErrorMessage,
      // poolSecurityError,
      // poolSecurity,
      // selectSecurity,
      // poolSecurities,
      // poolSecurityErrorMessage,
      // tokenNameError,
      // tokenName,
      // tokenNameErrorMessage,
      // tokenAddressError,
      // tokenAddress,
      // tokenAddressErrorMessage,
      // pledgesEnabled,
      // handleChecked,
      // pledgeEndDateErrorMessage,
      // pledgeEndDateError,
      // pledgeEndDate,
      // contractCapError,
      // contractCap,
      // contractCapErrorMessage,
      // yourFeeError,
      // yourFee,
      // yourFeeErrorMessage,
      // minCap,
      // minCapError,
      // minCapErrorMessage,
      // maxCap,
      // maxCapError,
      // maxCapErrorMessage,
      // searchUser,
      // searchUserError,
      // searchUserErrorMessage,
      // chooseList,
      // chooseListError,
      // chooseListErrorMessage,
      // selectAddress,
      // addedUsers,
      // submitLaunchPool,
      // myInvitesClicked,
      // theme,
      // handleHome,
      // optionsClicked,
      // open,
      // optionsClosed,
      // browsePoolsClicked
    } = this.props;
    return (
      <form onSubmit={this.submitLaunchPool}>
        <Grid
          container
          justify="space-between"
          direction="row"
        >
          <Header title="Create Pool" headerItems={HeaderItems.poolCreate}/>
          {/*<Settings*/}
            {/*poolNameError={ poolNameError }*/}
            {/*loading={ loading }*/}
            {/*poolName={ poolName }*/}
            {/*handleChange={ handleChange }*/}
            {/*onLoginKeyDown={ onLoginKeyDown }*/}
            {/*poolNameErrorMessage={ poolNameErrorMessage }*/}
            {/*poolSecurityError={ poolSecurityError }*/}
            {/*poolSecurity={ poolSecurity }*/}
            {/*selectSecurity={ selectSecurity }*/}
            {/*poolSecurities={ poolSecurities }*/}
            {/*poolSecurityErrorMessage={ poolSecurityErrorMessage }*/}
            {/*tokenNameError={ tokenNameError }*/}
            {/*tokenName={ tokenName }*/}
            {/*tokenNameErrorMessage={ tokenNameErrorMessage }*/}
            {/*tokenAddressError={ tokenAddressError }*/}
            {/*tokenAddress={ tokenAddress }*/}
            {/*tokenAddressErrorMessage={ tokenAddressErrorMessage }*/}
          {/*/>*/}
          {/*<Options*/}
            {/*loading={ loading }*/}
            {/*handleChange={ handleChange }*/}
            {/*onLoginKeyDown={ onLoginKeyDown }*/}
            {/*pledgesEnabled={ pledgesEnabled }*/}
            {/*handleChecked={ handleChecked }*/}
            {/*pledgeEndDateErrorMessage={ pledgeEndDateErrorMessage }*/}
            {/*pledgeEndDateError={ pledgeEndDateError }*/}
            {/*pledgeEndDate={ pledgeEndDate }*/}
          {/*/>*/}
          {/*<Allocations*/}
            {/*loading={ loading }*/}
            {/*handleChange={ handleChange }*/}
            {/*onLoginKeyDown={ onLoginKeyDown }*/}
            {/*contractCapError={ contractCapError }*/}
            {/*contractCap={ contractCap }*/}
            {/*contractCapErrorMessage={ contractCapErrorMessage }*/}
            {/*yourFeeError={ yourFeeError }*/}
            {/*yourFee={ yourFee }*/}
            {/*yourFeeErrorMessage={ yourFeeErrorMessage }*/}
            {/*minCap={ minCap }*/}
            {/*minCapError={ minCapError }*/}
            {/*minCapErrorMessage={ minCapErrorMessage }*/}
            {/*maxCap={ maxCap }*/}
            {/*maxCapError={ maxCapError }*/}
            {/*maxCapErrorMessage={ maxCapErrorMessage }*/}
          {/*/>*/}
          {/*<Grid item md={ 5 } />*/}
          {/*<AddUsers*/}
            {/*loading={ loading }*/}
            {/*handleChange={ handleChange }*/}
            {/*onLoginKeyDown={ onLoginKeyDown }*/}
            {/*searchUser={ searchUser }*/}
            {/*searchUserError={ searchUserError }*/}
            {/*searchUserErrorMessage={ searchUserErrorMessage }*/}
          {/*/>*/}
          {/*<CustomList*/}
            {/*loading={ loading }*/}
            {/*chooseList={ chooseList }*/}
            {/*chooseListError={ chooseListError }*/}
            {/*chooseListErrorMessage={ chooseListErrorMessage }*/}
            {/*selectAddress={ selectAddress }*/}
          {/*/>*/}
          {/*<AddedUsers*/}
            {/*addedUsers={ addedUsers }*/}
          {/*/>*/}
          {/*<Grid item xs={ 12 } align={ 'right' } style={ { margin: '12px' } }>*/}
            {/*<Button*/}
              {/*variant="contained"*/}
              {/*size="large"*/}
              {/*color="primary"*/}
              {/*type="submit"*/}
              {/*onClick={ submitLaunchPool }*/}
              {/*disabled={ loading }*/}
            {/*>*/}
              {/*LAUNCH POOL*/}
            {/*</Button>*/}
          {/*</Grid>*/}
        </Grid>
      </form>
    );
  }

  private submitLaunchPool(event:React.FormEvent) {
    event.preventDefault();
    console.log('SubmitLaunchPool...');
    if (this.validate()) {
      // let error = false;
      //do some validation. /care

      //get primary eth address
      // let primaryEthAddress = this.props.ethAddresses.filter(add => {
      //   return add.isPrimary;
      // });
      // if (!error) {
      //   this.setState({ loading: true, error: null });
      //   console.log(this.state);
      //   const content = this.state;
      //   content.primaryEthAddress = primaryEthAddress[0].address;
      //   console.log(content);
      //   // poolingDispatcher.dispatch({
      //   //   type: 'createPoolingContract',
      //   //   content,
      //   //   token: this.props.user.token
      //   // });
      // }
    }
  }
  private validate = ()=> {
    //const { poolName } = this.state;
    //poolName.length > 3 && true
    return true;
  }
}

export default PoolCreate;
