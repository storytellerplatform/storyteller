import classNames from 'classnames'
import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { changeOpenForm, getRegisterForm, taggleLoginForm, taggleRegisterForm } from '../feature/authSidebar';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { SignupType } from '../types/auth';
import { useSignupMutation } from '../feature/api/authSlice';
import { FiAlertTriangle } from "react-icons/fi";
import Spinner from './Spinner';
import { successNotification } from '../utils/toast';
import { validateEmail } from '../utils/vaildateEmail';

const RegisterForm: React.FC = () => {
  const isRegisterFormOpen = useAppSelector(getRegisterForm);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(taggleRegisterForm());
  }

  // const handleGoogleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  // };

  const handleSignupClick = async () => {
    if (!validateEmail(user.email)) {
      setError("電子信箱格式錯誤");
      return;
    }

    try {
      await signup(user as SignupType).unwrap();
      setError("");
      dispatch(taggleLoginForm());
      successNotification('感謝您的註冊！我們已向您提供的電子郵件地址發送了一封驗證郵件。請查看您的收件箱!')
    } catch (err: any) {
      console.log(err);

      if (err.status === 400 || err.status === 404) {
        if (err.data.errorCode === 'ACCOUNT_EXISTS') {
          setError(err.data.message);
        } else if (err.data.errorCode === 'EMAIL_EXISTS') {
          setError(err.data.message);
        }
      } else if (err.status === 403) {
        setError("帳號或密碼錯誤，請重試一次!");
      } else if (err.status === 500) {
        setError("伺服器發生錯誤!");
      }
    }
  }

  const handleToLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    dispatch(changeOpenForm());
  }

  return (
    <div className={classNames(`fixed top-0 right-0 flex flex-col gap-4 h-screen w-full sm:w-4/5 md:w-3/5 lg:w-5/12 px-6 sm:px-24 pt-10 bg-white text-black z-50 overflow-auto transition-all duration-150 ease-in drop-shadow-2xl shadow-2xl`,
      { 'translate-x-full': !isRegisterFormOpen },
      { 'delay-200': isRegisterFormOpen })}
    >
      {/* 
          Title
      */}
      <header className='flex justify-between items-start'>
        <h1 className='text-3xl font-extrabold'> 註冊 </h1>
        <button type='button' className='hover:opacity-50' onClick={handleCloseClick}>
          <AiOutlineCloseCircle size={24} />
        </button>
      </header>

      {/* <hr className='h-[2.5px] w-full bg-black select-none' />

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
          名稱輸入框
      */}
      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="register-username" className='text-base font-bold' >名稱</label>
        <input
          type="text"
          id="register-username"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>

      {/* 
          電子郵件輸入框
      */}
      <div className='flex flex-col gap-1 select-none'>
        <label htmlFor="register-email" className='text-base font-bold' >電子信箱</label>
        <input
          type="email"
          id="register-email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>


      {/* 
          密碼輸入框
      */}
      <div className='flex flex-col gap-1 select-none mb-4'>
        <label htmlFor="register-password" className='text-base font-bold' >密碼</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          className='w-full p-2 indent-2 border border-black rounded-sm'
        />
      </div>

      {/* 
          註冊按鈕
      */}
      <button
        type='submit'
        className='flex justify-center py-2 px-8 mb-2 w-1/2 border-2 border-black bg-black text-white text-sm font-bold rounded-full transition-all duration-200 ease-in-out hover:bg-white hover:text-black'
        onClick={handleSignupClick}
      >
        {
          !isSignupLoading ?
            "註冊" :
            <Spinner width='w-5' height='w-5' />
        }
      </button>

      {/* 
          登入過的話
      */}
      <footer className='self-start font-bold text-sm'>
        已經有帳號了嗎？請
        <button
          type='button'
          onClick={handleToLoginClick}
          className='underline underline-offset-2'
        >
          登入
        </button>
      </footer>

    </div>
  )
}

export default RegisterForm