import React from 'react';
import RegisterCompletedComponent from '../components/registerCompleted';

const createReactClass = require('create-react-class');


let RegisterCompleted = createReactClass({
  getInitialState() {
    return { };
  },

  render() {
    return (
      <RegisterCompletedComponent
        theme={ this.props.theme }
        email={ this.props.email }
      />
    );
  }
});

export default RegisterCompleted;
