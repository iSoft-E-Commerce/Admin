import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';

export const SetColorInputs: FC = () => {
  const { register } = useFormContext();
  return (
    <>
      <FormInput
        label={`Назва кольору`}
        name="name"
        placeholder="Rose Gold / Red / Blue..."
        register={register('color.name')}
        type="text"
        required
      />
      <FormInput
        label={`Назва кольору`}
        name="name"
        placeholder="Rose Gold / Red / Blue..."
        register={register('color.color')}
        type="color"
      />
    </>
  );
};
