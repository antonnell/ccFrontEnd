import * as React from 'react';
import {FundingPool, GetAvailableFundingPoolsResponse, GetManagedFundingPoolsResponse, PoolingContact, PoolingContract, PoolingContractBlockChain} from "../types/pooling";
import {WithAppContext, withAppContext} from "./AppContext";
import {EthAddress} from "../types/eth";
import {WanAddress} from "../types/wan";

interface PoolingContextInterface {
  managedPools: FundingPool[];
  availablePools: FundingPool[];
  availablePoolsLoading: boolean;
  createPoolingContract: (poolingContract: PoolingContract) => Promise<any>
  deletePoolingContract: (poolId: number) => Promise<any>
  updatePoolingContract: (poolId: number, poolingContract: PoolingContract) => Promise<any>
  deployPoolingContract: (poolId: number) => Promise<boolean>;
  updateTokenAddress: (poolId: number, tokenAddress: string) => void;
  setPoolLocked: (poolId: number, isLocked: boolean) => void;
  updatePledgesEndDate: (poolId: number, pledgesEndDate: string) => void;
  updateSaleAddress: (poolId: number, saleAddress: string) => void;
  sendPoolFunds: (poolId: number) => void;
  confirmTokens: (poolId: number) => void;
  enableWithdrawTokens: (poolId: number) => void;
  depositToPoolingContract: (poolId: number, fromAddress: string, amount: number, gwei: number) => Promise<any>;
  withdrawFromPoolingContract: (poolId: number, userAddress: string, amount: number) => void;
  pledgeToPoolingContract: (poolId: number, userAddress: string, amount: number) => Promise<boolean>;
  withdrawAllFromPoolingContract: (userAddress: string, poolAddress: string, blockchain: PoolingContractBlockChain) => void;
  getFundingPoolPendingTransactions: (blockchain: PoolingContractBlockChain, address: string) => void;
  getManagedFundingPoolPendingTransactions: (poolId: number) => void;
  getManagedFundingPoolContributions: (poolId: number) => Promise<PoolingContact[]>;
  getManagedFundingPools: (userId: string) => Promise<boolean>;
  getAvailableFundingPools: (userId: string) => void;
  getManagedFundingPoolDetails: (poolId: number) => Promise<FundingPool>;
  getPoolContribution: (poolId: number, address: string) => void;
}

const ctxt = React.createContext<PoolingContextInterface | null>(null);

const PoolingContextProvider = ctxt.Provider;

const PoolingContextConsumer = ctxt.Consumer;

class PoolingContext extends React.Component<WithAppContext, PoolingContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  public state: PoolingContextInterface = {
    managedPools: [],
    availablePools: [],
    availablePoolsLoading: false,
    createPoolingContract: poolingContract => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/createPoolingContract';
      const method = "POST";
      return callApi(url, method, {
        ...poolingContract,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    },
    deletePoolingContract: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/deletePoolingContract';
      const method = "POST";
      return callApi(url, method, {
        poolId
      }).then(res => {
        return res.success;
      });
    },
    updatePoolingContract: (poolId, poolingContract) => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/updatePoolingContract';
      const method = "POST";
      return callApi(url, method, {
        ...poolingContract,
        poolId,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      }).then(res=>{
        return res.success;
      });
    },
    deployPoolingContract: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/deployPoolingContract';
      const method = "POST";
      return callApi(url, method, {
        poolId,
      }).then(res => {
        return res.success;
      });
    },
    updateTokenAddress: (poolId, tokenAddress) => {
      console.log(poolId);
      console.log(tokenAddress);
    },
    setPoolLocked: (poolId, isLocked) => {
      console.log(poolId);
      console.log(isLocked);
    },
    updatePledgesEndDate: (poolId, pledgesEndDate) => {
      console.log(poolId);
      console.log(pledgesEndDate);
    },
    updateSaleAddress: (poolId, saleAddress) => {
      console.log(poolId);
      console.log(saleAddress);
    },
    sendPoolFunds: poolId => {
      console.log(poolId);
    },
    confirmTokens: poolId => {
      console.log(poolId);
    },
    enableWithdrawTokens: poolId => {
      console.log(poolId);
    },
    depositToPoolingContract: (poolId, fromAddress, amount, gwei = 0) => {
      console.log(poolId);
      console.log(fromAddress);
      console.log(amount);
      console.log(gwei);
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/depositToPoolingContract';
      const method = "POST";
      return callApi(url, method, {
        poolId, amount,fromAddress,gwei
      }).then(res => {
        console.log(res);
        return res.success;
      });
    },
    withdrawFromPoolingContract: (poolId, userAddress, amount) => {
      console.log(poolId);
      console.log(userAddress);
      console.log(amount);
    },
    pledgeToPoolingContract: (poolId, userAddress, amount) => {
      const {appContext: {callApi}} = this.props;
      const url = 'pooling/pledgeToPoolingContract';
      const method = "POST";
      return callApi(url, method, {
        userAddress, poolId, amount
      }).then(res => {
        return res.success;
      });
    },
    withdrawAllFromPoolingContract: (userAddress, poolAddress, blockchain) => {
      console.log(userAddress);
      console.log(poolAddress);
      console.log(blockchain);
    },
    getFundingPoolPendingTransactions: (blockchain, address) => {
      console.log(blockchain);
      console.log(address);
    },
    getManagedFundingPoolPendingTransactions: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPoolPendingTransactions/${poolId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        if (res && res.success) {
          const {managedPools} = this.state;
          const id = managedPools.findIndex(pool=>pool.id === poolId);
          managedPools[id] = {...managedPools[id],pendingTransactions:[res.pendingTransactions]};
          this.setState({managedPools});
        }
        console.log(res);
      });
    },
    getManagedFundingPoolContributions: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPoolContributions/${poolId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        return res ? res.contributions : [];
      });
    },
    getManagedFundingPools: (userId) => {
      const {getManagedFundingPoolPendingTransactions} = this.state;
      const {appContext: {callApi}} = this.props;
      this.setState({managedPools:[]});
      const url = `pooling/getManagedFundingPools/${userId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        const response: GetManagedFundingPoolsResponse = res as GetManagedFundingPoolsResponse;
        if (response && response.success) {
          this.setState({managedPools: [...response.fundingPools]});
          for (const pool of response.fundingPools) {
            getManagedFundingPoolPendingTransactions(pool.id);
          }
        }
        return response && response.success;
        // response.fundingPools.map(pool=>
        //     getManagedFundingPoolDetails(pool.id)
        // )
      });
    },
    getAvailableFundingPools: (userId) => {
      const {appContext: {callApi}} = this.props;
      const {getManagedFundingPoolDetails, getManagedFundingPoolContributions,getManagedFundingPoolPendingTransactions} = this.state;
      this.setState({availablePools:[]});
      const url = `pooling/getAvailableFundingPools/${userId}`;
      const method = "GET";
      this.setState({availablePoolsLoading: true});
      callApi(url, method, {}).then(res => {
        const response: GetAvailableFundingPoolsResponse = res as GetAvailableFundingPoolsResponse;
        console.log(response);
        const availPools: FundingPool[] = [];
        if (response && response.success) {
          let count = response.fundingPools.length;
          response.fundingPools.forEach(async (pool) => {
            await getManagedFundingPoolDetails(pool.id).then(fetchedPool => {
              getManagedFundingPoolContributions(pool.id).then(res => {
                getManagedFundingPoolPendingTransactions(pool.id);
                fetchedPool.whitelistedUsers = res;
                availPools.push({...pool, ...fetchedPool});
                count--;
                this.setState({availablePools: availPools, availablePoolsLoading: count !== 0});
              });
            })
          });
        }
      });
    },
    getManagedFundingPoolDetails: (poolId) => {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPoolDetails/${poolId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        return res.success ? res.fundingPool : {};
      });
    },
    getPoolContribution: (poolId, address) => {
      console.log(poolId);
      console.log(address);
    },
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
