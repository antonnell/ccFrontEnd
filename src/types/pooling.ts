import {EthAddress} from "./eth";
import {WanAddress} from "./wan";
import {Contact} from "./contacts";

export type PoolingContractBlockChain = "ETH"|"WAN";

export interface PoolingContact extends Contact {
  allocation?: number;
  value?: number;
}

export interface PoolingContract {
  blockchain: PoolingContractBlockChain;
  ownerAddress: EthAddress|WanAddress | null | undefined;   // An ethereum or wanchain address belonging to the current user to deploy the contract from. This address will become the contract owner
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
  existingWhitelistId: number | null;           // saved whitelist id to create this pool’s whitelist from
  whitelistedUsers: PoolingContact[];
}

export const initialPoolingContract:PoolingContract = {
  blockchain: "ETH",
  ownerAddress: null,
  name: "",
  minContribution: 0,
  maxContribution: 0,
  isPledgesEnabled: false,
  pledgesEndDate: new Date().toDateString(),
  saleAddress: "", // 0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0
  tokenAddress: "", // 0xa57e3290d0b7cb2748ed410c19c1d58f7f192bc0
  transactionFee: 0,
  isWhitelistEnabled: false,
  existingWhitelistId: null,
  whitelistedUsers: []
};

export const poolingBlockChainOptions:PoolingContractBlockChain[] = ["ETH","WAN"];

export const PoolingContractStatus = {
  0: "Setup",
  1: "Unlocked",
  2: "Locked",
  3: "Token Received",
  4: "Tokens Ready",
  5: "Pledges"
};

export interface FundingPool {
  blockchain: PoolingContractBlockChain;
  contractAddress: string;
  id: number;
  name: string;
  status: keyof typeof PoolingContractStatus;
  transactionId: string|null;
}

export interface GetManagedFundingPoolsResponse {
  errorMsg: string|null
  fundingPools: FundingPool[];
  success: boolean;
}

export interface GetAvailableFundingPoolsResponse extends GetManagedFundingPoolsResponse{}
