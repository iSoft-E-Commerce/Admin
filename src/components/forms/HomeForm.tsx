import clsx from 'clsx';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import { useForm, type FieldError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { iSoftClient, type UpdateUserDto } from '../../../client';
import type { HomeFromProps } from '../../../types/home-types';
import { ResetButton } from '../ui/ResetButton';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';

export const HomeForm: FC<HomeFromProps> = ({ userData }) => {
  const { email, firstName, phone, lastName, img } = userData;
  const {
    register,
    reset,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email,
      firstName,
      phone,
      lastName,
      img,
    },
  });

  const handleUpdateUserData = async (data: UpdateUserDto) => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    try {
      await client.userEndpoints.userControllerUpdateUserData({
        requestBody: data,
      });
      toast.success('Оновлення даних успішне.');
    } catch (err: any) {
      toast.error(err.message as string);
    }
  };
  return (
    <div>
      <div className="max-w-homeForm w-full mx-auto">
        <form onSubmit={handleSubmit(handleUpdateUserData)}>
          <FormInput
            label={`Ім'я`}
            name="firstName"
            placeholder={`Ваше ім'я`}
            register={register('firstName', {
              required: `Ім'я обов'язкове поле`,
              minLength: {
                value: 2,
                message: "Ім'я повинно мати мінімум 2 літери",
              },
              pattern: {
                value: /^[а-яА-Яa-zA-ZіІїЇєЄ']+$/,
                message: 'Тільки літери без пробілів',
              },
            })}
            type="text"
            errors={errors.firstName as FieldError}
            required
          />
          <FormInput
            label="Прізвище"
            name="lastName"
            placeholder="Ваше прізвище"
            register={register('lastName', {
              minLength: {
                value: 2,
                message: 'Прізвище повинно мати мінімум 2 літери',
              },
              pattern: {
                value: /^[а-яА-Яa-zA-ZіІїЇєЄ']+$/,
                message: 'Тільки літери без пробілів',
              },
            })}
            type="text"
            errors={errors.lastName as FieldError}
          />
          <FormInput
            label="Пошта"
            name="email"
            placeholder="Example@gmail.com"
            register={register('email', { required: `Пошта обов'язкове поле` })}
            type="email"
            errors={errors.email as FieldError}
            required
          />
          <FormInput
            label="Номер телефону"
            name="phone"
            placeholder="0501234321"
            register={register('phone', {
              required: `Номер обов'язкове поле`,
              minLength: {
                value: 10,
                message: 'Повинно бути не менше 10 символів',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Тільки цифри без пробілів',
              },
            })}
            type="text"
            errors={errors.phone as FieldError}
            required
          />
          <FormInput
            label="Фото"
            name="img"
            placeholder="http://img.com"
            register={register('img')}
            type="text"
            errors={errors.img as FieldError}
          />
          <div className="flex items-center justify-between gap-4">
            <SubmitButton
              disabled={isLoading ? true : false}
              classNameModificator={clsx('w-full py-1 md:py-2.5')}
            >
              {isLoading ? 'Завантаження...' : 'Оновити'}
            </SubmitButton>
            <ResetButton
              classModificator="py-1 md:py-2.5"
              reset={() =>
                reset({
                  email: '',
                  firstName: '',
                  phone: '',
                  lastName: '',
                  img: '',
                })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};
