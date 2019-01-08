import * as React from 'react';
import {withAppContext, WithAppContext} from "./AppContext";
import {Contact, SearchContactsResponse} from "../types/contacts";

interface ContactsContextInterface {
  searchContacts: (userNameOrEmail:string)=>Promise<Contact[]>;
  getUserContacts: (userId:string)=>void;
  addUserContact: (emailOrUserName:string,displayName:string,notes:string,ownerUserName:string)=>void;
  updateUserContact: (userName:string,displayName:string,notes:string,ownerUserName:string)=>void;
  deleteUserContact: (contactUserName:string)=>void;
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
    },
    getUserContacts: userId => {
      console.log(userId);
    },
    addUserContact: (emailOrUserName, displayName, notes, ownerUserName) => {
      console.log(emailOrUserName);
      console.log(displayName);
      console.log(notes);
      console.log(ownerUserName);
    },
    updateUserContact: (userName, displayName, notes, ownerUserName) => {
      console.log(userName);
      console.log(displayName);
      console.log(notes);
      console.log(ownerUserName);
    },
    deleteUserContact: contactUserName => {
      console.log(contactUserName);
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
