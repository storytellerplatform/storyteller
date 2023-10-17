import React, { useRef, useState } from 'react'
// import EmotionButton from './EmotionButton'
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi'

import TestImage from '../assets/music-bg-test.jpg'
import TestMusic from '../assets/music/NCSBlank.mp3'
import EmotionButton from './EmotionButton'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'
import { EmotionProps } from '../types/components'

interface CollectCardProps {
  articleId: string;
  emotionId: string;
  emotions: Array<EmotionProps> | null;
  createDate: Date;
}

const CollectCard: React.FC<CollectCardProps> = ({ articleId, emotionId, emotions, createDate }) => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigte = useNavigate();

  let gridClass: string = "grid-cols-3";

  if (!emotions) {
    gridClass = "";
  } else if (emotions.length >= 3) {
    gridClass = "grid-cols-3";
  } else if (emotions.length === 2) {
    gridClass = "grid-cols-2";
  } else {
    gridClass = "grid-cols-1";
  }


  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  return (
    <div className='flex justify-between w-full p-4 items-center border border-y-orange-200 border-x-white'>

      {play ?
        <BiPauseCircle onClick={toggleAudio} size={36} className='text-orange-300 cursor-pointer' />
        :
        <BiPlayCircle onClick={toggleAudio} size={36} className='text-orange-300 cursor-pointer' />
      }
      <audio ref={audioRef} src={TestMusic} />

      <img
        className='w-1/6 rounded-md cursor-pointer'
        onClick={() => navigte(`/collection/${articleId}/${emotionId}`)}
        src={TestImage}
        alt="Music"
      />

      <h1
        className='py-6 text-gray-600 text-lg font-bold cursor-pointer'
        onClick={() => navigte(`/collection/${articleId}/${emotionId}`)}
      >
        purpose
      </h1>

      <div className={`grid ${gridClass} gap-y-1 text-xl font-semibold`}>
        {emotions ? emotions.map((emotion) => {
          return <EmotionButton
            label={emotion}
            defaultStyle={false}
            className='px-3 py-1.5 rounded-full text-base'
          />
        })
          : "無"
        }

        {/*
        <EmotionButton label={'開心'} defaultStyle={false} className='px-3 py-1.5 rounded-full text-base' /> */}
      </div>

      <span className='font-bold font-mono'>{createDate.toString().split('T')[0]}</span>

      <DownloadButton src={TestMusic} />
    </div>
  )
}

export default CollectCard