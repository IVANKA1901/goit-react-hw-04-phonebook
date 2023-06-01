import React from 'react';

import { useEffect, useState } from 'react';
import { ListContact } from './ListContact/ListContact';
import { FormContacts } from './FormContact/FormContact';
import { Container } from './Container/Container';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(el => el.id !== contactId));
  };

  const addContact = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };

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
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const showContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <FormContacts onSubmit={addContact} />
      <h1>Contacts</h1>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 ? (
        <ListContact contacts={showContact()} onDeleteContact={deleteContact} />
      ) : (
        <p>There is no contacts left. Please add some.</p>
      )}
    </Container>
  );
}
