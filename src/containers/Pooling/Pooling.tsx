import * as React from "react";
import {User} from "../../types/account";
import Grid from "@material-ui/core/Grid";
import Pools from "./components/Pools";
import WhiteLists from "./components/WhiteLists/WhiteLists";
import Header from "../../components/Header";
import HeaderItems from "../../constants/HeaderItems";

interface OwnProps {
  user: User
}

interface Props extends OwnProps {
}

class Pooling extends React.Component<Props> {

  // public shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
  //   // This is used to prevent reRenders
  //   if (odiff(this.props,nextProps).length) {
  //     console.log(odiff(this.props,nextProps));
  //     return false;
  //   } else {
  //     return false;
  //   }
  // }

  public render() {

    return (
        <Grid container direction="row">
          <Header title="Pooling" headerItems={HeaderItems.pooling} />
          <Pools pools={[]}  />
          <WhiteLists whiteLists={[]} />
        </Grid>)
  }
}

export default Pooling as React.ComponentClass<Props>;
