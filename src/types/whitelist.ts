export interface WhiteListUsers {
  userId: number; // the ID of the user to include in the whitelist
}
export interface Whitelist {
  name: string;  // Name of the whitelist
  users: WhiteListUsers[];  // list of users to include in the whitelist, each consisting of:

}

export const initialWhitelist:Whitelist = {
  name: "",
  users: []
};
