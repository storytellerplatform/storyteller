import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import { useGetArticleQuery } from '../../feature/api/articleSlice';

import DownloadButton from '../../components/DownloadButton';
import { serverErrorNotify } from '../../utils/toast';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';
import { useAppSelector } from '../../app/hooks';
import { getToken } from '../../feature/auth/authSlice';
import { createEmotionDicVer, getMusic } from '../../api';
import LoadingPage from '../Loading';
import { MoodAnaApiReq } from '../../types/api/moodAna';
import { CircularProgress } from '@mui/material';

const Collect = () => {
  const { articleId, audioId } = useParams();
  const userToken = useAppSelector(getToken);

  const [audioBlob, setAudioBlob] = useState<Blob | null>();
  const [emotionsDic, setEmotionsDic] = React.useState<Array<Array<string>>>([]);
  const [audioLoading, setAudioLoading] = React.useState<boolean>(false);

  const { data: articleData, isLoading: isGetArticleLoading } = useGetArticleQuery(Number(articleId));

  useEffect(() => {
    const fetchAudio = async (audioId: number, userToken: string) => {
      setAudioLoading(true);

      try {
        const response = await getMusic(audioId, userToken);

        if (response.status !== 200) {
          serverErrorNotify("GET 音檔 API 發生錯誤");
          return null;
        }

        setAudioBlob(response.data);
      } catch (err) {
        serverErrorNotify("伺服器發生錯誤 " + err);
        return null;
      } finally {
        setAudioLoading(false);
      }
    };

    if (audioId !== undefined && userToken !== null) {
      fetchAudio(parseInt(audioId), userToken);
    }

  }, [audioId, userToken]);

  React.useEffect(() => {
    const fetchEmoDic = async () => {
      try {
        const moodAnaApiReq: MoodAnaApiReq = {
          TestData: articleData?.content || "",
        };

        const response = await createEmotionDicVer(moodAnaApiReq);
        setEmotionsDic(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEmoDic();

  }, [articleData?.content])

  if (isGetArticleLoading) {
    return <LoadingPage />
  }

  return (
    <div className='flex w-full flex-col sm:flex-row'>

      <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-notes-image bg-center bg-cover pt-12 -z-10'></div>

      <div className='fixed left-0 top-0 w-auto min-w-full h-auto min-h-full bg-black opacity-50 -z-10'></div>

      {/* 左 */}
      {/* bg-gradient-to-r from-slate-600 to-slate-800 backdrop-blur-lg */}
      <div className='flex flex-col gap-8 w-full sm:w-7/12 mt-20 sm:mt-0 ml-4 pl-4 sm:pl-20 sm:h-auto sm:min-h-screen p-5'>
        <input
          // 增加修改文章的 API
          // onChange={(e) => setName(e.target.value)}
          value={articleData?.name}
          className='w-full sm:w-10/12 text-5xl font-extrabold text-white bg-transparent mt-6 focus-visible:outline-none'
        />

        {/* 對上 emotionId */}
        {/* 確認 emotions 內 是否有 emotions 如果沒有就回傳 null */}
        {
          articleData?.emotions && articleData.emotions.length > 0 && (
            <div className='flex w-full select-none'>
              {
                articleData.emotions.map((emotion, index) => (
                  <EmotionButton
                    key={index}
                    defaultStyle={false}
                    label={emotion}
                    className='text-lg px-5 py-1.5 rounded-full'
                  />
                ))
              }

              {
                emotionsDic.map((emotion, index) => [
                  <EmotionButton
                    key={index}
                    other={emotion[1]}
                    className='text-lg px-5 py-1.5 rounded-full'
                    defaultStyle={false}
                  />
                ])
              }
            </div>
          )
        }

        <hr className='p-0 mb-4 w-11/12 bg-white' />

        {
          !audioLoading ?
            <>
              {audioBlob &&
                (
                  <div className='mb-8 w-5/6'>
                    <WaveSurferPlayer
                      height={80}
                      waveColor={"#e1e1e1"}
                      barWidth={4}
                      barRadius={4}
                      progressColor={"rgba(199, 199, 199, 0.5)"}
                      hideScrollbar={true}
                      data={audioBlob}
                      playbtnStyle='dark'
                    />
                  </div>
                )}
            </>
            :
            <div className='w-full text-white items-center justify-center p-6'>
              <CircularProgress color='inherit' thickness={5} />
            </div>
        }

        <div className='w-10/12 sm:w-1/2 md:w-1/3 lg:w-1/4'>
          {
            audioBlob &&
            (
              <DownloadButton classnames='py-4 gap-2' blobData={audioBlob} fileName={articleData?.name || '說書人音樂'} whitemode={false} />
            )
          }
        </div>

      </div>

      {/* 右 */}
      <div className='w-full sm:w-5/12 p-8'>
        <div className='mt-4'>
          <h1 className='text-4xl font-bold mb-4 text-slate-50'> 文章 </h1>
          <textarea
            className='h-32 sm:h-96 w-full mb-4 p-2 px-4 bg-slate-200 rounded-lg drop-shadow-lg font-bold outline-0 text-black'
            spellCheck={false}
            cols={64}
            value={articleData?.content}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default Collect