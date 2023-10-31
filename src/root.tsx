import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import NavbarTest from './components/NavbarTest';

function Root() {
  return (
    <>
      <ToastContainer />
      <div className='flex w-full'>
        <NavbarTest />
        <Outlet />
      </div>
    </>
  );
}

export default Root;
