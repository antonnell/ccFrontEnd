import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

class PageLoader extends Component {
  render() {
    let { theme, root, screen } = this.props
    return (
      <div style={{ position: 'fixed', left: '0px', right: '0px', top: '0px'}}>
        <LinearProgress />
      </div>
    );
  }
}

export default PageLoader;
