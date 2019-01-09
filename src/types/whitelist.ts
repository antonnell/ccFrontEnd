import {Contact} from "./contacts";

export interface WhiteListUsers {
  userId: number; // the ID of the user to include in the whitelist
}
export interface Whitelist {
  id?: number | null;
  name: string;  // Name of the whitelist
  users: Contact[];  // list of users to include in the whitelist, each consisting of:
  userCount?: number;
  createdDate?: string;
}

export interface WhitelistRequest {
  name: string;  // Name of the whitelist
  users: WhiteListUsers[];  // list of users to include in the whitelist, each consisting of:
}

export const initialWhitelist:Whitelist = {
  name: "",
  users: []
};

export interface GetUserSavedWhitelistsResponse {
  whitelists: Partial<Whitelist>[];
  success: boolean;
  errorMsg: string;
}

export interface GetUserSavedWhitelistDetailsResponse {
  whitelist: Whitelist;
  success: boolean;
  errorMsg: string;
}

export const convertWhitelistToWhiteListRequest = (whitelist:Whitelist)=> {
  return {
    name: whitelist.name,
    users: (whitelist.users.map(user=>({userId:user.userId})) as unknown as WhiteListUsers[])
  } as WhitelistRequest;
};
