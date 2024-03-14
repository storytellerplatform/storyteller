import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLoginForm, getRegisterForm, taggleLoginForm, taggleRegisterForm } from '../../feature/authSidebar';
import { Link } from 'react-router-dom';
import { getToken } from '../../feature/auth/authSlice';
import { useTestApiQuery } from '../../feature/api/apiSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(getToken);

  const registerFormOpen = useAppSelector(getRegisterForm);
  const loginFormOpen = useAppSelector(getLoginForm);

  // test
  const { data: hello } = useTestApiQuery();
  console.log(hello);

  const handleOpenRegisterFormClick = () => {
    dispatch(taggleRegisterForm());
  }

  const handleCloseRegister = (e: React.MouseEvent<HTMLDivElement>) => {
    if (registerFormOpen) {
      if (!(e.target as Element).className.match('register-form')) dispatch(taggleRegisterForm());
    }

    if (loginFormOpen) {
      if (!(e.target as Element).className.match('login-form')) dispatch(taggleLoginForm());
    }
  };

  return (
    <>
      <main onClick={handleCloseRegister} className='absolute flex flex-row justify-center h-auto min-h-screen w-auto min-w-full text-white pl-6 sm:pl-16 bg-read-book3-image bg-bottom bg-cover'>

        <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-white opacity-10'></div>

        {/* 標題 */}
        <div className='w-11/12 flex flex-col items-start gap-6 mt-28 sm:w-11/12 md:w-9/12 lg:w-11/12 z-20'>
          <h2 className='text-5xl font-bold sm:text-6xl sm:mb-8'> 說書人 </h2>
          <h1 className='text-4xl font-extrabold sm:text-4xl xl:text-5xl' > 讓你的文字演奏旋律 </h1>
          <h3 className='mb-8 text-xl font-semibold sm:text-2xl bg-gradient-to-r from-purple-300 via-orange-200 via-[40%] to-yellow-100 text-transparent bg-clip-text'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>

          <div className='flex flex-col gap-6 mb-6 sm:flex-row'>
            {token &&
              <Link
                to='/music'
                className='px-14 py-2 w-fit border border-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'
              >
                開始創作音樂
              </Link>
            }

            {!token &&
              <button
                type='button'
                onClick={handleOpenRegisterFormClick}
                className='px-20 py-2 w-fit border border-white bg-white font-bold text-black text-lg rounded-full transition-all duration-300 ease-out hover:bg-black hover:text-white'
              >
                註冊
              </button>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home