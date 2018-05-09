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
      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorText: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorText: "",
      notes: "",
      notesError: false,
      notesErrorText: ""
    }
  },

  componentWillMount() {
    contactsEmitter.on('addContact', this.addContactReturned);
  },
  componentWillUnmount() {
    contactsEmitter.removeAllListeners('addContact');
  },

  resetInputs() {
    this.setState({
      emailAddress: "",
      emailAddressError: false,
      emailAddressErrorText: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorText: "",
      notes: "",
      notesError: false,
      notesErrorText: "",
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

      //show sncakbar?
    } else if (data.errorMsg) {
      this.setState({error: data.errorMsg});
    } else {
      this.setState({error: data.statusText})
    }
  },

  render() {
    return (
      <ContactsComponent
        handleChange={this.handleChange}
        onAddKeyDown={this.onAddKeyDown}
        addClicked={this.addClicked}
        updateNavigateClicked={this.updateNavigateClicked}
        sendEtherClicked={this.sendEtherClicked}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorText={this.state.emailAddressErrorText}
        displayName={this.state.displayName}
        displayNameError={this.state.displayNameError}
        displayNameErrorText={this.state.displayNameErrorText}
        notes={this.state.notes}
        notesError={this.state.notesError}
        notesErrorText={this.state.notesErrorText}
        addLoading={this.state.addLoading}
        error={this.state.error}
        contacts={this.props.contacts}
        />
    )
  },

  onAddKeyDown(event) {
    if (event.which == 13) {
      this.addClicked()
    }
  },

  addClicked() {
    this.setState({addLoading: true});
    var content = { emailAddress: this.state.emailAddress, displayName: this.state.displayName, notes: this.state.notes, ownerUsername: this.props.user.username };
    contactsDispatcher.dispatch({type: 'addContact', content, token: this.props.user.token });
  },

  updateNavigateClicked() {
    //ok?
  },

  sendEtherClicked(contact) {
    this.props.openSendEther(contact)
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (Contacts);
