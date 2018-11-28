import React from 'react';
import CustomWhitelistsComponent from '../components/customWhitelists';

const createReactClass = require('create-react-class');

let CustomWhitelists = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      whitelists: this.props.whitelists,
    }
  },
  render() {
    return (
      <CustomWhitelistsComponent
        loading={this.state.loading}
        error={this.state.error}
        whitelists={this.props.whitelists}
      />
    )
  },
})

export default (CustomWhitelists);
