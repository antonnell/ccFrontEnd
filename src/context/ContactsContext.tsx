import * as React from 'react';
import {withAppContext, WithAppContext} from "./AppContext";
import {Contact, SearchContactsResponse} from "../types/contacts";

interface ContactsContextInterface {
  searchContacts: (userNameOrEmail:string)=>Promise<Contact[]>;
}

const ctxt = React.createContext<ContactsContextInterface | null>(null);

const ContactsContextProvider = ctxt.Provider;

const ContactsContextConsumer = ctxt.Consumer;

class ContactsContext extends React.Component<WithAppContext, ContactsContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  readonly state: ContactsContextInterface = {
    searchContacts:userNameOrEmail => {
      const {appContext: {callApi}} = this.props;
      const url = `contacts/searchContacts/${userNameOrEmail}`;
      const method = "GET";
      return callApi(url, method,{}).then(res=> {
        return (res as SearchContactsResponse).contacts || [];
      });
    }
  };

  public render() {
    const {children} = this.props;
    return (
        <ContactsContextProvider value={this.state}>
          {children}
        </ContactsContextProvider>
    )
  }

}

export interface WithContactsContext {
  contactsContext: ContactsContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withContactsContext<P extends { contactsContext?: ContactsContextInterface },
    R = Omit<P, 'contactsContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
        <ContactsContextConsumer>
          {value => {
            // @ts-ignore
            return <Component {...props} contactsContext={value} />;
          }}
        </ContactsContextConsumer>
    );
  };
}

export default withAppContext(ContactsContext);
