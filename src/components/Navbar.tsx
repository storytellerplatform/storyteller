import React from 'react'

import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import NavSigninButton from '../pages/Signin/components/NavSigninButton'
import NavSignupButton from '../pages/Signup/components/NavSignupButton'
import Cookies from 'js-cookie'
import { useAppSelector } from '../app/hooks'
import { getUsername } from '../feature/user/userSlice'

const Navbar = () => {
  const navigete = useNavigate();
  const username = useAppSelector(getUsername);

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

      {(jwtTokenExists && username) ?
        <div className='flex gap-4 items-center'>

          <Link to='/music'>
            <button className='text-lg text-gray-700 font-bold hover:text-orange-300 transition-all duration-200 ease-in-out'>創造音樂</button>
          </Link>
          <Link to="/collection">
            <button className='text-lg text-gray-700 font-bold hover:text-orange-300 transition-all duration-200 ease-in-out'>收藏</button>
          </Link>

          <button className='text-lg text-gray-700 font-bold hover:text-orange-300 transition-all duration-200 ease-in-out' onClick={handleLogoutClick}>登出</button>

          <div>
            <span className='text-lg text-gray-700 font-bold hover:text-orange-300 transition-all duration-200 ease-in-out'>
              {username}
            </span>
          </div>

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