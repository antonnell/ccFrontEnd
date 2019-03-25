import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import { Typography, Button, Card, CardContent, CardActionArea, CardActions, CardMedia, Avatar } from "@material-ui/core";

class Account extends Component {
  render() {
    let { theme, account, cardClicked, transactClicked, stakeClicked } = this.props

    let logo = 'footer'
    if(["Aion", "Bitcoin", "Ethereum", "Wanchain", "Tezos"].includes(account.type)) {
      logo = account.type
    } else if (account.type === 'ERC20') {
      logo = 'Ethereum'
    } else if (account.type === 'WRC20') {
      logo = "Wanchain"
    }

    return (

      <Card>
        <CardActionArea onClick={cardClicked}>
          <CardContent style={{ position: "relative" }}>
            <div style={ {
              width: '150px',
              height: '150px',
              position: 'relative',
              backgroundImage: 'url("' + require('../assets/images/'+logo+'-logo.png') + '")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              margin: '50px auto'
             } }>
            </div>
            <div style={{ margin: '0 auto'}}>
              <Grid container >
                <Grid item xs={4} align='left'>
                  <Typography variant="h4" noWrap style={{ lineHeight: '39px' }}>
                    Balance
                  </Typography>
                </Grid>
                <Grid item xs={8} align='right'>
                  <Typography variant="h4" noWrap style={{fontSize: '20px'}}>
                    {account.balance.toFixed(4) + ' ' + account.symbol}
                  </Typography>
                  <Typography variant="h4" noWrap style={{color: '#888'}}>
                    {"$" + account.usdBalance.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
        <CardContent style={{ position: "relative" }}>
          <Grid container style={{marginTop: '12px'}}>
            <Grid item xs={6} align='left'>
              <Button size="small" variant="contained" color="secondary" onClick={() => { stakeClicked(account.type, account) }}>
                Stake
              </Button>
            </Grid>
            <Grid item xs={6} align='right'>
              <Button size="small" variant="contained" color="primary" onClick={() => { transactClicked(account) }}>
                Transact
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Account;
