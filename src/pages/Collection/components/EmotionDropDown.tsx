import React from 'react'
import { AiOutlineTag } from 'react-icons/ai';
import { FaAngleUp } from 'react-icons/fa';
import { EmotionProps } from '../../../types/components';

interface EmotionDropDownProps {
  name: EmotionProps;
  dropdownList?: Array<EmotionProps>;
  isAngleIconShow?: boolean;
  handleClick: (e: React.MouseEvent<HTMLDivElement>, target: EmotionProps) => void
};

const EmotionDropDown: React.FC<EmotionDropDownProps> = ({ name, isAngleIconShow = true, dropdownList, handleClick }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <button
        id="EmotionDropDownButton"
        onClick={() => setShow(prevShow => !prevShow)}
        data-dropdown-toggle="dropdown"
        type='button'
        className='relative flex items-center justify-between w-11/12 py-2 px-4 bg-slate-100 text-start text-black font-semibold text-sm rounded-full'
      >
        <span className='flex items-center gap-2'>
          <i className='-rotate-90'>
            <AiOutlineTag size={18} />
          </i>
          {
            name === "無" ? (
              <>
                搜尋情緒
              </>
            ) : (
              name
            )
          }
        </span>
        {isAngleIconShow && <FaAngleUp />}


        {(show && dropdownList) &&
          <div className='absolute top-2/3 left-0 w-full bg-slate-100 py-3 pb-2 rounded-b-lg z-40'>
            {dropdownList.map((list, index) => {
              return (
                <div
                  key={index.toString()}
                  onClick={(e) => handleClick(e, list)}
                  role='option'
                  aria-selected='true'
                  className='pl-10 py-2.5 hover:bg-slate-800 hover:text-white'
                >
                  {
                    list === '無' ? (
                      <>
                        搜尋情緒
                      </>
                    ) : (
                      list
                    )
                  }
                </div>
              )
            })}
          </div>
        }
      </button>

    </>
  )
};

export default EmotionDropDown;