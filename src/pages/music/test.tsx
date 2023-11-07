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
      <div className='w-11/12 mx-20 mt-8 pl-8'>
        <div className='flex flex-col gap-4'>

          <label htmlFor='name' className='block text-3xl font-bold text-gray-700'>命名您的主題</label>
          <input
            type='text'
            value={articleName}
            onChange={handleNameChange}
            className='block mb-8 px-2 py-4 indent-4 w-1/3 text-base text-gray-900 shadow-xl rounded focus-visible:outline-none'
            maxLength={20}
            placeholder='說書人...'
          />

          <label htmlFor="article" className="block text-2xl font-extrabold text-gray-900">
            分享您的故事，開始創作音樂
          </label>

          {/* upload text or file */}
          <div className='flex w-full justify-between'>

            <textarea
              id="article"
              rows={10}
              onChange={handleArticleChange}
              value={articleContent}
              className="block mb-4 p-4 pl-6 w-5/12 text-base text-gray-900 bg-white rounded-lg outline-2  select-none shadow-xl focus-visible:outline-none"
              placeholder="我想要.....">
            </textarea>

            <span className='relative h-auto w-[2px] bg-stone-300 select-none after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:-translate-x-1/2 after:w-fit after:text-2xl after:text-stone-300 after:font-bold after:bg-white'> </span>

            <div className="flex items-center justify-center w-5/12">
              {!file ?
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 font-bold">
                      <strong className="text-gray-700 font-extrabold">
                        點擊上傳
                      </strong> 或拖放文件
                    </p>
                    <p className="text-xs text-gray-500"> (MAX 0.0)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                :
                <div className='flex flex-col gap-4 items-center justify-center w-full h-64 bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg'>
                  <BsFileEarmarkText size={70} />
                  <span className='text-sm'>{file.name}</span>
                  <button
                    type="button"
                    className="px-3 py-1.5 border border-gray-500 text-gray-500 font-semibold rounded-3xl cursor-pointer transition-all ease-in-out duration-200 hover:opacity-50"
                    onClick={() => setFile(null)}
                  >
                    取消
                  </button>
                </div>
              }
            </div>

          </div>

          {/* 文章分析按鈕 */}
          <button
            onClick={handleAnalyzeClick}
            disabled={!articleContent}
            type="submit"
            className="flex justify-center items-center gap-1 w-1/6 px-6 py-2 border-2 border-stone-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-opacity-50 hover:border-stone-300"
          >
            <MdOutlineManageSearch size={28} />
            分析
          </button>

        </div>
      </div>
    </>
  )
}

export default TestMusic