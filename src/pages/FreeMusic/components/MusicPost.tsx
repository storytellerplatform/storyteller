import React, { Suspense, lazy, memo } from 'react'
import { HiDownload } from 'react-icons/hi';
import Spinner from '../../../components/Spinner';
import { handleDownload } from '../../../utils/handleClick';

const LazyWaveSurferPlayerComponent = lazy(() => import('../../../components/WaveSurferPlayer'));

interface MusicPostProps {
  name: string;
  audioBlob: Blob;
};

const MusicPost: React.FC<MusicPostProps> = ({ name, audioBlob }) => {
  return (
    <div className='flex items-center justify-between pb-4 border-b-2 border-slate-200'>
      <div className='w-4/5'>
        <Suspense fallback={<Spinner />}>
          <LazyWaveSurferPlayerComponent
            height={80}
            waveColor={"#e1e1e1"}
            barWidth={4}
            barRadius={4}
            progressColor={"rgba(112, 112, 112, 0.8)"}
            hideScrollbar={true}
            data={audioBlob}
            playbtnStyle='light'
          />
        </Suspense>
      </div>

      <div className='flex'>
        <button
          type='button'
          onClick={() => handleDownload(audioBlob, name)}
          className='p-2 rounded-full cursor-pointer hover:bg-slate-100 hover:text-slate-600'
        >
          <HiDownload size={24} />
        </button>
      </div>
    </div>
  )
}

export default memo(MusicPost);