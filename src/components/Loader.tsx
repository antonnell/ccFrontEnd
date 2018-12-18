import * as React from 'react';

interface OwnProps {
}


interface Props extends OwnProps {
}

class Loader extends React.Component<Props> {
  public render() {
    return (
        <img src={require("../assets/images/curve-gif.gif")} alt="" />
    );
  }
}

export default Loader as React.ComponentClass<OwnProps>;
