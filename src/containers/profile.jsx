import React from "react";
import ProfileComponent from "../components/profile";
const createReactClass = require("create-react-class");

const email = require("email-validator");

let emitter = require("../store/accountStore.js").default.emitter;
let dispatcher = require("../store/accountStore.js").default.dispatcher;

let Profile = createReactClass({
  getInitialState() {
    return {
      error: "",
      loading: false,
      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorMessage: ""
    };
  },

  componentWillMount() {
    emitter.on("uploadProfilePhoto", this.uploadProfilePhotoReturned);
    emitter.on("getUserProfile", this.getUserProfileReturned)
  },

  componentWillUnmount() {
    emitter.removeAllListeners("uploadProfilePhoto");
    emitter.removeAllListeners("getUserProfile");
  },

  render() {
    if (!this.props.user) {
      return null;
    }
    return (
      <ProfileComponent
        theme={this.props.theme}
        error={this.state.error}
        user={this.props.user}
        setUser={this.props.setUser}
        loading={this.state.loading}
        handleEmailClose={this.handleEmailClose}
        updateClicked={this.updateClicked}
        onUpdateKeyDown={this.onUpdateKeyDown}
        handleChange={this.handleChange}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorMessage={this.state.emailAddressErrorMessage}
        handleUploadClicked={this.handleUploadClicked}
        onImageChange={this.onImageChange}
      />
    );
  },

  handleUploadClicked() {
    document.getElementById("imgupload").click()
  },

  onImageChange(event) {
    event.stopPropagation();

    if(event.target.files && event.target.files.length >= 1) {
      let state = this;

      setTimeout(function() {
        state.setState({ loading: true, error: null });
      }, 1)

      let filename = event.target.files[0].name;
      let extension = filename.substr((filename.lastIndexOf('.') + 1));

      var reader = new FileReader();
      reader.onload = function(){
        // let res = new Uint8Array(this.result).reduce(function (data, byte) {
        //   return data + String.fromCharCode(byte);
        // }, '');

        let res = reader.result
        var strImage = res.replace(/^data:image\/[a-z]+;base64,/, "");

        var content = {
          userId: state.props.user.id,
          imageData: strImage,
          extension: extension
        };

        dispatcher.dispatch({ type: "uploadProfilePhoto", content, token: state.props.user.token });
      }
      // reader.readAsArrayBuffer(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  },

  uploadProfilePhotoReturned(error, data) {
    this.setState({ loading: false });
    var content = {
      userId: this.props.user.id,
    };
    dispatcher.dispatch({ type: "getUserProfile", content, token: this.props.user.token });

  },

  getUserProfileReturned(error, data) {
    let user = this.props.user
    user.profilePhoto = data.user.profilePhoto
    this.props.setUser(user);
  },

  handleChange(event, name) {
    if (event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onUpdateKeyDown(event) {
    if (event.which === 13) {
      this.updateClicked();
    }
  },

  updateClicked() {
    if (this.validateEmail()) {
      this.setState({ loading: true });

      var content = {
        username: this.props.user.username,
        emailAddress: this.state.emailAddress
      };
      dispatcher.dispatch({ type: "updateEmail", content });
    }
  },

  validateEmail() {
    this.setState({ emailAddressError: false, emailAddressErrorMessage: "" });

    if (this.state.emailAddress === "") {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage: "Please enter your new email address"
      });
      return false;
    } else if (!email.validate(this.state.emailAddress)) {
      this.setState({
        emailAddressError: true,
        emailAddressErrorMessage:
          "Email address provided is not a valid email address"
      });
      return false;
    }

    return true;
  }
});

export default Profile;
