import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {};

class KYCIDDOcument extends Component {

  render() {
    var imagePreview = null
    if(this.props.idDocumentImagePreviewUrl != null) {
      imagePreview = <img src={this.props.idDocumentImagePreviewUrl} style={{width: '100%', height: '100%', margin: 'auto'}} alt="upload" />;
    }
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="h6">
            You're almost done.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body1">
            Please upload a copy of your ID Document or Passport.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          <input
            accept="image/*"
            style={{display: 'none'}}
            id="contained-button-file"
            type="file"
            onChange={this.props.uploadIDDocument}
          />
          <label htmlFor="contained-button-file">
            <Button size="small" variant="contained" color="primary" component="span">Upload Document</Button>
          </label>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          {imagePreview}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="text" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.idDocumentImagePreviewUrl?"contained":"text"} disabled={!this.props.idDocumentImagePreviewUrl} color="primary" onClick={this.props.navigateUploadPhoto}>Next</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYCIDDOcument);
