import React, { useEffect, useRef, useState } from 'react'
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi'

import EmotionButton from './EmotionButton'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'
import { EmotionProps } from '../types/components'

interface CollectCardProps {
  articleId: Number;
  name: string;
  emotions: Array<EmotionProps> | null;
  createDate: string;
  audioBlob: Blob;
  audioId: Number;
  play?: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setAudioData: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const CollectCard: React.FC<CollectCardProps> = ({ articleId, name, emotions, createDate, audioBlob, audioId, play, setPlay, setAudioData }) => {
  // const [play, setPlay] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const toggleAudio = () => {
    if (!play) {
      setAudioData(audioBlob);
    }

    setPlay((preState) => !preState);
  };

  // function toggleAudio(): void {
  //   if (play) {
  //     audioRef.current?.pause();
  //     setPlay(false);
  //   } else {
  //     void audioRef.current?.play();
  //     setPlay(true);
  //   }
  // }

  // useEffect(() => {
  //   if (audioBlob && audioRef.current) {
  //     audioRef.current.src = URL.createObjectURL(audioBlob);
  //     audioRef.current.load();
  //   }
  // }, [audioBlob])

  return (
    <div className='grid grid-cols-5 gap-6 mb-8 w-full p-4 items-center border border-white bg-white min-w-[12rem]'>

      <BiPlayCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />

      {/* {play ?
        <BiPauseCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
        :
        <BiPlayCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
      } */}
      {/* <audio ref={audioRef} /> */}

      <div
        className='py-6'
        onClick={() => navigate(`/collection/${articleId}/${audioId}`)}
      >
        <h3 className='w-fit text-gray-600 text-lg font-bold cursor-pointer'>
          {name}
        </h3>
      </div>

      <div className={`grid grid-cols-1 gap-y-1 text-xl font-semibold lg:grid-cols-2`}>
        {emotions ? emotions.map((emotion, index) => {
          return <EmotionButton
            key={index}
            label={emotion}
            defaultStyle={false}
            className='px-4 py-1 rounded-full text-sm'
          />
        })
          : <span className='px-3 w-16'>無</span>
        }
      </div>

      <span className='font-bold font-mono hidden md:block'>{createDate}</span>

      <div className='w-1/10'>
        <DownloadButton fileName={name} blobData={audioBlob} whitemode={true} />
      </div>

    </div>
  )
}

export default CollectCard