import React from 'react'

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
          <h1 className='mb-4 text-2xl font-extrabold text-gray-900'>文章主旨</h1>
          <textarea className='max-h-32 w-full p-2 px-4 border border-gray-400 rounded-lg overflow-auto focus:border-orange-300 outline-0' placeholder="文章主旨..." value={"a\n\n\n\n\nbcde"}>
          </textarea>

          {/* 感情顯示 */}
          {/* 選取其他感情 */}
          {/* 產生音樂按鈕 */}
        </div>
      </div>
      {/* 產生音樂列表 */}
    </>
  )
}

export default Music