import React from 'react'
import "./Header.css";
import Button from '../UI/Button';

const Header = () => {
  return (
    <div className='horizontal-nav'>
      <div className='profile'>
        <div className='profile-img-box'>
          <i className='fa-solid fa-user'></i>
        </div>
        <h2>John Wan</h2>
      </div>
      <form className='search-box'>
        <input type='text' placeholder='John Wan' />
        <Button name='Search' />
      </form>
    </div>
  )
}

export default Header