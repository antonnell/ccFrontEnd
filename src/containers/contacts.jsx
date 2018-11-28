import React from 'react'
import ContactsComponent from '../components/contacts'
const createReactClass = require('create-react-class')

let contactsEmitter = require('../store/contactsStore.js').default.emitter
let contactsDispatcher = require('../store/contactsStore.js').default.dispatcher

let Contacts = createReactClass({
  getInitialState() {
    return {
      addLoading: false,
      error: null,
      username: "",
      usernameError: false,
      usernameErrorMessage: "",
      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorMessage: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorMessage: "",
      notes: "",
      notesError: false,
      notesErrorMessage: "",
      addOpen: false
    }
  },

  componentWillMount() {
    contactsEmitter.removeAllListeners('addContact');

    contactsEmitter.on('addContact', this.addContactReturned);
  },

  resetInputs() {
    this.setState({
      username: "",
      usernameError: false,
      usernameErrorMessage: "",
      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorMessage: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorMessage: "",
      notes: "",
      notesError: false,
      notesErrorMessage: "",
    })
  },

  addContactReturned(error, data) {
    this.setState({addLoading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.resetInputs();
      var content = {id: this.props.user.id};
      contactsDispatcher.dispatch({type: 'getContacts', content, token: this.props.user.token });

      this.setState({addOpen: false})
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  render() {
    return (
      <ContactsComponent
        theme={this.props.theme}
        handleChange={this.handleChange}
        onAddKeyDown={this.onAddKeyDown}
        addClicked={this.addClicked}
        updateNavigateClicked={this.updateNavigateClicked}
        sendEtherClicked={this.sendEtherClicked}
        sendAionClicked={this.sendAionClicked}
        sendWanClicked={this.sendWanClicked}
        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorMessage={this.state.emailAddressErrorMessage}
        displayName={this.state.displayName}
        displayNameError={this.state.displayNameError}
        displayNameErrorMessage={this.state.displayNameErrorMessage}
        notes={this.state.notes}
        notesError={this.state.notesError}
        notesErrorMessage={this.state.notesErrorMessage}
        addLoading={this.state.addLoading}
        error={this.state.error}
        contacts={this.props.contacts}
        validateField={this.validateField}
        handleAddOpen={this.handleAddOpen}
        addOpen={this.state.addOpen}
        handleAddClose={this.handleAddClose}
        />
    )
  },

  handleAddOpen() {
    this.setState({addOpen: true});
  },
  handleAddClose() {
    this.setState({addOpen: false})
  },

  onAddKeyDown(event) {
    if (event.which == 13) {
      this.addClicked()
    }
  },

  addClicked() {
    if(this.validateUsername() & this.validateDisplayName() & this.validateNotes()) {
      this.setState({addLoading: true});
      var content = { username: this.state.username, displayName: this.state.displayName, notes: this.state.notes, ownerUsername: this.props.user.username };
      contactsDispatcher.dispatch({type: 'addContact', content, token: this.props.user.token });
    }
  },

  updateNavigateClicked() {
    //ok?
  },

  sendEtherClicked(contact) {
    this.props.openSendEther(contact)
  },

  sendWanClicked(contact) {
    this.props.openSendWanchain(contact)
  },

  sendAionClicked(contact) {
    this.props.openSendAion(contact)
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  validateField (event, name) {
    if (name==="emailAddress") {
      this.validateEmailAddress(event.target.value)
    } else if (name==="username") {
      this.validateUsername(event.target.value)
    } else if (name==="displayName") {
      this.validateDisplayName(event.target.value)
    } else if (name==="notes") {
      this.validateNotes(event.target.value)
    }
  },

  validateUsername(value) {
    this.setState({ usernameValid: false, usernameError: false, usernameErrorMessage:'' });
    if(value==null) {
      value = this.state.username;
    }
    if(value == '') {
      this.setState({ usernameError: true, usernameErrorMessage:'Username is required' });
      return false;
    }
    this.setState({ usernameValid: true });
    return true;
  },

  validateEmailAddress(value) {
    this.setState({ emailAddressValid: false, emailAddressError: false, emailAddressErrorMessage:'' });
    if(value==null) {
      value = this.state.emailAddress;
    }
    if(value == '') {
      this.setState({ emailAddressError: true, emailAddressErrorMessage:'Email address is required' });
      return false;
    }
    this.setState({ emailAddressValid: true });
    return true;
  },

  validateDisplayName(value) {
    this.setState({ displayNameValid: false, displayNameError: false, displayNameErrorMessage:'' });
    if(value==null) {
      value = this.state.displayName;
    }
    if(value == '') {
      this.setState({ displayNameError: true, displayNameErrorMessage:'Display name is required' });
      return false;
    }
    this.setState({ displayNameValid: true });
    return true;
  },

  validateNotes(value) {
    this.setState({ notesValid: false, notesError: false, notesErrorMessage:'' });
    if(value==null) {
      value = this.state.notes;
    }
    if(value == '') {
      this.setState({ notesError: true, notesErrorMessage:'Note is required' });
      return false;
    }
    this.setState({ notesValid: true });
    return true;
  },

})

export default (Contacts);
