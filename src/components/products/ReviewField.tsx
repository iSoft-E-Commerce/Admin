import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

type ReviewFieldProps = {
  children: ReactNode;
  review: string;
  classNameModificator?: string;
};
export const ReviewField: FC<ReviewFieldProps> = ({
  children,
  review,
  classNameModificator,
}) => {
  return (
    <div className={clsx('mb-2', classNameModificator)}>
      <p className="text-quot ml-1.5 font-medium text-right">{children}</p>
      <p className="block text-quot lg:text-parS overflow-y-auto h-16 py-1 px-1.5 font-medium bg-white break-words">
        {review}
      </p>
    </div>
  );
};
