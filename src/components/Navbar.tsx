import React from 'react'

import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import NavSigninButton from '../pages/Signin/components/NavSigninButton'
import NavSignupButton from '../pages/Signup/components/NavSignupButton'
import Cookies from 'js-cookie'

const Navbar = () => {
  const navigete = useNavigate();

  const jwtTokenExists = Cookies.get('jwtToken');

  const handleLogoutClick = () => {
    Cookies.remove('jwtToken');
    navigete('/');
  }

  return (
    <div className='flex justify-between p-5 px-12 border border-orange select-none'>
      {/* 左*/}
      <Link className='w-fit flex flex-row gap-2 font-mono' to='/'>
        <img className='h-10' src={Logo} alt='logo' />
        <h1 className='p-2 text-xl'> <strong>說書人</strong> </h1>
      </Link>

      {jwtTokenExists ?
        <div className='flex gap-4 items-center'>

          <Link to='/music'>
            <button className=''>創造音樂</button>
          </Link>
          <Link to="/collection">
            <button className=''>收藏</button>
          </Link>
          <button className='' onClick={handleLogoutClick}>登出</button>

        </div> :

        <div className='flex gap-4'>
          <Link to='/signup'>
            <NavSignupButton />
          </Link>

          <Link to='/signin'>
            <NavSigninButton />
          </Link>
        </div>
      }

    </div>
  )
}

export default Navbar