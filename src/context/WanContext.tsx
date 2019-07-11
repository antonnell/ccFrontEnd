import * as React from 'react';
import {WithAppContext, withAppContext} from "./AppContext";

interface WanContextInterface {
  importMyCCAddress: (name:string,isPrimary:boolean,address:string,privateKey:string)=>Promise<boolean>;
}

const ctxt = React.createContext<WanContextInterface | null>(null);

const WanContextProvider = ctxt.Provider;

const WanContextConsumer = ctxt.Consumer;

class WanContext extends React.Component<WithAppContext, WanContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  readonly state: WanContextInterface = {
    importMyCCAddress: (name,isPrimary,address,privateKey) => {
      const {appContext: {callApi}} = this.props;
      const url = 'wanchain/importMyCCAddress';
      const method = "POST";
      return callApi(url, method, {
        name,isPrimary,address,privateKey,
      }).then(res => {
        return res.success;
      });
    }
  };

  public render() {
    const {children} = this.props;
    return (
      <WanContextProvider value={this.state}>
        {children}
      </WanContextProvider>
    )
  }

}

export interface WithWanContext {
  wanContext: WanContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withWanContext<P extends { wanContext?: WanContextInterface },
  R = Omit<P, 'wanContext'>>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <WanContextConsumer>
        {value => {
          // @ts-ignore
          return <Component {...props} wanContext={value} />;
        }}
      </WanContextConsumer>
    );
  };
}

export default withAppContext(WanContext);
