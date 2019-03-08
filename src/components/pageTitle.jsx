import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class PageTItle extends Component {
  render() {
    let { theme, root, screen } = this.props

    if(!theme) {
      return null
    }
    
    return (
      <div style={theme.custom.pageTitle}>
        <Typography variant="h6"><span style={theme.custom.pageTitleRoot}>{root} </span> > {screen}</Typography>
      </div>
    );
  }
}

export default PageTItle;
