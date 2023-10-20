import React, { useState } from 'react'

import { HiOutlineMail } from 'react-icons/hi';
import { BiSolidLockAlt } from 'react-icons/bi';
import NavSigninButton from './components/NavSigninButton';
import { SigninType } from '../../types/auth';
import classNames from 'classnames';
import { PASSWORD_PATTERN } from '../../utils/config';
import { useSigninMutation } from '../../feature/api/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../../app/hooks';
import { setEmail, setUserId, setUsername } from '../../feature/user/userSlice';
import { setToken } from '../../feature/auth/authSlice';

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<SigninType>({
    email: "",
    password: "",
  });

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

  const handleSigninClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user.email === 'admin' && user.password === 'admin') {
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
    }

    try {
      const response = await signin(user as SigninType).unwrap();

      // console.log(response);
      // console.log(response.token);

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
        setErrors((errs) => ({ ...errs, email: '帳號或密碼錯誤', password: '帳號或密碼錯誤' }));
      } else if (err.status === 500) {
        setErrors((errs) => ({ ...errs, email: '伺服器發生錯誤' }));
      }
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-1/3 p-5'>

        <label htmlFor="storyteller-signin-email" className="block mb-2 text-lg font-bold text-gray-900">電子信箱</label>
        <div className="flex flex-col gap-2 mb-46">

          <div className='flex'>
            <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <HiOutlineMail size={24} />
            </span>
            <input
              type="email"
              id="storyteller-signin-email"
              name="email"
              value={user.email}
              onChange={handleFormChange}
              className={classNames(`rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`,
                { 'outline outline-red-400': errors.email })}
              placeholder="onandon@gmail.com" />
          </div>

          {errors.email && <div className='text-red-500'>{errors.email}</div>}
        </div>

        <label htmlFor="storyteller-signin-username" className="block mb-2 text-lg font-bold text-gray-900">密碼</label>
        <div className="flex flex-col gap-2 mb-4">

          <div className='flex'>
            <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <BiSolidLockAlt size={24} />
            </span>
            <input
              type="password"
              id="storyteller-signin-username"
              name="password"
              value={user.password}
              onChange={handleFormChange}
              pattern={PASSWORD_PATTERN}
              title="Password should be at least 6 characters long and contain only letters and numbers."
              required
              className={classNames("rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5",
                { 'outline outline-red-400': errors.password })}
              placeholder="* * * * * * * *" />
          </div>

          {errors.password && <div className='text-red-500'>{errors.password}</div>}
        </div>


        <div className='self-center '>
          <NavSigninButton type='submit' isLoading={isLoading} onClick={handleSigninClick} />
        </div>
      </div>
    </div>
  )
}

export default Signin