import React from "react";
import Enable2FAComponent from "../components/enable2fa";
import Disable2FAComponent from "../components/disable2fa";
import Disable2FAConfirmation from "../components/disable2faConfirmation";
const createReactClass = require("create-react-class");

var QRCode = require("qrcode");

let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

let Manage2FA = createReactClass({
  getInitialState() {
    return {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
      codeArray: [],
      code: "",
      codeError: false,
      codeValid: false,

      password: "",
      passwordError: false,
      loading: false,
      error: null,
      disable2FAOpen: false,
      QRCodeLoading: false,
      barcodeUrl: null,
      secretKey: null
    };
  },

  componentWillMount() {
    emitter.on("enable2fa", this.enable2faReturned);
    emitter.on("disable2fa", this.disable2faReturned);
    emitter.on("generate2faKey", this.generate2faKeyReturned);
  },

  componentDidMount() {
    if (this.props.user && this.props.user.isGoogle2faEnabled !== true) {
      this.setState({ QRCodeLoading: true });
      var content = { id: this.props.user.id };
      dispatcher.dispatch({
        type: "generate2faKey",
        content,
        token: this.props.user.token
      });
    }
  },

  componentWillUnmount() {
    emitter.removeAllListeners("enable2fa");
    emitter.removeAllListeners("disable2fa");
    emitter.removeAllListeners("generate2faKey");
  },

  render() {
    if (this.props.user && this.props.user.isGoogle2faEnabled === true) {
      return (
        <div>
          <Disable2FAComponent
            handleChange={this.handleChange}
            password={this.state.password}
            passwordError={this.state.passwordError}
            onDisableKeyDown={this.onDisableKeyDown}
            submitDisable={this.submitDisable}
            loading={this.state.loading}
            error={this.state.error}
          />
          <Disable2FAConfirmation
            isOpen={this.state.disable2FAOpen}
            confirmDisable={this.confirmDisable}
            handleClose={this.handleClose}
          />
        </div>
      );
    } else {
      return (
        <Enable2FAComponent
          handleChange={this.handleChange}
          code1={this.state.code1}
          code2={this.state.code2}
          code3={this.state.code3}
          code4={this.state.code4}
          code5={this.state.code5}
          code6={this.state.code6}
          code={this.state.code}
          codeError={this.state.codeError}
          codeErrorMessage={this.state.codeErrorMessage}
          onCodeKeyDown={this.onCodeKeyDown}
          submitEnable={this.submitEnable}
          loading={this.state.loading}
          error={this.state.error}
          codeValid={this.state.codeValid}
          secretKey={this.state.secretKey}
        />
      );
    }
  },

  generate2faKeyReturned(error, data) {
    this.setState({ QRCodeLoading: false });
    if (error) {
      return; // this.setState({error: error.toString()});
    }

    if (data.success) {
      var barcodeUrl = decodeURIComponent(data.barcodeUrl);
      this.setState({ secretKey: data.secretKey, barcodeUrl });

      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, barcodeUrl, function(error) {
        if (error) console.error(error);
      });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  onCodeKeyDown(event) {
    if (event.which === 13) {
      this.submitEnable();
    } else if (event.which === 8) {
      var name = event.target.id;
      if (name.indexOf("code") > -1) {
        var index = name.substring(4);

        var codeArray = this.state.codeArray;
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

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  submitEnable() {
    this.setState({ codeError: false, codeErrorMessage: "", error: "" });
    var error = false;

    if (this.state.code === "" || this.state.code.length !== 6) {
      this.setState({
        codeError: true,
        codeErrorMessage:
          "The 6 digit code generated by your authenticator application"
      });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true });
      var content = {
        id: this.props.user.id,
        code: this.state.code,
        secretKey: this.state.secretKey
      };
      dispatcher.dispatch({
        type: "enable2fa",
        content,
        token: this.props.user.token
      });
    }
  },

  enable2faReturned(error, data) {
    this.setState({ loading: false, codeError: false, codeErrorMessage: "" });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      data.user.token = data.token;
      data.user.authOTP = this.state.code;
      this.props.setUser(data.user);
      this.setState({
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
        code: ""
      });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  onDisableKeyDown(event) {
    if (event.which === 13) {
      this.submitDisable();
    }
  },

  submitDisable() {
    //show popup confirming action?
    this.setState({ disable2FAOpen: true });
  },

  handleClose() {
    this.setState({ disable2FAOpen: false });
  },

  confirmDisable() {
    this.setState({ disable2FAOpen: false, loading: true, error: "" });
    var content = { id: this.props.user.id };
    dispatcher.dispatch({
      type: "disable2fa",
      content,
      token: this.props.user.token
    });
  },

  disable2faReturned(error, data) {
    this.setState({ loading: false });
    if (error) {
      return this.setState({ error: error.toString() });
    }

    if (data.success) {
      var user = this.props.user;
      user.isGoogle2faEnabled = false;

      this.props.setUser(user);

      this.setState({ QRCodeLoading: true });
      var content = { id: user.id };
      dispatcher.dispatch({
        type: "generate2faKey",
        content,
        token: this.props.user.token
      });
    } else if (data.errorMsg) {
      this.setState({ error: data.errorMsg });
    } else {
      this.setState({ error: data.statusText });
    }
  },

  handleChange(event, name) {
    let codeArray;
    if (event != null && event.target != null) {
      if (name.indexOf("code") > -1) {
        if (!this.isNumeric(event.target.value)) {
          return false;
        }

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
  }
});

export default Manage2FA;
