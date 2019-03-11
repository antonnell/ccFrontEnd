import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PageTItle from "./pageTitle";
import PageLoader from "./pageLoader";

class CreateWan extends Component {

  render() {

    let { theme } = this.props

    return (
      <Grid container justify="space-around" alignItems="center" direction="row" spacing={0} >
        <Grid
          item
          xs={12}
          align="left"
        >
          <PageTItle theme={theme} root={'Accounts'} screen={'Wanchain'} />
        </Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} align='left'>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            <Grid item xs={12} align='center'>
              <TextField style={{maxWidth:'400px', width: '100%'}} fullWidth={false} required color="textSecondary" error={this.props.addressNameError} disabled={this.props.loading}
                id="addressName" placeholder="Name your Wanchain account" value={this.props.addressName}
                onChange={(event) => { this.props.handleChange(event, 'addressName'); }} margin="normal" onKeyDown={this.props.onCreateKeyDown}
                helperText={this.props.addressNameErrorMessage} />
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="center" direction="row" spacing={0}  style={{marginTop: '50px'}}>
            {this.props.loading && <PageLoader />}
            <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
              <Button size="small" variant="text" onClick={this.props.navigateSkip} disabled={this.props.loading}>Skip</Button>
            </Grid>
            <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
              <Button size="small" variant={this.props.addressNameValid?"contained":"text"} disabled={(!this.props.addressNameValid)||this.props.loading} color="primary" onClick={this.props.createWanAddress}>Create account</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default (CreateWan);
