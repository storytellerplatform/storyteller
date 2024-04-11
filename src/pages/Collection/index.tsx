import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import CollectCard from '../../components/CollectCard'
import { useLazyGetAllArticlesQuery } from '../../feature/api/userSlice';
import { useAppSelector } from '../../app/hooks';
import { getUserId } from '../../feature/user/userSlice';
import { Article } from '../../types/articles';
import CollectionSearch from './components/CollectionSearch';
import { allEmotions } from '../../utils/emotionConfig';
import { serverErrorNotify } from '../../utils/toast';
import { GetAllArticlesResponse } from '../../types/api/user';
import { Audio } from '../../types/audio';
import { getToken } from '../../feature/auth/authSlice';
import { SortDataType, useLazySearchByEmotionQuery, useLazySearchByNameQuery, useLazySortByCreatedDateQuery } from '../../feature/api/articleSlice';
import { EmotionProps } from '../../types/components';
import { emotionNumTransfer } from '../../utils/emotionTransfer';
import EmotionDropDown from './components/EmotionDropDown';
import CollectionDropdown from './components/CollectionDropdown';
import DateSort from './components/DateSort';
import WaveSurferPlayer from '../../components/WaveSurferPlayer';
import useWavesurfer from '../../hooks/useWavesurfer';
import { BiPlayCircle } from 'react-icons/bi';

interface CollectCardProps extends Article {
  audioBlobList?: Array<Audio>
}

enum QueryType {
  ALL = 'all',
  SEARCH = 'search',
  EMOTION = 'emotion',
  DATE = 'DATE',
}

const Collection = () => {
  const collectCardId = useId();
  const userId: string = useAppSelector(getUserId);
  const userToken = useAppSelector(getToken);
  const SERVER_URL = process.env.REACT_APP_SERVER_ENDPOINT;

  const [search, setSearch] = useState<string>("");
  const [queryType, setQueryType] = useState<QueryType>(QueryType.ALL);
  const [collectCards, setCollectCards] = React.useState<Array<CollectCardProps>>([]);
  const [searchEmotion, setSearchEmotion] = React.useState<EmotionProps>("無");
  const [sortDate, setSortDate] = React.useState<SortDataType>(SortDataType.DESC);
  const [isArticlesLoading, setIsArticlesLoading] = React.useState<boolean>(true);
  const [play, setPlay] = React.useState<boolean>(false);
  const [audioData, setAudioData] = React.useState<Blob | null>(null);

  const [triggerGetAllArticles, allArticlesResult] = useLazyGetAllArticlesQuery();
  const [triggerSearchByName, searchByNameResult] = useLazySearchByNameQuery();
  const [triggerSearchByEmotion, searchByEmotionResult] = useLazySearchByEmotionQuery();
  const [triggerSortDate, sortDateResult] = useLazySortByCreatedDateQuery();

  const footerRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useWavesurfer(footerRef,
    {},
    audioData
  );

  const togglePlayClick = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])


  React.useEffect(() => {
    const getArticle = async () => {
      await triggerGetAllArticles(Number(userId));
    }

    if (userId !== "0" && !search) {
      getArticle();
    }
  }, [triggerGetAllArticles, userId, search]);

  const { data: allArticles } = allArticlesResult;
  const { data: searchNResult } = searchByNameResult;
  const { data: searchEResult } = searchByEmotionResult;
  const { data: searchDResult } = sortDateResult;

  /**
   * 處理按键按下事件。
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 鍵盤事件對象
   * 如果按下的键是 'Enter'，觸發搜索功能。
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearchByName({
        userId: Number(userId),
        search
      });
    }

    setQueryType(QueryType.SEARCH);
  }, [search, triggerSearchByName, userId]);


  /**
   * 處理滑鼠按下事件。
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - 鍵盤事件對象
   * 如果按下情緒後，觸發搜索功能。
   */
  const handleEmotionClick = (e: React.MouseEvent<HTMLDivElement>, emotionName: EmotionProps) => {
    e.preventDefault();
    if (emotionName === "無") {
      setSearchEmotion(emotionName);
      setQueryType(QueryType.ALL);
    } else {
      triggerSearchByEmotion({ userId: Number(userId), emotion: emotionNumTransfer(emotionName) });
      setSearchEmotion(emotionName);
      setQueryType(QueryType.EMOTION);
      setIsArticlesLoading(true);
    }
  }

  /**
   * 處理滑鼠按下事件。
   * 如果按下按鈕後，觸發日期排序功能。
   */
  const handleSortDateClick = () => {
    setSortDate(pervSortDate => {
      if (pervSortDate === SortDataType.ASC) return SortDataType.DESC;
      else return SortDataType.ASC;
    });
    triggerSortDate({ userId: Number(userId), sort: sortDate });
    setIsArticlesLoading(true);
  };

  function isArrayOfTypeAudio(arr: Array<Audio | null>): arr is Array<Audio> {
    if (!Array.isArray(arr)) {
      return false;
    }

    const isAllAudioType = arr.every(audio => audio !== null && typeof audio === 'object');
    return isAllAudioType;
  }

  useEffect(() => {
    setIsArticlesLoading(true);
    const fetchAudioData = async (allArticles: GetAllArticlesResponse) => {
      const collectCardsData: Array<CollectCardProps> = await Promise.all(
        allArticles.map(async (article) => {
          const { articleId, name, content, emotions, createdDate, newestAudioId, allAudioIds } = article;

          if (!allAudioIds) return {
            articleId,
            name,
            content,
            emotions,
            createdDate,
            allAudioIds,
            newestAudioId,
            audioBlobList: []
          };

          const audioBlobList: Array<Audio | null> = await Promise.all(
            allAudioIds.map(async (audioId: Number) => {
              try {
                const response = await fetch(`${SERVER_URL}/audio/${audioId}`, {
                  headers: {
                    'Authorization': `Bearer ${userToken}`,
                  }
                });
                if (response.status !== 200) {
                  serverErrorNotify("GET 音檔 API 發生錯誤");
                  return null;
                }
                const audioBlob = await response.blob();
                return {
                  audioId,
                  audioBlob
                }
              } catch (err) {
                serverErrorNotify("伺服器發生錯誤 " + err);
                return null;
              }
            })
          );

          if (isArrayOfTypeAudio(audioBlobList)) {
            return {
              articleId,
              name,
              content,
              emotions,
              createdDate,
              allAudioIds,
              newestAudioId,
              audioBlobList
            };
          } else {
            return {
              articleId,
              name,
              content,
              emotions,
              createdDate,
              allAudioIds,
              newestAudioId,
              audioBlobList: []
            };
          }
        })
      );

      setCollectCards(collectCardsData);
      setIsArticlesLoading(false);
    }

    if (allArticles && userToken && queryType === QueryType.ALL) {
      fetchAudioData(allArticles);
    } else if (searchNResult && userToken && queryType === QueryType.SEARCH) {
      fetchAudioData(searchNResult);
    } else if (searchEResult && userToken && queryType === QueryType.EMOTION) {
      fetchAudioData(searchEResult);
    } else if (searchDResult && userToken && queryType === QueryType.DATE) {
      fetchAudioData(searchDResult);
    }
  }, [allArticles, queryType, searchNResult, searchEResult, searchDResult, userToken, SERVER_URL])

  useEffect(() => {
    if (!wavesurfer) return

    const subscriptions = [
      wavesurfer.on('play', () => setPlay(true)),
      wavesurfer.on('pause', () => setPlay(false)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <div className='flex flex-col h-screen w-full gap-3 pt-16 sm:pt-0'>

      <div className='flex pt-4 pb-2 ml-2 sm:ml-16 rounded-lg md:w-auto flex-col md:flex-row md:justify-evenly pl-6 md:pl-0 gap-4 md:gap-0'>
        {/*搜尋名稱 */}
        <div className='w-full md:w-[21%]'>
          <CollectionSearch handleKeyDown={handleKeyDown} search={search} setSearch={setSearch} />
        </div>

        {/* 搜尋情緒 */}
        <div className='w-full md:w-[21%]'>
          <EmotionDropDown name={searchEmotion} dropdownList={allEmotions} handleClick={handleEmotionClick} />
        </div>

        {/* 搜尋情境 */}
        <div className='w-full md:w-[21%]'>
          <CollectionDropdown handleClick={() => { }} name='搜尋情境' />
        </div>

        {/* 改變日期先後 */}
        <div className='w-full md:w-[21%]'>
          <DateSort handleClick={handleSortDateClick} />
        </div>
      </div>

      {/* 收藏區 */}
      <div className='flex flex-col pt-6 items-center w-full h-screen bg-slate-100'>
        {/* table */}
        <div className='flex flex-col w-full sm:w-4/5 bg-slate-100'>
          {/* 收藏 */}
          {collectCards.length !== 0 && collectCards.map(article => {
            return article.audioBlobList?.map((audio: Audio) => {
              return (
                !isArticlesLoading ? (
                  <CollectCard
                    key={collectCardId}
                    articleId={article.articleId}
                    name={article.name}
                    emotions={article.emotions}
                    createDate={article.createdDate}
                    audioBlob={audio.audioBlob}
                    audioId={audio.audioId}
                    play={play}
                    setPlay={setPlay}
                    setAudioData={setAudioData}
                  />
                ) : (
                  <div>
                    <div className='grid grid-cols-5 gap-6 mb-8 w-full px-4 py-8 items-center border border-white bg-gray-200 rounded-lg min-w-[12rem] animate-pulse'>
                      {/* 加載時的骨架結構 */}
                      <div className='bg-gray-300 h-10 w-10 rounded-full'></div>
                      <div className='bg-gray-300 h-8 w-16 rounded'></div>
                      <div className='flex gap-2 h-fit w-fit'>
                        <div className='bg-gray-300 h-8 w-16 rounded'></div>
                        <div className='bg-gray-300 h-8 w-16 rounded'></div>
                      </div>
                      <div className='bg-gray-300 h-8 w-24 rounded'></div>
                      <div className='bg-gray-300 h-10 w-full rounded'></div>
                    </div>
                    <div className='grid grid-cols-5 gap-6 mb-8 w-full px-4 py-8 items-center border border-white bg-gray-200 rounded-lg min-w-[12rem] animate-pulse'>
                      {/* 加載時的骨架結構 */}
                      <div className='bg-gray-300 h-10 w-10 rounded-full'></div>
                      <div className='bg-gray-300 h-8 w-16 rounded'></div>
                      <div className='flex gap-2 h-fit w-fit'>
                        <div className='bg-gray-300 h-8 w-16 rounded'></div>
                        <div className='bg-gray-300 h-8 w-16 rounded'></div>
                      </div>
                      <div className='bg-gray-300 h-8 w-24 rounded'></div>
                      <div className='bg-gray-300 h-10 w-full rounded'></div>
                    </div>
                  </div>
                )
              )
            })
          })}
        </div>
      </div>

      {audioData &&
        <footer className='w-full pl-24 pb-6 pr-16 pt-2'>
          <BiPlayCircle
            onClick={togglePlayClick}
            size={36}
            className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60'
          />
          <div ref={footerRef}></div>
          {/* <WaveSurferPlayer
            height={60}
            waveColor={"#e1e1e1"}
            barWidth={4}
            barRadius={4}
            progressColor={"rgba(112, 112, 112, 0.8)"}
            hideScrollbar={true}
            data={audioData}
            playbtnStyle='light'
          /> */}
        </footer>
      }
    </div >
  )
}

export default Collection