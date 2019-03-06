import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

class SectionLoader extends Component {
  render() {
    let { theme, root, screen } = this.props
    return (
      <div style={{ position: 'absolute', left: '0px', right: '0px', top: '0px'}}>
        <LinearProgress />
      </div>
    );
  }
}

export default SectionLoader;
