import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import headerItems from "../../constants/HeaderItems";
import {User} from "../../types/account";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithPoolingContext, withPoolingContext} from "../../context/PoolingContext";
import DetailsGroup from "./components/DetailsGroup";
import Button from "@material-ui/core/Button";
import {colors} from "../../theme";

const styles = (theme: Theme) =>
  createStyles({
    containerGrid: {
      marginTop: theme.spacing.unit * 2.5
    },
    button: {
      minWidth: 150,
      color: colors.dark
    },
    buttonSpacer: {
      margin: theme.spacing.unit
    },
  });

export interface PoolDetailsGroupItems {
  title: string;
  text: string;
  width: 6 | 12;
}

interface PoolDetailsGroups {
  title: string;
  items: PoolDetailsGroupItems[]
}

interface OwnProps {
  id: number;
  user: User;
}

interface State {
  groups: PoolDetailsGroups[];
}

interface Props extends OwnProps, WithStyles<typeof styles>, WithPoolingContext {
}

class PoolDetails extends React.Component<Props> {
  readonly state: State = {
    groups: [
      {
        title: "Settings",
        items: [
          {title: "Pool Name",text: "Example Pool",width: 6},
          {title: "Creator",text: "Tyler_Durdin",width: 6},
          {title: "Pool Security",text: "Public",width: 6},
          {title: "Token Name",text: "Bloom",width: 6},
          {title: "Token Address",text: "0xb1B670f4da7c0BE238775EBe74F8Fa5852C15591",width: 12},
        ]
      },
      {
        title: "Details",
        items: [
          {title: "Progress",text: "95% Complete",width: 12},
        ]
      },
      {
        title: "Allocations",
        items: [
          {title: "Contract Cap",text: "1000 ETH / $250,000",width: 6},
          {title: "Fee",text: "5%",width: 6},
          {title: "Min-Cap",text: "10 ETH",width: 6},
          {title: "Max-Cap",text: "25 ETH",width: 6},
        ]
      },
      {
        title: "",
        items: [
          {title: "Amount Pooled",text: "950 ETH / $238,000",width: 12},
          {title: "Contributors",text: "561",width: 12},
        ]
      }
    ]
  };

  componentWillMount(): void {
    const {id} = this.props;
    console.log(id);
  }

  public render() {
    const {classes} = this.props;
    const {groups} = this.state;
    return (
      <React.Fragment>
        <Header title="Pool Details" headerItems={headerItems.pooling} loading={false}/>
        <Grid container direction="row" className={classes.containerGrid} spacing={40}>
          {groups.map((group,i)=><DetailsGroup key={i} title={group.title} items={group.items} />)}
          <Grid item container direction="row" justify="flex-end" xs={12}>
            <Button variant="outlined" color="secondary" className={classes.button}>Join</Button>
            <div className={classes.buttonSpacer} />
            <Button variant="contained" color="secondary" className={classes.button}>Contribute</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withPoolingContext(PoolDetails)) as unknown as React.ComponentClass<Props>;
