import clsx from 'clsx';
import { FC } from 'react';
import { type FieldError } from 'react-hook-form';
import { type Type } from '../../../client';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';
import { useEditType } from '@/hooks/useEditType';

type EditTypeProps = {
  type: Type;
  handleToggleModal: () => void;
};

export const EditTypeForm: FC<EditTypeProps> = ({
  type,
  handleToggleModal,
}) => {
  const { errors, handleSubmit, handleUpdate, isLoading, register } =
    useEditType({ type, handleToggleModal });
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className='flex items-center gap-1 md:gap-2'>
          <FormInput
            label={`Назва категорії`}
            name='name'
            placeholder={`Назва категорії`}
            register={register('name', {
              required: `Назва обов'язкове поле`,
              minLength: {
                value: 2,
                message: 'Назва повинно мати мінімум 2 літери',
              },
              pattern: {
                value: /^[а-яА-Яa-zA-ZіІїЇєЄ']+$/,
                message: 'Тільки літери без пробілів',
              },
            })}
            type='text'
            errors={errors.name as FieldError}
            required
          />
          <SubmitButton
            disabled={isLoading ? true : false}
            classNameModificator={clsx(
              'w-full py-1 max-w-deleteBtn md:py-2.5 flex items-center justify-center'
            )}
          >
            {isLoading ? (
              '...'
            ) : (
              <img
                className='w-5 h-6'
                src={'/icons/check-mark.svg'}
                alt='check-logo'
              />
            )}
          </SubmitButton>
        </div>
      </form>
    </>
  );
};
