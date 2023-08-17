import { useDebounceValue } from '@/hooks/useDebounce';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

type SearchBarProps = {
  setDebouncedSearch: Dispatch<SetStateAction<string>>;
};

export const SearchBar: FC<SearchBarProps> = ({ setDebouncedSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounceValue(searchValue.trim(), 500);

  useEffect(() => {
    setDebouncedSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <input
        className="text-parS font-medium w-full pl-3 py-1 sm:pl-5 sm:py-2.5 pr-10 border rounded-full outline-none"
        type="text"
        placeholder="Пошук"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <img
        src="icons/search.svg"
        alt="search icon"
        className="w-7 h-7 absolute top-1/2 right-3 -translate-y-1/2"
      />
    </>
  );
};
