import classNames from 'classnames'
import React from 'react'

import { LiaDownloadSolid } from 'react-icons/lia'

interface DownloadButtonProps {
  src: string,
  whitemode: boolean
  classnames?: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ src, whitemode, classnames }) => {
  return (
    <button
      type='button'
      className={classNames(`flex items-center justify-center w-full py-1 md:py-2 px-2 md:px-8 border-2 rounded-full text-sm md:text-base tracking-widest  font-semibold cursor-pointer transition-all duration-200 ease-out ${classnames}`,
        { 'border-white text-white bg-black hover:text-black hover:bg-white': !whitemode },
        { 'border-black text-black hover:text-white hover:bg-black': whitemode })}
    >
      <a className='flex items-center' href={src} download>
        <LiaDownloadSolid size={24} className='font-bold' />
        下載
      </a>
    </button>
  )
}

export default DownloadButton