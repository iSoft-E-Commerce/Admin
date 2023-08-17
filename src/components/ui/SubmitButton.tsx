import React, { FC } from 'react';
import clsx from 'clsx';

type SubmitButtonProps = {
  children: React.ReactNode;
  classNameModificator?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  classNameModificator,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={clsx(
        'text-parS md:text-parM font-medium text-center rounded-full bg-gradient-to-r from-blue-800 to-blue-100 text-white',
        classNameModificator,
        disabled
          ? 'bg-gradient-to-r from-blue-600 to-blue-200 animate-pulse'
          : null,
      )}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
