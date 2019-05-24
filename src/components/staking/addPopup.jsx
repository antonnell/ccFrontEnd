import React, { Component } from 'react';

import {
  Grid,
  Dialog,
  Button,
  Typography,
  Slide,
  FormControl,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  ListItemText
} from '@material-ui/core';

import SectionLoader from '../sectionLoader';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddPopup extends Component {

  render() {

    let {
      handleClose,
      handleStakeFinish,
      handleSelectChange,
      onChange,
      loading,
      isOpen,

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
      // ownDelegateValue,
      // ownDelegateError,
      // ownDelegateErrorMessage,
    } = this.props

    return (

      <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth={'md'} TransitionComponent={Transition}>
        {loading?<SectionLoader />:''}

        <Grid container style={{ overflowY: 'hidden' }}>
          <Grid item xs={3}>
            <Grid container directtion='column' justify='space-around' style={{ alignContent: 'center', height: '100%', background:'#2B323C', minHeight: '525px' }}>
              <Grid item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} >
            <Grid container direction='column' justify='space-between' alignItems="flex-start" style={{ height: '100%' }}>
              <Grid item style={{ width: '100%', padding: '24px' }}>
                <Typography variant="h3">
                  Add Stake
                </Typography>
              </Grid>
              <Grid item style={{ width: '100%' }}>
                <Grid container justify="space-around" alignItems="flex-start" direction="row" style={{ width: '100%' }} >
                  <Grid item xs={11} align="left">
                    { this.renderSelect("Select The Token", tokenValue, tokenOptions, tokenError, tokenErrorMessage, handleSelectChange, loading, 'token') }
                  </Grid>
                  <Grid item xs={11} align="left" style={{ marginTop: '60px' }} >
                    { this.renderSelect("Select Your Account", accountValue, accountOptions, accountError, accountErrorMessage, handleSelectChange, loading, 'account') }
                  </Grid>
                  <Grid item xs={11} align="left" style={{ marginTop: '60px' }} >
                    { this.renderImput("Stake Deposit Amount", amountValue, amountError, amountErrorMessage, onChange, loading, 'amount') }
                  </Grid>
                  { tokenValue === 'XTZ' &&
                    <Grid item xs={11} align="left" style={{ marginTop: '60px' }} >
                      { this.renderSelect("Select Delegate Account", delegateValue, delegateOptions, delegateError, delegateErrorMessage, handleSelectChange, loading, 'delegate') }
                    </Grid>
                  }
                  { /* tokenValue === 'XTZ' &&
                    <Grid item xs={11} align="left" style={{ marginTop: '20px' }} >
                      <Typography variant="body1" style={{
                          fontSize: '12px',
                          fontFamily: "Montserrat-SemiBold"
                        }}>
                        or
                      </Typography>
                    </Grid> */
                  }
                  { /*tokenValue === 'XTZ' &&
                    <Grid item xs={11} align="left" style={{ marginTop: '20px' }} >
                      { this.renderImput("Own Delegate Account", ownDelegateValue, ownDelegateError, ownDelegateErrorMessage, onChange, loading, 'delegate') }
                    </Grid> */
                  }
                </Grid>
              </Grid>
              <Grid item align="right" style={{ width: '100%', padding: '24px' }}>
                <Button variant='contained' size='large' onClick={handleStakeFinish} color="secondary" autoFocus>
                  Finish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  }

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
            val = selected.description + (selected.balance ? (' ('+selected.balance.toFixed(4)+' '+selected.symbol+')') : '')
          }

          return (
            <Typography variant="body1" noWrap>{ val }</Typography>
          );
        }}
      >
        {options
          ? options.map(option => {
              if(!option) {
                return null
              }

              return (
                <MenuItem key={option.value} value={option.value}>
                  <ListItemText primary={option.description + (option.balance ? (' ('+option.balance.toFixed(4)+' '+option.symbol+')') : '')} />
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

export default AddPopup;
