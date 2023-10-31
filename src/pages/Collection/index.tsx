import React, { useEffect } from 'react'
import EmotionButton from '../../components/EmotionButton'
import CollectCard from '../../components/CollectCard'
import { useGetAllArticlesQuery } from '../../feature/api/userSlice';
import { useAppSelector } from '../../app/hooks';
import { getUserId } from '../../feature/user/userSlice';
import { Article } from '../../types/article';
import CollectionDropdown from './components/CollectionDropdown';

const Collection = () => {
  const [articles, setArticles] = React.useState<Array<Article>>([]);
  const userId: string = useAppSelector(getUserId);
  const { data: articlesData } = useGetAllArticlesQuery(Number(userId));

  useEffect(() => {
    setArticles(articlesData || []);
  }, [articlesData]);

  return (
    <div className='flex flex-row justify-between h-screen'>

      {/* 左區 */}
      {/* <div className='w-1/5 md:w-fit lg:w-1/5 p-[2px] rounded-lg h-fit bg-gradient-to-b from-orange-300 to-white-500'> */}

      {/* <div className='flex flex-col p-4 gap-6 items-center bg-white rounded-lg drop-shadow-xl shadow-lg'> */}
      {/* 標題 */}

      {/* <h1 className='text-4xl font-bold black text-orange-500 tracking-widest'>情 緒</h1> */}
      {/* 情緒統計 */}

      {/* <div className='flex flex-col w-full'> */}

      {/* <div className='flex items-center justify-start gap-2'>
              <EmotionButton label='開心' />
              <i className="fa-solid fa-x text-red-500"></i>
              <h6 className='mb-1 text-3xl text-red-500 drop-shadow-lg'>55</h6>
            </div> */}

      {/* </div> */}
      {/* </div> */}
      {/* </div> */}

      {/* 搜尋區域 */}
      {/* bg-gradient-to-b from-orange-300 to-white-500 */}
      <div className='w-1/5 p-4 rounded-lg ml-12'>
        {/* 改變日期先後 */}

        {/* 搜尋情緒 */}
        <CollectionDropdown name='搜尋情緒' />
      </div>

      {/* 右區 */}
      <div className='w-3/4 flex flex-col pr-12 bg-slate-100 select-none'>
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
  )
}

export default Collection