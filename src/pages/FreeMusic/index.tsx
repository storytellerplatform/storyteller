import React, { useCallback } from 'react'
import EmotionButton from '../../components/EmotionButton'
import MusicModal from './components/MusicModal';
import { EmotionProps } from '../../types/components';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { serverErrorNotify, successNotification } from '../../utils/toast';
import MusicPost from './components/MusicPost';
import { useMoodAnaMutation } from '../../feature/api/moodAnaApi/apiSlice';
import { MoodAnaApiReq } from '../../types/api/moodAna';
import Spinner from '../../components/Spinner';
import { emotionsTransfer } from './../../utils/emotionTransfer';
import { BsMusicNoteList } from 'react-icons/bs';
import { MdOutlineManageSearch } from 'react-icons/md';

interface ArticleState {
  articleId: number | null,
  articleName: string,
  articleContent: string
}

const ManageSearchIcon = React.memo(MdOutlineManageSearch);
const MusicNoteIcon = React.memo(BsMusicNoteList);

const FreeMusics = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const MODEL_URL = process.env.REACT_APP_MODEL_ENDPOINT;

  const [article, setArticle] = React.useState<ArticleState>({
    articleId: 1,
    articleName: '',
    articleContent: ''
  })

  const [emotions, setEmotions] = React.useState<Array<EmotionProps>>([]);

  // 用戶傳的檔案
  const [file, setFile] = React.useState<File | null>(null);

  // 生成的音檔
  const [blobLoading, setBlobLoading] = React.useState<boolean>(false);
  const [blobFile, setBlobFile] = React.useState<Blob | null>(null);

  // 分析音樂前做確認
  const [isAllSet, setIsAllSet] = React.useState<boolean>(false);

  const [analyzeMood, { isLoading: isAnalyzeMoodLoading }] = useMoodAnaMutation();

  const isArticleSet = () => {
    return (!article.articleName || !article.articleContent) && (!file)
  }

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArticle({ ...article, articleName: e.target.value });
  }, [article]);

  const handleArticleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setArticle({ ...article, articleContent: e.target.value });
  }, [article]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files ? e.target.files[0] : null);
  }, []);

  const readFileContents = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // 創建FileReader物件

      // 當文件讀取完成時執行的函式
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result; // 取得文件內容
        resolve(text); // 成功時將文件內容解析為Promise的結果
      };

      reader.onerror = (e) => {
        reject(e); // 發生錯誤時將錯誤信息解析為Promise的拒絕原因
      };

      if (file) {
        reader.readAsText(file); // 以文本格式讀取文件內容
      } else {
        reject(new Error('文件無效')); // 如果文件無效則拒絕Promise
        serverErrorNotify('文件無效');
      }
    })
  };

  const handleAnalyzeClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emotions: Array<Number> = [];

    /**
     * 如果用戶先傳檔案
     * 就以檔案為主來做情緒分析
     */
    let fileText: string = "";

    if (file) {
      await readFileContents(file)
        .then((text) => {
          fileText = text as string;
        })
        .catch((error) => {
          // 讀取文件失敗時的錯誤處理邏輯
          console.error('Error reading file:', error);
          serverErrorNotify('文件讀取失敗');
        });
    }

    if (file && fileText === "") {
      serverErrorNotify("檔案內沒有任何文字!");
    }

    const moodAnaApiReq: MoodAnaApiReq = {
      text: file ? (fileText || article.articleContent) : article.articleContent
    }

    /*
       將文章內容進行情緒分析
    */
    try {
      const bEmotion = await analyzeMood(moodAnaApiReq).unwrap();
      emotions.push(bEmotion);
    } catch (err: any) {
      console.log(err);

      if (err.code === 400 || err.code === 422) {
        toast.error('格式錯誤或是傳出沒有內容的文章');
      }

      serverErrorNotify('情緒模型伺服器發生錯誤!');
      return;
    }

    setEmotions(emotionsTransfer(emotions));

    successNotification("文章分析成功了！現在您可以深入了解文章的情緒與情境。你還可以在這裡添加你所想要表達的情感！");
    setIsAllSet(true);
  }, [analyzeMood, article, file]);

  const handleGenerateMusicClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBlobLoading(true);

    try {
      const dataToSend = { "data": {} };

      const response = await fetch(`${MODEL_URL}/music_create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.status !== 200) {
        serverErrorNotify('音樂模型發生錯誤');
      }

      const audioData = await response.arrayBuffer(); // 將獲取的數據轉為 ArrayBuffer
      const blob = new Blob([audioData], { type: 'audio/wav' }); // 將 ArrayBuffer 轉換為 Blob'
      setBlobFile(blob);
    } catch (error: any) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        serverErrorNotify('音樂模型伺服器未開啟');
      } else {
        serverErrorNotify('音樂模型發生錯誤');
      }
    } finally {
      setBlobLoading(false);
    };

  }, [MODEL_URL]);

  return (
    <>
      {/* 主題 */}
      <div className='flex w-full pb-8 bg-slate-50 h-auto min-h-screen dark:bg-black flex-col lg:flex-row pl-6 sm:pl-24 lg:pl-0 pt-12 px-0 sm:pt-0'>

        {/* 
            sidebar 空白區塊
        */}
        <div className='lg:w-1/12'></div>

        {/* 
            左半部
        */}
        <div className='flex flex-col pt-8 pr-12 gap-4 w-5/6 lg:w-5/12'>
          {/* 
              文章名稱輸入
          */}
          <label htmlFor='name' className='block text-3xl font-bold text-gray-700 dark:text-white'>命名您的主題</label>
          <input
            type='text'
            value={article.articleName}
            onChange={handleNameChange}
            className='block mb-8 px-2 py-4 indent-4 w-full text-base font-semibold text-gray-900 shadow-xl rounded focus-visible:outline-none dark:bg-gray-700 dark:text-gray-400'
            maxLength={20}
            placeholder='說書人...'
          />

          {/* 
              文章內容輸入
          */}
          <label htmlFor="article" className="block text-2xl font-extrabold text-gray-900 dark:text-white">
            分享您的故事，開始創作音樂
          </label>
          <textarea
            id="article"
            rows={10}
            onChange={handleArticleChange}
            value={article.articleContent}
            className="block mb-8 p-4 pl-6 w-full text-base font-semibold text-gray-900 bg-white rounded-lg outline-2  select-none shadow-xl focus-visible:outline-none dark:text-gray-400 dark:bg-slate-700"
            placeholder="我想要.....">
          </textarea>

          {/*  
              OR 線
          */}
          <span className='mb-8 relative w-auto h-[2px] bg-stone-300 select-none after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1/2 after:translate-x-1/4 after:w-fit after:text-2xl after:font-bold after:px-2 after:bg-slate-50 after:text-stone-400 dark:after:bg-black'> </span>


          {/* 
              檔案傳輸按鈕
          */}
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
              <input
                onChange={handleFileChange}
                accept='.txt,.csv'
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>

            {/* 
                限制檔名提示
            */}
            <p
              className="mb-4 text-xs text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              {/* .txt and .csv */}
            </p>
          </div>

          {/* 
              文章分析按鈕
          */}
          <button
            onClick={handleAnalyzeClick}
            disabled={isArticleSet()}
            type="submit"
            className="flex justify-center items-center bg-white w-1/2 xl:w-1/3 mb-4 px-6 py-2 border-2 border-stone-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-opacity-50 hover:border-stone-300 disabled:cursor-not-allowed disabled:hover:text-opacity-100 disabled:border-stone-400 disabled:transition-none disabled:opacity-60"
          >
            {
              (!isAnalyzeMoodLoading) ? (
                <span className='flex gap-1 h-7'>
                  <ManageSearchIcon size={28} />
                  分析
                </span>
              ) : (
                <Spinner
                  width='w-7'
                  height='h-7'
                  fill='fill-black'
                  spinnerText='text-white'
                />
              )
            }
          </button>

        </div>

        {/* 
            右半部
        */}
        <div className='flex flex-col pt-8 pl-12 gap-4 w-full lg:w-6/12 bg-white'>
          {/* 
              情感分析區域
          */}
          <h3 className='flex flex-col text-3xl font-bold text-black opacity-90 mb-4'>
            情感分析
            <span className='text-sm font-bold bg-gradient-to-r from-yellow-500 via-yellow-300 to-slate-100 text-transparent bg-clip-text'> 加入您想要的情緒或情境 </span>
          </h3>
          <div className='flex flex-row mb-6 gap-1'>

            {/* 
               情緒選擇區域
            */}
            {emotions.map((selectedEmotion: EmotionProps, index: React.Key | null | undefined) => (
              <EmotionButton
                key={index}
                label={selectedEmotion}
                onClick={() => setEmotions(preEmotions => preEmotions.filter(emotion => emotion !== selectedEmotion))}
              />
            ))}

            {/* 
                情緒按鈕 
            */}
            <button
              type='button'
              className={classNames(`my-2 w-8 h-8 self-center flex items-center justify-center text-lg font-bold text-orange-400 ring-2 ring-inset ring-orange-400 rounded-full hover:ring-orange-300 hover:text-orange-300`,
                { 'my-1': emotions })}
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>

            {/* 
                選取其他感情
            */}
            <MusicModal
              showModal={showModal}
              setShowModal={setShowModal}
              emotions={emotions}
              setEmotions={setEmotions}
            />
          </div>

          {/* 
             生成音樂區域
          */}
          <button
            onClick={handleGenerateMusicClick}
            type="submit"
            disabled={!isAllSet}
            className="relative group flex justify-center items-center gap-3 w-5/6 sm:w-5/12 lg:8/12 mb-8 xl:pl-8 xl:pr-4 py-2 border-2 border-gray-400 text-stone-600 text-xl font-bold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-gray-400 hover:border-stone-300 disabled:cursor-not-allowed"
          >
            <span className='absolute top-0 right-2/3 -rotate-6 hidden xl:block'>
              <MusicNoteIcon
                size={50}
                className={classNames(`text-gray-600 z-20 transition-all duration-200 ease-out group-hover:text-gray-400`,
                  { 'group-hover:animate-bouncing': isAllSet })}
              />
            </span>
            {
              !blobLoading ? (
                <>
                  生成音樂
                </>
              ) : (
                <Spinner width='w-7' height='h-7' fill='fill-slate-600' spinnerText='text-white' />
              )
            }
          </button>

          {/* 音樂生成列表 */}
          {
            (blobFile && article.articleId) &&
            <div className='flex flex-col gap-10 mb-8 sm:mb-2 w-full sm:w-11/12'>
              <MusicPost name={article.articleName} audioBlob={blobFile} />
            </div>
          }

        </div>

      </div>
    </>
  )
}

export default FreeMusics;