import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SvgIcon from '@material-ui/core/SvgIcon';

function TickIcon(props) {
  const { color } = props;
  return (
    <SvgIcon style={{fontSize: '60px', marginRight: '40px'}}>
      <path
        fill={ color }
        d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5"
      />
    </SvgIcon>
  );
}

class RegisterCompleted extends Component {

  render() {
    const {
      theme,
      email
    } = this.props;
    if(!theme) {
      return null
    }

    return (
      <Grid
        container
        justify="space-around"
        direction="row"
        style={{ marginTop: "25%", position: 'relative' }}
      >
        <Grid item xs={10} md={6} align='left'>
          <div style={{display: 'inline-block'}}>
            <TickIcon
              color={theme.custom.tickIcon.color}
            />
          </div>
          <div style={{display: 'inline-block', verticalAlign: 'top'}}>
            <Typography variant="h5" style={{lineHeight: '64px'}}>Confirmation Email Sent</Typography>
          </div>
          <Typography variant="body1" style={ { marginTop: '24px', lineHeight: '35px', fontSize: '15px' } }>We sent a verification email to {email}. Click the link inside to get started! Please note the link will become invalid after 30 minutes.</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default RegisterCompleted;
