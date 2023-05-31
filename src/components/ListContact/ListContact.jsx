import PropTypes from 'prop-types';
import css from './ListContact.module.css';

export function ListContact({ contacts, onDeleteContact }) {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, number, name }) => (
        <li key={id} className={css.item}>
          <p>
            {name}: {number}
          </p>
          <button
            className={css.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            {' '}
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ListContact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
