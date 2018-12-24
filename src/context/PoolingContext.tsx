import * as React from 'react';
import {FundingPools, GetAvailableFundingPoolsResponse, GetManagedFundingPoolsResponse, PoolingContract} from "../types/pooling";
import {WithAppContext, withAppContext} from "./AppContext";
import {EthAddress} from "../types/eth";
import {WanAddress} from "../types/wan";

interface PoolingContextInterface {
  pools: FundingPools[];
  getManagedFundingPools: (userId:string)=>void;
  getAvailableFundingPools: (userId:string)=>void;
  createPoolingContract: (poolingContract: PoolingContract) => Promise<any>
  updatePoolingContract: (poolId:number,poolingContract: PoolingContract) => Promise<any>
  getManagedFundingPoolDetails: (poolId:number)=>Promise<PoolingContract>;
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
      const method = "POST";
      return callApi(url, method, {
        ...poolingContract,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    },
    updatePoolingContract: (poolId,poolingContract) => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/updatePoolingContract';
      const method = "POST";
      return callApi(url, method, {
        ...poolingContract,
        poolId,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    },
    getAvailableFundingPools: (userId)=> {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getAvailableFundingPools/${userId}`;
      const method = "GET";
      callApi(url, method,{}).then(res=> {
        console.log(res);
        const response:GetAvailableFundingPoolsResponse = res as GetAvailableFundingPoolsResponse;
        console.log(response);
      });
    },
    getManagedFundingPools: (userId)=> {
      const {appContext: {callApi}} = this.props;
      // const {getManagedFundingPoolDetails} = this.state;
      const url = `pooling/getManagedFundingPools/${userId}`;
      const method = "GET";
      callApi(url, method,{}).then(res=> {
        const response:GetManagedFundingPoolsResponse = res as GetManagedFundingPoolsResponse;
        response.success && this.setState({pools:[...response.fundingPools]});
        // response.fundingPools.map(pool=>
        //     getManagedFundingPoolDetails(pool.id)
        // )
      });
    },
    getManagedFundingPoolDetails: (poolId)=> {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPoolDetails/${poolId}`;
      const method = "GET";
      return callApi(url, method,{}).then(res=> {
        console.log(res);
        return res.success && res.fundingPool;
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
