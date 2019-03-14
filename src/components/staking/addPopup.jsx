import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddPopup extends Component {

  render() {

    let { handleClose, handleStakeFinish, isOpen } = this.props

    return (
      <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth={'md'} TransitionComponent={Transition}>
        <DialogContent>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
          >
            {this.renderCards()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleStakeFinish} color="primary" autoFocus>
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderCards() {
    let { coins } = this.props.store

    return coins.map((coin) => {
      return this.renderCard(coin)
    })
  }

  renderCard(coin) {
    let { handleCheck } = this.props
    return (
      <Grid item xs={12} sm={6} md={4} key={coin.name} style={{ padding: '24px' }}>
        <Card style={{ cursor: 'pointer' }} onClick={()=> { handleCheck(coin); }}>
          <CardContent>
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              direction="row">
              <Grid item xs={3} align='left'>
                <Avatar>{coin.name.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs={6} align='left'>
                <Typography variant="h3" nowrap>
                  {coin.name}
                </Typography>
              </Grid>
              <Grid item xs={3} align='right'>
                <Checkbox checked={coin.checked} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default AddPopup;
