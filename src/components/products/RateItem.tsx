import { useModerateRate } from '@/hooks/useModerateRate';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { type Rate } from '../../../client';
import { SubmitButton } from '../ui/SubmitButton';
import { ReviewField } from './ReviewField';

type RateProps = {
  rate: Rate;
};

export const RateItem: FC<RateProps> = ({ rate }) => {
  const [isReplyOpen, setIsReply] = useState<boolean>(false);
  const {
    control,
    handleDeleteReview,
    handleModerateReview,
    handleSubmit,
    isLoading,
    deleteLoader,
  } = useModerateRate(rate, setIsReply);
  return (
    <div
      className={'border p-1.5 shadow-sm mb-1 sm:mb-0 bg-blue-10'}
      key={rate.id}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-3">
        <div>
          <p className="text-quot sm:text-parS font-medium">
            Ім'я:{' '}
            <span className="text-blue-700">
              {rate.user.firstName ? rate.user.firstName : '---'}
            </span>
          </p>
          <p className="text-quot sm:text-parS font-medium sm:mb-1">
            Пошта: <span className="text-blue-700">{rate.user.email}</span>
          </p>
        </div>
        <div className="mb-1">
          <p
            className={clsx(
              'text-quot sm:text-parS font-semibold sm:text-right',
              rate.isChecked ? 'text-green-100' : 'text-error-100',
            )}
          >
            {rate.isChecked ? 'Перевірено' : 'Не перевірено'}
          </p>
        </div>
      </div>
      <div className={clsx('flex items-center gap-1 mb-2')}>
        <button
          onClick={() => setIsReply((prev) => !prev)}
          className="bg-green-500 text-white px-1 text-quot rounded font-medium hover:bg-green-600 transition-all duration-100"
        >
          {isReplyOpen ? 'Закрити' : 'Відповісти'}
        </button>
        {!rate.isChecked ? (
          <button
            onClick={() => handleModerateReview({ moderatorReply: null })}
            className="bg-green-500 text-white px-1 text-quot rounded font-medium hover:bg-green-600 transition-all duration-100"
          >
            Розмістити
          </button>
        ) : null}
        <button
          onClick={() => handleDeleteReview(rate.id)}
          className={clsx(
            'bg-error-90 text-white px-1 text-quot rounded font-medium hover:bg-error-100 transition-all duration-100',
            deleteLoader ? 'bg-error-100' : null,
          )}
        >
          {deleteLoader ? 'Видалення..' : 'Видалити'}
        </button>
      </div>
      {isReplyOpen ? (
        <div className="mb-2 bg-stroke p-1">
          <form onSubmit={handleSubmit(handleModerateReview)}>
            <div className="flex items-center gap-1">
              <Controller
                name="moderatorReply"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full outline-none border py-1 px-2.5 text-parS font-medium rounded-sm resize-y overflow-y-auto" // Добавьте необходимые стили
                    placeholder={`Введіть текст`}
                  />
                )}
              />
              <SubmitButton
                disabled={isLoading ? true : false}
                classNameModificator={clsx('p-1 self-end')}
              >
                <img
                  src="/icons/check-mark.svg"
                  className="w-5 h-5"
                  alt="check"
                />
              </SubmitButton>
            </div>
          </form>
        </div>
      ) : null}
      <ReviewField classNameModificator="bg-stroke p-1" review={rate.review}>
        {rate.rate === 0 ? (
          <span className="text-quot font-semibold text-darkSkyBlue-80">
            Питання користувача
          </span>
        ) : (
          <>
            <span className="text-quot font-semibold text-darkSkyBlue-80">
              Оцінка:
            </span>
            <span className="text-blue-700 font-semibold ml-2">
              {rate.rate}
            </span>
          </>
        )}
      </ReviewField>
      {rate.moderatorReply?.reply ? (
        <ReviewField
          classNameModificator="bg-stroke p-1"
          review={rate.moderatorReply.reply}
        >
          <span className="text-quot font-semibold text-darkSkyBlue-80">
            Представник iSoft:
          </span>
          <span className="text-quot text-blue-700 font-semibold ml-2">
            {rate.moderatorReply.name}
          </span>
        </ReviewField>
      ) : null}
    </div>
  );
};
