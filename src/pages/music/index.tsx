import React from 'react'
import EmotionButton from '../../components/EmotionButton'

const Music = () => {
  return (
    <>
      {/* 主題 */}
      <div className='flex flex-row p-10 justify-between'>
        {/* 左區 */}
        <div className='select-none'>
          {/* 文字框 */}

          <label htmlFor="article" className="block mb-4 text-2xl font-extrabold text-gray-900 ">
            輸入文字，開始創作音樂
          </label>
          <textarea
            id="message"
            cols={60}
            rows={10}
            className="block p-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-orange-200 focus:border-orange-200 focus-visible:outline-0 select-none drop-shadow-xl"
            placeholder="我想要.....">
          </textarea>

          {/* 文章分析按鈕 */}
          <button type="submit" className="relative inline-flex items-center justify-center p-0.5 m-4 overflow-hidden text-xl font-extrabold text-gray-900 rounded-lg group bg-gradient-to-br from-orange-200 via-orange-300 to-yellow-200 group-hover:from-orange-200 group-hover:via-orange-300 group-hover:to-yellow-200">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
              分析
            </span>
          </button>

        </div>

        {/* 右 */}
        <div className='w-1/2'>
          {/* 主旨顯示 */}
          <h3 className='mb-4 text-2xl font-extrabold text-gray-900'>文章主旨</h3>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 border border-gray-400 rounded-lg  focus:border-orange-300 outline-0'
            spellCheck={false}
            placeholder="文章主旨..."
            value={""}
            readOnly
          >
          </textarea>

          {/* 感情顯示 */}
          <h3 className='mb-4 text-2xl font-extrabold text-gray-900'>感情</h3>
          <div className=''>
            <EmotionButton onClick={() => { }} color='yellow' label='開心' />


            {/* <button type="button"
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-400 focus:outline-none font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2">
              開心
            </button> */}
          </div>
          {/* 選取其他感情 */}
          <h3 className='mb-4 text-2xl font-extrabold text-gray-900'>添加更多感受</h3>
          {/* 產生音樂按鈕 */}
        </div>
      </div>
      {/* 產生音樂列表 */}
    </>
  )
}

export default Music