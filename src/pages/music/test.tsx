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
import { MdOutlineManageSearch } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';

const TestMusic = () => {
  const [articleContent, setArticleContent] = React.useState<string>('');
  const [articleName, setArticleName] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [emotions, setEmotions] = React.useState<Array<EmotionProps>>([]);
  const [isAllSet, setIsAllSet] = React.useState<boolean>(false);
  const [purpose, setPurpose] = React.useState<string>("");
  const [articleId, setArticleId] = React.useState<number | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const [addNewArticle, { isLoading: isAddNewArticleLoading }] = useAddNewArticleMutation();
  const [updateEmotions, { isLoading: isUpdateEmotionsLoading }] = useUpdateEmotionsMutation();

  const userId: string = useAppSelector(getUserId);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleName(e.target.value);
  }

  const handleArticleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleContent(e.target.value);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

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
      <div className='flex w-full h-auto min-h-screen px-20 pt-8 ml-8 dark:bg-black  '>
        <div className='flex flex-col gap-4 w-1/2'>

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

          <span className='mb-4 relative w-auto h-[2px] bg-stone-300 select-none after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1/2 after:-translate-x-1/2  after:w-fit after:text-2xl after:font-bold after:py-1 after:bg-white after:text-stone-400 dark:after:bg-black'> </span>



          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="m-0 flex flex-col items-center justify-center w-full border border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="w-full flex flex-row items-center cursor-pointer">
                <span className='py-2 px-4 text-black border-r-2 border-l-gray-200  font-bold text-lg'> 選擇檔案 </span>
                <span className='py-2 px-4'>
                  沒有選擇檔案
                </span>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <p
            className="mb-4 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>


          {/* 文章分析按鈕 */}
          <button
            onClick={handleAnalyzeClick}
            disabled={!articleContent}
            type="submit"
            className="flex justify-center items-center gap-1 w-1/3 px-6 py-2 border-2 border-stone-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-opacity-50 hover:border-stone-300"
          >
            <MdOutlineManageSearch size={28} />
            分析
          </button>

        </div>

        <div className='flex flex-col gap-4 w-1/2'>
        </div>

      </div>
    </>
  )
}

export default TestMusic