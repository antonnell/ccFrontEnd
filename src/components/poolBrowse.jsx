import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Card  from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Pools from '../containers/pools';
import CustomWhitelists from '../containers/customWhitelists';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill='#b5b5b5' d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </SvgIcon>
  );
};

class PoolBrowse extends Component {

  renderPools() {
    if(this.props.pools == null) {
      return (<Grid item xs={12} xl={12} align='left' style={{minHeight: '190px', position: 'relative'}}>
        <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>
      </Grid>);
    }

    if(this.props.pools.length == 0) {
      return (<Grid item xs={12} xl={12} align='center' style={{minHeight: '190px', paddingTop: '100px'}}>
        <Typography variant="display1" >Oh no, we couldn't find any pools for you. Why don't you create one?</Typography>
      </Grid>);
    }

    return this.props.pools.map((pool) => {
        return (
          <Grid item xs={12} xl={6} align='left' key={pool.name}>
            <Card style={{margin: '12px'}}>
              <CardContent>
                <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0}>
                  <Grid item xs={12} align='left'>
                    <Typography noWrap variant="display2" style={{minHeight: '32px'}}>
                      {pool.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='left' style={{marginTop: '2px'}}>
                    <Typography variant="body1">
                      {pool.creator}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align='center'>
                    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{paddingTop: '12px'}}>
                      <Grid item xs={12} align='left'>
                        <Typography variant="subheading">
                          561 Contributors
                        </Typography>
                      </Grid>
                      <Grid item xs={12} align='left' style={{marginTop: '2px'}}>
                        <Typography variant="body1" noWrap>
                          51 Days left
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })
  };

  render() {
    return (
      <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={0} style={{marginTop: '0px'}}>
        <Grid item xs={12} align='left' style={{margin: '12px', padding: '24px 0px', borderBottom: '2px solid '+this.props.theme.custom.headingBorder.color, display: 'flex' }}>
          <div style={{flex: 1}}>
            <Typography variant='display1'>
              Browse Pools
            </Typography>
          </div>
          <div>
            <Button size="small" variant='contained' color="primary" onClick={this.props.handleHome}>Pool Home</Button>
            <IconButton
              style={{verticalAlign: 'top', marginRight: '-20px', marginTop: '-7px'}}
              color="primary"
              aria-label="More"
              buttonRef={node => {
                this.anchorEl = node;
              }}
              onClick={(e) => { this.props.optionsClicked(e) }}>
              <MoreIcon  />
            </IconButton>
            <Popover
              open={this.props.open}
              anchorEl={this.anchorEl}
              anchorPosition={{ top: 200, left: 400 }}
              onClose={this.props.optionsClosed}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              >
              <List component="nav">
                <ListItem button onClick={() => { this.props.browsePoolsClicked() }}>
                  <ListItemText primary="Browse Pools" />
                </ListItem>
                <ListItem button onClick={() => { this.props.myInvitesClicked() }}>
                  <ListItemText primary="My Invites" />
                </ListItem>
              </List>
            </Popover>
          </div>
        </Grid>
        {this.renderPools()}
      </Grid>
    );
  }
}

export default (PoolBrowse);
