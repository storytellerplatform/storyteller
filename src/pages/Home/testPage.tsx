import React from 'react'
import Book from '../../assets/homePageImage.svg'
import { useAppDispatch } from '../../app/hooks';
import { taggleRegisterForm } from '../../feature/authSidebar';
import { Link } from 'react-router-dom';

const TestHome = () => {

  const dispatch = useAppDispatch();

  const handleOpenRegisterFormClick = () => {
    dispatch(taggleRegisterForm());
  }

  return (
    <main className='absolute flex flex-row h-auto min-h-screen w-auto min-w-full bg-gradient-to-r from-zinc-950 via-zinc-900 via-50% to-zinc-700 text-white pl-8 sm:pl-24 '>

      {/* 標題 */}
      <div className='w-11/12 flex flex-col gap-6 mt-32 sm:w-11/12 md:w-9/12 lg:w-7/12 sm:gap-12'>
        <h2 className='text-3xl font-bold sm:text-4xl'> 說書人 </h2>
        <h1 className='text-4xl font-extrabold sm:text-6xl' > 讓你的文字演奏旋律 </h1>
        <h3 className='mb-4 text-xl font-semibold sm:text-2xl sm:mb-8'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>

        <div className='flex flex-col gap-6 mb-6 sm:flex-row'>
          <Link
            to='/music'
            className='px-14 py-2 w-fit border border-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'
          >
            開始創作音樂
          </Link>

          <button
            type='button'
            onClick={handleOpenRegisterFormClick}
            className='px-14 py-2 w-fit border border-white bg-white font-bold text-black text-lg rounded-full transition-all duration-300 ease-out hover:bg-black hover:text-white'
          >
            註冊
          </button>
        </div>
      </div>

      <img className='fixed left-[42rem] top-32 w-[36rem] overflow-hidden' src={Book} alt="book" />

    </main>
  )
}

export default TestHome