import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, {  CardContent } from 'material-ui/Card';

const styles = {};

class KYCPhoto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: null
    };

    this._handleImageChange = this._handleImageChange.bind(this);
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  };

  render() {
    var imagePreview = null
    if(this.state.imagePreviewUrl != null) {
      imagePreview = <img src={this.state.imagePreviewUrl} style={{width: '100%', height: '100%', margin: 'auto'}} alt="upload" />;
    }
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={40}>
        <Grid item xs={12} align='center' style={{marginBottom: '12px'}}>
          <Typography variant="title">
            You're almost done.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant="body2">
            Please upload a recent photo of yourself.
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          <input
            accept="image/*"
            style={{display: 'none'}}
            id="raised-button-file"
            type="file"
            onChange={this._handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button size="small" variant="raised" color="primary" component="span" onClick={this.props.uploadPhoto}>Upload Photo</Button>
          </label>
        </Grid>
        <Grid item xs={12} align='center' style={{marginTop: '24px '}}>
          {imagePreview}
        </Grid>
        <Grid item xs={3} align='left' style={{marginTop: '24px '}}>
          <Button size="small" variant="flat" onClick={this.props.navigateBack}>Back</Button>
        </Grid>
        <Grid item xs={9} align='right' style={{marginTop: '24px '}}>
          <Button size="small" variant={this.state.imagePreviewUrl?"raised":"flat"} disabled={!this.state.imagePreviewUrl}  color="primary" onClick={this.props.navigateJoinWhitelist}>Done</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(KYCPhoto);
