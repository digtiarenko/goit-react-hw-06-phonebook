import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../redux/actions';
import { nanoid } from 'nanoid';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contactList = useSelector(state => state.contacts.items);

  const handleNameInput = event => {
    const { value } = event.target;
    setName(value);
  };
  const handleNumberInput = event => {
    const { value } = event.target;
    setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (contactList.find(contact => contact.name === name)) {
      alert(`${name} is already here`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(createContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>Name</span>
          <input
            className={styles.input}
            onChange={handleNameInput}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label}>
          <span>Number </span>
          <input
            className={styles.input}
            onChange={handleNumberInput}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={styles.btn} type="submit">
          {' '}
          Add contact
        </button>
      </form>
    </>
  );
}
