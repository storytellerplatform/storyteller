import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';

function Root() {
  return (
    <>
      <ToastContainer />
      <div className='h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default Root;
