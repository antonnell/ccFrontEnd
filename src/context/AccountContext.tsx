import * as React from 'react';
import {WithAppContext, withAppContext} from "./AppContext";

interface AccountContextInterface {
  confirmEmail: (token:string,code:string)=>Promise<boolean>;
}

const ctxt = React.createContext<AccountContextInterface | null>(null);

const AccountContextProvider = ctxt.Provider;

const AccountContextConsumer = ctxt.Consumer;

class AccountContext extends React.Component<WithAppContext, AccountContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  readonly state: AccountContextInterface = {
    confirmEmail: (token, code) => {
      const {appContext: {callApi}} = this.props;
      const url = 'account/confirmEmail';
      const method = "POST";
      return callApi(url, method, {
        token,
        code,
        callbackUrl: `${window.location.protocol}//${window.location.host}`
      }).then(res => {
        return res.success;
      });
    }
  };

  public render() {
    const {children} = this.props;
    return (
      <AccountContextProvider value={this.state}>
        {children}
      </AccountContextProvider>
    )
  }

}

export interface WithAccountContext {
  accountContext: AccountContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAccountContext<P extends { accountContext?: AccountContextInterface },
  R = Omit<P, 'accountContext'>>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <AccountContextConsumer>
        {value => {
          // @ts-ignore
          return <Component {...props} accountContext={value} />;
        }}
      </AccountContextConsumer>
    );
  };
}

export default withAppContext(AccountContext);
