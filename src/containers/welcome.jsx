import React from "react";
import WelcomeComponent from "../components/welcome";
import AuthComponent from "../components/authComponent";

import createReactClass from "create-react-class";
import crypto from "crypto";
import sha256 from "sha256";
let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;
let whitelistEmitter = require("../store/whitelistStore.js").default.emitter;

let Welcome = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,

      username: "",
      usernameError: false,
      usernameErrorMessage: false,
      password: "",
      passwordError: false,
      passwordErrorMessage: false,

      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",

      codeArray: [],
      code: "",
      codeError: false,
      codeErrorMessage: false,
      codeValid: false,

      requires2fa: false
    };
  },

  componentWillMount() {
    emitter.on("login", this.loginReturned);
    whitelistEmitter.on("whitelistLogin", this.whitelistLoginReturned);
    whitelistEmitter.on("Unauthorised", this.whitelistUnauthorisedReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("login");
    whitelistEmitter.removeAllListeners("whitelistLogin");
    whitelistEmitter.removeAllListeners("Unauthorised");
  },

  render() {
    if (this.state.requires2fa) {
      return (
        <AuthComponent
          handleChange={this.handleChange}
          submitLogin={this.submitLogin}
          onLoginKeyDown={this.onLoginKeyDown}
          code1={this.state.code1}
          code2={this.state.code2}
          code3={this.state.code3}
          code4={this.state.code4}
          code5={this.state.code5}
          code6={this.state.code6}
          code={this.state.code}
          codeError={this.state.codeError}
          codeErrorMessage={this.state.codeErrorMessage}
          codeValid={this.state.codeValid}
          loading={this.state.loading}
          submitLoginNavigate={this.submitLoginNavigate}
        />
      );
    }
    return (
      <WelcomeComponent
        handleChange={this.handleChange}
        submitRegisterNavigate={this.submitRegisterNavigate}
        submitForgotPasswordNavigate={this.submitForgotPasswordNavigate}
        submitLogin={this.submitLogin}
        onLoginKeyDown={this.onLoginKeyDown}
        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}
        password={this.state.password}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordError}
        error={this.state.error}
        loading={this.state.loading}
      />
    );
  },

  submitLoginNavigate() {
    this.setState({ requires2fa: false });
  },

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      if (name.indexOf("code") > -1) {
        if (!this.isNumeric(event.target.value)) {
          return false;
        }

        var codeArray = null;
        if (event.target.value.length <= 1) {
          this.setState({
            [name]: event.target.value
          });

          var index = name.substring(4);
          codeArray = this.state.codeArray;
          codeArray[index - 1] = event.target.value;
          this.setState({ codeArray, code: codeArray.join("") });
          if (index < 6 && event.target.value.length === 1) {
            document.getElementById("code" + (Number(index) + 1)).focus();
          }
        } else if (event.target.value.length === 6) {
          codeArray = event.target.value.split("");
          var state = {
            code1: codeArray[0],
            code2: codeArray[1],
            code3: codeArray[2],
            code4: codeArray[3],
            code5: codeArray[4],
            code6: codeArray[5],
            codeArray,
            code: event.target.value
          };
          document.getElementById("code6").focus();
          this.setState(state);
        }

        if (codeArray && codeArray.length === 6) {
          this.validateAuthCode(codeArray.join(""));
        }
      } else {
        this.setState({
          [name]: event.target.value
        });
      }
    }
  },

  validateAuthCode(code) {
    if (code.length === 6 && this.isNumeric(code)) {
      this.setState({ codeValid: true });
    } else {
      this.setState({ codeValid: false });
    }
  },

  onLoginKeyDown(event) {
    if (event.which === 13) {
      this.submitLogin();
    } else if (event.which === 8) {
      const name = event.target.id;
      if (name.indexOf("code") > -1) {
        const index = name.substring(4);

        const codeArray = this.state.codeArray;
        if (this.state[name].length > 0) {
          codeArray[index - 1] = "";

          this.setState({ codeArray, code: codeArray.join(""), [name]: "" });
          if (index > 1) {
            document.getElementById(name).focus();
          }
        } else {
          codeArray[index - 2] = "";

          this.setState({
            codeArray,
            code: codeArray.join(""),
            ["code" + (Number(index) - 1)]: ""
          });
          if (index > 1) {
            document.getElementById("code" + (Number(index) - 1)).focus();
          }
        }
      }
    }
  },

  submitLogin() {
    this.setState({
      usernameError: false,
      passwordError: false,
      codeErrorMessage: ""
    });
    let error = false;

    if (this.state.username === "") {
      this.setState({ usernameError: true });
      error = true;
    }
    if (this.state.password === "") {
      this.setState({ passwordError: true });
      error = true;
    }

    if (this.state.requires2fa) {
      if (this.state.code === "" || this.state.code.length !== 6) {
        this.setState({
          codeError: true,
          codeErrorMessage:
            "The 6 digit code generated by your authenticator application"
        });
        error = true;
      }
    }

    if (!error) {
      this.setState({ loading: true, error: null });
      var content = {
        username: this.state.username,
        password: this.state.password
      };
      dispatcher.dispatch({ type: "login", content, authOTP: this.state.code });
    }
  },

  loginReturned(error, data) {
    if (error) {
      this.setState({ loading: false });
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      data.user.token = data.token;
      data.user.authOTP = this.state.code;
      data.user.verificationResult = data.verificationResult;
      data.user.verificationUrl = data.verificationUrl;
      data.user.whitelistStatus = data.whitelistStatus;
      this.props.setUser(data.user);

      // not called anymore, we included it in the original login call
      // var whitelistContent = { emailAddress: data.user.email, password: this.state.password };
      // whitelistDispatcher.dispatch({type: 'whitelistLogin', content: whitelistContent });

      if (data.user.username === data.user.email) {
        window.location.hash = "setUsername";
      } else {
        window.location.hash = "wanAccounts";
      }
    } else if (data.requires2fa) {
      this.setState({ requires2fa: true, loading: false });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg, loading: false });
    } else {
      this.setState({ error: data.statusText, loading: false });
    }
  },

  whitelistLoginReturned(error, data) {
    this.setState({ loading: false });

    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      var whitelistState = this.decodeWhitelistResponse(data.message);
      if (whitelistState) {
        this.props.setWhitelistState(whitelistState);

        if (
          this.props.user &&
          this.props.user.username === this.props.user.email
        ) {
          window.location.hash = "setUsername";
        } else {
          window.location.hash = "wanAccounts";
        }
      } else {
        this.setState({ error: "An unexpected error has occurred" });
      }
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  decodeWhitelistResponse(message) {
    const mnemonic = message.m.hexDecode();
    const encrypted = message.e.hexDecode();
    const signature = message.s;

    const sig = {
      e: message.e,
      m: message.m,
      u: message.u,
      p: message.p,
      t: message.t
    };
    const seed = JSON.stringify(sig);
    const compareSignature = sha256(seed);

    if (compareSignature !== signature) {
      return null;
    }

    const payload = decrypt(encrypted, mnemonic);
    var data = null;
    try {
      data = JSON.parse(payload);
    } catch (ex) {
      return null;
    }

    return data;
  },

  whitelistUnauthorisedReturned(error, data) {
    //this.props.setWhitelistState(null);
    //this.setState({loading: false});
    //window.location.hash = 'ethAccounts';
    this.setState({
      loading: false,
      usernameError: true,
      usernameErrorMessage:
        "The email provided is not an approved presale email address"
    });
  },

  submitRegisterNavigate() {
    window.location.hash = "registerAccount";
  },

  submitForgotPasswordNavigate() {
    window.location.hash = "forgotPassword";
  }
});

function decrypt(text, seed) {
  var decipher = crypto.createDecipher("aes-256-cbc", seed);
  var dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

String.prototype.hexDecode = function() {
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

export default Welcome;
