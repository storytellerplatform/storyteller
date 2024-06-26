import React, { Suspense, lazy, memo, useState } from 'react'
import { HiDownload } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';

import { serverErrorNotify, successNotification } from '../../../utils/toast';
import { useAppSelector } from '../../../app/hooks';
import { getToken } from '../../../feature/auth/authSlice';
import classNames from 'classnames';
import Spinner from '../../../components/Spinner';
import { handleDownload } from '../../../utils/handleClick';
import { deleteMusic } from '../../../api';

const LazyWaveSurferPlayerComponent = lazy(() => import('../../../components/WaveSurferPlayer'));

interface MusicPostProps {
  name: string;
  audioBlob: Blob;
  articleId: Number;
};

const MusicPost: React.FC<MusicPostProps> = ({ name, audioBlob, articleId }) => {
  const token = useAppSelector(getToken);
  const [success, setSuccess] = useState<boolean>(false);
  const [audioId, setAudioId] = useState<number | null>(null);
  const [heartLoading, setHeartLoading] = useState<boolean>(false);
  const SERVER_URL = process.env.REACT_APP_SERVER_ENDPOINT;

  const handleCollectClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setHeartLoading(true);

    if (audioId !== null && token !== null) {
      try {
        await deleteMusic(audioId, token);
      } catch (e) {
        serverErrorNotify("伺服器發生錯誤");
        console.error(e);
      } finally {
        setSuccess(false);
        setAudioId(null);
        setHeartLoading(false);
        console.log('delete audio!');
        return;
      };
    }

    try {
      const file = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });

      const formData = new FormData();
      formData.append('audio', file);

      const res = await fetch(`${SERVER_URL}/article/collect/${articleId}`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (res.status === 200) {
        const data = await res.json();
        const currAudioId: number = data.newestAudioId;
        setSuccess(true);
        successNotification('音樂收藏成功!');
        setAudioId(currAudioId);
      } else {
        console.log(await res.json());
        serverErrorNotify("伺服器發生錯誤");
      }

    } catch (e) {
      serverErrorNotify("伺服器發生錯誤");
      console.log(e);
    } finally {
      setHeartLoading(false);
    };

  };

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
          onClick={handleCollectClick}
          className={classNames(`flex items-center justify-center ml-2 p-2 rounded-full cursor-pointer hover:bg-slate-100 hover:text-rose-400`,
            { 'text-rose-400': success })}
        >
          {
            !heartLoading ? (
              <FaRegHeart size={24} />
            ) : (
              <Spinner
                width='w-5'
                height='h-5'
                spinnerText='text-rose-400'
                hoverColor='hover:text-rose-500'
                size={20}
                thickness={5}
              />
            )
          }
        </button>

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