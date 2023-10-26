import React from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import { useGetArticleQuery } from '../../feature/api/articleSlice';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';

import AudioData from '../../assets/music/NCSBlank.mp3';
import { EmotionProps } from '../../types/components';

const Collect = () => {
  const { articleId, emotionId } = useParams();

  const { data: articleData } = useGetArticleQuery(Number(articleId));

  // const findEmotionsInArticle = (emotionId: number) => {
  //   if (!articleData?.emotions || articleData?.emotions.length === 0) return null;
  //   return articleData?.emotions.find(emotion => emotion.emotionId === Number(emotionId))?.emotions;
  // };

  return (
    <div className='flex justify-around'>
      {/* 左 */}
      <div className='w-7/12 p-5'>
        <h1 className='text-6xl font-extrabold mb-6'> purpose </h1>
        <div className='flex w-full mb-4 select-none'>

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

        <WaveSurferPlayer
          height={100}
          waveColor={["rgb(255, 189, 67)", "rgba(255, 237, 98, 0.8)"]}
          progressColor={["rgb(169, 115, 14)", "rgba(247, 241, 191, 0.8)"]}
          url={AudioData}
          cursorWidth={3}
          cursorColor="rgb(250, 204, 120)"
        />

        <div className='mt-8 select-none'>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 border border-gray-400 rounded-lg drop-shadow-lg focus:border-orange-300 focus:drop-shadow-lg outline-0'
            spellCheck={false}
            value={articleData?.content}
            readOnly
          ></textarea>
        </div>
      </div>


      {/* 右 */}
      <div className='w-4/12'></div>
    </div>
  )
}

export default Collect