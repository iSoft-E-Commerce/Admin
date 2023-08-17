import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Characteristics, Type } from '../../../client';
import { FormInput } from '../forms/FormInput';

type TypeCharacteristicsProps = {
  currTypes: Type[];
  characteristics: Characteristics[];
  setCharacteristics: Dispatch<SetStateAction<Characteristics[]>>;
};

export const TypeCharacteristics: FC<TypeCharacteristicsProps> = ({
  currTypes,
  characteristics,
  setCharacteristics,
}) => {
  const { register, setValue, control } = useFormContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('typeId', e.target.value, { shouldValidate: false });

    const currCharacteristics = currTypes.find(
      (type) => type.id === parseInt(e.target.value),
    )?.characteristics;

    setCharacteristics(currCharacteristics as Characteristics[]);
    setValue('characteristics', currCharacteristics);
  };

  useEffect(() => {
    setValue('characteristics', currTypes[0].characteristics);
  }, []);

  return (
    <>
      <div className="absolute -top-3 md:-top-5 left-0">
        <Controller
          name="typeId"
          control={control}
          defaultValue={currTypes[0].id}
          render={({ field }) => (
            <div className="w-40 relative">
              <select
                className="w-full appearance-none text-parS md:text-parM font-medium bg-white border border-blue-60 rounded-md py-0.5 md:py-1 pl-2 pr-5 focus:outline-none focus:border-blue-100"
                {...field}
                onChange={handleSelectChange}
              >
                {currTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-100">
                <img src="/icons/select-arrow.svg" alt="select" />
              </div>
            </div>
          )}
        />
      </div>
      {characteristics.map((field, index) => (
        <FormInput
          key={field.name}
          label={field.name}
          name={`characteristics.${index}.value`}
          placeholder={`Введіть значення`}
          register={register(`characteristics.${index}.value`)}
          type="text"
        />
      ))}
    </>
  );
};
