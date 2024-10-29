import React, { useState, useEffect } from 'react';
import "./Form.css";
import addnewImage from "../../../../assets/add-new.svg";
import Button from '../../../UI/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../../../../store/contact-slice.js';

const Form = ({ selectedContact, setSelectedContact }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ name: "", surname: "", tel: "" });

  useEffect(() => {
    if (selectedContact) {
      setUserData(selectedContact);
    }
  }, [selectedContact]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedContact) {
      dispatch(updateContact({ id: selectedContact.id, updates: userData }));
      setSelectedContact(null); 
    } else {
      dispatch(addContact(userData));
    }
    setUserData({ name: "", surname: "", tel: "" });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className='form' onSubmit={submitHandler}>
      <div className='add-new-img'>
        <img src={addnewImage} alt="Add New" />
      </div>
      <div className='input-text'>
        <input type='text' placeholder='name' name='name' value={userData.name} onChange={inputHandler} />
        <input type='text' placeholder='surname' name='surname' value={userData.surname} onChange={inputHandler} />
      </div>
      <div className='input-tel'>
        <input type='text' placeholder='7854809325' name='tel' value={userData.tel} onChange={inputHandler} />
      </div>
      <Button name={selectedContact ? 'Update' : 'Add'} />
    </form>
  );
};

export default Form;
