import React from 'react'
import { AiOutlineTag } from 'react-icons/ai';
import { FaAngleUp } from 'react-icons/fa';

interface CollectionDropdownProps<T> {
  name: T;
  dropdownList?: Array<string>;
  isAngleIconShow?: boolean;
  collectType?: 'Emotion' | 'other',
  handleClick: React.MouseEventHandler<HTMLDivElement>
};

const CollectionDropdown: React.FC<CollectionDropdownProps<any>> = ({ name, isAngleIconShow = true, dropdownList, collectType = 'other', handleClick }) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <>
      <button
        id="collectionDropdownButton"
        onClick={() => setShow(prevShow => !prevShow)}
        data-dropdown-toggle="dropdown"
        type='button'
        className='relative flex items-center justify-between w-11/12 py-2 px-4 bg-slate-100 text-start text-black font-semibold text-sm rounded-full'
      >
        <span className='flex items-center gap-2'>
          <i className='-rotate-90'>
            <AiOutlineTag size={18} />
          </i>
          {name}
        </span>
        {isAngleIconShow && <FaAngleUp />}


        {(show && dropdownList) &&
          <div className='absolute top-2/3 left-0 w-full bg-slate-100 py-3 pb-2 rounded-b-lg z-40'>
            {dropdownList.map((list, index) => {
              return (
                <div
                  key={index.toString()}
                  onClick={(e) => handleClick(e)}
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

export default CollectionDropdown;