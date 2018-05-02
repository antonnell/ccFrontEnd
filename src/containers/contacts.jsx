import React from 'react'
import ContactsComponent from '../components/contacts'
const createReactClass = require('create-react-class')

let Contacts = createReactClass({
  getInitialState() {
    return { }
  },
  render() {
    return (
      <ContactsComponent
        handleChange={this.handleChange}
        onCreateKeyDown={this.onCreateImportKeyDown}
        createClicked={this.createImportClicked}
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

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

})

export default (Contacts);
