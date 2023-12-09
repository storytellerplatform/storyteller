import classNames from 'classnames'
import React from 'react'

import { LiaDownloadSolid } from 'react-icons/lia'

interface DownloadButtonProps {
  whitemode: boolean
  classnames?: string
  fileName: string
  blobData: Blob
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ whitemode, classnames, fileName, blobData }) => {
  const handleDownload = (blobData: Blob, fileName: string) => {
    // 创建 Blob 对象（这里使用示例文本）
    const blob = new Blob([blobData], { type: 'audio/mpeg' });

    // 创建 URL 对象
    const url = window.URL.createObjectURL(blob);

    // 创建一个虚拟链接并触发点击以下载
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // 指定文件名
    link.click();

    // 释放 URL 对象
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      type='button'
      onClick={() => handleDownload(blobData, fileName)}
      className={classNames(`flex items-center justify-center w-full py-1 md:py-2 px-2 md:px-8 border-2 rounded-full text-sm md:text-base tracking-widest  font-semibold cursor-pointer transition-all duration-200 ease-out ${classnames}`,
        { 'border-white text-white bg-black hover:text-black hover:bg-white': !whitemode },
        { 'border-black text-black hover:text-white hover:bg-black': whitemode })}
    >
      <LiaDownloadSolid size={24} className='font-bold' />
      下載
    </button>
  )
}

export default DownloadButton