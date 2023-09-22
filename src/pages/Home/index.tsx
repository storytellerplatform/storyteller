import React from 'react'

import Music from '../../assets/music3.jpg';
import Letter from '../../assets/letter3.jpg';
import A from '../../assets/letter-a.png';
import B from '../../assets/letter-b.png';
import C from '../../assets/letter-c.png';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='flex flex-col relative bg-gradient-to-br from-orange-100 to-rose-100'>

      <div className='w-full flex flex-row items-center justify-center'>
        {/* 跳動文字 */}
        <div className='w-1/4 flex flex-col items-center justify-start'>
          <div className='w-1/3 flex flex-col'>
            <img className='w-16 self-start' src={A} alt="a" />
            <img className='w-16 self-end' src={B} alt="b" />
            <img className='w-16 self-center' src={C} alt="c" />
          </div>
        </div>

        {/* 標題 */}
        <div className='w-1/2  flex flex-col mt-12 items-center justify-center gap-3'>
          {/* 主題 */}
          <div className='flex flex-col items-center gap-6'>
            <h1 className='font-black text-6xl'>
              讓你的文字演奏<strong className=' text-orange-500'>旋律</strong>
            </h1>

            <h3 className='text-lg font-medium'> 將你的故事、詩或任何文字轉換為美妙的音樂 </h3>
          </div>

          {/* 立即試用按鈕 */}
          <div className='flex justify-center my-12'>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-yellow-200 to-red-200 focus:ring-4 focus:outline-none focus:ring-0" type='button'>

              <span className="relative px-7 py-3 transition-all ease-in duration-300 bg-white  rounded-md group-hover:bg-opacity-0">
                <Link to="/music">
                  立即試用
                </Link>
              </span>
            </button>
          </div>

        </div>

        {/* 跳動音符 */}
        <div className='w-1/4'>Music</div>
      </div>



      {/* 圖片 or 動畫 */}
      <div className='flex w-full fixed bottom-0'>
        <img className='w-1/2 object-contain' src={Letter} alt="letter"></img>
        <img className='w-1/2 object-contain' src={Music} alt="music"></img>
      </div>
    </main>
  )
}

export default Home