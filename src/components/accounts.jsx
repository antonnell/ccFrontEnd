import React, { Component } from "react";
import { Grid, Typography, Button } from "@material-ui/core";

import Snackbar from './snackbar';
import PageTitle from "./pageTitle";
import Account from '../containers/account';
import PageLoader from './pageLoader';
import CreateModal from './createModal';
import ImportModal from './importModal';

class Accounts extends Component {
  renderAccounts() {
    let {
      accounts,
      theme,
      loading,
      stakeClicked,
      transactClicked,
      user,
      stakeableCurrencies
    } = this.props

    if(!accounts) {
      return null
    }

    if(accounts && accounts.length === 0 && loading !== true) {
      //no addresses
      return (<Grid item xs={12} align="center" style={{ minHeight: "190px", paddingTop: "100px" }} >
        <Typography variant="h2">
          Oh no, we couldn't find any accounts for you. Why don't you
          create/import one?
        </Typography>
      </Grid>)
    }

    return this.props.accounts.map((account) => {
      if(["Aion", "Bitcoin", "Ethereum", "Tezos", "Wanchain"].includes(account.name) || account.balance > 0) {
        return (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={account.name} style={{ padding: '24px' }}>
            <Account user={ user } account={ account } theme={ theme } stakeClicked={ stakeClicked } transactClicked={ transactClicked } stakeableCurrencies={ stakeableCurrencies } />
          </Grid>
        )
      } else {
        return null
      }
    })
  }

  render() {

    let {
      theme,
      handleCreateOpen,
      handleImportOpen,
      loading,
      createOpen,
      importOpen,
      error
    } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={'Accounts'} screen={'Dashboard'} />
        </Grid>
        <Grid item xs={12} align="center">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={theme.custom.sectionTitle}
          >
            <Grid item xs={6} align='left'>
              <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Accounts</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleCreateOpen}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: "12px" }}
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleImportOpen}
              >
                Import
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            style={theme.custom.accountsContainer}
          >
            {this.renderAccounts()}
          </Grid>
        </Grid>
        { loading && this.renderLoader() }
        { error && <Snackbar open={true} type={'Error'} message={error} /> }
        { createOpen && this.renderCreateModal() }
        { importOpen && this.renderImportModal() }
      </Grid>
    );
  }

  renderLoader() {
    return <PageLoader />
  }

  renderCreateModal() {

    let {
      createOpen,
      handleCreateClose,
      addressName,
      addressNameError,
      addressNameErrorMessage,
      createLoading,
      handleChange,
      handleSelectChange,
      error,
      tokens,
      tokenValue,
      handleCreate
    } = this.props

    return <CreateModal
      tokenOptions={ tokens }
      tokenValue={ tokenValue }
      isOpen={ createOpen }
      handleClose={ handleCreateClose }
      addressName={ addressName }
      addressNameError={ addressNameError }
      addressNameErrorMessage={ addressNameErrorMessage }
      createLoading={ createLoading }
      handleChange={ handleChange }
      handleSelectChange={ handleSelectChange }
      error={ error }
      handleCreate={ handleCreate }
    />
  }

  renderImportModal() {

    let {
      importOpen,
      handleImportClose,
      addressName,
      addressNameError,
      addressNameErrorMessage,
      privateKey,
      privateKeyError,
      privateKeyErrorMessage,
      mnemonicPhrase,
      mnemonicPhraseError,
      mnemonicPhraseErrorMessage,
      publicAddress,
      publicAddressError,
      publicAddressErrorMessage,
      importLoading,
      handleChange,
      handleSelectChange,
      error,
      tokens,
      tokenValue,
      handleImport,
    } = this.props

    return <ImportModal
      tokenOptions={ tokens }
      tokenValue={ tokenValue }
      isOpen={ importOpen }
      handleClose={ handleImportClose }
      addressName={ addressName }
      addressNameError={ addressNameError }
      addressNameErrorMessage={ addressNameErrorMessage }
      privateKey={ privateKey }
      privateKeyError={ privateKeyError }
      privateKeyErrorMessage={ privateKeyErrorMessage }
      mnemonicPhrase={ mnemonicPhrase }
      mnemonicPhraseError={ mnemonicPhraseError }
      mnemonicPhraseErrorMessage={ mnemonicPhraseErrorMessage }
      publicAddress={ publicAddress }
      publicAddressError={ publicAddressError }
      publicAddressErrorMessage={ publicAddressErrorMessage }
      importLoading={ importLoading }
      handleChange={ handleChange }
      handleSelectChange={ handleSelectChange }
      error={ error }
      handleImport={ handleImport }
    />
  }
}

export default Accounts;
