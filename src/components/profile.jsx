import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends Component {
  render() {
    return (
      <Grid container justify="flex-start" alignItems="center" direction="row" spacing={0}  style={{marginTop: '24px'}}>
        <Grid item xs={12} sm={10} md={10} lg={10} align='left'>
          <Typography variant="h3">
            Profile Picture
          </Typography>
          <div style={{margin: '48px 12px', display: 'flex'}}>
            <div style={{width: '120px', height: '120px', borderRadius: '60px', marginRight: '24px', background: '#dedede', position: 'relative', backgroundImage: 'url("'+this.props.user.profilePhoto+'")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
              {this.props.loading && (
                <CircularProgress
                  size={36}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -18,
                    marginLeft: -18
                  }}
                />
              )}
            </div>
            <div style={{flex: 1}}>
              <Typography variant="h3" style={{fontSize: '14px', cursor: 'pointer', display: 'inline-block', textDecoration: 'underline', marginTop: '36px'}} onClick={this.props.handleUploadClicked}>
                Upload a new image
              </Typography>
              <Typography variant="body1" align='justify' style={{fontSize: '14px', marginTop: '12px'}}>
                Maximum size allowed is 1MB of PNG, JPG, JPEG
              </Typography>
            </div>
          </div>

          <Typography variant="h3">
            Personal Info
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '24px', fontWeight:  'bold'}}>
            Email
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '6px'}}>
            {this.props.user.email}
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '24px', fontWeight:  'bold'}}>
            Username
          </Typography>
          <Typography variant="body1" align='justify' style={{marginTop: '6px'}}>
            {this.props.user.username}
          </Typography>
        </Grid>
        <input type="file" id="imgupload" ref="imgupload" style={{display:'none'}} accept="image/x-png,image/jpg,image/jpeg" onChange={(event) => { this.props.onImageChange(event); }} />
      </Grid>
    );
  }
}

export default (Profile);
