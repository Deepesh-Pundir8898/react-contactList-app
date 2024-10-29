import React, { useEffect, useState } from 'react';
import './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, updateContact, toggleFavoriteContact } from '../../../store/contact-slice';

const ContactList = ({ setSelectedContact }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.items);
  const status = useSelector((state) => state.contact.status);
  const error = useSelector((state) => state.contact.error);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContacts());
    }
  }, [status, dispatch]);

  const deleteContactHandler = (id) => {
    dispatch(deleteContact(id));
  };

  const updateContactHandler = (contact) => {
    setSelectedContact(contact);
  };

  const toggleFavoriteHandler = (id) => {
    dispatch(toggleFavoriteContact(id));
  };

  const displayedContacts = showFavorites ? contacts.filter(c => c.favorite) : contacts;

  return (
    <div className='contact-list'>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Contacts" : "Show Favorites"}
      </button>
      <table>
        <thead>
          <tr>
            <th><p>Profile</p></th>
            <th><p>Name</p></th>
            <th><p>Surname</p></th>
            <th><p>Mobile</p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && <tr><td colSpan="5">Loading...</td></tr>}
          {error && <tr><td colSpan="5">Error: {error}</td></tr>}
          {displayedContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <div className='profile-img-box'>
                  <i className='fa-solid fa-user'></i>
                </div>
              </td>
              <td><h2>{contact.name}</h2></td>
              <td><h2>{contact.surname}</h2></td>
              <td><h2>{contact.tel}</h2></td>
              <td>
                <div>
                  <i className='fa-solid fa-pen' onClick={() => updateContactHandler(contact)}></i>
                  <i className='fa-solid fa-trash' onClick={() => deleteContactHandler(contact.id)}></i>
                  <i className={`fa-solid fa-heart ${contact.favorite ? "favorite" : ""}`} onClick={() => toggleFavoriteHandler(contact.id)} style={{ color: contact.favorite ? "red" : "" }}></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
