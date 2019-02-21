import * as React from "react";
import {FundingPool, GetAvailableFundingPoolsResponse, GetManagedFundingPoolsResponse, isFundingPool, PoolingContact, PoolingContract, PoolingContractBlockChain} from "../types/pooling";
import {withAppContext, WithAppContext} from "./AppContext";
import {EthAddress} from "../types/eth";
import {WanAddress} from "../types/wan";
import {ApiResponse} from "../types/api";

interface PoolingContextInterface {
  managedPools: FundingPool[];
  availablePools: FundingPool[];
  availablePoolsLoading: boolean;
  managedPoolsLoading: boolean;
  createPoolingContract: (poolingContract: PoolingContract) => Promise<any>
  deletePoolingContract: (poolId: number) => Promise<any>
  updatePoolingContract: (poolId: number, poolingContract: PoolingContract) => Promise<any>
  deployPoolingContract: (poolId: number) => Promise<ApiResponse>;
  updateTokenAddress: (poolId: number, tokenAddress: string) => void;
  setPoolLocked: (poolId: number, isLocked: boolean) => Promise<boolean>;
  updatePledgesEndDate: (poolId: number, pledgesEndDate: string) => void;
  updateSaleAddress: (poolId: number, saleAddress: string) => void;
  sendPoolFunds: (poolId: number) => void;
  confirmTokens: (poolId: number) => void;
  enableWithdrawTokens: (poolId: number) => void;
  distributeAll: (poolId: number) => Promise<boolean>;
  depositToPoolingContract: (poolId: number, fromAddress: string, amount: number, gwei: number) => Promise<any>;
  withdrawFromPoolingContract: (poolId: number, userAddress: string, amount: number) => void;
  pledgeToPoolingContract: (poolId: number, userAddress: string, amount: number) => Promise<boolean>;
  withdrawAllFromPoolingContract: (userAddress: string, poolAddress: string, blockchain: PoolingContractBlockChain) => void;
  getFundingPoolPendingTransactions: (blockchain: PoolingContractBlockChain, address: string) => void;
  getManagedFundingPoolPendingTransactions: (poolId: number) => void;
  getManagedFundingPoolContributions: (poolId: number) => Promise<PoolingContact[]>;
  getManagedFundingPools: (userId: string) => void;
  getAvailableFundingPools: (userId: string, poolId?: number) => void;
  getManagedFundingPoolDetails: (poolId: number) => Promise<FundingPool | ApiResponse>;
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
    managedPoolsLoading: false,
    createPoolingContract: async poolingContract => {
      const {appContext: {callApi}} = this.props;
      const url = "pooling/createPoolingContract";
      const method = "POST";
      // const userIds = [];
      // for (const id of poolingContract.whitelistedUsers) {
      //   userIds.push(id.userId);
      // }
      return callApi(url, method, {
        ...poolingContract,
        // whitelistUserIds: userIds,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      });
    },
    deletePoolingContract: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = "pooling/deletePoolingContract";
      const method = "POST";
      return callApi(url, method, {
        poolId
      }).then(res => {
        return res.success;
      });
    },
    updatePoolingContract: (poolId, poolingContract) => {
      const {appContext: {callApi}} = this.props;
      const url = "pooling/updatePoolingContract";
      const method = "POST";
      return callApi(url, method, {
        ...poolingContract,
        poolId,
        ownerAddress: poolingContract.blockchain === "ETH" ? (poolingContract.ownerAddress as EthAddress).address : (poolingContract.ownerAddress as WanAddress).publicAddress
      }).then(res => {
        return res.success;
      });
    },
    deployPoolingContract: poolId => {
      const {appContext: {callApi}} = this.props;
      const url = "pooling/deployPoolingContract";
      const method = "POST";
      return callApi(url, method, {
        poolId,
      }).then(res => {
        return {
          success: res.success,
          message: res.success ? "" : res.errorMsg
        }
      });
    },
    updateTokenAddress: (poolId, tokenAddress) => {
      console.log(poolId);
      console.log(tokenAddress);
    },
    setPoolLocked: (poolId, isLocked) => {
      console.log(poolId);
      console.log(isLocked);
      const {appContext: {callApi}} = this.props;
      const url = "pooling/setPoolLocked";
      const method = "POST";
      return callApi(url, method, {
        poolId, isLocked
      }).then(res => {
        console.log(res);
        return res.success;
      });
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
    distributeAll: (poolId) => {
      const {appContext: {callApi}} = this.props;
      const url = "pooling/distributeAll";
      const method = "POST";
      return callApi(url, method, {
        poolId,
        count: 0,
      }).then(res => {
        console.log(res);
        return res.success;
      });
    },
    depositToPoolingContract: (poolId, fromAddress, amount, gwei = 0) => {
      console.log(poolId);
      console.log(fromAddress);
      console.log(amount);
      console.log(gwei);
      const {appContext: {callApi}} = this.props;
      const url = "pooling/depositToPoolingContract";
      const method = "POST";
      return callApi(url, method, {
        poolId, amount, fromAddress, gwei
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
      const url = "pooling/pledgeToPoolingContract";
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
          const id = managedPools.findIndex(pool => pool.id === poolId);
          managedPools[id] = {...managedPools[id], pendingTransactions: [...res.pendingTransactions]};
          this.setState({managedPools});
        }
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
      const {getManagedFundingPoolPendingTransactions, getManagedFundingPoolDetails, getManagedFundingPoolContributions} = this.state;
      const {appContext: {callApi}} = this.props;
      this.setState({managedPools: [], managedPoolsLoading: true});
      const url = `pooling/getManagedFundingPools/${userId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {

        // if (response && response.success) {
        //   this.setState({managedPools: [...response.fundingPools]});
        //   for (const pool of response.fundingPools) {
        //     getManagedFundingPoolPendingTransactions(pool.id);
        //   }
        // }
        // return response && response.success;
        const response: GetManagedFundingPoolsResponse = res as GetManagedFundingPoolsResponse;
        const availPools: FundingPool[] = [];
        if (response && response.success) {
          let count = response.fundingPools.length;
          count === 0 && this.setState({managedPoolsLoading: false});
          response.fundingPools.forEach(async (pool) => {
            await getManagedFundingPoolDetails(pool.id).then(fetchedPool => {
              getManagedFundingPoolContributions(pool.id).then(res => {
                getManagedFundingPoolPendingTransactions(pool.id);
                // console.log(fetchedPool);
                // console.log(pool);
                if (isFundingPool(fetchedPool)) {
                  fetchedPool.whitelistedUsers = res;
                  availPools.push({...pool, ...fetchedPool});
                } else {
                  availPools.push({...pool});
                }
                count--;
                this.setState({managedPools: availPools, managedPoolsLoading: count !== 0});
              });
            })
          });
        }
        // response.fundingPools.map(pool=>
        //     getManagedFundingPoolDetails(pool.id)
        // )
      });
    },
    getAvailableFundingPools: (userId, poolId) => {
      const {appContext: {callApi}} = this.props;
      // const {getManagedFundingPoolDetails, getManagedFundingPoolContributions, getManagedFundingPoolPendingTransactions} = this.state;
      this.setState({availablePools: [], availablePoolsLoading: true});
      let url = `pooling/getAvailableFundingPools/${userId}`;
      if (poolId !== null) {
        url = `${url}/${poolId}`
      }
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        const response: GetAvailableFundingPoolsResponse = res as GetAvailableFundingPoolsResponse;
        // const availPools: FundingPool[] = [];
        this.setState({availablePools: response.fundingPools, availablePoolsLoading: false});
        // if (response && response.success) {
        //   let count = response.fundingPools.length;
        //   count === 0 && this.setState({availablePoolsLoading: false});
        //   response.fundingPools.forEach(async (pool) => {
        //     await getManagedFundingPoolDetails(pool.id).then(fetchedPool => {
        //       getManagedFundingPoolContributions(pool.id).then(res => {
        //         getManagedFundingPoolPendingTransactions(pool.id);
        //         // console.log(fetchedPool);
        //         // console.log(pool);
        //         if (isFundingPool(fetchedPool)) {
        //           fetchedPool.whitelistedUsers = res;
        //           availPools.push({...pool, ...fetchedPool});
        //         } else {
        //           availPools.push({...pool});
        //         }
        //         count--;
        //         this.setState({availablePools: availPools, availablePoolsLoading: count !== 0});
        //       });
        //     })
        //   });
        // }
      });
    },
    getManagedFundingPoolDetails: (poolId) => {
      const {appContext: {callApi}} = this.props;
      const url = `pooling/getManagedFundingPoolDetails/${poolId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        const {getManagedFundingPoolContributions} = this.state;
        const pool = res.fundingPool;
        if (res.success) {
          return getManagedFundingPoolContributions(poolId).then(res => {
            if (res !== null) {
              pool.whitelistedUsers = res;
            }
            return pool;
          });
        } else {
          return {
            message: res.errorMsg,
            success: false
          };
        }
        // return res.success ? res.fundingPool : {};
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
  R = Omit<P, "poolingContext">>(
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
