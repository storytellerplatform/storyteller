import React, { useEffect } from 'react'
import CollectCard from '../../components/CollectCard'
import { useGetAllArticlesQuery } from '../../feature/api/userSlice';
import { useAppSelector } from '../../app/hooks';
import { getUserId } from '../../feature/user/userSlice';
import { Article } from '../../types/article';
import CollectionDropdown from './components/CollectionDropdown';
import CollectionSearch from './components/CollectionSearch';
import { allEmotions } from '../../utils/emotion';

const testArticles: Array<Article> = [
  {
    articleId: 1,
    content: "今天天氣不錯",
    purpose: "名稱",
    emotions: [
      {
        emotionId: 1,
        emotions: ["開心"]
      }
    ],
    createdDate: new Date(Date.now()),
  }
]

const Collection = () => {
  const [articles, setArticles] = React.useState<Array<Article>>(testArticles);

  const userId: string = useAppSelector(getUserId);
  const { data: articlesData } = useGetAllArticlesQuery(Number(userId));


  useEffect(() => {
    setArticles(articlesData || []);
  }, [articlesData]);

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
        <div className='w-full sm:w-4/5 bg-white'>
          {/* 收藏 */}
          {articles.length !== 0 && articles.map(article => {
            return article.emotions.map((emotion) => {
              return <CollectCard
                key={article.articleId.toString()}
                articleId={article.articleId.toString()}
                emotionId={emotion.emotionId.toString()}
                emotions={emotion.emotions}
                createDate={article.createdDate}
              />;
            })
          })}
        </div>
      </div>
    </div >
  )
}

export default Collection