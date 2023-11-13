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
  const navigate = useNavigate();

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
    <div className='fixed flex justify-between w-full sm:w-10/12 lg:w-9/12 p-4 items-center border border-white bg-white min-w-[12rem]'>

      {play ?
        <BiPauseCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
        :
        <BiPlayCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
      }
      <audio ref={audioRef} src={TestMusic} />

      <img
        className='w-1/6 rounded-md cursor-pointer'
        onClick={() => navigate(`/collection/${articleId}/${emotionId}`)}
        src={TestImage}
        alt="Music"
      />

      <h1
        className='py-6 text-gray-600 text-lg font-bold cursor-pointer'
        onClick={() => navigate(`/collection/${articleId}/${emotionId}`)}
      >
        名稱
      </h1>

      <div className={`grid grid-cols-1 gap-y-1 text-xl font-semibold lg:grid-cols-2`}>
        {emotions ? emotions.map((emotion) => {
          return <EmotionButton
            label={emotion}
            defaultStyle={false}
            className='px-4 py-1 rounded-full text-sm'
          />
        })
          : <span className='px-3 w-16'>無</span>
        }
      </div>

      {/* <span className='font-bold font-mono'>{createDate.toString().split('T')[0]}</span> */}
      <span className='font-bold font-mono hidden md:block'>{createDate.toDateString()}</span>

      <div className='w-1/10'>
        <DownloadButton src={TestMusic} whitemode={true} />
      </div>
    </div>
  )
}

export default CollectCard