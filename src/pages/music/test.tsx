import React, { useCallback } from 'react'
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
import { MdOutlineManageSearch } from 'react-icons/md';
import { BsMusicNoteList } from 'react-icons/bs';
import MusicPost from './components/MusicPost';

const TestMusic = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [isAllSet, setIsAllSet] = React.useState<boolean>(false);

  const [articleId, setArticleId] = React.useState<number | null>(null);
  const [articleName, setArticleName] = React.useState<string>('');
  const [articleContent, setArticleContent] = React.useState<string>('');

  const [emotions, setEmotions] = React.useState<Array<EmotionProps>>([]);

  const [file, setFile] = React.useState<File | null>(null);

  const [addNewArticle, { isLoading: isAddNewArticleLoading }] = useAddNewArticleMutation();
  const [updateEmotions, { isLoading: isUpdateEmotionsLoading }] = useUpdateEmotionsMutation();

  const userId: string = useAppSelector(getUserId);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArticleName(e.target.value);
  }, []);

  const handleArticleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setArticleContent(e.target.value);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files ? e.target.files[0] : null);
  }, []);

  //todo: 傳到情緒模型 API
  const handleAnalyzeClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    const article: AddNewArticleRequest = {
      userId: Number(userId),
      content: articleContent,
    }

    try {
      const response = await addNewArticle(article).unwrap();

      const emotionList: Array<Emotion> = response.emotions;
      if (emotionList && emotionList.length > 0) {
        setEmotions(emotionList.at(emotionList.length - 1)?.emotions || []);
      }

      setArticleId(response.articleId)

    } catch (err: any) {
      toast.error(err.message);
    }

    setIsAllSet(true);
  }, [addNewArticle, articleContent, userId]);

  //todo: 傳到音樂模型 API
  const handleGenerateMusicClick = async () => {
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
      <div className='flex w-full justify-around bg-slate-50 h-auto min-h-screen dark:bg-black flex-col lg:flex-row pt-12 sm:pt-0'>
        <div className='flex flex-col pt-8 gap-4 w-5/6 pl-6 sm:pl-24 md:pl-24 lg:pl-12 lg:w-5/12'>

          <label htmlFor='name' className='block text-3xl font-bold text-gray-700 dark:text-white'>命名您的主題</label>
          <input
            type='text'
            value={articleName}
            onChange={handleNameChange}
            className='block mb-8 px-2 py-4 indent-4 w-full text-base font-semibold text-gray-900 shadow-xl rounded focus-visible:outline-none dark:bg-gray-700 dark:text-gray-400'
            maxLength={20}
            placeholder='說書人...'
          />

          <label htmlFor="article" className="block text-2xl font-extrabold text-gray-900 dark:text-white">
            分享您的故事，開始創作音樂
          </label>

          <textarea
            id="article"
            rows={10}
            onChange={handleArticleChange}
            value={articleContent}
            className="block mb-8 p-4 pl-6 w-full text-base font-semibold text-gray-900 bg-white rounded-lg outline-2  select-none shadow-xl focus-visible:outline-none dark:text-gray-400 dark:bg-slate-700"
            placeholder="我想要.....">
          </textarea>

          <span className='mb-4 relative w-auto h-[2px] bg-stone-300 select-none after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1/2 after:-translate-x-1/2  after:w-fit after:text-2xl after:font-bold after:px-2 after:bg-slate-50 after:text-stone-400 dark:after:bg-black'> </span>


          <div className="flex flex-col gap-1 justify-center w-full">
            <label htmlFor="dropzone-file" className="m-0 first-letter:flex flex-col items-center justify-center w-full border border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="w-full flex flex-row items-center cursor-pointer">
                <span className='py-2 px-4 text-white bg-gray-700 border-r-2 border-l-gray-200 font-bold text-base rounded-l-lg'> 選擇檔案 </span>
                <span className='py-2 px-4 font-semibold text-gray-500 text-sm'>
                  {!file ?
                    "沒有選擇檔案" :
                    file.name
                  }
                </span>
              </div>
              <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
            </label>

            <p
              className="mb-4 text-xs text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>

          {/* 文章分析按鈕 */}
          <button
            onClick={handleAnalyzeClick}
            disabled={!articleContent}
            type="submit"
            className="flex justify-center items-center gap-1 w-1/2 xl:w-1/3 mb-4 px-6 py-2 border-2 border-stone-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-opacity-50 hover:border-stone-300"
          >
            <MdOutlineManageSearch size={28} />
            分析
          </button>

        </div>

        <div className='flex flex-col pt-8 pl-6 sm:pl-24 lg:pl-6 gap-4 w-full lg:w-5/12 bg-white'>

          <h3 className='flex flex-col text-3xl font-bold text-black opacity-90'>
            情感分析
            <span className='text-sm font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-slate-100 text-transparent bg-clip-text'> 加入您想要的情緒或情境 </span>
          </h3>
          <div className='flex flex-row'>

            {/* 感情 */}
            {emotions.map((selectedEmotion: EmotionProps, index: React.Key | null | undefined) => (
              <EmotionButton
                key={index}
                label={selectedEmotion}
                onClick={() => setEmotions(preEmotions => preEmotions.filter(emotion => emotion !== selectedEmotion))}
              />
            ))}

            {/* 情緒按鈕 */}
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

          {/* 生成音樂 */}
          <button
            onClick={handleAnalyzeClick}
            type="submit"
            className="relative group flex justify-center items-center gap-3 w-5/6 sm:w-5/12 lg:8/12 mb-8 pl-8 pr-4 py-2 border-2 border-gray-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-gray-400 hover:border-stone-300 "
          >
            <span className='absolute top-0 right-2/3 -rotate-12'>
              <BsMusicNoteList
                size={50}
                className='text-gray-600 z-20 transition-all duration-200 ease-out group-hover:text-gray-400 group-hover:animate-bouncing'
              />
            </span>
            生成音樂
          </button>

          {/* 音樂生成列表 */}
          <div className='flex flex-col gap-10 mb-8 sm:mb-2 w-full sm:w-11/12'>
            <MusicPost />
            <MusicPost />
            <MusicPost />
          </div>

        </div>

      </div>
    </>
  )
}

export default TestMusic