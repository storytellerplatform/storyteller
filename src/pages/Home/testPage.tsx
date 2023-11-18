import React from 'react'
import Book from '../../assets/homePageImage.svg'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { taggleRegisterForm } from '../../feature/authSidebar';
import { Link } from 'react-router-dom';
import { getToken } from '../../feature/auth/authSlice';

const TestHome = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(getToken);

  console.log(token);

  const handleOpenRegisterFormClick = () => {
    dispatch(taggleRegisterForm());
  }

  return (
    <>

      <main className='absolute flex flex-row justify-center h-auto min-h-screen w-auto min-w-full text-white pl-6 sm:pl-16 bg-home-image bg-center bg-cover'>

        <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-black opacity-60'></div>

        {/* 標題 */}
        <div className='w-11/12 flex flex-col items-start sm:items-center gap-6 mt-40 sm:w-11/12 md:w-9/12 lg:w-7/12 z-20'>
          <h2 className='text-3xl font-bold sm:text-4xl'> 說書人 </h2>
          <h1 className='text-4xl font-extrabold sm:text-5xl xl:text-6xl' > 讓你的文字演奏旋律 </h1>
          <h3 className='mb-4 text-xl font-semibold sm:text-2xl bg-gradient-to-r from-purple-300 via-orange-200 via-[40%] to-yellow-100 text-transparent bg-clip-text'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>

          <div className='flex flex-col gap-6 mb-6 sm:flex-row'>
            <Link
              to='/music'
              className='px-14 py-2 w-fit border border-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'
            >
              開始創作音樂
            </Link>

            {!token &&
              <button
                type='button'
                onClick={handleOpenRegisterFormClick}
                className='px-14 py-2 w-fit border border-white bg-white font-bold text-black text-lg rounded-full transition-all duration-300 ease-out hover:bg-black hover:text-white'
              >
                註冊
              </button>
            }
          </div>
        </div>

        {/* <img className='fixed left-[42rem] top-32 w-[36rem] overflow-hidden' src={Book} alt="book" /> */}

      </main>
    </>
  )
}

export default TestHome