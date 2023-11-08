import React from 'react'
import { AiOutlineTag } from 'react-icons/ai';
import { FaAngleUp } from 'react-icons/fa';

interface CollectionDropdownProps {
  name: string;
  dropdownList?: Array<string>;
  isAngleIconShow?: boolean;
};

const CollectionDropdown: React.FC<CollectionDropdownProps> = ({ name, isAngleIconShow = true, dropdownList }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [target, setTarget] = React.useState<string>(name);

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
          {target}
        </span>
        {isAngleIconShow && <FaAngleUp />}


        {(show && dropdownList) &&
          <div className='absolute top-2/3 left-0 w-full bg-slate-100 py-3 pb-2 rounded-b-lg z-40'>
            {dropdownList.map((list, index) => {
              return (
                <div
                  key={index.toString()}
                  onClick={() => setTarget(list)}
                  role='option'
                  aria-selected='true'
                  className='pl-10 py-2.5 hover:bg-slate-800 hover:text-white'
                >
                  {list}
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