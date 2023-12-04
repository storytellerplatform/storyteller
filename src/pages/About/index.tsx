import React from 'react'

const About = () => {
  return (
    <div className='flex w-full bg-gradient-to-br from-slate-800 to-slate-400 pt-12'>
      {/* 
          sidabar 空間
      */}
      <div className='w-1/12 h-screen'></div>

      {/* 
          maisn content
      */}
      <main className='w-11/12 flex flex-col gap-4 text-white pr-12'>
        <header className='mb-4 text-yellow-200 font-extrabold text-6xl'>關於我們</header>

        {/*   
          簡述
      */}
        <span className='mb-2 text-white font-bold text-4xl'>簡述</span>

        <p className='mb-2 text-xl w-1/2'>
          歡迎來到說書人！我們是一個專注於將文字轉換成音樂的平台。用戶可以輸入他們喜歡的故事、小說或其他文本，
          我們會根據文本情感和內容，將其轉換成獨特的音樂作品。
        </p>

        {/*
            服務說明
        */}
        <span className='mb-2 text-white font-bold text-4xl'>服務說明</span>

        <p className='text-base w-1/2'>
          我們提供簡單易用的文本輸入界面，您可以在輸入框中鍵入您喜歡的文字內容，點擊轉換按鈕後，
          我們將使用先進的技術將這些文字轉換為動聽的音樂作品，並提供給您進行欣賞。
        </p>
      </main>
    </div>
  )
}

export default About