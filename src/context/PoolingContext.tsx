import * as React from 'react';
import {PoolingContract} from "../types/pooling";
import {WithAppContext, withAppContext} from "./AppContext";
import {EthAddress} from "../types/eth";
import {WanAddress} from "../types/wan";

interface PoolingContextInterface {
  createPoolingContract: (poolingContract: PoolingContract) => void
}

const ctxt = React.createContext<PoolingContextInterface | null>(null);

const PoolingContextProvider = ctxt.Provider;

const PoolingContextConsumer = ctxt.Consumer;

class PoolingContext extends React.Component<WithAppContext, PoolingContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  public state: PoolingContextInterface = {
    createPoolingContract: poolingContract => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/createPoolingContract';
      const method = "POST";
      callApi(url, method, {
        ...poolingContract,
        ownerAddress: poolingContract.blockChain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    }
  };

  public render() {
    const {children} = this.props;
    return (
        <PoolingContextProvider value={this.state}>
          {children}
        </PoolingContextProvider>
    )
  }

}

export interface WithPoolingContext {
  poolingContext: PoolingContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withPoolingContext<P extends { poolingContext?: PoolingContextInterface },
    R = Omit<P, 'poolingContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
        <PoolingContextConsumer>
          {value => {
            // @ts-ignore
            return <Component {...props} poolingContext={value} />;
          }}
        </PoolingContextConsumer>
    );
  };
}

export default withAppContext(PoolingContext) as unknown as React.ComponentClass<{}>;
