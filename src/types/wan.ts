export interface Wrc20TokenAddress {
  address: string;
  balance: number;
  decimals: number;
  name: string;
  symbol: string;
}
export interface WanAddress {
  id: number;
  name: string;
  balance: number;
  isPrimary: boolean;
  privateAddress: string;
  publicAddress: string;
  usdBalance: number;
  wrc20Tokens: Wrc20TokenAddress[]
}
