import React from 'react'
import EmotionButton from '../../components/EmotionButton';

interface MusicModalProps {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicModal: React.FC<MusicModalProps> = ({ showModal, setShowModal }) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).className.match('modal-background')) setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        // modal background
        <div className='modal-background absolute top-0 left-0 w-full h-full bg-slate-500 bg-opacity-50 flex items-center justify-center' onClick={closeModal}>
          {/* modal content */}
          <div className='flex flex-col p-2 bg-slate-50 rounded-lg'>
            <button
              className='p-2 text-red-500 self-start '
              onClick={() => setShowModal(false)}
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>

            <h3 className='self-center mb-4 text-2xl font-bold text-gray-900'> 添加更多感受 </h3>

            {/* 情緒列表 */}
            <div className='px-12 pb-4'>
              <EmotionButton label='開心' />
              <EmotionButton label='悲傷' />
              <EmotionButton label='浪漫' />
              <EmotionButton label='憤怒' />
              <EmotionButton color='blue' label='緊張' />
            </div>
          </div>
        </div >
      ) : null}
    </>
  )
}

export default MusicModal