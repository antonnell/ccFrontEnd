export interface Contact {
  email: string;
  primaryAionAddress: string;
  primaryEthAddress: string;
  primaryWanAddress: string;
  userId: string;
  userName: string;
}

export interface SearchContactsResponse {
  contacts: Contact[];
  errorMsg: null| string;
  success: boolean;
}
