import React, { FC } from 'react';

type TitleProps = {
  children: React.ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h2 className="text-parL md:text-dispS1 text-center font-bold mb-4">
      {children}
    </h2>
  );
};
