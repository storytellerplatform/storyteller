import classNames from 'classnames'
import React from 'react'

import { LiaDownloadSolid } from 'react-icons/lia'
import { handleDownload } from '../utils/handleClick'

interface DownloadButtonProps {
  whitemode: boolean
  classnames?: string
  fileName: string
  blobData: Blob
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ whitemode, classnames, fileName, blobData }) => {

  return (
    <button
      type='button'
      onClick={() => handleDownload(blobData, fileName)}
      className={classNames(`flex items-center justify-center w-full py-1 md:py-2 px-2 md:px-8 border-2 rounded-full text-sm md:text-base tracking-widest  font-semibold cursor-pointer transition-all duration-200 ease-out ${classnames}`,
        { 'border-white text-white bg-black hover:text-black hover:bg-white': !whitemode },
        { 'border-black text-black hover:text-white hover:bg-black': whitemode })}
    >
      <LiaDownloadSolid size={24} />
      下載
    </button>
  )
}

export default DownloadButton