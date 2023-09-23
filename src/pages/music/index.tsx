import React from 'react'
import EmotionButton from '../../components/EmotionButton'
import MusicModal from './MusicModal';

const Music = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <>
      {/* 主題 */}
      <div className='flex flex-row p-10 justify-between'>
        {/* 左區 */}
        <div className='select-none'>
          {/* 文字框 */}

          <label htmlFor="article" className="block mb-4 text-2xl font-extrabold text-gray-900 ">
            分享您的故事，開始創作音樂
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
        <div className='w-1/2 flex flex-col'>
          <h1 className='mb-4 text-4xl font-extrabold text-black self-center'>深度解析</h1>
          {/* 主旨顯示 */}
          <h3 className='mb-4 text-2xl font-normal text-gray-400 opacity-90'>主旨摘要</h3>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 border border-gray-400 rounded-lg  focus:border-orange-300 outline-0'
            spellCheck={false}
            placeholder="文章主旨..."
            value={""}
            readOnly
          >
          </textarea>

          {/* 感情顯示 */}
          <h3 className='mb-4 text-2xl font-normal text-gray-400 opacity-90'>情感評價</h3>
          <div className='flex flex-row'>
            <EmotionButton onClick={() => { }} label='開心' />
            <EmotionButton onClick={() => { }} label='悲傷' />
            <EmotionButton onClick={() => { }} label='浪漫' />
            <EmotionButton onClick={() => { }} label='憤怒' />



            {/* test */}
            {/* <button
              className={`text-white bg-gradient-to-br from-orange-400 via-orange-400 to-white hover:text-white border border-orange-400 hover:bg-gradient-to-br 
              hover:from-orange-300 hover:via-orange-300 hover:to-white
               focus:outline-none font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2`}
            >
              開心
            </button> */}

            {/* 產生音樂按鈕 */}
            <button
              type='button'
              className='w-10 h-10 self-center flex items-center justify-center text-lg font-bold text-orange-400 border-2 border-orange-400 rounded-full hover:border-orange-300 hover:text-orange-300'
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>

            {/* 選取其他感情 */}
            <MusicModal showModal={showModal} setShowModal={setShowModal} />

          </div>
        </div>
      </div>
      {/* 產生音樂列表 */}
    </>
  )
}

export default Music