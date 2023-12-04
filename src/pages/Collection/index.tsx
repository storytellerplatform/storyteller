import React from 'react'
import CollectCard from '../../components/CollectCard'
import { useGetAllArticlesQuery, useLazyGetAllArticlesQuery } from '../../feature/api/userSlice';
import { useAppSelector } from '../../app/hooks';
import { getUserId } from '../../feature/user/userSlice';
import { Article } from '../../types/articles';
import CollectionDropdown from './components/CollectionDropdown';
import CollectionSearch from './components/CollectionSearch';
import { allEmotions } from '../../utils/emotionConfig';

const testArticles: Array<Article> = [
  {
    articleId: 1,
    name: "讚喔",
    content: "今天天氣不錯",
    emotions: [
      {
        emotionId: 1,
        emotions: ["喜歡"]
      }
    ],
    createdDate: "2023-12-15",
  }
]

const Collection = () => {
  const [articles, setArticles] = React.useState<Array<Article>>([]);

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

  React.useEffect(() => {
    setArticles(allArticles || []);
  }, [allArticles]);

  console.log(articles.length);

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
      <div className='flex flex-col flex-wrap pt-6 items-center w-full h-screen bg-slate-100'>
        {/* table */}
        <div className='w-full sm:w-4/5 bg-white'>
          {/* 收藏 */}
          {articles.length !== 0 && articles.map(article => {
            return article.emotions.map((emotion, index) => {
              return (
                <CollectCard
                  key={`${article.articleId}_${emotion.emotionId}_${index}`} // 
                  name={article.name}
                  articleId={article.articleId.toString()}
                  emotionId={emotion.emotionId.toString()}
                  emotions={emotion.emotions}
                  createDate={article.createdDate}
                />
              );
            });
          })}
        </div>
      </div>
    </div >
  )
}

export default Collection