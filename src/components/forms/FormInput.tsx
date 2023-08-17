import clsx from 'clsx';
import { FC } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label?: string;
  errors?: FieldError;
  register: UseFormRegisterReturn<string>;
  type: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
};

export const FormInput: FC<InputProps> = ({
  label,
  errors,
  register,
  type,
  placeholder,
  name,
  required,
  disabled = false,
}) => {
  return (
    <label
      className={clsx(
        'block w-full relative mb-6 text-parS md:text-parM font-medium',
        type === 'checkbox' ? 'pointer-events-none' : null,
      )}
      htmlFor={name}
    >
      {label} {required ? <span className="text-error-100">*</span> : null}
      {errors && (
        <p className="text-error-100 md:absolute top-1 right-0 text-quot font-medium">
          {errors.message}
        </p>
      )}
      <input
        disabled={disabled}
        id={name}
        className={clsx(
          'w-full px-3.5 py-1 md:py-2.5 border rounded-full outline-none md:h-input mt-1',
          errors ? 'shadow-error-100 shadow-insetErrorInput' : null,
          type === 'checkbox'
            ? 'max-w-checkbox block cursor-pointer pointer-events-auto'
            : null,
          disabled ? 'text-darkSkyBlue-60' : null,
        )}
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </label>
  );
};
