import React from 'react'
import Book from '../../assets/homePageImage.svg'
import { useAppDispatch } from '../../app/hooks';
import { taggleRegisterForm } from '../../feature/authSidebar';

const TestHome = () => {
  const dispatch = useAppDispatch();

  const handleOpenRegisterFormClick = () => {
    dispatch(taggleRegisterForm());
  }

  return (
    <main className='pl-16 flex flex-row justify-evenly h-screen w-full bg-gradient-to-r from-zinc-950 via-zinc-900 via-50% to-zinc-700 text-white '>

      {/* 標題 */}
      <div className='flex flex-col gap-12 mt-24'>
        <h2 className='text-4xl font-bold'> 說書人 </h2>
        <h1 className='text-6xl font-bold' > 讓你的文字演奏旋律 </h1>
        <h3 className='mb-8 text-2xl font-semibold'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>

        <div className='flex gap-6'>
          <button
            type='button' className='px-14 py-2 w-fit border border-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-white hover:text-black'
          >
            開始創作音樂
          </button>

          <button
            type='button'
            onClick={handleOpenRegisterFormClick}
            className='px-14 py-2 w-fit border border-white bg-white font-bold text-black text-lg rounded-full transition-all duration-300 ease-out hover:bg-black hover:text-white'
          >
            註冊
          </button>
        </div>
      </div>

      <img className='w-1/2' src={Book} alt="book" />

    </main>
  )
}

export default TestHome