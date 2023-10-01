import React, { useEffect, useRef, useState } from 'react'

import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

import TestMusic from '../assets/music/NCSBlank.mp3'

const AudioPlayer = () => {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const MAX = 20;

  useEffect(() => {
    // 當音樂文件加載完成後，設置總時長
    const audio = audioRef.current!;
    audio.addEventListener("loadeddata", () => {
      setDuration(audio.duration);
    });

    // 監聽音樂播放的進度，並實時更新當前時間
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current!.currentTime = newTime;
    setCurrentTime(newTime);
  };

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  // function handleVolume(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const { value } = e.target;
  //   const volume = Number(value) / MAX;
  //   audioRef.current!.volume = volume;
  // }

  // function handleVolume(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const { value } = e.target;
  //   const currentTime = Number(value) / MAX;
  //   console.log(audioRef.current?.onloadedmetadata);
  //   audioRef.current!.currentTime = currentTime;
  // }


  return (
    <div className="flex gap-2">

      <button
        onClick={toggleAudio}
        type="button"
        className="text-black shadow-sm"
      >
        {!play ? (
          <FaPlay className="text-orange-400 text-xl" aria-hidden="true" />
        ) : (
          <FaPause className="text-orange-400 text-xl" aria-hidden="true" />
        )}
      </button>

      <div className="flex gap-2">
        {/* <input
          type="range"
          className="w-full accent-orange-300"
          min={0}
          max={MAX}
          onChange={(e) => handleVolume(e)}
        />
        <h1> Speaker </h1> */}

        <input
          type="range"
          className='w-full accent-orange-300  appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-orange-100'
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleRangeChange}
          step="0.1"
        />
      </div>

      <audio ref={audioRef} loop src={TestMusic} />
    </div>
  )
}

export { AudioPlayer }