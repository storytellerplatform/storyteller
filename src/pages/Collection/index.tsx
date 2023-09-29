import React from 'react'
import EmotionButton from '../../components/EmotionButton'

const Collection = () => {
  return (
    <>
      {/* 左區 */}
      <div className='w-1/4 my-8 mx-12 p-[2px] rounded-lg bg-gradient-to-b from-orange-300 to-white-500'>
        <div className='flex flex-col p-4 gap-6 items-center bg-white rounded-lg drop-shadow-xl shadow-lg'>
          {/* 標題 */}
          <h1 className='text-4xl font-bold black text-orange-500 tracking-widest'>情 緒</h1>
          {/* 情緒統計 */}
          <div className='flex flex-col w-full pl-12'>
            <div className='flex items-center gap-6'>
              <EmotionButton label='開心' />
              <h6 className='text-xl text-red-500'>x 55</h6>
            </div>
          </div>
        </div>
      </div>

      {/* 右區 */}
      <div className='grid grid-cols-3'>
        {/* 收藏 */}
      </div>
    </>
  )
}

export default Collection