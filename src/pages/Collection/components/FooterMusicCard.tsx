import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WaveSurferOptions } from 'wavesurfer.js';
import useWavesurfer from '../../../hooks/useWavesurfer';

import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi';
import classNames from 'classnames';
import DownloadButton from '../../../components/DownloadButton';

type UseWavesurferProps = Omit<WaveSurferOptions, 'container'>;
interface WaveSurferPlayerProps extends UseWavesurferProps {
  playbtnStyle: string;
  data: Blob;
  playedName: string;
}

const FooterMusicCard: React.FC<WaveSurferPlayerProps> = (props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const wavesurfer = useWavesurfer(containerRef, props, props.data)

  const onPlayClick = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return

    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <>
      <div className='w-full flex md:flex-row flex-col gap-4 items-center justify-between'>
        <h3 className='md:w-1/6 w-full text-base'>{props.playedName}</h3>
        <div className='flex flex-row lg:w-1/3 md:w-1/2 w-full gap-6 items-center' >
          <button onClick={onPlayClick} className='inline-block'>
            {isPlaying ?
              <span className={classNames(
                { 'text-white': props.playbtnStyle === 'dark' },
                { 'text-black': props.playbtnStyle === 'light' }
              )}>
                <BiPauseCircle size={36} className='transition-all ease-in-out hover:opacity-60' />
              </span> :

              <span className={classNames(
                { 'text-white': props.playbtnStyle === 'dark' },
                { 'text-black': props.playbtnStyle === 'light' }
              )}>
                <BiPlayCircle size={36} className='transition-all ease-in-out hover:opacity-60' />
              </span>}
          </button>

          <div ref={containerRef} className='w-full' />
        </div>

        <div className='md:w-1/6 w-full'>
          <DownloadButton blobData={props.data} fileName={props.playedName} whitemode={true} />
        </div>
      </div>
    </>
  )
}

export default FooterMusicCard
