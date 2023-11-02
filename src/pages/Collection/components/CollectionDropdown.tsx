import React from 'react'
import { AiOutlineTag } from 'react-icons/ai';
import { FaAngleUp } from 'react-icons/fa';

interface CollectionDropdownProps {
  name: string;
  isAngleIconShow?: boolean;
};

const CollectionDropdown: React.FC<CollectionDropdownProps> = ({ name, isAngleIconShow = true }) => {
  return (
    <>
      <button
        id="collectionDropdownButton"
        data-dropdown-toggle="dropdown"
        type='button'
        className='flex items-center justify-between w-11/12 py-2 px-4 bg-slate-100 text-start text-black font-semibold text-sm rounded-full'
      >
        <span className='flex items-center gap-1'>
          <i className='-rotate-90'>
            <AiOutlineTag size={18} />
          </i>
          {name}
        </span>
        {isAngleIconShow && <FaAngleUp />}
      </button>
    </>
  )
};

export default CollectionDropdown;