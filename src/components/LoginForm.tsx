import classNames from 'classnames'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { getLoginForm, taggleLoginForm } from '../feature/authSidebar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useSigninMutation } from '../feature/api/authSlice';
import Cookies from 'js-cookie';
import { SigninType } from '../types/auth';
import { setToken } from '../feature/auth/authSlice';
import { setEmail, setUserId, setUsername } from '../feature/user/userSlice';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const isLoginFormOpen = useAppSelector(getLoginForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<SigninType>({
    email: "",
    password: "",
  });

  const [signin, { isLoading }] = useSigninMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevUser => ({
      ...prevUser as SigninType,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(taggleLoginForm());
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // for admin
    if (user.email === 'admin@admin.com' && user.password === 'admin123') {
      Cookies.set(
        'jwtToken',
        'admin',
        { expires: 1, path: '/', secure: true, sameSite: 'strict' }
      );

      dispatch(setToken('admin'));
      dispatch(setUserId('0'));
      dispatch(setUsername('admin'));
      dispatch(setEmail('admin'));

      navigate('/');
      return;
    }

    try {
      const response = await signin(user as SigninType).unwrap();

      Cookies.set(
        'jwtToken',
        response.token,
        { expires: response.expiresIn, path: '/', secure: true, sameSite: 'strict' }
      );

      dispatch(setToken(response.token));
      dispatch(setUserId(response.userId.toString()));
      dispatch(setUsername(response.name));
      dispatch(setEmail(user.email));

      navigate('/');

    } catch (err: any) {
      if (err.status === 403) {
        // setErrors((errs) => ({ ...errs, email: '帳號或密碼錯誤', password: '帳號或密碼錯誤' }));
      } else if (err.status === 500) {
        // setErrors((errs) => ({ ...errs, email: '伺服器發生錯誤' }));
      }
    }
  }

  return (
    <div className={classNames(`fixed top-0 right-0 flex flex-col gap-4 h-screen w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-6 sm:px-24 pt-10 bg-white text-black z-50 overflow-auto transition-all duration-150 ease-in `,
      { 'translate-x-full': !isLoginFormOpen },
      { 'delay-200': isLoginFormOpen })}
    >
      <div className='flex justify-between items-start'>
        <h1 className='text-3xl font-extrabold'> 登入 </h1>
        <button type='button' className='hover:opacity-50' onClick={handleCloseClick}>
          <AiOutlineCloseCircle size={24} />
        </button>
      </div>

      <hr className='h-[2.5px] w-full bg-black select-none' />

      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="login-email" className='text-base font-bold' >電子郵件</label>
        <input
          type="email"
          id="login-email"
          className='w-full p-2 indent-2 border border-black rounded-sm'
          value={user.email}
          onChange={handleFormChange}
        />
      </div>

      <div className='flex flex-col gap-1 select-none mb-4'>
        <label htmlFor="login-password" className='text-base font-bold' >密碼</label>
        <input
          type="password"
          id="login-password"
          className='w-full p-2 indent-2 border border-black rounded-sm'
          value={user.password}
          onChange={handleFormChange}
        />
      </div>

      <button
        type='submit'
        className='py-2 px-8 w-1/2 border-2 border-black bg-black text-white text-sm font-bold rounded-full transition-all duration-200 ease-in-out hover:bg-white hover:text-black'
        onClick={handleClick}
      >
        登入
      </button>

    </div>
  )
}

export default LoginForm