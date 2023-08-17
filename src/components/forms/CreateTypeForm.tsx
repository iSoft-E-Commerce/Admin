import { useCreateType } from '@/hooks/useCreateType';
import clsx from 'clsx';
import { FC } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { ClickButton } from '../ui/ClickButton';
import { ResetButton } from '../ui/ResetButton';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';

export const CreateTypeForm: FC = () => {
  const {
    handleCreateType,
    isLoading,
    errors,
    register,
    handleSubmit,
    prepend,
    remove,
    fields,
    reset,
    control,
  } = useCreateType();

  return (
    <>
      <div className="max-w-homeForm w-full mx-auto">
        <form onSubmit={handleSubmit(handleCreateType)}>
          <FormInput
            label={`Назва категорії`}
            name="name"
            placeholder={`IPhone / Macbook ...`}
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
            type="text"
            errors={errors.name as FieldError}
            required
          />
          <ClickButton
            classModificator="hover:bg-blue-10 mb-4 md:p-1.5"
            clickHandler={() => prepend({ name: '', value: '' })}
          >
            Додати характеристику
          </ClickButton>
          {fields.map((field, index) => (
            <div className="flex items-center gap-1" key={field.id}>
              <Controller
                control={control}
                name={`characteristics.${index}.name`}
                render={({ field, fieldState }) => (
                  <FormInput
                    label={`Назва характерстики`}
                    name="characteristics"
                    placeholder={`Камера / Діагональ ...`}
                    register={register(`characteristics.${index}.name`, {
                      required: `Обов'язкове поле`,
                      minLength: {
                        value: 2,
                        message: 'Повинно бути мінімум 2 літери',
                      },
                      pattern: {
                        value:
                          /^[а-яА-ЯіІїЇєЄ'A-Za-z0-9]+(?:[ ][а-яА-ЯіІїЇєЄ'A-Za-z0-9]+)*$/,
                        message:
                          'Тільки літери та цифри (пробіли тільки між словами)',
                      },
                    })}
                    type="text"
                    errors={fieldState.error}
                    required
                  />
                )}
              />
              <ClickButton
                classModificator="hover:bg-error-20 max-w-mobileDeleteBtn md:max-w-deleteBtn md:h-input"
                clickHandler={() => remove(index)}
              >
                <img
                  src={'icons/trash-logo.svg'}
                  alt="trash-logo"
                  className="w-5 h-8 mx-auto"
                />
              </ClickButton>
            </div>
          ))}
          <div className="flex items-center justify-between gap-2">
            <SubmitButton
              disabled={isLoading ? true : false}
              classNameModificator={clsx('w-full py-1 md:py-2.5')}
            >
              {isLoading ? 'Завантаження...' : 'Створити'}
            </SubmitButton>
            <ResetButton
              classModificator="py-1 md:py-2.5"
              reset={() =>
                reset({ name: '', characteristics: [{ name: '', value: '' }] })
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};
