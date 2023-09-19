import React from 'react'
import Navbar from '../../components/Navbar'

import Music from '../../assets/music3.jpg';
import Letter from '../../assets/letter3.jpg';

const Home = () => {
  return (
    <>
      <Navbar />

      <main className='flex flex-col relative'>

        {/* 標題 */}
        <div className='flex ml-24 mr-12 items-center justify-center gap-3'>
          {/* 主題 */}
          <div className='flex flex-col items-center gap-6 mt-24'>
            <h1 className='font-black text-6xl'>
              讓你的文字演奏<strong className=' text-orange-500'>旋律</strong>
            </h1>

            <h3 className='text-lg font-medium'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>
          </div>
        </div>

        {/* 免費試用按鈕 */}
        <div className='flex justify-center w-full mt-10'>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-orange-200 to-red-200 group-hover:from-orange-200 group-hover:to-red-200 group-hover:text-white focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-orange-100">

            <span className="relative px-7 py-3 transition-all ease-in duration-300 bg-white  rounded-md group-hover:bg-opacity-0">
              免費試用
            </span>
          </button>
        </div>

        {/* 圖片 or 動畫 */}
        <div className='flex w-full fixed bottom-0'>
          <img className='w-1/2 object-contain' src={Letter} alt="letter"></img>
          <img className='w-1/2 object-contain' src={Music} alt="music"></img>
        </div>
      </main>

    </>
  )
}

export default Home