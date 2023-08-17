import clsx from 'clsx';
import React, { FC } from 'react';

type ResetButtonProps = {
  classModificator?: string;
  reset: () => void;
};

export const ResetButton: FC<ResetButtonProps> = ({
  classModificator,
  reset,
}) => {
  return (
    <button
      onClick={reset}
      className={clsx(
        'text-parS md:text-parM font-medium w-full transition-all duration-150 border rounded-full border-blue-100 hover:bg-blue-10',
        classModificator
      )}
    >
      Очистити
    </button>
  );
};
