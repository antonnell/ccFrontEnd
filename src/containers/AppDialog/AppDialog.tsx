import * as React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import {withDialogContext, WithDialogContext} from "../../context/DialogContext";
import {DialogContentText, Theme, WithStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {DialogActionResult} from '../../types/dialog';
import DialogActions from "@material-ui/core/DialogActions";

const styles = (theme: Theme) =>
    createStyles({
      dialogContent: {
        padding: theme.spacing.unit * 3,
        paddingTop: 0,
      }
    });

interface OwnProps {
}

interface Props extends OwnProps, WithDialogContext, WithStyles<typeof styles> {
}

class AppDialog extends React.Component<Props> {

  public render() {
    const {
      classes, dialogContext: {
        title,
        open,
        body
      }
    } = this.props;
    return (
        <Dialog open={open} >
          <DialogTitle>{title}</DialogTitle>
          <DialogContentText className={classes.dialogContent}>{body}</DialogContentText>
          <DialogActions>
            <Button onClick={this.handleClick("denied")} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick("confirmed")} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  private handleClick = (result:DialogActionResult) => ()=>{
    const {hideDialog} = this.props.dialogContext;
    hideDialog(result);
  };
}

export default withStyles(styles)(withDialogContext(AppDialog)) as unknown as React.ComponentClass<OwnProps>;
