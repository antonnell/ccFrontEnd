import * as React from "react";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {PoolDetailsGroupItems} from "../PoolDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import {colors} from "../../../theme";


interface OwnProps {
  title: string;
  items: PoolDetailsGroupItems[]
}

const styles = (theme: Theme) =>
  createStyles({
    contentGrid: {
      marginTop: theme.spacing.unit * 4
    },
    contentTitle: {
      minHeight: 30
    },
    itemText: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.text.hint,
    },
    progressGrid: {
      marginTop: theme.spacing.unit * 4,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    progress: {
      color: colors["robin-s-egg"],
      transform: "rotate(-130deg) !important",
    },
  });

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class DetailsGroup extends React.Component<Props> {
  public render() {
    const {classes, title, items} = this.props;
    return (
      <Grid item xs={6}>
        <Typography variant="h3" className={classes.contentTitle}>{title}</Typography>
        <Grid container direction="row">
          {items.map((item, i) =>
            <React.Fragment key={i}>
              {!item.hidden &&
              <React.Fragment>
                {item.title === "Progress" ?
                    <Grid item xs={item.width} className={classes.progressGrid}>
                      <CircularProgress size={300} className={classes.progress} variant="static" value={95} />
                      <Typography variant="body1" style={{position: "absolute"}}>{item.text}</Typography>
                    </Grid>
                    :
                    <Grid item xs={item.width} className={classes.contentGrid}>
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body1" className={classes.itemText}>{item.text}</Typography>
                    </Grid>
                }
              </React.Fragment>
              }
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DetailsGroup) as React.ComponentClass<OwnProps>;
