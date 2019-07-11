import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  SvgIcon,
  Card
 } from "@material-ui/core";

import Snackbar from './snackbar';
import PageTitle from "./pageTitle";
import Account from '../containers/account';
import PageLoader from './pageLoader';
import CreateModal from './createModal';
import ImportModal from './importModal';

import { colors } from '../theme.js'

function ListIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.color}
        d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z"
      />
    </SvgIcon>
  );
}
function GridIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.color}
        d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"
      />
    </SvgIcon>
  );
}



class Accounts extends Component {
  renderAccounts() {
    let {
      accounts,
      theme,
      loading,
      stakeClicked,
      transactClicked,
      user,
      stakeableCurrencies,
      viewMode,
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

    return accounts.map((account) => {
      if(["Aion", "Bitcoin", "Ethereum", "Tezos", "Wanchain", "Binance"].includes(account.name) || account.balance > 0) {
        if(viewMode === 'List') {
          return (
            <Grid item xs={12} key={account.type+'_'+account.name} style={{ padding: '0px 24px' }}>
              <Account user={ user } account={ account } theme={ theme } stakeClicked={ stakeClicked } transactClicked={ transactClicked } viewMode={ viewMode } stakeableCurrencies={ stakeableCurrencies }/>
            </Grid>
          )
        } else {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={account.type+'_'+account.name} style={{ padding: '24px' }}>
              <Account user={ user } account={ account } theme={ theme } stakeClicked={ stakeClicked } transactClicked={ transactClicked } viewMode={ viewMode } stakeableCurrencies={ stakeableCurrencies }/>
            </Grid>
          )
        }
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
      error,
      toggleViewClicked,
      viewMode
    } = this.props

    return (
      <Grid container justify="center" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={null} screen={{display: 'Accounts', location: 'accounts'}} />
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
              <div style={theme.custom.inline}>
                <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Accounts</Typography>
              </div>
              <div style={{ marginLeft: '-15px' }}>
                <IconButton
                  color="primary"
                  aria-label="Switch View"
                  onClick={e => {
                    toggleViewClicked();
                  }}
                >
                  <GridIcon theme={theme} color={viewMode==='Grid'?colors.lightBlue:colors.darkGray} />
                  <ListIcon theme={theme} color={viewMode==='List'?colors.lightBlue:colors.darkGray} />
                </IconButton>
              </div>
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
            { viewMode === 'List' && this.renderHeader()}
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

  renderHeader() {
    let headerStyle = {
      padding: '17px 24px',
      backgroundColor: '#2f3031'
    }
    let textStyle = {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600'
    }

    return (<Grid item xs={12} align='left' style={{ padding: '0px 24px' }}>
      <Card style={{borderRadius: '3px'}}>
        <Grid container>
          <Grid item xs={6} align='left' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Token
            </Typography>
          </Grid>
          <Grid item xs={2} align='right' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Balance
            </Typography>
          </Grid>
          <Grid item xs={4} align='right' style={headerStyle}>
            <Typography variant="body1" style={textStyle}>
              Actions
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>)
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
      handleCreate,
      accountTypeValue,
      accountTypeError,
      accountTypeErrorMessage,
      accountTypes,
      managerAddressValue,
      managerAddressError,
      managerAddressErrorMessage,
      managerAddressOptions,
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
      accountTypeValue={ accountTypeValue }
      accountTypeError={ accountTypeError }
      accountTypeErrorMessage={ accountTypeErrorMessage }
      accountTypeOptions={ accountTypes }
      managerAddressValue={ managerAddressValue }
      managerAddressError={ managerAddressError }
      managerAddressErrorMessage={ managerAddressErrorMessage }
      managerAddressOptions={ managerAddressOptions }
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
