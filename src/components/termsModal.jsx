import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class TermsModal extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Dialog open={this.props.isOpen} title="Disclaimer" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">{"Terms and Conditions"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: '#333'}}>
            <p>
              <b>I have copied this from the disclaimer popup: </b>
              Because I ahve no idea what the terms and conditions of our product are. So you may as
              well read through this wonderful disclaimer.
            </p>
            <p>
              <b>Be safe & secure: </b>
              We highly recommend that you read our guide on How to Prevent Loss & Theft for some
              recommendations on how to be proactive about your security.
            </p>
            <p>
              <b>Always backup your keys: </b>
              MyCrypto.com & MyCrypto CX are not "web wallets". You do not create an account or give us
              your funds to hold onto. No data leaves your computer / your browser. We make it easy for
              you to create, save, and access your information and interact with the blockchain.
            </p>
            <p>
              <b>We are not responsible for any loss: </b>
              Ethereum, MyCrypto.com & MyCrypto CX, and some of the underlying Javascript libraries we use
              are under active development. While we have thoroughly tested & tens of thousands of wallets
              have been successfully created by people all over the globe, there is always the possibility
              something unexpected happens that causes your funds to be lost. Please do not invest more
              than you are willing to lose, and please be careful.
            </p>
            <p>
              <b>Translations of MyCrypto: </b>
              The community has done an amazing job translating MyCrypto into a variety of languages.
              However, MyCrypto can only verify the validity and accuracy of the information provided in
              English and, because of this, the English version of our website is the official text.
            </p>
            <p>
              <b>MIT License</b>
              <br />
              Copyright (c) 2015-2017 MyEtherWallet LLC
              <br />
              Copyright (c) 2018 MyCrypto, Inc.
            </p>
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this
              software and associated documentation files (the "Software"), to deal in the Software
              without restriction, including without limitation the rights to use, copy, modify, merge,
              publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
              to whom the Software is furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be included in all copies or
              substantial portions of the Software.
            </p>
            <b>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
              FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (TermsModal);
