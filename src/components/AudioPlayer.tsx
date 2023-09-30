import React, { useRef, useState } from 'react'

import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

import TestMusic from '../assets/music/NCSBlank.mp3'

const AudioPlayer = () => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const MAX = 20;

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    const volume = Number(value) / MAX;
    audioRef.current!.volume = volume;
  }

  return (
    <div className="flex gap-2">

      <button
        onClick={toggleAudio}
        type="button"
        className="text-black shadow-sm"
      >
        {!play ? (
          <FaPlay className="" aria-hidden="true" />
        ) : (
          <FaPause className="" aria-hidden="true" />
        )}
      </button>

      <div className="flex gap-2">
        <input
          type="range"
          className="w-full accent-orange-300"
          min={0}
          max={MAX}
          onChange={(e) => handleVolume(e)}
        />
        <h1> Speaker </h1>
      </div>


      <audio ref={audioRef} loop src={TestMusic} />
    </div>
  )
}

export { AudioPlayer }