import {EthAddress} from "./eth";
import {WanAddress} from "./wan";

export type PoolingContractBlockChain = "ETH"|"WAN";

export interface PoolingContract {
  blockChain: PoolingContractBlockChain;
  ownerAddress: EthAddress|WanAddress | null;   // An ethereum or wanchain address belonging to the current user to deploy the contract from. This address will become the contract owner
  name: string;                                 // Easy reference display name for the user to assign to this pooling contract
  minContribution: number;                      // Minimum individual contribution the contract should accept, in Eth
  maxContribution: number;                      // Maximum individual contribution the contract should accept, in Eth
  isPledgesEnabled: boolean;                    // flag to indicate if pledges are enabled for this pooling contract
  pledgesEndDate: string;                       // if pledges are enabled, specifies the date/time at which the pledge stage ends and the deposit stage begins
  saleAddress: string;                          // Eth/Wan address to which the pooling contract will send its funds
  tokenAddress: string;                         // Eth/Wan address of the ERC20/WRC20 token which the users will withdraw from the contract after completion
  transactionFee: number;                       // Percentage cut that the owner will take of the total funding raised in this pool
  isWhitelistEnabled: boolean;                  // flag to indicate if this pool should use a whitelist
  existingWhitelistId: number | null;           // saved whitelist id to create this pool’s whitelist from
}

export const initialPoolingContract:PoolingContract = {
  blockChain: "ETH",
  ownerAddress: null,
  name: "",
  minContribution: 0,
  maxContribution: 0,
  isPledgesEnabled: false,
  pledgesEndDate: "",
  saleAddress: "",
  tokenAddress: "",
  transactionFee: 0,
  isWhitelistEnabled: false,
  existingWhitelistId: null
};

export const poolingBlockChainOptions:PoolingContractBlockChain[] = ["ETH","WAN"];
