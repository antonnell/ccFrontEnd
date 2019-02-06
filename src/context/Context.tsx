import * as React from 'react';
import AppContext from "./AppContext";
import PoolingContext from "./PoolingContext";
import ContactsContext from "./ContactsContext";
import WhitelistContext from "./WhitelistContext";
import DialogContext from "./DialogContext";
import SnackBarContext from "./SnackBarContext";
import AccountContext from "./AccountContext";
import WanContext from "./WanContext";

interface OwnProps {
}

type Props = OwnProps;

class Context extends React.Component<Props> {
  public render() {
    // console.log(...helperRenderConsoleText('Render Context', 'lightGreen'));
    const {children} = this.props;
    return (
      <AppContext>
        <WanContext>
          <PoolingContext>
            <AccountContext>
              <ContactsContext>
                <WhitelistContext>
                  <DialogContext>
                    <SnackBarContext>
                      {children}
                    </SnackBarContext>
                  </DialogContext>
                </WhitelistContext>
              </ContactsContext>
            </AccountContext>
          </PoolingContext>
        </WanContext>
      </AppContext>
    );
  }
}

export default (Context) as React.ComponentClass<OwnProps>;
