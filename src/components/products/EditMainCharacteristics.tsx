import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';

export const EditMainCharacteristics: FC = () => {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control: control,
    name: 'characteristics',
  });

  return (
    <div className="border-b mb-6 border-gray-400">
      <h3 className="text-parM font-semibold mb-3">Основні характеристики</h3>
      {fields.map((field, index) => (
        <div className="flex items-center gap-2" key={field.id}>
          <div className="flex flex-col flex-1 sm:flex-row items-center gap-1">
            <FormInput
              disabled
              label={'Назва'}
              name={`characteristics.${index}.name`}
              placeholder={'Xарактеристика'}
              register={register(`characteristics.${index}.name`)}
              type="text"
            />
            <FormInput
              label={'Значення'}
              name={`characteristics.${index}.value`}
              placeholder={'Значення'}
              register={register(`characteristics.${index}.value`)}
              type="text"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
