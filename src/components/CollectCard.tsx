import React from 'react'
import { BiPlayCircle } from 'react-icons/bi'

import EmotionButton from './EmotionButton'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'
import { EmotionProps } from '../types/components'
import { createEmotionDicVer } from '../api'
import { MoodAnaApiReq } from '../types/api/moodAna'

interface CollectCardProps {
  articleId: Number;
  name: string;
  emotions: Array<EmotionProps> | null;
  createDate: string;
  audioBlob: Blob;
  audioId: Number;
  content: string;
  play?: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setAudioData: React.Dispatch<React.SetStateAction<Blob | null>>;
  setPlayedName: React.Dispatch<React.SetStateAction<string>>;
}

const CollectCard: React.FC<CollectCardProps> = ({ articleId, name, emotions, content, createDate, audioBlob, audioId, play, setPlay, setAudioData, setPlayedName }) => {
  // const [play, setPlay] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const [emotionsDic, setEmotionsDic] = React.useState<Array<Array<string>>>([]);

  const toggleAudio = () => {
    if (!play) {
      setAudioData(audioBlob);
      setPlayedName(name);
    }

    setPlay((preState) => !preState);
  };

  React.useEffect(() => {
    const fetchEmoDic = async () => {
      try {
        const moodAnaApiReq: MoodAnaApiReq = {
          TestData: content
        };

        const response = await createEmotionDicVer(moodAnaApiReq);
        setEmotionsDic(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEmoDic();
  }, [content])

  // function toggleAudio(): void {
  //   if (play) {
  //     audioRef.current?.pause();
  //     setPlay(false);
  //   } else {
  //     void audioRef.current?.play();
  //     setPlay(true);
  //   }
  // }

  // useEffect(() => {
  //   if (audioBlob && audioRef.current) {
  //     audioRef.current.src = URL.createObjectURL(audioBlob);
  //     audioRef.current.load();
  //   }
  // }, [audioBlob])

  return (
    <div className='grid grid-cols-3 gap-0 md:grid-cols-6 sm:gap-2 mb-8 p-4 items-center border border-white bg-white overflow-visible'>

      <BiPlayCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />

      {/* {play ?
        <BiPauseCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
        :
        <BiPlayCircle onClick={toggleAudio} size={36} className='text-black cursor-pointer  transition-all ease-in-out hover:opacity-60' />
      } */}
      {/* <audio ref={audioRef} /> */}

      <div
        className='py-6'
        onClick={() => navigate(`/collection/${articleId}/${audioId}`)}
      >
        <h3 className='w-fit text-gray-600 text-lg cursor-pointer'>
          {name}
        </h3>
      </div>

      <div className={`md:grid hidden ml-4 grid-cols-1 lg:grid-cols-2 gap-y-1 text-xl font-semibold`}>
        {emotions && emotions.map((emotion, index) => {
          return <EmotionButton
            key={index}
            label={emotion}
            defaultStyle={false}
            className='mr-2 py-1 rounded-full text-sm'
          />
        })}

        {emotionsDic && emotionsDic.map((emotion, index) => {
          return <EmotionButton
            key={index}
            other={emotion[1]}
            defaultStyle={false}
            className='mr-2 py-1 rounded-full text-sm'
          />
        })}
      </div>

      <div className='hidden md:block'></div>
      <span className='font-mono hidden md:block font-bold'>{createDate}</span>

      <div className='w-full'>
        <DownloadButton fileName={name} blobData={audioBlob} whitemode={true} />
      </div>

    </div>
  )
}

export default CollectCard