import React from 'react'
import EmotionButton from '../../../components/EmotionButton';
import { EmotionProps } from '../../../types/components';
import { selectEmotions } from '../../../utils/emotionConfig';

interface MusicModalProps {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  emotions: Array<EmotionProps>;
  setEmotions: React.Dispatch<React.SetStateAction<Array<EmotionProps>>>;
}

const MusicModal: React.FC<MusicModalProps> = ({ showModal, setShowModal, emotions, setEmotions }) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).className.match('modal-background')) setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        // modal background
        <div className='modal-background fixed top-0 left-0 w-full h-full bg-slate-500 bg-opacity-50 flex items-center justify-center z-50 overflow-auto' onClick={closeModal}>
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

              {selectEmotions.map((emotion: EmotionProps, index: React.Key | null | undefined) => (
                <EmotionButton
                  key={index}
                  label={emotion}
                  selected={emotions.includes(emotion)}
                  disabled={emotions.includes(emotion)}
                  onClick={() => setEmotions(preEmotions => [...preEmotions, emotion])}
                />
              ))}

            </div>
          </div>
        </div >
      ) : null}
    </>
  )
}

export default React.memo(MusicModal);