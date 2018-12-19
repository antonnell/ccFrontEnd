import * as React from 'react';
import AppContext from "./AppContext";
import PoolingContext from "./PoolingContext";

interface OwnProps {
}

type Props = OwnProps;

class Context extends React.Component<Props> {
  public render() {
    // console.log(...helperRenderConsoleText('Render Context', 'lightGreen'));
    const {children} = this.props;
    return (
        <AppContext>
          <PoolingContext>
            {children}
          </PoolingContext>
        </AppContext>
    );
  }
}

export default (Context) as React.ComponentClass<OwnProps>;
