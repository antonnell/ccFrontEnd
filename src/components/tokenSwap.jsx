import React, { Component } from 'react';
import PageTitle from './pageTitle';
import {
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  FormHelperText,
  Input,
  InputAdornment
} from '@material-ui/core';
import PageLoader from './pageLoader';
import Snackbar from './snackbar';

class TokenSwap extends Component {
  render() {
    const {
      error,
      message,
      theme,
      wanAccountValue,
      wanAccountOptions,
      wanAccountError,
      wanAccountErrorMessage,
      ethAccountValue,
      ethAccountOptions,
      ethAccountError,
      ethAccountErrorMessage,
      amountValue,
      amountError,
      amountErrorMessage,
      handleSelectChange,
      handleChange,
      loading,
      curveBalance,
      swapTokens
    } = this.props
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row">
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTitle theme={theme} root={null} screen={{display: 'Token Swap', location: 'tokenSwap'}} />
        </Grid>
        <Grid item xs={12} align="left">
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
            spacing={0}
            style={theme.custom.sectionTitle}
          >
            <Grid item xs={12} align='left'>
              <div style={theme.custom.inline}>
                <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Curve WRC20 to ERC20</Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} align="left">
          { this.renderSelect("Select Your Wanchain Account", wanAccountValue, wanAccountOptions, wanAccountError, wanAccountErrorMessage, handleSelectChange, loading, 'wanAccount') }
          { wanAccountValue && <Typography>
            Curve Balance: {curveBalance} CURV
          </Typography>}
        </Grid>
        <Grid item xs={12} align="left">
          { this.renderImput("Swap Amount", amountValue, amountError, amountErrorMessage, handleChange, loading, 'amount', 'CURV') }
        </Grid>
        <Grid item xs={12} align="left">
          { this.renderSelect("Select Your Ethereum Account", ethAccountValue, ethAccountOptions, ethAccountError, ethAccountErrorMessage, handleSelectChange, loading, 'ethAccount') }{ wanAccountValue && <Typography>
            This account will receive the ERC20 CURV
          </Typography>}
        </Grid>
        <Grid item xs={12} align='left' style={{ marginTop: '24px' }}>
          <Button disabled={loading} variant='contained' size='small' onClick={swapTokens} color="primary" autoFocus>
            Swap
          </Button>
        </Grid>
        { loading && this.renderLoader() }
        { error && this.renderSnackBar('Error', error) }
        { message && this.renderSnackBar('Information', message) }
      </Grid>
    );
  }

  renderSnackBar(type, message) {
    return <Snackbar open={true} type={type} message={message} />
  }

  renderLoader() {
    return <PageLoader />
  }

  renderSelect(label, value, options, error, errorMessage, onChange, disabled, name) {
    return (<FormControl error={error} fullWidth={true} style={{marginTop: '12px', maxWidth: '400px'}} >
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

  renderImput(label, value, error, errorMessage, onChange, disabled, name, inputAdornment) {
    return (<FormControl error={error} fullWidth={true} style={{marginTop: '12px', maxWidth: '400px'}} >
      <Typography variant="body1" style={{
          fontSize: '12px',
          fontFamily: "Montserrat-SemiBold"
        }}>
        {label}
      </Typography>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        endAdornment={<InputAdornment position="end">{inputAdornment ? inputAdornment : ''}</InputAdornment>}/>
      {error === true ? (
        <FormHelperText>{errorMessage}</FormHelperText>
      ) : null}
    </FormControl>)
  }
}

export default (TokenSwap);
