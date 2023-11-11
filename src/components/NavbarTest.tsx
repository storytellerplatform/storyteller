import React, { ReactNode } from 'react'
import { FiLogIn, FiMusic } from 'react-icons/fi'
import { AiOutlineRead } from 'react-icons/ai'
import { BsCollection } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames';
import { taggleLoginForm } from '../feature/authSidebar'
import { useAppDispatch } from '../app/hooks'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


const NavbarTest = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleOpenLoginFormClick = () => {
    dispatch(taggleLoginForm());
  }

  const createNavLink = (name: string, nameWidth: string, lineWidth: string, isPresent: boolean, icon: ReactNode, handleClick?: React.MouseEventHandler<HTMLButtonElement>) => {
    return <>
      <button
        type='button'
        onClick={handleClick}
        className={classNames(`relative cursor-pointer text-start
            before:content-[""] before:absolute before:w-0 ${lineWidth} before:h-[1.5px] before:bottom-0 before:left-10 before:bg-white before:z-50 before:transition-all  before:duration-300 before:ease-out-in 
            ${name} ${nameWidth} after:absolute after:top-0 after:left-10 after:text-white after:font-bold after:text-sm after:tracking-widest after:z-50 after:opacity-0  after:transition-all after:ease-in-out after:duration-150`,
          { 'after:opacity-100': isPresent })}
      >
        {icon}
      </button>
    </>
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='fixed top-0 left-0 flex flex-row justify-between items-center gap-16 p-4 pr-8 h-fit w-full bg-[#191d24] z-50 sm:w-16 sm:h-full sm:flex-col sm:justify-normal sm:pr-4'
      >
        <Link to='/'>
          <AiOutlineRead color='white' size={40} className='cursor-pointer' />
        </Link>

        <nav className='flex flex-row gap-6 sm:flex-col'>
          {createNavLink(
            "after:content-['登入']",
            "after:w-10",
            "hover:before:w-9",
            isHovered,
            <FiLogIn
              color='white'
              size={24}
            />,
            handleOpenLoginFormClick)
          }

          {createNavLink(
            "after:content-['創作音樂']",
            "after:w-20",
            "hover:before:w-16",
            isHovered,
            <FiMusic
              color='white'
              size={24}
              className='cursor-pointer'
            />,
            () => navigate('/music')
          )}

          {createNavLink(
            "after:content-['收藏']",
            "after:w-10",
            "hover:before:w-9",
            isHovered,
            <BsCollection
              color='white'
              size={24}
            />,
            () => navigate('/collection')
          )}

        </nav>


        <div className={classNames('absolute left-full top-0 h-screen items-center bg-[#191d24] z-40 transition-all duration-150 ease-out-in',
          { 'w-32': isHovered },
          { 'w-0': !isHovered })}
        >
        </div>

      </div>

      <LoginForm />
      <RegisterForm />
    </>
  )
}

export default NavbarTest