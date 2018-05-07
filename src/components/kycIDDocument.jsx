import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';

const styles = {};

class KYCIDDOcument extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    var imagePreview = null
    if(this.props.idDocumentImagePreviewUrl != null) {
      imagePreview = <img src={this.props.idDocumentImagePreviewUrl} style={{width: '100%', height: '100%', margin: 'auto'}} alt="upload" />;
    }
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40} style={{padding:20}}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            You're almost done.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please upload a copy of your ID Document or Passport.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          <input
            accept="image/*"
            style={{display: 'none'}}
            id="raised-button-file"
            type="file"
            onChange={this.props.uploadIDDocument}
          />
          <label htmlFor="raised-button-file">
            <Button size="small" variant="raised" color="primary" component="span">Upload Document</Button>
          </label>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          {imagePreview}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.idDocumentImagePreviewUrl?"raised":"flat"} disabled={!this.props.idDocumentImagePreviewUrl} color="primary" onClick={this.props.navigateUploadPhoto}>Done</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYCIDDOcument);
