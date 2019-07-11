import * as React from 'react';
import {Grid} from "@material-ui/core";
import CurveGif from "../assets/images/curve-gif.gif";

interface OwnProps {
}


interface Props extends OwnProps {
}

class Loader extends React.Component<Props> {
  public render() {
    return (
      <Grid container justify="center" style={{flex: 1,height: "100%"}} alignItems="center">
        <img src={CurveGif} alt="" />
      </Grid>
      )
    ;
  }
}

export default Loader as React.ComponentClass<OwnProps>;
