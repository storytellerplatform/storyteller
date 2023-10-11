import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLazyGetUserDataQuery } from '../../feature/api/userSlice';
import { useAppDispatch } from '../../app/hooks';
import { setEmail, setUserId, setUsername } from '../../feature/user/userSlice';
import LoadingPage from './../Loading/index';
import { setToken } from '../../feature/auth/authSlice';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const jwtToken = Cookies.get('jwtToken');
  const userIdString = Cookies.get('userId');
  const userIdInt = userIdString ? Number(userIdString) : undefined;

  const [triggerGetUserData, userDataResult] = useLazyGetUserDataQuery();

  useEffect(() => {
    if (!jwtToken) {
      navigate('/signin', { replace: true });
      return;
    }

    dispatch(setToken(jwtToken));
  }, [jwtToken, userIdInt, navigate, triggerGetUserData, dispatch]);

  useEffect(() => {
    if (!userIdInt) {
      navigate('/signin', { replace: true });
      return;
    }

    triggerGetUserData(userIdInt);
  }, [jwtToken, userIdInt, navigate, triggerGetUserData, dispatch]);

  const { data: userData, isLoading: isGetUserDataLoading } = userDataResult;

  useEffect(() => {
    if (userData) {
      dispatch(setUserId(userIdString || '0'));
      dispatch(setUsername(userData.username || 'user'));
      dispatch(setEmail(userData.email || 'email'));
    }
  }, [userData, dispatch, userIdString]);

  return isGetUserDataLoading ? <LoadingPage /> : <Outlet />;
};

export default Admin;
