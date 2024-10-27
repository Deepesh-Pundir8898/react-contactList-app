import React from 'react'
import Navbar from './NavBar/Navbar'
import Form from './InputForm/Form'
import "./sidebar.css"

const sidebar = () => {
  return (
    <div className='vertical-nav'>
        <Navbar/>
        <Form/>
     </div>
  )
}

export default sidebar