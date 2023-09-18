import React from 'react'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      {/* 標題 */}
      <div className='flex flex-row w-2/5 items-center justify-center gap-3'>
        {/* 主題 */}
        <div className='flex flex-col gap-6 mt-24'>
          <h1 className='font-black text-6xl'>
            讓你的文字 <br /> 演奏<strong className=' text-orange-500'>旋律</strong>
          </h1>

          <h3 className='text-lg font-medium'> 將你的故事、詩或任何文字 <br /> 轉換為美妙的音樂 </h3>
        </div>

      </div>

      {/* 圖片 or 動畫 */}

    </>
  )
}

export default Home