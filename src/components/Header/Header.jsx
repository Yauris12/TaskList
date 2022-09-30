import React from 'react'
import './Header.css'

import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')

    navigate('/', { replace: true })
  }

  return (
    <header>
      <img src='/img/goscrum.png' alt='logo' />
      <div className='wrapper_right_header'>
        <div>{localStorage.getItem('userName')}</div>
        <div onClick={handleLogout}>x</div>
      </div>
    </header>
  )
}

export default Header
