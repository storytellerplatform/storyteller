import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyGetCurrentUserQuery } from '../../feature/api/userSlice';
import { useAppDispatch } from '../../app/hooks';
import { setEmail, setUserId, setUsername } from '../../feature/user/userSlice';
import LoadingPage from './../Loading/index';
import { setToken } from '../../feature/auth/authSlice';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams,] = useSearchParams();

  const jwtToken = searchParams.get('token') || Cookies.get('jwtToken');

  const [triggerGetCurrentUser, currentUserResult] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (!jwtToken) {
        navigate('/', { replace: true });
        return;
      }

      dispatch(setToken(jwtToken));
      await triggerGetCurrentUser();
    };

    fetchData();
  }, [jwtToken, navigate, dispatch, triggerGetCurrentUser]);

  const { data: userData, isLoading: isGetUserDataLoading } = currentUserResult;

  useEffect(() => {
    if (userData) {
      dispatch(setUserId(userData.userId || '0'));
      dispatch(setUsername(userData.name || 'user'));
      dispatch(setEmail(userData.email || 'email'));
    }
  }, [userData, dispatch]);

  return isGetUserDataLoading ? <LoadingPage /> : <Outlet />;
};

export default Admin;
