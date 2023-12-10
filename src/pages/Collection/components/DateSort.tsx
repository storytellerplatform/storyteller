import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

interface DateSortProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const DateSort: React.FC<DateSortProps> = ({ handleClick }) => {
  return (
    <>
      <label
        htmlFor='DateSort'
        className='flex gap-2 w-11/12 py-2 px-4 bg-slate-100 text-start text-black font-semibold text-sm rounded-full'
      >
        <AiOutlineSearch size={20} />
        <button
          id="DateSort"
          type='button'
          onClick={handleClick}
          className='flex p-0 m-0 w-full bg-slate-100 text-sm indent-0 placeholder:text-black'
        >
          日期順序
        </button>
      </label>
    </>
  )
};

export default DateSort;