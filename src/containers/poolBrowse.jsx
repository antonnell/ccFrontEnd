import React from "react";
import PoolBrowseComponent from "../components/poolBrowse";
const createReactClass = require("create-react-class");

// let poolingEmitter = require('../store/poolingStore.js').default.poolingEmitter
// let poolingDispatcher = require('../store/poolingStore.js').default.poolingDispatcher

let Pooling = createReactClass({
  getInitialState() {
    return {
      error: "",
      open: false
    };
  },

  render() {
    return (
      <PoolBrowseComponent
        theme={this.props.theme}
        error={this.state.error}
        pools={this.props.whiteLists}
        whitelists={this.props.whitelists}
        handleHome={this.handleHome}
        optionsClicked={this.optionsClicked}
        optionsClosed={this.optionsClosed}
        open={this.state.open}
        browsePoolsClicked={this.browsePoolsClicked}
        myInvitesClicked={this.myInvitesClicked}
      />
    );
  },

  handleHome() {
    window.location.hash = "pooling";
  },

  optionsClicked() {
    this.setState({ open: true });
  },

  optionsClosed() {
    this.setState({ open: false });
  },

  browsePoolsClicked() {
    window.location.hash = "browsePools";
  },

  myInvitesClicked() {}
});

export default Pooling;
