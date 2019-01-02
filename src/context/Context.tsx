import * as React from 'react';
import AppContext from "./AppContext";
import PoolingContext from "./PoolingContext";
import ContactsContext from "./ContactsContext";

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
            <ContactsContext>
            {children}
            </ContactsContext>
          </PoolingContext>
        </AppContext>
    );
  }
}

export default (Context) as React.ComponentClass<OwnProps>;
