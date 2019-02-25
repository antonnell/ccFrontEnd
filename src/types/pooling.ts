import {EthAddress} from "./eth";
import {WanAddress} from "./wan";
import {Contact} from "./contacts";
import moment from "moment";

export type PoolingContractBlockChain = "ETH" | "WAN";

export interface PoolingContact extends Contact {
  allocation?: number;
  value?: number;
  pledge?: number;
}

export interface PoolingTransaction {
  functionCall: "deployPoolingContract" | "setDepositsLocked (True)" | "setDepositsLocked (False)";
  poolName: string;
  timestamp: string;
  transactionId: string;
  value: number;
}

export interface PoolingContract {
  blockchain: PoolingContractBlockChain;
  ownerAddress: EthAddress | WanAddress | null | undefined;   // An ethereum or wanchain address belonging to the current user to deploy the contract from. This address will become the contract owner
  name: string;                                 // Easy reference display name for the user to assign to this pooling contract
  status?: keyof typeof PoolingContractStatus;
  minContribution: number;                      // Minimum individual contribution the contract should accept, in Eth
  maxContribution: number;                      // Maximum individual contribution the contract should accept, in Eth
  isPledgesEnabled: boolean;                    // flag to indicate if pledges are enabled for this pooling contract
  pledgesEndDate: string;                       // if pledges are enabled, specifies the date/time at which the pledge stage ends and the deposit stage begins
  saleAddress: string;                          // Eth/Wan address to which the pooling contract will send its funds
  tokenAddress: string;                         // Eth/Wan address of the ERC20/WRC20 token which the users will withdraw from the contract after completion
  transactionFee: number;                       // Percentage cut that the owner will take of the total funding raised in this pool
  isWhitelistEnabled: boolean;                  // flag to indicate if this pool should use a whitelist
  isBusy: boolean;
  existingWhitelistId: number | null;           // saved whitelist id to create this pool’s whitelist from
  totalTokensReceived: number;
  totalTokensRemaining: number;
  tokenSymbol: string;
  whitelistUserIds?: string[];
  whitelistedUsers: PoolingContact[];
  pendingTransactions: PoolingTransaction[];
}

export const initialPoolingContract: PoolingContract = {
  blockchain: "ETH",
  ownerAddress: null,
  name: "",
  minContribution: 0,
  maxContribution: 0,
  isPledgesEnabled: false,
  pledgesEndDate: moment(new Date()).add(1,'days').format("YYYY-MM-DD"),
  saleAddress: "", // 0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0
  tokenAddress: "", // 0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0
  transactionFee: 0,
  isWhitelistEnabled: false,
  isBusy: false,
  existingWhitelistId: null,
  totalTokensReceived: 0,
  totalTokensRemaining: 0,
  tokenSymbol: "",
  whitelistedUsers: [],
  pendingTransactions: []
};

export const poolingBlockChainOptions: PoolingContractBlockChain[] = ["ETH", "WAN"];

export const PoolingContractStatus = {
  0: "Setup",
  1: "Unlocked",
  2: "Locked",
  3: "Token Received",
  4: "Tokens Ready",
  5: "Pledges",
  10: "Complete"
};

export interface FundingPool extends PoolingContract {
  blockchain: PoolingContractBlockChain;
  contractAddress: string;
  id: number;
  name: string;
  status: keyof typeof PoolingContractStatus;
  transactionId: string | null;
  contributorCount: number;
  fee: number;
  hardCap: number;
  maxContribution: number;
  minContribution: number;
  owner: string;
  softCap: number;
  tokenAddress: string;
  tokenName: string;
  totalPooled: number;
  totalPledged: number;
  balance: 0;
  isLocked: boolean;
  isPledgesEnabled: boolean;
  isTokensReceived: boolean;
  isWhitelistEnabled: boolean;
  pledgesEndDate: string;
  saleAddress: string;
  totalTokensReceived: number;
  totalTokensRemaining: number;
  transactionFee: number;
}

export const initialFundingPool: FundingPool = {
  ...initialPoolingContract,
  contractAddress: "",
  id: 0,
  status: 0,
  transactionId: null,
  contributorCount: 0,
  fee: 0,
  hardCap: 0,
  owner: "",
  softCap: 0,
  tokenName: "",
  totalPooled: 0,
  totalPledged: 0,
  balance: 0,
  isLocked: false,
  isTokensReceived: false,
  tokenSymbol: "",
  totalTokensReceived: 0,
  totalTokensRemaining: 0,
};

export interface GetManagedFundingPoolsResponse {
  errorMsg: string | null
  fundingPools: FundingPool[];
  success: boolean;
}

export interface GetAvailableFundingPoolsResponse extends GetManagedFundingPoolsResponse {
}

export const isFundingPool = (thing:any): thing is FundingPool => {
  return thing && thing.id !== undefined;
};
