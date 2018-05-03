import React from 'react'
import ContactsComponent from '../components/contacts'
const createReactClass = require('create-react-class')

let Contacts = createReactClass({
  getInitialState() {
    return {
      loading: false,
      error: null,
      username: "",
      usernameError: false,
      usernameErrorText: "",
      displayName: "",
      displayNameError: false,
      displayNameErrorText: "",
      notes: "",
      notesError: false,
      notesErrorText: ""
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
        loading={this.state.loading}
        error={this.state.error}
        contacts={[{displayName: 'Andre Cronje', primaryAddress: '0xb258aD4125e84068F3A47fbBC4F6aCeD2bC148EC', notes: 'This is Andre that works with me', userName: 'andreCronje'}, {displayName: 'Mom', primaryAddress: '0xc2s8yD2125e84068F3A47fbBC4F6a3fJ2bD188LT', notes: 'She gave me life, i will give her eth', userName: 'momNell'}]}
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
