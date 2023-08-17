import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';

export const PriceProdctInputs: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormInput
        label={`Ціна ГРН`}
        name="price"
        placeholder="12999"
        register={register('price.price', {
          required: `Ціна обов'язкове поле`,
          minLength: {
            value: 2,
            message: 'Повинно бути не менше 2 цифр',
          },
          maxLength: {
            value: 6,
            message: 'Повинно бути не більше 6 цифр',
          },
          pattern: {
            value: /^[1-9][0-9]*$/,
            message: 'Тільки цілі числа, не починаючись з нуля и без пробілів',
          },
        })}
        type="text"
        //@ts-ignore
        errors={errors?.price?.price}
        required
      />
      <FormInput
        label={`Знижка у ГРН`}
        name="discount"
        placeholder="50 / 100 / 200 ..."
        register={register('price.discount', {
          minLength: {
            value: 1,
            message: 'Повинно бути не менше 1 цифри',
          },
          maxLength: {
            value: 6,
            message: 'Повинно бути не більше 6 цифр',
          },
          pattern: {
            value: /^[1-9][0-9]*$/,
            message: 'Тільки цілі числа, не починаючись з нуля и без пробілів',
          },
        })}
        type="text"
        //@ts-ignore
        errors={errors?.price?.discount}
      />
    </>
  );
};
