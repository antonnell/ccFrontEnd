import * as React from 'react';
import {FundingPools, GetManagedFundingPoolsResponse, PoolingContract} from "../types/pooling";
import {WithAppContext, withAppContext} from "./AppContext";
import {EthAddress} from "../types/eth";
import {WanAddress} from "../types/wan";

interface PoolingContextInterface {
  pools: FundingPools[];
  getManagedFundingPools: (userId:string)=>void;
  createPoolingContract: (poolingContract: PoolingContract) => void
}

const ctxt = React.createContext<PoolingContextInterface | null>(null);

const PoolingContextProvider = ctxt.Provider;

const PoolingContextConsumer = ctxt.Consumer;

class PoolingContext extends React.Component<WithAppContext, PoolingContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  public state: PoolingContextInterface = {
    pools: [],
    createPoolingContract: poolingContract => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/createPoolingContract';
      // const url = 'ethereum/updateAddress';
      const method = "POST";
      callApi(url, method, {
        ...poolingContract,
        ownerAddress: poolingContract.blockChain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    },
    getManagedFundingPools: (userId)=> {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPools/${userId}`;
      const method = "GET";
      callApi(url, method,{}).then(res=> {
        const response:GetManagedFundingPoolsResponse = res as GetManagedFundingPoolsResponse;
        response.success && this.setState({pools:[...response.fundingPools]})
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
