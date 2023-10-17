import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmotionButton from '../../components/EmotionButton';
import TestMusic from '../../assets/music/NCSBlank.mp3';
import AudioVisualizer from '../../components/AudioVisualizer';
import { useGetArticleQuery } from '../../feature/api/articleSlice';

// interface CollectProps {
//   image: string,
//   content: string,
//   purpose: string,
//   emotion: Array<EmotionProps>,
//   song
//   created_at: Date
// }

const Collect = () => {
  const { articleId, emotionId } = useParams();

  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: articleData } = useGetArticleQuery(Number(articleId));

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  }, []);

  const playSound = () => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);

    oscillator.connect(audioContextRef.current.destination);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 1);
  };

  return (
    <div className='flex justify-around'>
      {/* 左 */}
      <div className='w-7/12 p-5'>
        <h1 className='text-6xl font-extrabold mb-6'> purpose </h1>
        <div className='flex w-full mb-4 select-none'>
          {/* 還要對上 emotionId */}
          {articleData?.emotions.find(
            emotion => emotion.emotionId === Number(emotionId))?.emotions.map((emotion) => {
              return <EmotionButton
                defaultStyle={false}
                label={emotion}
                className='text-lg px-3 py-1.5 rounded-full'
              />
            })}
        </div>

        <div className='flex items-center gap-2'>

          <AudioVisualizer audioUrl={TestMusic} />

        </div>
      </div>


      {/* 右 */}
      <div className='w-4/12'></div>
    </div>
  )
}

export default Collect