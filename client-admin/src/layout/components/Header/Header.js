import React from 'react'
import './header.css'
import logo from '../../../assets/images/logo.png'
const Header = () => {
  return (
    <div className='headerWrapper'>
        <img src={logo} alt='logo' style={{
            height: '40px',
            width: '40px',
            alignSelf: 'center',
            marginLeft: '15px'
        }}/>
        <text className='text'>Admin</text>
    </div>
  )
}

export default Header