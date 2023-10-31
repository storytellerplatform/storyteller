import React from 'react'
import { FiLogIn, FiMusic } from 'react-icons/fi'
import { AiOutlineRead } from 'react-icons/ai'
import { BsCollection } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

const NavbarTest = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='relative flex flex-col gap-16 p-4 w-fit items-center h-screen bg-[#191d24]'
      >
        <Link to='/'>
          <AiOutlineRead color='white' size={40} className='cursor-pointer' />
        </Link>

        <nav className='flex flex-col gap-6'>
          <FiLogIn color='white' size={24} className='cursor-pointer ' />
          <FiMusic color='white' size={24} className='cursor-pointer' />
          <BsCollection color='white' size={24} />
        </nav>


        <div className={classNames('absolute left-full top-0 h-screen items-center bg-[#191d24] z-50 transition-all duration-150 ease-out-in',
          { 'w-32': isHovered },
          { 'w-0': !isHovered })}
        >
        </div>

      </div>


    </>
  )
}

export default NavbarTest