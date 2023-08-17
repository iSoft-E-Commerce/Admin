import React, { FC } from 'react';

type DateProps = {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
export const CreatedAtAndUpdatedAt: FC<DateProps> = ({
  formattedCreatedAt,
  formattedUpdatedAt,
}) => {
  return (
    <div className="flex items-center flex-col justify-center gap-2 border rounded-sm p-2.5">
      <p className="text-parS font-semibold">
        Створено:{' '}
        <span className="ml-3 text-blue-90">{formattedCreatedAt}</span>
      </p>
      <p className="text-parS font-semibold">
        Оновлено:
        <span className="ml-3 text-blue-90">{formattedUpdatedAt}</span>
      </p>
    </div>
  );
};
