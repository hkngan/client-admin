import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import './style.css'
import Header from '../components/Header/Header'
const DefaultLayout = ({children}) => {
  return (
        <div className='wrapper'>
          <Header/>
          <div className='container'>
            <Sidebar />
            <div className='content'>
              {children}
            </div>
          </div>
        </div>
  )
}

export default DefaultLayout