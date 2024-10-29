import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import ContactList from '../../Components/main/ContactList/ContactList';
import Sidebar from '../../Components/main/Sidebar/Sidebar';
import "./Layout.css";

export const Layout = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false); // Manage favorites here

  return (
    <div className='main'>
      <header>
        <Header />
      </header>
      <main className='contact-list-app'>
        <Sidebar selectedContact={selectedContact} setSelectedContact={setSelectedContact} setShowFavorites={setShowFavorites} />
        <ContactList setSelectedContact={setSelectedContact} showFavorites={showFavorites} /> {/* Pass showFavorites */}
      </main>
    </div>
  );
}
