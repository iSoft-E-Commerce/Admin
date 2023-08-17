import { useModerateQuestion } from '@/hooks/useModerateQuestion';
import { convertDate } from '@/utils/convertDate';
import clsx from 'clsx';
import { FC } from 'react';
import { type UserQuestion } from '../../../client';
import { ClickButton } from '../ui/ClickButton';
import { CreatedAtAndUpdatedAt } from '../ui/CreatedAtAndUpdatedAt';

type UserQuestionDataProps = {
  userQuestion: UserQuestion;
};

export const UserQuestionData: FC<UserQuestionDataProps> = ({
  userQuestion: {
    createdAt,
    email,
    fullName,
    isChecked,
    question,
    id,
    updatedAt,
  },
}) => {
  const { handleChangeStatus, isLoading } = useModerateQuestion(id);
  const { formattedCreatedAt, formattedUpdatedAt } = convertDate(
    createdAt,
    updatedAt,
  );

  return (
    <>
      <div className="flex p-1.5 gap-2 mb-4 items-start flex-col lg:flex-row">
        <div className="bg-blue-20 border break-words w-full lg:max-w-question p-1">
          <h3 className="pl-1 text-parS font-bold">Користувач</h3>
          <div className="flex flex-col gap-1 bg-white p-2.5 mb-4">
            <span className="text-quot lg:text-parS font-semibold">
              {fullName}
            </span>
            <span className="text-quot lg:text-parS font-medium">{email}</span>
          </div>
          {!isChecked ? (
            <ClickButton
              disable={isLoading}
              classModificator={clsx(
                isChecked
                  ? 'bg-green-300 hover:bg-green-500'
                  : 'bg-error-80 hover:bg-error-100',
                '',
              )}
              clickHandler={handleChangeStatus}
            >
              {isLoading ? 'Обробка...' : 'Перевірити'}
            </ClickButton>
          ) : null}
        </div>
        <div className={clsx('break-words p-1 grow bg-blue-20 border')}>
          <div className="flex justify-between items-center">
            <h3 className="pl-1 text-parS font-semibold">Питання</h3>
            <span
              className={clsx(
                'text-quot font-semibold',
                isChecked ? 'text-green-600' : 'text-error-100',
              )}
            >
              {isChecked ? 'Перевірено' : 'Не перевірено'}
            </span>
          </div>
          <div className="w-full bg-white p-1.5 md:p-2.5 max-h-40 overflow-auto">
            <p className="text-quot md:text-parS font-medium">{question}</p>
          </div>
        </div>
      </div>
      <CreatedAtAndUpdatedAt
        formattedCreatedAt={formattedCreatedAt}
        formattedUpdatedAt={formattedUpdatedAt}
      />
    </>
  );
};
