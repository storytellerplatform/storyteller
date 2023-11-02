import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WaveSurferOptions } from 'wavesurfer.js';
import useWavesurfer from '../hooks/useWavesurfer';

import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';

type UseWavesurferProps = Omit<WaveSurferOptions, 'container'>;

const WaveSurferPlayer: React.FC<UseWavesurferProps> = (props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const wavesurfer = useWavesurfer(containerRef, props)

  // On play button click
  const onPlayClick = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return

    setCurrentTime(0)
    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('audioprocess', (currentTime) => setCurrentTime(currentTime)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <>
      <div className='flex flex-row gap-4'>
        <button onClick={onPlayClick} className='mt-2 inline-block'>
          {isPlaying ?
            <span className='text-white'>
              <BiPauseCircle size={42} className='transition-all ease-in-out hover:opacity-60' />
            </span> :
            <span className='text-white'>
              <BiPlayCircle size={42} className='transition-all ease-in-out hover:opacity-60' />
            </span>}
        </button>

        <div ref={containerRef} className='w-full' />
      </div>
    </>
  )
}

export default WaveSurferPlayer
