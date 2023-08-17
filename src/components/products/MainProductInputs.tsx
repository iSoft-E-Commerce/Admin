import { FC } from 'react';
import { useFormContext, type FieldError } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';

export const MainProductInputs: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormInput
        label={`Назва продукту`}
        name="name"
        placeholder={`iPhone 12 Pro`}
        register={register('name', {
          required: `Назва продукту обов'язкове поле`,
          minLength: {
            value: 2,
            message: 'Назва продукту мінімум 2 літери',
          },
          pattern: {
            value: /^[A-Za-z0-9]+(?:[ ][A-Za-z0-9]+)*$/,
            message: 'Тільки літери та цифри (пробіли тільки між словами)',
          },
        })}
        type="text"
        errors={errors.name as FieldError}
        required
      />
      <FormInput
        label="Повний опис"
        name="description"
        placeholder="iPhone 12 Pro 128GB Red"
        register={register('description', {
          required: `Обов'язкове поле`,
          minLength: {
            value: 5,
            message: 'Опис повинен мати мінімум 5 літери',
          },
          pattern: {
            value: /^[A-Za-z0-9]+(?:[ ][A-Za-z0-9]+)*$/,
            message: 'Тільки літери та цифри (пробіли тільки між словами)',
          },
        })}
        type="text"
        errors={errors.description as FieldError}
        required
      />
      <FormInput
        label={`Пам'ять`}
        name="memory"
        placeholder="128GB / 256GB / 512GB ..."
        register={register('memory')}
        type="text"
      />
      <FormInput
        label="Зображення"
        name="img"
        placeholder="http://img.com"
        register={register('img')}
        type="text"
        errors={errors.img as FieldError}
      />
      <div className="flex items-center">
        <FormInput
          label="У наявності"
          name="isAvailable"
          register={register('isAvailable')}
          type="checkbox"
        />
        <FormInput
          label="Новинка"
          name="newproduct"
          register={register('isNewProduct')}
          type="checkbox"
        />
      </div>
    </>
  );
};
