import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

interface CollectionSearchProps {
  name: string;
};

const CollectionSearch: React.FC<CollectionSearchProps> = ({ name }) => {
  return (
    <>
      <label
        htmlFor='collectionSearch'
        className='flex items-center gap-2 w-11/12 py-2 px-4 bg-slate-100 text-start text-black font-semibold text-sm rounded-full'
      >
        <AiOutlineSearch size={20} />
        <input
          id="collectionSearch"
          type='text'
          className='p-0 m-0 w-full bg-slate-100 text-sm indent-0 placeholder:text-black'
          placeholder='收尋名稱'
        />
      </label>
    </>
  )
};

export default CollectionSearch;