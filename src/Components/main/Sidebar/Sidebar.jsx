import React from 'react';
import { useState } from 'react';
import Navbar from './NavBar/Navbar';
import Form from './InputForm/Form';
import "./sidebar.css";

const Sidebar = ({ selectedContact, setSelectedContact, setShowFavorites }) => { 
  return (
    <div className='vertical-nav'>
      <Navbar setShowFavorites={setShowFavorites} /> 
      <Form selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
    </div>
  )
}

export default Sidebar;
