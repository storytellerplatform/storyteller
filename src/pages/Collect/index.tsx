import React from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import { useGetArticleQuery } from '../../feature/api/articleSlice';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';

import AudioData from '../../assets/music/NCSBlank.mp3';
import { EmotionProps } from '../../types/components';
import DownloadButton from '../../components/DownloadButton';

import TestMusic from '../../assets/music/NCSBlank.mp3'

const Collect = () => {
  const { articleId, emotionId } = useParams();

  const { data: articleData } = useGetArticleQuery(Number(articleId));

  // const findEmotionsInArticle = (emotionId: number) => {
  //   if (!articleData?.emotions || articleData?.emotions.length === 0) return null;
  //   return articleData?.emotions.find(emotion => emotion.emotionId === Number(emotionId))?.emotions;
  // };

  return (
    <div className='flex w-full'>
      {/* 左 */}
      <div className='flex flex-col gap-8 w-7/12 p-5 bg-black h-screen'>

        <h1 className='text-6xl font-extrabold text-white'> purpose </h1>

        <div className='flex w-full select-none'>

          {/* 對上 emotionId */}
          {/* 確認 emotions 內 是否有 emotions 如果沒有就回傳 null */}
          {
            articleData?.emotions && articleData.emotions.length > 0 &&
              articleData.emotions.find(emotion => emotion.emotionId === Number(emotionId))?.emotions
              ? articleData.emotions.find(emotion => emotion.emotionId === Number(emotionId))?.emotions.map(emotion => (
                <EmotionButton
                  defaultStyle={false}
                  label={emotion}
                  className='text-lg px-3 py-1.5 rounded-full'
                />
              ))
              : null
          }

        </div>

        <hr className='p-0 mb-4 w-full bg-white' />

        <div className='mb-8'>
          <WaveSurferPlayer
            height={100}
            waveColor={"#e1e1e1"}
            progressColor={"rgba(112, 112, 112, 0.5)"}
            url={AudioData}
            cursorWidth={3}
            cursorColor="rgb(255, 255, 255)"
          />
        </div>

        <div className='w-1/3'>
          <DownloadButton src={TestMusic} whitemode={false} />
        </div>

      </div>

      {/* 右 */}
      <div className='w-5/12 p-8'>

        <div className='mt-8 select-none'>
          <h1 className='text-4xl font-bold mb-4'> 文章呈現 </h1>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 bg-slate-100 rounded-lg drop-shadow-lg  outline-0 text-black'
            spellCheck={false}
            // value={articleData?.content}
            value={"好玩"}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Collect