import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {};

class KYCPhoto extends Component {

  render() {
    var imagePreview = null
    if(this.props.photoImagePreviewUrl != null) {
      imagePreview = <img src={this.props.photoImagePreviewUrl} style={{width: '100%', height: '100%', margin: 'auto'}} alt="upload" />;
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
            Please upload a recent photo of yourself holding your ID.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          <input
            accept="image/*"
            style={{display: 'none'}}
            id="raised-button-file"
            type="file"
            onChange={this.props.uploadPhoto}
          />
          <label htmlFor="raised-button-file">
            <Button size="small" variant="raised" color="primary" component="span">Upload Photo</Button>
          </label>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          {imagePreview}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.props.photoImagePreviewUrl?"raised":"flat"} disabled={!this.props.photoImagePreviewUrl}  color="primary" onClick={this.props.navigateJoinWhitelist}>Whitest me now</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYCPhoto);
