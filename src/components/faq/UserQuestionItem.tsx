import { convertDate } from '@/utils/convertDate';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import type { UserQuestion } from '../../../client';

type UserQuestionProps = {
  userQuestion: UserQuestion;
};
export const UserQuestionItem: FC<UserQuestionProps> = ({
  userQuestion: { email, id, isChecked, createdAt, updatedAt },
}) => {
  const { formattedCreatedAt } = convertDate(createdAt, updatedAt);
  return (
    <Link
      href={`/faq/${id}`}
      className={clsx(
        'flex justify-center items-center flex-col gap-2 bg-blue-10 rounded-sm p-1.5 hover:bg-blue-20 transition-all duration-150',
        isChecked ? 'border border-green-500' : 'border border-error-100',
      )}
    >
      <p className="block text-center break-words max-w-full text-parS font-semibold text-darkSkyBlue-90">
        {email}
      </p>
      <span
        className={clsx(
          'font-semibold text-quot',
          isChecked ? 'text-green-500' : 'text-error-100',
        )}
      >
        {formattedCreatedAt}
      </span>
    </Link>
  );
};
