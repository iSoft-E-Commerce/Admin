import { FC, ReactNode } from 'react';

type SearchedValuesProps = {
  children: ReactNode;
};

export const SearchedValues: FC<SearchedValuesProps> = ({ children }) => {
  return (
    <div className="max-h-searchedValues absolute top-[110%] w-full bg-darkSkyBlue-10 z-[5] border overflow-y-auto p-5 flex flex-col gap-2">
      {children}
    </div>
  );
};
