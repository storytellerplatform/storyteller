import React from 'react'
import { EmotionProps } from '../types/components'

import TestImg from '../assets/music-bg-test.jpg';

interface MusicCardProps {
  name: string,
  emotions: Array<EmotionProps>,
  bpm?: number,
  time?: number,
}

const MusicCard: React.FC<MusicCardProps> = () => {
  return (
    <>
      <div className='flex items-center bg-gradient-to-tr border rounded-lg py-6 px-8 shadow-xl cursor-pointer transition-all ease-in duration-150 hover:transition-all hover:ease-in hover:-translate-y-1'>
        <img className='w-1/12 rounded-lg' src={TestImg} alt='music' />
        {/* name */}
        <h1 className='text-lg ml-16'> name </h1>

        {/* emotions */}
        {/* <EmotionButton /> */}
        <div className='ml-16'>emotion</div>

        {/* 量度音樂速度，音樂單位（BPM，beats per minute） */}
        <span className='ml-16'> 100 bpm </span>

        {/* time */}
        <span className='ml-16'> 3:00 </span>

        {/* web audio api */}
        <div className='mx-auto'>web audio api</div>

        {/* 試聽 icon */}
        <div className='ml-16'>|</div>

        {/* 收藏、下載 icon */}
        <div className='ml-16'>a</div>
      </div>
    </>
  )
}

export default MusicCard