import * as React from 'react';
import {convertWhitelistToWhiteListRequest, GetUserSavedWhitelistDetailsResponse, GetUserSavedWhitelistsResponse, Whitelist} from "../types/whitelist";
import {WithAppContext, withAppContext} from "./AppContext";

interface WhitelistContextInterface {
  whitelists: Whitelist[];
  getUserSavedWhitelists: (userId: string) => void;
  getUserSavedWhitelistDetails: (whitelistId: number) => Promise<Whitelist>;
  createSavedWhitelist: (whitelist: Whitelist) => Promise<boolean>;
  updateSavedWhitelist: (whitelist:Whitelist)=>Promise<boolean>;
  deleteSavedWhitelist: (whitelistId:number)=>Promise<boolean>;
  addUsersToSavedWhitelist: (whitelistId:number,userIds:string[])=>Promise<boolean>;
  removeUsersFromSavedWhitelist: (whitelistId:number,userIds:string[])=>Promise<boolean>;
  updateUsersOnPoolWhitelist: (poolId:number,users:{userId:string,allocation:number}[])=>void;
  addUsersToPoolWhitelist: (poolId:number,users:{userId:string,allocation:number}[])=>Promise<boolean>;
  removeUsersFromPoolWhitelist: (poolId:number,userIds:string[])=>Promise<boolean>;
}

const ctxt = React.createContext<WhitelistContextInterface | null>(null);

const WhitelistContextProvider = ctxt.Provider;

const WhitelistContextConsumer = ctxt.Consumer;

class WhitelistContext extends React.Component<WithAppContext, WhitelistContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  readonly state: WhitelistContextInterface = {
    whitelists: [],
    getUserSavedWhitelists: userId => {
      const {appContext: {callApi}} = this.props;
      const url = `whitelists/getUserSavedWhitelists/${userId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        const response = res as GetUserSavedWhitelistsResponse;
        if (response.whitelists) {
          const whitelists:Whitelist[] = response.whitelists.map(wl=>({id:wl.id,name:wl.name|| "",users:[],userCount: wl.userCount}));
          this.setState({whitelists});
        }
      });
    },
    getUserSavedWhitelistDetails: whitelistId => {
      const {appContext: {callApi}} = this.props;
      const url = `whitelists/getUserSavedWhitelistDetails/${whitelistId}`;
      const method = "GET";
      return callApi(url, method, {}).then(res => {
        console.log(res);
        return (res as GetUserSavedWhitelistDetailsResponse).whitelist;
      });
    },
    createSavedWhitelist: async (whitelist) => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/createSavedWhitelist';
      const method = "POST";
      return callApi(url, method, {
        ...convertWhitelistToWhiteListRequest(whitelist)
      }).then(res => res.success);
    },
    updateSavedWhitelist: whitelist => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/updateSavedWhitelist';
      const method = "POST";
      return callApi(url, method, {
        whitelistId: whitelist.id,
        name: whitelist.name
      }).then(res => {
        return res.success;
      });
    },
    deleteSavedWhitelist: async whitelistId => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/deleteSavedWhitelist';
      const method = "POST";
      return callApi(url, method, {
        whitelistId
      }).then(res => {
        return res.success;
      });
    },
    addUsersToSavedWhitelist: async (whitelistId, userIds) => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/addUsersToSavedWhitelist';
      const method = "POST";
      return userIds.length?callApi(url, method, {
        whitelistId: whitelistId,
        userIds: [...userIds]
      }).then(()=>true):false;


    },
    removeUsersFromSavedWhitelist: async (whitelistId, userIds) => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/removeUsersFromSavedWhitelist';
      const method = "POST";
      return userIds.length? callApi(url, method, {
        whitelistId: whitelistId,
        userIds: [...userIds]
      }).then(() => true):false;
    },
    updateUsersOnPoolWhitelist: (poolId, users) => {
      console.log(poolId);
      console.log(users);
    },
    addUsersToPoolWhitelist: async (poolId, users) => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/addUsersToPoolWhitelist';
      const method = "POST";
      return users.length?callApi(url, method, {
        poolId,
        users
      }).then(()=>true):false;
    },
    removeUsersFromPoolWhitelist: async (poolId, userIds) => {
      const {appContext: {callApi}} = this.props;
      const url = 'whitelists/removeUsersFromPoolWhitelist';
      const method = "POST";
      return userIds.length? callApi(url, method, {
        poolId,
        userIds: [...userIds]
      }).then(() => true):false;
    }
  };

  public render() {
    const {children} = this.props;
    return (
        <WhitelistContextProvider value={this.state}>
          {children}
        </WhitelistContextProvider>
    )
  }

}

export interface WithWhitelistContext {
  whitelistContext: WhitelistContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withWhitelistContext<P extends { whitelistContext?: WhitelistContextInterface },
    R = Omit<P, 'whitelistContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
        <WhitelistContextConsumer>
          {value => {
            // @ts-ignore
            return <Component {...props} whitelistContext={value} />;
          }}
        </WhitelistContextConsumer>
    );
  };
}

export default withAppContext(WhitelistContext);
