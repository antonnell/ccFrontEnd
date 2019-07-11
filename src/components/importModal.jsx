import React, { Component } from "react";
import {
  Dialog,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  FormHelperText,
  Slide,
  Input,
} from '@material-ui/core';
import SectionLoader from './sectionLoader';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImportModal extends Component {

  render() {

    let {
      isOpen,
      handleClose,
      importLoading,
      addressName,
      addressNameError,
      addressNameErrorMessage,
      publicAddress,
      publicAddressError,
      publicAddressErrorMessage,
      privateKey,
      privateKeyError,
      privateKeyErrorMessage,
      mnemonicPhrase,
      mnemonicPhraseError,
      mnemonicPhraseErrorMessage,
      handleChange,
      error,
      handleImport,
      tokenValue,
      tokenOptions,
      tokenError,
      tokenErrorMessage,
      handleSelectChange,
    } = this.props

    return (
      <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth={'md'} TransitionComponent={Transition}>
        {importLoading?<SectionLoader />:''}
        <Grid container style={{ overflowY: 'hidden' }}>
          <Grid item xs={3}>
            <Grid container directtion='column' justify='space-around' style={{ alignContent: 'center', height: '100%', background:'#2B323C', minHeight: '525px' }}>
              <Grid item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} >
            <Grid container direction='row' justify='center' alignItems="flex-start" style={{ height: '100%' }}>
              <Grid item xs={11}>
                <Typography variant="h3" style={{
                    marginTop: '24px'
                  }}>
                  Import Account
                </Typography>
              </Grid>
              <Grid item xs={11}>
                { this.renderSelect("Select The Token", tokenValue, tokenOptions, tokenError, tokenErrorMessage, handleSelectChange, importLoading, 'token') }
              </Grid>
              <Grid item xs={11}>
                { this.renderImput("Account Name", addressName, addressNameError, addressNameErrorMessage, handleChange, importLoading, 'addressName') }
              </Grid>
              { (tokenValue !== 'Bitcoin' && tokenValue !== 'Binance') && (
                <Grid item xs={11}>
                  { this.renderImput("Public Address", publicAddress, publicAddressError, publicAddressErrorMessage, handleChange, importLoading, 'publicAddress') }
                </Grid>)
              }
              <Grid item xs={11}>
                { this.renderImput("Private Key", privateKey, privateKeyError, privateKeyErrorMessage, handleChange, importLoading, 'privateKey') }
              </Grid>
              { (tokenValue ==='Bitcoin' || tokenValue === 'Binance') && (
                <Grid item xs={11}>
                  { this.renderImput("Mnemonic Phrase", mnemonicPhrase, mnemonicPhraseError, mnemonicPhraseErrorMessage, handleChange, importLoading, 'mnemonicPhrase') }
                </Grid>)
              }
              <Grid item xs={11}>
                <Typography style={{color: '#f44336'}} >
                  {error}
                </Typography>
              </Grid>
              <Grid item xs={11} align='right'>
                <Button disabled={importLoading} variant='contained' size='small' onClick={handleImport} color="primary" autoFocus>
                  Import Account
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>)
  };

  renderImput(label, value, error, errorMessage, onChange, disabled, name) {
    return (<FormControl error={error} fullWidth={true} >
      <Typography variant="body1" style={{
          fontSize: '12px',
          fontFamily: "Montserrat-SemiBold"
        }}>
        {label}
      </Typography>
      <Input name={name} value={value} onChange={onChange} disabled={disabled} />
      {error === true ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : null}
    </FormControl>)
  }

  renderSelect(label, value, options, error, errorMessage, onChange, disabled, name) {
    return (<FormControl error={error} fullWidth={true} >
      <Typography variant="body1" style={{
          fontSize: '12px',
          fontFamily: "Montserrat-SemiBold"
        }}>
        {label}
      </Typography>
      <Select name={name} value={value} onChange={onChange} disabled={disabled} renderValue={value => {
          let selected = null
          let val = ''
          selected = options && options.length > 0 && options.filter((option) => {
            return option.value === value
          })[0]
          if(selected) {
            val = selected.description
          }

          return (
            <Typography variant="body1" noWrap>{ val }</Typography>
          );
        }}
      >
        {options
          ? options.map(option => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <ListItemText primary={option.description} />
                </MenuItem>
              );
            })
          : ""}
      </Select>
      {error === true ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : null}
    </FormControl>)
  }
}

export default (ImportModal);
