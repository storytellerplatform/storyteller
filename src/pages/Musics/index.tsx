import React from 'react'
import EmotionButton from '../../components/EmotionButton'
import MusicModal from './components/MusicModal';
import { EmotionProps } from '../../types/components';
import classNames from 'classnames';
import { useAddNewArticleMutation } from '../../feature/api/userSlice';
import { getUserId } from '../../feature/user/userSlice';
import { AddNewArticleRequest } from '../../types/api/user';
import { useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';
import { Emotion } from '../../types/emotion';
import { UpdateEmotionsRequest, useUpdateEmotionsMutation } from '../../feature/api/articleSlice';
import { serverErrorNotify } from '../../utils/toast';

const Music = () => {
  const [articleContent, setArticleContent] = React.useState<string>('');
  const [articleName, setArticleName] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [emotions, setEmotions] = React.useState<Array<EmotionProps>>([]);
  const [isAllSet, setIsAllSet] = React.useState<boolean>(false);
  const [purpose, setPurpose] = React.useState<string>("");
  const [articleId, setArticleId] = React.useState<number | null>(null);

  const [addNewArticle, { isLoading: isAddNewArticleLoading }] = useAddNewArticleMutation();
  const [updateEmotions, { isLoading: isUpdateEmotionsLoading }] = useUpdateEmotionsMutation();

  const userId: string = useAppSelector(getUserId);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleName(e.target.value);
  }

  const handleArticleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleContent(e.target.value);
  }

  const handleAnalyzeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const article: AddNewArticleRequest = {
      userId: Number(userId),
      content: articleContent,
    }

    try {
      const response = await addNewArticle(article).unwrap();

      if (response.purpose) {
        setPurpose(response.purpose);
      }

      const emotionList: Array<Emotion> = response.emotions;
      if (emotionList && emotionList.length > 0) {
        setEmotions(emotionList.at(emotionList.length - 1)?.emotions || []);
      }

      setArticleId(response.articleId)

    } catch (err: any) {
      toast.error(err.message);
    }

    setIsAllSet(true);
  }

  const handleGenerateMusicClick = async () => {
    console.log(emotions);

    if (!articleId) {
      serverErrorNotify('發生錯誤');
      return;
    }

    const updateEmotionRequest: UpdateEmotionsRequest = {
      emotions: emotions,
      articleId: articleId
    }

    updateEmotions(updateEmotionRequest);
  };

  return (
    <>
      {/* 主題 */}
      <div className='flex flex-row w-full p-8 justify-between bg-white'>
        {/* 左區 */}
        <div className='select-none lg:w-1/2'>
          {/* 命名該文章創作的音樂 可以 random */}
          <label htmlFor='name' className='block mb-1 text-xl font-bold text-gray-700'>命名您的主題</label>
          <input
            type='text'
            value={articleName}
            onChange={handleNameChange}
            className='block mb-4 p-2 indent-2 w-4/5 text-base text-gray-900 drop-shadow-md focus-visible:outline-none'
            maxLength={20}
            placeholder='說書人...'
          />

          {/* 文字框 */}
          <label htmlFor="article" className="block mb-1 text-2xl font-extrabold text-gray-900">
            分享您的故事，開始創作音樂
          </label>
          <textarea
            id="article"
            rows={10}
            onChange={handleArticleChange}
            value={articleContent}
            className="block mb-4 p-4 w-full text-base text-gray-900 bg-white rounded-lg outline-2  select-none drop-shadow-xl focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-inset sm:w-4/5 md:w-6/10 lg:w-4/5 "
            placeholder="我想要.....">
          </textarea>

          {/* 文章分析按鈕 */}
          <button
            onClick={handleAnalyzeClick}
            disabled={!articleContent}
            type="submit"
            className={classNames(`relative inline-flex items-center justify-center p-0.5 m-4 overflow-hidden text-xl font-extrabold text-gray-900 rounded-lg group bg-gradient-to-br from-orange-200 via-orange-300 to-yellow-200`,
              { 'opacity-50 group-hover:bg-white': !articleContent })}
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
              分析
            </span>
          </button>

        </div>

        {/* 右區 */}
        <div className='w-1/2 flex flex-col'>
          <h1 className='mb-2 text-3xl font-extrabold text-black self-center'>深度解析</h1>

          {/* 主旨顯示 */}
          <h3 className='mb-4 text-2xl font-normal text-gray-400 opacity-90'>主旨摘要</h3>
          <textarea
            className='h-32 w-full mb-4 p-2 px-4 rounded-lg drop-shadow-lg focus:outline-orange-300'
            spellCheck={false}
            placeholder="文章主旨..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            readOnly
          >
          </textarea>

          {/* 感情顯示 */}
          <h3 className='mb-4 text-2xl font-normal text-gray-400 opacity-90'>情感評價</h3>
          <div className='flex flex-row'>

            {/* 感情 */}
            {emotions.map((selectedEmotion: EmotionProps, index: React.Key | null | undefined) => (
              <EmotionButton
                key={index}
                label={selectedEmotion}
                onClick={() => setEmotions(preEmotions => preEmotions.filter(emotion => emotion !== selectedEmotion))}
              />
            ))}

            {/* test */}
            {/* <button
              className={`text-white bg-gradient-to-br from-orange-400 via-orange-400 to-white hover:text-white border border-orange-400 hover:bg-gradient-to-br 
              hover:from-orange-300 hover:via-orange-300 hover:to-white
               focus:outline-none font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2`}
            >
              開心
            </button> */}

            {/* 產生音樂按鈕 */}
            <button
              type='button'
              className={classNames(`my-2 w-8 h-8 self-center flex items-center justify-center text-lg font-bold text-orange-400 ring-2 ring-inset ring-orange-400 rounded-full hover:ring-orange-300 hover:text-orange-300`,
                { 'my-1': emotions })}
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>

            {/* 選取其他感情 */}
            <MusicModal
              showModal={showModal}
              setShowModal={setShowModal}
              emotions={emotions}
              setEmotions={setEmotions}
            />

          </div>

          {/* 產生音樂按紐 */}
          <button
            type="button"
            disabled={!isAllSet || isAddNewArticleLoading || isUpdateEmotionsLoading}
            onClick={handleGenerateMusicClick}
            className={classNames(`flex items-center self-start mt-10 to-red-300 text-white px-5 py-2.5 rounded-lg gap-2 hover:bg-gradient-to-br hover:from-orange-100 hover:via-orange-300 hover:to-red-300`,
              { 'bg-gradient-to-br from-orange-100 via-orange-300 to-red-300 animate-none opacity-60': !isAllSet || isAddNewArticleLoading || isUpdateEmotionsLoading },
              { 'bg-gradient-to-br from-orange-200 via-orange-400 animate-bounce': isAllSet && !isAddNewArticleLoading && !isUpdateEmotionsLoading })}
          >
            {
              !isUpdateEmotionsLoading ?
                <>
                  <i className="fa-solid fa-arrow-right"></i>
                  開始創作音樂
                </> :

                <div role="status" className='px-2'>
                  <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin fill-orange-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>

            }
          </button>
        </div>
      </div >
      {/* 產生音樂列表 */}
      {/* <div className='flex flex-col p-10 gap-2' > */}
      {/* {isAllSet && <h1 className='text-3xl font-extrabold mb-4'> 音樂列表 </h1>} */}
      {/* <MusicCard name='onandon' emotions={['開心', '憤怒']} /> */}
      {/* </div > */}
    </>
  )
}

export default Music