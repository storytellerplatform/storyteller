import React from 'react'

const About = () => {
  return (
    // <div className='flex w-full bg-gradient-to-br from-slate-800 to-slate-400 pt-12'>
    <div className='flex w-full pt-12'>

      {/*  
        背景圖
      */}
      <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-star-image bg-center bg-cover pt-12 -z-10'></div>

      {/* 
        漸深 
      */}
      <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-black opacity-20 -z-10'></div>

      {/* 
          sidabar 空間
      */}
      <div className='w-0 sm:w-1/12 h-screen'></div>

      {/* 
          main content
      */}
      <main className='w-11/12 flex flex-col ml-12 md:ml-8 mb-8 sm:mb-0 mt-12 md:mt-0 gap-4 text-white pr-12'>
        <header className='mb-4 text-sky-300 font-extrabold text-5xl'>關於我們</header>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4'>
          {/*   
            簡述
          */}
          <div className='w-full'>
            <h3 className='mb-4 text-cyan-300 font-bold text-4xl'>簡述</h3>

            <p className='mb-2 text-lg w-full md:w-8/12'>
              歡迎來到說書人！我們是一個專注於將文字轉換成音樂的平台。各位可以輸入他們喜歡的故事、小說或其他文本，
              我們會根據文本情感和內容，將其轉換成獨特的音樂作品
            </p>
          </div>

          {/*
            服務說明
          */}
          <div className='w-full'>
            <h3 className='mb-4 text-sky-300 font-bold text-4xl'>團隊介紹</h3>

            <ul className='ml-4'>
              <li className='list-disc text-lg mb-1'> 資管三 410530036 邱柏勳 </li>
              <li className='list-disc text-lg mb-1'> 資管三 410530049 陳宏葦 </li>
            </ul>
          </div>

          {/*   
             專案介紹 
          */}
          <div className='w-full'>
            <h3 className='mb-4 text-sky-300 font-bold text-4xl'>情緒分析技術</h3>

            <ul className='w-full md:w-10/12 ml-4'>
              <li className='list-disc text-lg mb-1'> 導入 bert-base-chinese 預訓練模型 </li>
              <li className='list-disc text-lg mb-1'> <strong> 340萬筆 </strong> 以標記情緒資料加以訓練 </li>
              <li className='list-disc text-lg mb-1'> 高精度識別中文文章情緒 </li>
            </ul>
          </div>

          {/*
            服務說明
          */}
          <div className='w-full'>
            <h3 className='mb-4 text-sky-300 font-bold text-4xl'>音樂生成技術</h3>

            <ul className='ml-4'>
              <li className='list-disc text-lg mb-1'> 導入中研院研發的 <strong> Compound Word Transformer </strong> 加以訓練 </li>
              <li className='list-disc text-lg mb-1'> 使用爬蟲技術在 Youtube music 上抓取 tag 情緒的音樂，清洗後做為訓練資料 </li>
              <li className='list-disc text-lg mb-1'> 生成與文章情緒相匹配的音樂 </li>
            </ul>
          </div>


        </div>

      </main>
    </div>
  )
}

export default About