import classNames from 'classnames'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { changeOpenForm, getLoginForm, taggleLoginForm } from '../feature/authSidebar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useSigninMutation } from '../feature/api/authSlice';
import Cookies from 'js-cookie';
import { SigninType } from '../types/auth';
import { setToken } from '../feature/auth/authSlice';
import { setEmail, setUserId, setUsername } from '../feature/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle } from "react-icons/fi";
import { FaCircleQuestion } from "react-icons/fa6";
import Spinner from './Spinner';

const LoginForm: React.FC = () => {
  const isLoginFormOpen = useAppSelector(getLoginForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<SigninType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");


  const [signin, { isLoading: isSignInLoading }] = useSigninMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(prevUser => ({
      ...prevUser as SigninType,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(taggleLoginForm());
  };

  // const handleGoogleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  // };

  const handleToRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    dispatch(changeOpenForm());
  };

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

      dispatch(taggleLoginForm());

      navigate('/');

    } catch (err: any) {
      if (err.status === 400 || err.status === 403 || err.status === 404) {
        if (err.data && err.data.errorCode && err.data.errorCode === 'EMAIL_INVALID') {
          setError("您的帳戶需要進行電子郵件驗證。請檢查您的郵件信箱!");
        } else if (err.data && err.data.errorCode && err.data.errorCode === "INVALID_CREDENTIALS") {
          setError("帳號或密碼錯誤，請重試一次!!");
        } else {
          setError("帳號或密碼錯誤，請重試一次!!!");
        }
      } else if (err.status === 500) {
        setError("伺服器發生錯誤!");
      }
    }
  };

  return (
    <div className={classNames(`login-form fixed top-0 right-0 flex flex-col gap-4 h-screen w-full sm:w-4/5 md:w-3/5 lg:w-5/12 px-6 sm:px-24 pt-10 bg-white text-black z-50 overflow-auto transition-all duration-150 ease-in drop-shadow-2xl shadow-2xl`,
      { 'translate-x-full': !isLoginFormOpen },
      { 'delay-200': isLoginFormOpen })}
    >
      <div className='flex justify-between items-start'>
        <h1 className='text-3xl font-extrabold'> 登入 </h1>
        <button type='button' className='hover:opacity-50' onClick={handleCloseClick}>
          <AiOutlineCloseCircle size={24} />
        </button>
      </div>

      {/* <hr className='h-[2px] w-full bg-black select-none' />

      <button
        type='button'
        className='flex justify-center items-center gap-2 py-3 w-full border border-black text-sm font-bold rounded-md'
        onClick={handleGoogleClick}
      >
        <img className='w-4' src={Google} alt='google' />
        使用 Google 帳號登入
      </button> */}

      <hr className='h-[2.5px] w-full bg-black select-none' />

      {/* 
          錯誤顯示 
      */}
      {error &&
        <div className='flex items-center gap-2 pl-4 py-2 w-full bg-red-500 text-white text-sm font-bold'>
          <span className='text-white text-base'>
            <FiAlertTriangle />
          </span>
          {error}
        </div>
      }

      {/* 
          電子郵件輸入框
      */}
      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="login-email" className='text-base font-bold' >電子郵件</label>
        <input
          type="email"
          name="email"
          id="login-email"
          className='w-full p-2 indent-2 border border-black rounded-sm'
          value={user.email}
          onChange={handleFormChange}
        />
      </div>


      {/* 
          密碼輸入框
      */}
      <div className='flex flex-col gap-1 select-none mb-2'>
        <label htmlFor="login-password" className='flex gap-1 text-base font-bold' >
          密碼
          <span className={`my-auto relative hover:before:content-["請確保您的密碼包含字母和數字，並至少有7個字符。"] hover:before:absolute hover:before:-top-full hover:before:left-[30px] hover:before:w-56 hover:before:h-fit hover:before:p-2 hover:before:bg-white hover:before:border-2 hover:before:border-black hover:before:rounded-lg hover:after:content-[''] hover:after:w-3 hover:after:h-3 hover:after:top-[1px] hover:after:absolute hover:after:left-[25px] hover:after:bg-white hover:after:border-l-2 hover:after:border-b-2 hover:after:border-black hover:after:rotate-45`}>
            <FaCircleQuestion />
          </span>
        </label>
        <input
          type="password"
          name="password"
          id="login-password"
          className='w-full p-2 indent-2 border border-black rounded-sm'
          value={user.password}
          onChange={handleFormChange}
        />
      </div>


      {/* 
          登入按鈕
      */}
      <button
        type='submit'
        className='flex justify-center py-2 px-8 mb-2 w-1/2 border-2 border-black bg-black text-white text-sm font-bold rounded-full transition-all duration-200 ease-in-out hover:bg-white hover:text-black'
        onClick={handleClick}
      >
        {
          !isSignInLoading ?
            "登入" :
            <Spinner width='w-5' height='w-5' />
        }
      </button>

      {/* 
          未註冊的話
      */}
      <span className='text-sm font-bold'>
        尚未擁有帳號？立即
        <button
          type='button'
          onClick={handleToRegister}
          className='self-start mb-4 underline underline-offset-2'
        >
          註冊
        </button>
      </span>


    </div>
  )
}

export default LoginForm