import React from 'react'
import EmotionButton from '../../components/EmotionButton'
import CollectCard from '../../components/CollectCard'

const Collection = () => {
  return (
    <div className='flex flex-row m-12 justify-between'>
      {/* 左區 */}
      <div className='w-1/4 p-[2px] rounded-lg h-fit bg-gradient-to-b from-orange-300 to-white-500'>
        <div className='flex flex-col p-4 gap-6 items-center bg-white rounded-lg drop-shadow-xl shadow-lg'>
          {/* 標題 */}
          <h1 className='text-4xl font-bold black text-orange-500 tracking-widest'>情 緒</h1>
          {/* 情緒統計 */}
          <div className='flex flex-col w-full'>
            <div className='flex items-center justify-start gap-2'>
              <EmotionButton label='開心' />
              <i className="fa-solid fa-x text-red-500"></i>
              <h6 className='mb-1 text-3xl text-red-500 drop-shadow-lg'>55</h6>
            </div>
          </div>
        </div>
      </div>

      {/* 右區 */}
      <div className='w-2/3 grid grid-cols-3 gap-6'>
        {/* 收藏 */}
        <CollectCard />
        <CollectCard />
        <CollectCard />
        <CollectCard />
        <CollectCard />
      </div>
    </div>
  )
}

export default Collection