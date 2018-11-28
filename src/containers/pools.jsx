import React from 'react';
import PoolsComponent from '../components/pools';

const createReactClass = require('create-react-class');

let Pools = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      pools: this.props.pools,
    }
  },
  render() {
    return (
      <PoolsComponent
        loading={this.state.loading}
        error={this.state.error}
        pools={this.props.pools}
      />
    )
  },
})

export default (Pools);
