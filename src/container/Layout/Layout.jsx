import React from 'react'
import Header from '../../Components/Header/Header'
import ContactList from '../../Components/main/ContactList/ContactList'
import Sidebar from '../../Components/main/Sidebar/Sidebar'
import "./Layout.css"

export const Layout = () => {
  return (
        <div className='main'>
            <header>
               <Header />
            </header>
            <main className='contact-list-app'>
                    <Sidebar />
                    <ContactList />
            </main>
        </div>
  )
}
