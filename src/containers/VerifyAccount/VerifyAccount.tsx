import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {WithAccountContext, withAccountContext} from "../../context/AccountContext";

interface OwnProps {
  token: string;
  code: string;
}

interface State {
  verifying: "inProgress"|"error"|"success";
}

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      marginTop: theme.spacing.unit * 12.5
    }
  });

interface Props extends OwnProps, WithStyles<typeof styles>, WithAccountContext {
}

class VerifyAccount extends React.Component<Props, State> {

  readonly state: State = {
    verifying: "inProgress",
  };

  componentWillMount(): void {
    const {token, code, accountContext:{confirmEmail}} = this.props;
    confirmEmail(token,code).then(res=>{
      this.setState({verifying: res?"success":"error"});
      if (res) {
        setTimeout(()=> {
          window.location.hash = "welcome"
        },3000);
      }
    })
  }

  public render() {
    const {classes} = this.props;
    const {verifying} = this.state;
    return (
      <React.Fragment>
        <Grid container className={classes.containerGrid} alignItems="center" spacing={40}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">Verify Account</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              {verifying === "inProgress" ? "Verifying..." :
                verifying === "success"?"Done":"Something went wrong"}
            </Typography>
            <Typography variant="body1" align="center">
              {verifying === "inProgress" ? "Please be patient" :
                verifying === "success"?"You will be redirected automatically":"Please check your email and make sure you've followed the correct link"}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)
(withAccountContext(VerifyAccount)) as React.ComponentClass<OwnProps>;
