import React from 'react'
import EmotionButton from './EmotionButton'

import TestImage from '../assets/music-bg-test.jpg'
import TestMusic from '../assets/music/t-rex-roar.mp3'
import { AudioPlayer } from './AudioPlayer'
import { Link } from 'react-router-dom'

// image, title, song
const CollectCard = () => {
  return (
    <div className='flex flex-col pb-2 gap-4 border-2 shadow-xl border-orange-200 rounded-lg hover:-translate-y-2 ease-out duration-500'>
      <Link className='' to="/collection/1">
        <img className='rounded-t-lg object-contain' src={TestImage} alt="music" />
        <h1 className='text-center text-xl font-bold'> purpose </h1>
        <h3 className='px-4 text-base text-neutral-500 font-medium'> content </h3>
      </Link>

      {/* emotion */}
      <div className='px-4'>
        <EmotionButton size='sm' label='開心' />
      </div>

      {/* <audio className='self-center' src={TestMusic} > */}
      {/* <p>
          Your browser doesn't support HTML5 audio. Here is a
          <a href="myAudio.mp4">link to the audio</a> instead.
        </p> */}
      {/* </audio> */}

      <div className='self-center'>
        <AudioPlayer />
      </div>

    </div>
  )
}

export default CollectCard