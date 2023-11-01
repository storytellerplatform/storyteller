import classNames from 'classnames'
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { getRegisterForm, getRegisterFormDelayMove, taggleRegisterForm, turnOffRegisterFormDelayMove } from '../../../feature/authSidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

interface RegisterFormProps {
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const isRegisterFormOpen = useAppSelector(getRegisterForm);
  const delayMove = useAppSelector(getRegisterFormDelayMove);
  const dispatch = useAppDispatch();

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(taggleRegisterForm());
    dispatch(turnOffRegisterFormDelayMove())
  }

  return (
    <div className={classNames(`fixed top-0 right-0 flex flex-col gap-4 h-screen w-5/12 max-w-full px-24 pt-10 bg-white text-black z-50 overflow-auto transition-all duration-150 ease-in`,
      { 'translate-x-full': !isRegisterFormOpen },
      { 'delay-200 ease-in-out': delayMove })}
    >
      <div className='flex justify-between items-start'>
        <h1 className='text-3xl font-extrabold'> 註冊 </h1>
        <button type='button' className='hover:opacity-50' onClick={handleCloseClick}>
          <AiOutlineCloseCircle size={24} />
        </button>
      </div>

      <hr className='h-[2.5px] w-full bg-black select-none' />

      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="login-username" className='text-base font-bold' >名稱</label>
        <input
          type="text"
          id="login-username"
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>

      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="login-email" className='text-base font-bold' >電子郵件</label>
        <input
          type="email"
          id="login-email"
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>

      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="login-password" className='text-base font-bold' >密碼</label>
        <input
          type="password"
          id="login-password"
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>

    </div>
  )
}

export default RegisterForm