import * as React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import {helperRenderConsoleText} from "../../helpers/helpers";
import {withDialogContext, WithDialogContext} from "../../context/DialogContext";
import {DialogContentText, Theme, WithStyles} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

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
    console.log(...helperRenderConsoleText('Render AppDialog', 'lightGreen'));
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
            <Button onClick={this.handleClick} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClick} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

  private handleClick = () => {
    const {hideDialog} = this.props.dialogContext;
    hideDialog();
  };
}

export default withStyles(styles)(withDialogContext(AppDialog)) as unknown as React.ComponentClass<OwnProps>;
