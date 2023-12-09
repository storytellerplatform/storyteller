import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';

interface CollectionSearchProps {
  search: string;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<string>>
};

const CollectionSearch: React.FC<CollectionSearchProps> = ({ search, handleKeyDown, setSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='p-0 m-0 w-full bg-slate-100 text-sm indent-0 placeholder:text-black'
          placeholder='收尋名稱'
        />
      </label>
    </>
  )
};

export default CollectionSearch;