import React, { useEffect, useState } from 'react'

import { HiOutlineMail } from 'react-icons/hi';
import { BiSolidLockAlt } from 'react-icons/bi';
import { SignupType } from '../../types/auth';
import { useSignupMutation } from '../../feature/api/authSlice';
import NavSignupButton from './components/NavSignupButton';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ErrorCode, ErrorForm, codeToMsg } from '../../utils/errorCodeToMsg';
import { useLazyCheckEmailQuery, useLazyCheckUsernameQuery } from '../../feature/api/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { isEmailValid, isPasswordValid } from '../../utils/validator';
import { emailSendingNotification, serverErrorNotify } from '../../utils/toast';

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const [signup, { isLoading }] = useSignupMutation();

  const [triggerCheckUsernameExists, checkUsernameExistsResult] = useLazyCheckUsernameQuery();
  const [triggerCheckEmailExists, checkEmailExistsResult] = useLazyCheckEmailQuery();

  useEffect(() => {
    if (errors.name !== "") {
      serverErrorNotify(errors.name);
    }
    if (errors.email !== "") {
      serverErrorNotify(errors.email);
    }
    if (errors.password !== "") {
      serverErrorNotify(errors.password);
    }
  }, [errors])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;

    setUser(prevUser => ({
      ...prevUser as SignupType,
      name: newUsername
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setUser(prevUser => ({
      ...prevUser as SignupType,
      email: newEmail
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;

    setUser(prevUser => ({
      ...prevUser as SignupType,
      password: newPassword
    }));
  };

  const validateUsername = () => {
    // 從資料庫確認是否使用者名稱有重複
    triggerCheckUsernameExists(user.name);
    const { data: checkUsernameExists } = checkUsernameExistsResult;
    if (user.name && checkUsernameExists) {
      setErrors((errs) => ({ ...errs, username: '使用者名稱已存在!' }));
    } else {
      setErrors((errs) => ({ ...errs, username: '' }));
    }
  };

  // 從資料庫確認是否使用者信箱有重複
  const validateEmail = () => {
    if (!isEmailValid(user.email)) {
      setErrors((errs) => ({ ...errs, email: '電子郵件格式錯誤!' }));
      return;
    }

    triggerCheckEmailExists(user.email);
    const { data: checkEmailExists } = checkEmailExistsResult;
    if (user.email && checkEmailExists) {
      setErrors((errs) => ({ ...errs, email: '電子郵件已註冊過!' }));
    } else {
      setErrors((errs) => ({ ...errs, email: '' }));
    }
  };

  const validatePassword = () => {
    if (!isPasswordValid(user.password)) {
      setErrors((errs) => ({ ...errs, password: '密碼必須至少包括一個數字、一個字母，並且其長度必須超過6個字符' }));
    } else {
      setErrors((errs) => ({ ...errs, password: '' }));
    }
  };

  const handleSignupClick = async () => {
    try {
      await signup(user as SignupType).unwrap();
      navigate('/signin');
      emailSendingNotification("為了完成註冊，請點擊您的信箱中的授權連結。")
    } catch (err: any) {
      console.log(err);

      if (err && err.data?.errorCode) {
        const errCode: ErrorCode = err.data.errorCode;
        const errorForm: ErrorForm = codeToMsg(errCode);
        setErrors((errs) => ({ ...errs, [errorForm.place]: errorForm.message }));
        serverErrorNotify(errorForm.message);
        return;
      }

      if (err.status === 'FETCH_ERROR') {
        serverErrorNotify("Server not connected!");
        return;
      }

      serverErrorNotify("Server error");
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-1/3 p-5'>

        {/* Test error message */}
        {/* {error && <p> {JSON.stringify(error)} </p>} */}

        <label htmlFor="storyteller-signip-username" className="block mb-2 text-lg font-bold text-gray-900">您的名稱</label>
        <div className="flex flex-col gap-2 mb-4">

          <div className='flex select-none'>
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              name='name'
              id="storyteller-signip-username"
              value={user?.name}
              onChange={handleUsernameChange}
              onBlur={validateUsername}
              autoFocus
              className={classNames(`rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`,
                { 'outline outline-red-400': errors.name }
              )}
              placeholder="onandon"
            />
          </div>

          {errors.name && <div className='text-red-500'>{errors.name}</div>}
        </div>

        <label htmlFor="storyteller-signup-email" className="block mb-2 text-lg font-bold text-gray-900">電子信箱</label>
        <div className="flex flex-col gap-2 mb-4">

          <div className='flex select-none'>
            <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <HiOutlineMail size={24} />
            </span>
            <input
              type="email"
              id="storyteller-signup-email"
              name='email'
              value={user.email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              className={classNames(`rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`,
                { 'outline outline-red-400': errors.email })}
              placeholder="onandon@gmail.com" />
          </div>

          {errors.email && <div className='text-red-500'>{errors.email}</div>}
        </div>

        <label htmlFor="storyteller-signup-password" className="block mb-2 text-lg font-bold text-gray-900">密碼</label>
        <div className="flex flex-col gap-2 mb-4">

          <div className='flex select-none'>
            <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <BiSolidLockAlt size={24} />
            </span>
            <input
              type="password"
              id="storyteller-signup-password"
              name='password'
              value={user.password}
              onChange={handlePasswordChange}
              title="Password should be at least 6 characters long and contain only letters and numbers."
              onBlur={validatePassword}
              required
              className={classNames("rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5",
                { 'outline outline-red-400': errors.password })}
              placeholder="* * * * * * * *" />
          </div>

          {errors.password && <div className='text-red-500'>{errors.password}</div>}
        </div>

        <div className='self-center'>
          <NavSignupButton type='submit' isLoading={isLoading} onClick={handleSignupClick} />
        </div>
      </div>
    </div>
  )
}

export default Signin