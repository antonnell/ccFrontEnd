export interface Erc20TokenAddress {
  address: string;
  balance: number;
  decimals: number;
  name: string;
  symbol: string;
}

export interface EthAddress {
  id: number;
  isPrimary: boolean;
  name: string;
  address: string;
  balance: number;
  usdBalance: number;
  erc20Tokens: Erc20TokenAddress[]
}
