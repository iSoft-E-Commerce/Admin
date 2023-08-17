import clsx from 'clsx';
import React, { FC } from 'react';

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const Tab: FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={clsx(
        'md:py-1.5 w-full text-black text-parM font-medium border border-blue-100 focus:outline-none',
        isActive ? 'bg-blue-20' : null,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
