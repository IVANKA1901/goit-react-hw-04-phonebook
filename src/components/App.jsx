import { Component } from 'react';
import { ListContact } from './ListContact/ListContact';
import { FormContacts } from './FormContact/FormContact';
import { Container } from './Container/Container';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };

  addContact = ({ name, number }) => {
    // console.log(contact);
    const newContact = { name, number, id: nanoid() };
    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already exist in the contacts`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already exist in the contacts`);
    } else if (name.trim() === '' || number.trim === '') {
      alert('Please enter the contact`s name and phone number');
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  showContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.showContact();

    return (
      <Container>
        <h1>Phonebook</h1>
        <FormContacts onSubmit={this.addContact} />
        <h1>Contacts</h1>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={this.changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ListContact
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>There is no contacts left. Please add some.</p>
        )}
      </Container>
    );
  }
}
