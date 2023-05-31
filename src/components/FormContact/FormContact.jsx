import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './FormContact.module.css';

export class FormContacts extends Component {
  state = {
    name: '',
    number: '',
    id: nanoid(),
  };

  handleChange = e => {
    const { name, value } = e.target;
    // console.log(e.target);
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      number: '',
      id: nanoid(),
    });
  };

  render() {
    const { number, name } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label className={css.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            placeholder="Please enter your name"
            className={css.input}
          />
        </label>
        <label className={css.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            placeholder="Please enter valid number"
            className={css.input}
          />
        </label>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

FormContacts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
