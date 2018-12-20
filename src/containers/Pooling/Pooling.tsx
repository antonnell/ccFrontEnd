import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Pools from "./components/Pools";
import WhiteLists from "./components/WhiteLists/WhiteLists";
import Header from "../../components/Header";
import HeaderItems from "../../constants/HeaderItems";
import {User} from "../../types/account";

interface OwnProps {
  user: User;
}

interface Props extends OwnProps {
}

class Pooling extends React.Component<Props> {

  public render() {
    const {user} = this.props;
    return (
        <Grid container direction="row">
          <Header title="Pooling" headerItems={HeaderItems.pooling} />
          <Pools user={user}/>
          <WhiteLists whiteLists={[]} />
        </Grid>)
  }
}

export default Pooling as React.ComponentClass<Props>;
