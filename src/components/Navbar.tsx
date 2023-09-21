import React from 'react'

import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-5 px-12 border border-orange'>
      {/* left side */}
      <Link className='w-fit flex flex-row gap-2 font-mono' to='/'>
        <img className='h-10' src={Logo} alt='logo' />
        <h1 className='p-2 text-xl'> <strong>說書人</strong> </h1>
      </Link>

    </div>
  )
}

export default Navbar