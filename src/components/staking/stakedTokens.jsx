import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from  '@material-ui/core/SvgIcon';
import { colors } from '../../theme';
import IconButton from '@material-ui/core/IconButton';
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        fill={props.theme?props.theme.custom.icon.color:'#888888'}
        d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
      />
    </SvgIcon>
  );
}

class StakedTokens extends Component {

  render() {

    let { theme } = this.props

    return (
      <Grid
        item
        xs={12}
        align="left"
      >
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
          direction="row"
          style={theme.custom.sectionTitle}
        >
          <Grid item xs={12} align='left'>
            <Typography variant='h2' align='left' style={{ lineHeight: '37px' }}>Staked Tokens</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} align='left'>
            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              direction="row"
              style={{
                marginLeft: '-24px',
                width: 'calc(100% + 48px)'
              }}
            >
              { this.renderTokens() }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderTokens() {
    let { userStakes } = this.props

    return userStakes.map(stake => {
      return this.renderToken(stake)
    })

  }

  renderToken(token) {
    const { theme, optionsClicked, optionsClosed, depositClicked, withdrawClicked, optionsToken } = this.props

    let optionsOpen = false
    let anchorEl = null
    if( optionsToken && token.currency === optionsToken.currency ) {
      optionsOpen = true
      anchorEl = optionsToken.anchorEl
    }

    return (
      <Grid item xs={12} sm={6} lg={4} xl={3} key={token.currency} style={{ padding: '24px' }}>
        <Card>
          <CardContent>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              direction="row">
              <Grid item xs={3} align='left'>
                <Avatar>{token.currency.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs={6} align='left'>
                <Typography variant="h3" nowrap>
                  {token.currency}
                </Typography>
              </Grid>
              <Grid item xs={3} align='right'>
                <IconButton
                  style={ {
                    verticalAlign: "top",
                    marginRight: "-20px",
                    marginTop: "-4px"
                  } }
                  color="primary"
                  aria-label="More"
                  buttonRef={ node => {
                    this.anchorEl = node;
                  } }
                  onClick={(event) => {
                    optionsClicked(event, token)
                  }}
                >
                  <MoreIcon theme={theme}/>
                </IconButton>
                <Popover
                  open={optionsOpen}
                  anchorEl={anchorEl}
                  anchorPosition={{ top: 200, left: 400 }}
                  onClose={ optionsClosed }
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                >
                  <List component="nav">
                    <ListItem
                      button
                      onClick={() => {
                        depositClicked(token);
                      }}
                    >
                      <ListItemText primary="Deposit" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        withdrawClicked(token);
                      }}
                    >
                      <ListItemText primary="Widthdraw" />
                    </ListItem>
                  </List>
                </Popover>
              </Grid>
              <Grid item xs={8} style={theme.custom.tokenInfo}>
                <Typography nowrap variant='body1' style={theme.custom.tokenPair}>
                  <span style={theme.custom.tokenValue}>{token.totalRewards} | </span> Total Rewards
                </Typography>
                <Typography nowrap variant='body1' style={theme.custom.tokenPair}>
                  <span style={theme.custom.tokenValue}>{token.rewardsToday} | </span> Rewards Today
                </Typography>
                  <Typography nowrap variant='body1' style={theme.custom.tokenPair}>
                  <span style={theme.custom.tokenValue}>{token.totalStake} | </span> Total Staked
                </Typography>
              </Grid>
              <Grid item xs={4} align='right' style={{alignSelf: 'flex-end'}}>
                <div style={ {
                  background: colors.lightBlue,
                  maxWidth: '70px',
                  textAlign: 'center',
                  padding: '6px',
                  borderRadius: '4px'
                } }>
                  <Typography variant='body1' style={theme.custom.tokenValue}>{token.age + ' Days'}</Typography>
                  <Typography variant='body1' style={{fontSize: '10px'}}>age</Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default StakedTokens;
