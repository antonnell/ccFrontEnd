import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MoreIcon } from '../../../theme/icons';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Header extends React.Component {
  render() {
    const {
      theme,
      handleHome,
      optionsClicked,
      open,
      optionsClosed,
      browsePoolsClicked,
      myInvitesClicked
    } = this.props;
    return (
      <Grid
        item
        xs={ 12 }
        align="left"
        style={ {
          margin: '12px',
          padding: '24px 0px',
          borderBottom:
            '2px solid ' + theme.custom.headingBorder.color,
          display: 'flex'
        } }
      >
        <div style={ { flex: 1 } }>
          <Typography variant="h5">Create Pool</Typography>
        </div>
        <div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={ handleHome }
          >
            Pool Home
          </Button>
          <IconButton
            style={ {
              verticalAlign: 'top',
              marginRight: '-20px',
              marginTop: '-7px'
            } }
            color="primary"
            aria-label="More"
            buttonRef={ node => {
              this.anchorEl = node;
            } }
            onClick={ e => {
              optionsClicked(e);
            } }
          >
            <MoreIcon style={ { color: 'b5b5b5' } } />
          </IconButton>
          <Popover
            open={ open }
            anchorEl={ this.anchorEl }
            anchorPosition={ { top: 200, left: 400 } }
            onClose={ optionsClosed }
            anchorOrigin={ {
              vertical: 'top',
              horizontal: 'left'
            } }
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'left'
            } }
          >
            <List component="nav">
              <ListItem
                button
                onClick={ () => {
                  browsePoolsClicked();
                } }
              >
                <ListItemText primary="Browse Pools" />
              </ListItem>
              <ListItem
                button
                onClick={ () => {
                  myInvitesClicked();
                } }
              >
                <ListItemText primary="My Invites" />
              </ListItem>
            </List>
          </Popover>
        </div>
      </Grid>
    );
  }
}

export default Header;
