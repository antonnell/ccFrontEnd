import * as React from 'react';
import {hexEncode} from "../helpers/helpers";
import crypto from "crypto";
import {User} from "../types/account";
import config from '../config';
import bip39 from 'bip39';
import sha256 from 'sha256';

interface AppContextInterface {
  callApi: (
      url: string,
      method: "GET" | "POST",
      postData: {} | null,
  ) => Promise<any>
}

const ctxt = React.createContext<AppContextInterface | null>(null);

const AppContextProvider = ctxt.Provider;

const AppContextConsumer = ctxt.Consumer;

class AppContext extends React.Component<{}, AppContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  public state: AppContextInterface = {
    callApi: (url, method, postData) => {
      const {apiUrl} = config;
      //get X-curve-OTP from sessionStorage
      // console.log(sessionStorage);
      const userString = sessionStorage.getItem('cc_user') || "{}";
      const user: User = JSON.parse(userString);
      const authOTP = user.authOTP;
      const call = apiUrl + url;
      let signData;
      if (method === 'GET') {
        postData = null;
      } else {
        const signJson = JSON.stringify(postData);
        const signMnemonic = bip39.generateMnemonic();
        const cipher = crypto.createCipher('aes-256-cbc', signMnemonic);
        const signEncrypted =
            cipher.update(signJson, 'utf8', 'base64') + cipher.final('base64');
        signData = {
          e: hexEncode(signEncrypted),
          m: hexEncode(signMnemonic),
          u: sha256(url.toLowerCase()),
          p: sha256(sha256(url.toLowerCase())),
          t: new Date().getTime(),
        };
        const signSeed = JSON.stringify(signData);
        signData = {
            ...signData,
          s: sha256(signSeed)
        }
      }

      return fetch(call, {
        method: method,
        body: JSON.stringify(signData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
          'X-curve-OTP': authOTP
        }
      })
          .then(res => {
            if (res.status === 401) {
              console.log("401");
              //return poolingEmitter.emit('Unauthorised', null, null);
            }
            if (res.status === 403) {
              console.log("403");
              // return poolingEmitter.emit('Unauthorised', null, null);
            }

            if (res.ok) {
              return res.json();
            } else {
              throw Error(res.statusText);
            }
          })
          .catch(error => {
            console.log(error);
            // poolingEmitter.emit(payload.type, error, null, customEmit);
          });
    }
  };

  public render() {
    // console.log(...helperRenderConsoleText('Render AppContext', 'lightGreen'));
    const {children} = this.props;
    return (
        <AppContextProvider value={this.state}>
          {children}
        </AppContextProvider>
    )
  }

}

export interface WithAppContext {
  appContext: AppContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<P extends { appContext?: AppContextInterface },
    R = Omit<P, 'appContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
        <AppContextConsumer>
          {value => {
            // @ts-ignore
            return <Component {...props} appContext={value} />;
          }}
        </AppContextConsumer>
    );
  };
}

export default AppContext;

/* eslint-disable */
// @ts-ignore
String.prototype.hexEncode = function () {
  let hex, i;
  let result = '';
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }
  return result;
};
/* eslint-enable */
