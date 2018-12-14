import React from 'react';
import PoolsComponent from '../components/pools';

const createReactClass = require('create-react-class');

let Pools = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      whiteLists: this.props.whiteLists,
    }
  },
  render() {
    return (
      <PoolsComponent
        loading={this.state.loading}
        error={this.state.error}
        pools={this.props.whiteLists}
      />
    )
  },
});

export default (Pools);
