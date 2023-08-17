import React, { FC } from 'react';
import clsx from 'clsx';
import { useLogin } from '@/hooks/useLogin';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';

export const LoginForm: FC = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } = useLogin();
  return (
    <div className='max-w-loginForm w-full mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Пошта'
          name='email'
          placeholder='Example@gmail.com'
          register={register('email', { required: `Пошта обов'язкове поле` })}
          type='email'
          errors={errors.email}
          required
        />
        <FormInput
          label='Пароль'
          name='pass'
          placeholder='************'
          register={register('password', {
            required: `Пароль обов'язкове поле`,
            minLength: { value: 6, message: 'Мінімум 6 символів' },
          })}
          type='password'
          errors={errors.password}
          required
        />
        <SubmitButton
          disabled={isLoading ? true : false}
          classNameModificator={clsx('w-full py-2.5')}
        >
          {isLoading ? 'Завантаження...' : 'Вхід'}
        </SubmitButton>
      </form>
    </div>
  );
};
