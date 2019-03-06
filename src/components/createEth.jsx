import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import PageTItle from "./pageTitle";

class CreateEth extends Component {

  render() {

    let { theme } = this.props

    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} >
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTItle theme={theme} root={'Accounts'} screen={'Ethereum'} />
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} align='left'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.loading}
                id="addressName" placeholder="Name your Ethereum account" value={this.props.addressName}
                onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown}
                helperText={this.props.addressNameErrorMessage} />
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
              <Button size="small" variant="text" onClick={this.props.navigateSkip} disabled={this.props.loading} >Skip</Button>
            </Grid>
            <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
              <Button size="small" variant={this.props.addressNameValid?"contained":"text"} disabled={(!this.props.addressNameValid)||this.props.loading} color="primary" onClick={this.props.createEthAddress}>Create account</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default (CreateEth);
