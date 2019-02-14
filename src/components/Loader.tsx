import * as React from 'react';
import {Grid} from "@material-ui/core";

interface OwnProps {
}


interface Props extends OwnProps {
}

class Loader extends React.Component<Props> {
  public render() {
    return (
      <Grid container justify="center">
        <img src={require("../assets/images/curve-gif.gif")} alt="" />
      </Grid>
      )
    ;
  }
}

export default Loader as React.ComponentClass<OwnProps>;
