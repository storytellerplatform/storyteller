import React from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

function Root() {
  return (
    <>
      <div className='h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default Root;
