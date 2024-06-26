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
import { createEmotion, createEmotionDicVer, createMusic } from '../../api';
import findIndexesGreaterThan from '../../utils/findIndexesGreaterThan';
import { AxiosProgressEvent, AxiosRequestConfig } from 'axios';
import { Slider } from '@mui/material';
import { englishEmotions } from '../../utils/emotionConfig';

interface ArticleState {
  articleId: number | null,
  articleName: string,
  articleContent: string
}

const ManageSearchIcon = React.memo(MdOutlineManageSearch);
const MusicNoteIcon = React.memo(BsMusicNoteList);

const FreeMusics = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [article, setArticle] = React.useState<ArticleState>({
    articleId: 1,
    articleName: '',
    articleContent: ''
  })

  const [emotions, setEmotions] = React.useState<Array<EmotionProps>>([]);
  const [emotionsDic, setEmotionsDic] = React.useState<Array<Array<string>>>([]);

  // 用戶傳的檔案
  const [file, setFile] = React.useState<File | null>(null);


  // 生成的音檔
  const [blobFile, setBlobFile] = React.useState<Blob | null>(null);

  // 分析音樂前做確認
  const [isAllSet, setIsAllSet] = React.useState<boolean>(false);

  // 秒數
  const [seconds, setSeconds] = React.useState<number>(20);

  // loading state and progression
  const [generateEmotionsProgress, setGenerateEmotionsProgress] = React.useState<number>(0);
  const [generateMusicProgress, setGenerateMusicProgress] = React.useState<number>(0);
  const [emotionLoading, setEmotionLoading] = React.useState<boolean>(false);
  const [blobLoading, setBlobLoading] = React.useState<boolean>(false);


  // const [analyzeMood, { isLoading: isAnalyzeMoodLoading }] = useMoodAnaMutation();

  const isArticleSet = () => {
    return (!article.articleName || !article.articleContent) && (!file)
  }

  /**
   * 更改文章名稱
   */
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setArticle({ ...article, articleName: e.target.value });
  }, [article]);

  /**
   * 更改文章內容
   */
  const handleArticleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setArticle({ ...article, articleContent: e.target.value });
  }, [article]);

  /**
   * 更改上傳的檔案內容
   */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files ? e.target.files[0] : null);
  }, []);

  const handleSecondsChange = (event: Event, newValue: number | number[]) => {
    setSeconds(newValue as number);
  };

  /**
   * 讀取檔案內容
   * @param file 
   * @returns 
   */
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

  /**
   * 分析檔案回傳情緒
   */
  const handleAnalyzeClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmotionLoading(true);
    setGenerateEmotionsProgress(0);
    setEmotionsDic([]);

    let emotions: Array<number> = [];

    /**
     * 如果用戶先傳檔案
     * 就以檔案為主來做情緒分析
     */
    let fileText: string = "";

    if (file) {
      await readFileContents(file)
        .then((text) => {
          fileText = text as string;
          // 提取檔案文字後，將檔案文字放進 article state 裡
          setArticle({ articleId: 1, articleName: file.name, articleContent: fileText })
        })
        .catch((error) => {
          // 讀取文件失敗時的錯誤處理邏輯
          console.error('Error reading file:', error);
          serverErrorNotify('文件讀取失敗');
          setEmotionLoading(false);
          return;
        });
    }

    if (file && fileText === "") {
      serverErrorNotify("檔案內沒有任何文字!");
      setFile(null);
    }

    // 確認是否有上傳檔案
    const moodAnaApiReq: MoodAnaApiReq = {
      TestData: file ? (fileText || article.articleContent) : article.articleContent
    }

    /*
       將文章內容進行情緒分析
    */
    try {
      const emotionNumData = await createEmotion(moodAnaApiReq);

      const analyzedData = findIndexesGreaterThan(emotionNumData.data, 0.1);
      analyzedData.forEach((data) => {
        emotions.push(data);
      });
      if (emotions.length > 1) {
        emotions = emotions.filter(num => num !== 0)
      }

      const emotionsResponse = await createEmotionDicVer(moodAnaApiReq);
      setEmotionsDic(emotionsResponse.data);
      console.log(emotionsResponse.data);

    } catch (err: any) {
      console.log(err);

      if (err.code === 400 || err.code === 422) {
        toast.error('格式錯誤或是傳出沒有內容的文章');
      }

      serverErrorNotify('情緒模型伺服器發生錯誤!');
      return;

    } finally {
      setEmotionLoading(false);
      setGenerateEmotionsProgress(0);
    }

    setEmotions(emotionsTransfer(emotions));

    successNotification("文章分析成功了！現在您可以深入了解文章的情緒與情境。你還可以在這裡添加你所想要表達的情感！");
    setIsAllSet(true);
  }, [article, file]);

  /**
   * 產生音樂
   */
  const handleGenerateMusicClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBlobLoading(true);
    setGenerateMusicProgress(0);

    const config: AxiosRequestConfig = {
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total !== undefined) {
          const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          setGenerateMusicProgress(percentCompleted);
        }
      },
    };

    try {
      let emotionsText = "";

      emotions.forEach((emotion) => {
        emotionsText += englishEmotions[emotion];
        emotionsText += " ";
      });

      emotionsDic.forEach((emotion) => {
        emotionsText += emotion[0]
        emotionsText += " ";
      });

      const response = await createMusic({
        texts: emotionsText,
        duration: seconds,
      }, config);

      if (response.status !== 200) {
        serverErrorNotify('音樂模型發生錯誤');
        return;
      }

      const audioData = await response.data.arrayBuffer(); // 將獲取的數據轉為 ArrayBuffer
      const blob = new Blob([audioData], { type: 'audio/wav' }); // 將 ArrayBuffer 轉換為 Blob'
      setBlobFile(blob);
      successNotification("音樂生成成功!")
    } catch (error: any) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        serverErrorNotify('音樂模型伺服器未開啟');
      } else {
        serverErrorNotify('音樂模型發生錯誤');
      }
    } finally {
      setBlobLoading(false);
      setGenerateMusicProgress(0);
    };

  }, [emotions, emotionsDic, seconds]);

  return (
    <>
      {/* 主題 */}
      <div className='flex w-full bg-slate-100 h-auto min-h-screen dark:bg-black flex-col lg:flex-row lg:pl-0 sm:pl-0 sm:pt-0 pl-0 pt-12 px-0'>

        {/* 
            sidebar 空白區塊
        */}
        <div className='lg:w-1/12'></div>

        {/* 
            左半部
        */}
        <div className='flex flex-col pt-10 pr-12 gap-4 w-full pl-6 sm:pl-24 lg:pl-4 xl:pl-0 lg:w-5/12'>
          {/* 
              文章名稱輸入
          */}
          <label htmlFor='name' className='block text-3xl text-gray-700 dark:text-white'>
            命名您的主題
          </label>
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
          <label htmlFor="article" className="block text-2xl text-gray-900 dark:text-white">
            分享您的故事，開始創作音樂
          </label>
          <textarea
            id="article"
            rows={10}
            onChange={handleArticleChange}
            value={article.articleContent}
            className="block mb-8 p-4 pl-6 w-full text-base font-medium text-gray-950 bg-white rounded-lg outline-2  select-none shadow-xl focus-visible:outline-none dark:text-gray-400 dark:bg-slate-700"
            placeholder="我想要.....">
          </textarea>

          {/*  
              OR 線
          */}
          <span className='mb-8 relative w-auto h-[2px] bg-stone-300 select-none after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-1/2 after:translate-x-1/4 after:w-fit after:text-2xl after:px-2 after:bg-slate-100 after:text-stone-400 dark:after:bg-black'> </span>


          {/* 
              檔案傳輸按鈕
          */}
          <div className="flex flex-col gap-1 justify-center w-full">
            <label htmlFor="dropzone-file" className="m-0 first-letter:flex flex-col items-center justify-center w-full border border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="w-full flex flex-row items-center cursor-pointer">
                <span className='py-2 px-4 text-white bg-gray-700 border-r-2 border-l-gray-200 text-base rounded-l-lg'> 選擇檔案 </span>
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
            className="flex justify-center items-center bg-white w-1/2 xl:w-1/3 mb-8 py-3 border-2 border-orange-300 text-orange-400 text-xl shadow-md rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-opacity-70 hover:border-orange-200 disabled:cursor-not-allowed disabled:text-stone-400 disabled:hover:text-opacity-100 disabled:border-stone-400 disabled:transition-none disabled:opacity-60"
          >
            {
              (!emotionLoading) ? (
                <span className='flex gap-1 h-7'>
                  <ManageSearchIcon size={28} />
                  分析
                </span>
              ) : (
                <Spinner
                  width='w-7'
                  height='h-7'
                  spinnerText='text-orange-400'
                  size={24}
                  thickness={5}
                />
              )
            }
          </button>

        </div>

        {/* 
            右半部
        */}
        <div className='flex flex-col pb-8 pt-8 pl-6 sm:pl-24 lg:pl-12 gap-4 w-full lg:w-6/12 bg-white shadow-lg rounded-xl'>
          {/* 
              情感分析區域
          */}
          <h3 className='flex flex-col text-3xl text-black opacity-90 mb-4'>
            情感分析
            <span className='text-sm bg-gradient-to-r from-yellow-500 via-yellow-300 to-slate-100 text-transparent bg-clip-text'> 加入您想要的情緒或情境 </span>
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

            {emotionsDic.map((selectedEmotion: Array<string>, index: React.Key | null | undefined) => (
              <EmotionButton
                key={index}
                other={selectedEmotion[1]}
              />
            ))}

            {/* 
                情緒按鈕 
            */}
            <button
              type='button'
              className={classNames(`my-2 w-8 h-8 self-center flex items-center justify-center text-lg text-orange-400 ring-2 ring-inset ring-orange-400 rounded-full hover:ring-orange-300 hover:text-orange-300`,
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
              秒數設置
          */}
          <div className="w-3/4 mb-4">
            <h3 className='text-xl text-black opacity-70 mb-2'>音樂秒數設置</h3>
            <Slider
              value={seconds}
              min={5}
              onChange={handleSecondsChange}
              aria-label="Default"
              valueLabelDisplay="auto"
              color={'warning'}
            />
          </div>

          {/* 
             生成音樂區域
          */}
          <button
            onClick={handleGenerateMusicClick}
            type="submit"
            disabled={!isAllSet}
            className="relative group flex justify-center items-center gap-3 w-5/6 sm:w-5/12 lg:8/12 mb-8 xl:pl-8 xl:pr-4 py-3 border-2 border-orange-300 text-orange-400 text-xl font-semibold shadow-xl rounded-3xl cursor-pointer transition-all duration-200 ease-out hover:text-orange-300 hover:border-orange-200 disabled:cursor-not-allowed disabled:text-stone-300 disabled:border-stone-300"
          >
            <span className='absolute top-1 right-2/3 -rotate-6 hidden xl:block'>
              <MusicNoteIcon
                size={50}
                className={classNames(`text-orange-400 z-20 transition-all duration-200 ease-out group-hover:text-orange-300 group-disabled:text-stone-300`,
                  { 'group-hover:animate-bouncing': isAllSet })}
              />
            </span>
            {
              !blobLoading ? (
                <>
                  生成音樂
                </>
              ) : (
                <Spinner
                  width='w-7'
                  height='h-7'
                  spinnerText='text-orange-400'
                  size={28}
                  thickness={6}
                />
              )
            }
          </button>

          {/* 音樂生成列表 */}
          {
            (blobFile && article.articleId) &&
            <div className='flex flex-col gap-10 mb-8 sm:mb-2 w-10/12 sm:w-11/12'>
              <MusicPost name={article.articleName} audioBlob={blobFile} />
            </div>
          }

        </div>

      </div>
    </>
  )
}

export default FreeMusics;