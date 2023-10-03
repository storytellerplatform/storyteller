import React from 'react'

import { BiSolidDownload } from 'react-icons/bi'

interface DownloadButtonProps {
  src: 'string',
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ src }) => {
  return (
    <button
      type='button'
      className='py-2 px-4 ring-2 ring-orange-300 rounded-full text-lg text-orange-300 font-bold cursor-pointer transition-all duration-200 ease-out hover:text-white hover:bg-orange-300'
    >
      <a className='flex items-center gap-2' href={src} download>
        <BiSolidDownload size={24} className='font-bold' />
        下載
      </a>
    </button>
  )
}

export default DownloadButton