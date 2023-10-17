import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import { useGetArticleQuery } from '../../feature/api/articleSlice';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';

import AudioData from '../../assets/music/NCSBlank.mp3';

const Collect = () => {
  const { articleId, emotionId } = useParams();

  const { data: articleData } = useGetArticleQuery(Number(articleId));

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  }, []);

  return (
    <div className='flex justify-around'>
      {/* 左 */}
      <div className='w-7/12 p-5'>
        <h1 className='text-6xl font-extrabold mb-6'> purpose </h1>
        <div className='flex w-full mb-4 select-none'>
          {/* 還要對上 emotionId */}
          {articleData?.emotions && articleData?.emotions.length > 0 &&
            articleData?.emotions.find(emotion => emotion.emotionId === Number(emotionId))?.emotions.map((emotion) => {
              return <EmotionButton
                defaultStyle={false}
                label={emotion}
                className='text-lg px-3 py-1.5 rounded-full'
              />
            })}
        </div>

        <WaveSurferPlayer
          height={100}
          waveColor="rgb(255, 189, 67)"
          progressColor="rgb(159, 157, 149)"
          url={AudioData}
        />
      </div>


      {/* 右 */}
      <div className='w-4/12'></div>
    </div>
  )
}

export default Collect