import React, { Suspense, lazy, memo } from 'react'
import { HiDownload } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';

// test
import TestMusic from '../../../assets/music/NCSBlank.mp3'

const LazyWaveSurferPlayerComponent = lazy(() => import('../../../components/WaveSurferPlayer'));

const MusicPost: React.FC = () => {
  const handleCollectClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  };

  return (
    <div className='flex items-center justify-between pb-4 border-b-2 border-slate-200'>
      <div className='w-4/5'>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyWaveSurferPlayerComponent
            height={80}
            waveColor={"#e1e1e1"}
            barWidth={4}
            barRadius={4}
            progressColor={"rgba(112, 112, 112, 0.8)"}
            hideScrollbar={true}
            url={TestMusic}
            playbtnStyle='light'
          />
        </Suspense>
      </div>

      <div>
        <button
          type='button'
          onClick={handleCollectClick}
          className='p-2 rounded-full cursor-pointer hover:bg-slate-100 hover:text-rose-400'
        >
          <FaRegHeart size={24} />
        </button>

        <button type='button' className='p-2 rounded-full cursor-pointer hover:bg-slate-100 hover:text-slate-600'>
          <a href={TestMusic} download>
            <HiDownload size={24} />
          </a>
        </button>
      </div>
    </div>
  )
}

export default memo(MusicPost);