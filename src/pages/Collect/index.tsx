import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import { useGetArticleQuery } from '../../feature/api/articleSlice';

import DownloadButton from '../../components/DownloadButton';
import { serverErrorNotify } from '../../utils/toast';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';
import { useAppSelector } from '../../app/hooks';
import { getToken } from '../../feature/auth/authSlice';

const Collect = () => {
  const { articleId, audioId } = useParams();
  const userToken = useAppSelector(getToken);

  useEffect(() => {
    if (!articleId || !audioId) {
      serverErrorNotify("????");
    };
  }, [articleId, audioId])

  const [audioBlob, setAudioBlob] = useState<Blob | null>();

  const { data: articleData } = useGetArticleQuery(Number(articleId));

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/audio/${audioId}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });

        if (response.status !== 200) {
          serverErrorNotify("GET 音檔 API 發生錯誤");
          return null;
        }

        const Data = await response.blob();
        setAudioBlob(Data);
      } catch (err) {
        serverErrorNotify("伺服器發生錯誤 " + err);
        return null;
      }
    };

    fetchAudio();
  }, [audioId]);

  return (
    <div className='flex w-full'>
      {/* 左 */}
      <div className='flex flex-col gap-8 w-7/12 ml-4 pl-20 h-auto min-h-screen p-5 bg-gradient-to-r from-slate-600 to-slate-800 backdrop-blur-lg '>

        <input
          // 增加修改文章的 API
          // onChange={(e) => setName(e.target.value)}
          value={articleData?.name}
          className='w-1/2 text-5xl font-extrabold text-white bg-transparent mt-6 focus-visible:outline-none'
        />

        {/* 對上 emotionId */}
        {/* 確認 emotions 內 是否有 emotions 如果沒有就回傳 null */}
        {
          articleData?.emotions && articleData.emotions.length > 0 ? (
            <div className='flex w-full select-none'>
              {
                articleData.emotions.map(emotion => (
                  <EmotionButton
                    defaultStyle={false}
                    label={emotion}
                    className='text-lg px-5 py-1.5 rounded-full'
                  />
                ))
              }
            </div>
          )
            : null
        }

        <hr className='p-0 mb-4 w-11/12 bg-white' />

        {
          audioBlob &&
          (
            <div className='mb-8 w-5/6'>
              <WaveSurferPlayer
                height={80}
                waveColor={"#e1e1e1"}
                barWidth={4}
                barRadius={4}
                progressColor={"rgba(32, 31, 31, 0.5)"}
                hideScrollbar={true}
                data={audioBlob}
                playbtnStyle='dark'
              />
            </div>
          )
        }

        <div className='w-1/4'>
          {
            audioBlob &&
            (
              <DownloadButton blobData={audioBlob} fileName={articleData?.name || '說書人音樂'} whitemode={false} />
            )
          }
        </div>

      </div>

      {/* 右 */}
      <div className='w-5/12 p-8 bg-slate-800'>

        <div className='mt-8'>
          <h1 className='text-4xl font-bold mb-4 text-slate-50'> 文章 </h1>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 bg-slate-200 rounded-lg drop-shadow-lg font-bold outline-0 text-black'
            spellCheck={false}
            cols={40}
            value={articleData?.content}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Collect