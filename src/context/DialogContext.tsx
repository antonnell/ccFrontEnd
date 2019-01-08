import * as React from 'react';
import {DialogActions} from "../types/dialog";

type DialogType = "confirmation";
type ActionResult = "pending"|"denied"|"confirmed";

interface DialogContextInterface {
  title: string;
  body: string;
  open: boolean;
  action:DialogActions;
  result: ActionResult;
  type: DialogType;
  showDialog: (type:DialogType,action:DialogActions,title?:string,body?:string) => void;
  hideDialog: () => void;
}

const ctxt = React.createContext<DialogContextInterface | null>(null);

const DialogContextProvider = ctxt.Provider;

const DialogContextConsumer = ctxt.Consumer;

class DialogContext extends React.Component<{}, DialogContextInterface> {
  // noinspection JSUnusedGlobalSymbols
  readonly state: DialogContextInterface = {
    title: 'Place holder',
    body: 'Place holder',
    open: false,
    type: "confirmation",
    action: null,
    result: "pending",
    showDialog: (type,action,title,body) => {
      this.setState({
        type,
        action,
        result: "pending",
        open: true,
        title: title?title:
            type==="confirmation"?"Are you sure?":"Default Title",
        body: body?body:
            type==="confirmation"?"Are you sure you want to continue with this action":"Default Body"
      });
    },
    hideDialog: () => this.setState({ open: false })
  };

  public render() {
    const {children} = this.props;
    return (
        <DialogContextProvider value={this.state}>
          {children}
        </DialogContextProvider>
    )
  }

}

export interface WithDialogContext {
  dialogContext: DialogContextInterface;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withDialogContext<P extends { dialogContext?: DialogContextInterface },
    R = Omit<P, 'dialogContext'>>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
        <DialogContextConsumer>
          {value => {
            // @ts-ignore
            return <Component {...props} dialogContext={value} />;
          }}
        </DialogContextConsumer>
    );
  };
}

export default DialogContext;
