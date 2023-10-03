import React, { useRef, useState } from 'react'
// import EmotionButton from './EmotionButton'
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi'

import TestImage from '../assets/music-bg-test.jpg'
import TestMusic from '../assets/music/NCSBlank.mp3'
import EmotionButton from './EmotionButton'
import DownloadButton from './DownloadButton'
import { useNavigate } from 'react-router-dom'
// import { AudioPlayer } from './AudioPlayer'
// import { Link } from 'react-router-dom'

const CollectCard = () => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigte = useNavigate();

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  return (
    <div className='flex justify-between w-full p-4 items-center border border-y-orange-200 border-x-white'>

      {play ?
        <BiPauseCircle onClick={toggleAudio} size={36} className='text-orange-300 cursor-pointer' />
        :
        <BiPlayCircle onClick={toggleAudio} size={36} className='text-orange-300 cursor-pointer' />
      }
      <audio ref={audioRef} src={TestMusic} />

      <img
        className='w-1/6 rounded-md cursor-pointer'
        onClick={() => navigte('/collection/1')}
        src={TestImage}
        alt="Music"
      />

      <h1
        className='py-6 text-gray-600 text-lg font-bold cursor-pointer'
        onClick={() => navigte('/collection/1')}
      >
        purpose
      </h1>

      <div className='grid grid-cols-3 gap-y-1'>
        <EmotionButton label={'開心'} defaultStyle={false} className='px-3 py-1.5 rounded-full text-base' />
        <EmotionButton label={'開心'} defaultStyle={false} className='px-3 py-1.5 rounded-full text-base' />
        <EmotionButton label={'開心'} defaultStyle={false} className='px-3 py-1.5 rounded-full text-base' />
        <EmotionButton label={'開心'} defaultStyle={false} className='px-3 py-1.5 rounded-full text-base' />
      </div>

      <span className='font-bold font-mono'>2023-10-06</span>

      <DownloadButton src={TestMusic} />
    </div>

    //     {/* <Link className='' to="/collection/1">
    //       <img className='rounded-t-lg object-contain' src={TestImage} alt="music" />
    //       <h1 className='text-center text-xl font-bold'> purpose </h1>
    //       <h3 className='px-4 text-base text-neutral-500 font-medium'> content </h3>
    //     </Link>

    //     {/* emotion */}
    // {/* <div className='px-4'>
    //       <EmotionButton size='sm' label='開心' />
    //     </div> */}

    // {/* <audio className='self-center' src={TestMusic} > */ }
    // {/* <p>
    //         Your browser doesn't support HTML5 audio. Here is a
    //         <a href="myAudio.mp4">link to the audio</a> instead.
    //       </p> */}
    // {/* </audio> */ }

    // {/* <div className='self-center'>
    //       <AudioPlayer />
    //     </div> */}
  )
}

export default CollectCard