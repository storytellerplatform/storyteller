import React, { useEffect } from 'react'
import CollectCard from '../../components/CollectCard'
import { useLazyGetAllArticlesQuery } from '../../feature/api/userSlice';
import { useAppSelector } from '../../app/hooks';
import { getUserId } from '../../feature/user/userSlice';
import { Article } from '../../types/articles';
import CollectionDropdown from './components/CollectionDropdown';
import CollectionSearch from './components/CollectionSearch';
import { allEmotions } from '../../utils/emotionConfig';
import { serverErrorNotify } from '../../utils/toast';
import { GetAllArticlesResponse } from '../../types/api/user';
import { Audio } from '../../types/audio';

interface CollectCardProps extends Article {
  audioBlobList?: Array<Audio>
}

const Collection = () => {
  const [collectCards, setCollectCards] = React.useState<Array<CollectCardProps>>([]);

  const userId: string = useAppSelector(getUserId);

  const [triggerGetAllArticles, allArticlesResult] = useLazyGetAllArticlesQuery();

  React.useEffect(() => {
    const getArticle = async () => {
      await triggerGetAllArticles(Number(userId));
    }

    if (userId !== "0") {
      getArticle();
    }
  }, [triggerGetAllArticles, userId]);

  const { data: allArticles } = allArticlesResult;


  function isArrayOfTypeAudio(arr: Array<Audio | null>): arr is Array<Audio> {
    if (!Array.isArray(arr)) {
      return false;
    }

    const isAllAudioType = arr.every(audio => audio !== null && typeof audio === 'object');
    return isAllAudioType;
  }

  useEffect(() => {
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
                const response = await fetch(`http://localhost:8080/api/v1/audio/${audioId}`);
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
    }

    if (allArticles) {
      fetchAudioData(allArticles);
    }
  }, [allArticles])

  return (
    <div className='flex flex-col h-screen w-full gap-3 pt-16 sm:pt-0'>

      <div className='flex pt-4 pb-2 ml-2 sm:ml-16 rounded-lg md:w-auto flex-col md:flex-row md:justify-evenly pl-6 md:pl-0 gap-4 md:gap-0'>
        {/*搜尋名稱 */}
        <div className='w-full md:w-[23%]'>
          <CollectionSearch name='搜尋名稱' />
        </div>

        {/* 搜尋情緒 */}
        <div className='w-full md:w-[23%]'>
          <CollectionDropdown name='搜尋情緒' dropdownList={allEmotions} />
        </div>

        {/* 搜尋情境 */}
        <div className='w-full md:w-[23%]'>
          <CollectionDropdown name='搜尋情境' />
        </div>

        {/* 改變日期先後 */}
        <div className='w-full md:w-[23%]'>
          <CollectionDropdown name='日期順序' isAngleIconShow={false} />
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
                <CollectCard
                  articleId={article.articleId}
                  name={article.name}
                  emotions={article.emotions}
                  createDate={article.createdDate}
                  audioBlob={audio.audioBlob}
                  audioId={audio.audioId}
                />
              )
            })
          })}
        </div>
      </div>
    </div >
  )
}

export default Collection