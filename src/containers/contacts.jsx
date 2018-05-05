import React from 'react'
import ContactsComponent from '../components/contacts'
const createReactClass = require('create-react-class')

let contactsEmitter = require('../store/contactsStore.js').default.emitter
let contactsDispatcher = require('../store/contactsStore.js').default.dispatcher

let Contacts = createReactClass({
  getInitialState() {
    return {
      dataLoading: true,
      createLoading: false,
      error: null,
      username: "",
      usernameError: false,
      usernameErrorText: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorText: "",
      notes: "",
      notesError: false,
      notesErrorText: "",
      contacts: []
    }
  },

  componentWillMount() {
    contactsEmitter.on('getContacts', this.getContactsReturned);

    var content = {username: this.props.user.username};
    contactsDispatcher.dispatch({type: 'getContacts', content, token: this.props.user.token });
  },

  getContactsReturned(error, data) {
    this.setState({dataLoading: false})
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({contacts: data.contacts})
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
        onCreateKeyDown={this.onCreateKeyDown}
        createClicked={this.createImportClicked}
        updateNavigateClicked={this.updateNavigateClicked}
        username={this.state.username}
        usernameError={this.state.usernameError}
        usernameErrorText={this.state.usernameErrorText}
        displayName={this.state.displayName}
        displayNameError={this.state.displayNameError}
        displayNameErrorText={this.state.displayNameErrorText}
        notes={this.state.notes}
        notesError={this.state.notesError}
        notesErrorText={this.state.notesErrorText}
        dataLoading={this.state.dataLoading}
        createLoading={this.state.createLoading}
        error={this.state.error}
        contacts={this.state.contacts}
      />
    )
  },

  onCreateKeyDown(event) {
    if (event.which == 13) {
      this.createClicked()
    }
  },

  createClicked() {
    //ok?
  },

  updateNavigateClicked() {
    //ok?
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
