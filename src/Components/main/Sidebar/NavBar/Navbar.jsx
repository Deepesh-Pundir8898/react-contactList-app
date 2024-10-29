import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = ({ setShowFavorites }) => { 
  const contacts = useSelector((state) => state.contact.items);
  const favoriteCount = contacts.filter((c) => c.favorite).length;

  return (
    <ul>
      <li onClick={() => { setShowFavorites(false); }}>
        <a className='link'>
          <i className='fa-solid fa-address-book'></i>
          <div>
            <h2>All contacts</h2>
            <p>{contacts.length} contacts</p>
          </div>
        </a>
      </li>
      <li onClick={() => { setShowFavorites(true); }}>
        <a className='link'>
          <i className='fa-solid fa-heart'></i>
          <div>
            <h2>Favourites</h2>
            <p>{favoriteCount} contacts</p>
          </div>
        </a>
      </li>
    </ul>
  );
};

export default Navbar;
