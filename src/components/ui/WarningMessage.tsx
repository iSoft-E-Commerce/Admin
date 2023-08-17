import React, { FC } from 'react';

type WarningMessageProps = {
  children: React.ReactNode | string;
};
export const WarningMessage: FC<WarningMessageProps> = ({ children }) => {
  return <div className="text-parM font-medium text-center">{children}</div>;
};
