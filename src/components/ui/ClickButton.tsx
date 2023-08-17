import clsx from 'clsx';
import React, { FC } from 'react';

type ClickButtonProps = {
  classModificator?: string;
  clickHandler: () => void;
  children: React.ReactNode | string;
  disable?: boolean;
};

export const ClickButton: FC<ClickButtonProps> = ({
  classModificator,
  clickHandler,
  children,
  disable = false,
}) => {
  return (
    <button
      disabled={disable}
      type="button"
      onClick={clickHandler}
      className={clsx(
        classModificator,
        disable ? 'bg-error-80' : null,
        'block w-full text-parS md:text-parM font-medium transition-all duration-150 border rounded-full border-blue-100',
      )}
    >
      {children}
    </button>
  );
};
