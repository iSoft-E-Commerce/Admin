import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormInput } from '../forms/FormInput';
import { ClickButton } from '../ui/ClickButton';

export const EditAdditionalCharacteristics: FC = () => {
  const { register, control } = useFormContext();
  const { fields, remove, prepend } = useFieldArray({
    control: control,
    name: 'additionalCharacteristics',
  });

  return (
    <div>
      <h3 className="text-parM font-semibold mb-3">Додаткові характеристики</h3>
      <ClickButton
        classModificator="hover:bg-blue-10 mb-4 md:p-1.5"
        clickHandler={() => prepend({ name: '', value: '' })}
      >
        Додати характеристику
      </ClickButton>
      {fields.map((field, index) => (
        <div className="flex items-center gap-2" key={field.id}>
          <div className="flex flex-col flex-1 sm:flex-row items-center gap-1">
            <FormInput
              label={'Назва'}
              name={`additionalCharacteristics.${index}.name`}
              placeholder={'Xарактеристика'}
              register={register(`additionalCharacteristics.${index}.name`)}
              type="text"
            />
            <FormInput
              label={'Значення'}
              name={`additionalCharacteristics.${index}.value`}
              placeholder={'Значення'}
              register={register(`additionalCharacteristics.${index}.value`)}
              type="text"
            />
          </div>
          <ClickButton
            classModificator="hover:bg-error-20 max-w-mobileDeleteBtn md:max-w-deleteBtn md:h-input"
            clickHandler={() => remove(index)}
          >
            <img
              src={'/icons/trash-logo.svg'}
              alt="trash-logo"
              className="w-5 h-8 mx-auto"
            />
          </ClickButton>
        </div>
      ))}
    </div>
  );
};
