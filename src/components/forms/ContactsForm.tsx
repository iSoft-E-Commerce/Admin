import { useContacts } from '@/hooks/useContacts';
import clsx from 'clsx';
import { FC } from 'react';
import { type FieldError } from 'react-hook-form';
import { Contacts } from '../../../client';
import { ClickButton } from '../ui/ClickButton';
import { ResetButton } from '../ui/ResetButton';
import { SubmitButton } from '../ui/SubmitButton';
import { FormInput } from './FormInput';

type ContactFromProps = {
  contactsData: Contacts[];
};

export const ContactsForm: FC<ContactFromProps> = ({ contactsData }) => {
  const {
    handleUpdateContacts,
    isLoading,
    errors,
    register,
    handleSubmit,
    prepend,
    remove,
    fields,
    reset,
  } = useContacts(contactsData[0]);

  return (
    <div className="max-w-contactsForm w-full mx-auto">
      <form onSubmit={handleSubmit(handleUpdateContacts)}>
        <FormInput
          label="Номер телефону"
          name="phone"
          placeholder="0501234321"
          register={register('phone', {
            required: "Номер обов'язкове поле",
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
          label={'Графік роботи'}
          name="schedule"
          placeholder={'10-18'}
          register={register('schedule', {
            required: "Графік обов'язкове поле",
          })}
          type="text"
          errors={errors.schedule as FieldError}
          required
        />
        <FormInput
          label={'Адреса'}
          name="address"
          placeholder={'м. Київ, вул. Набережна, 7'}
          register={register('address')}
          type="text"
        />
        <ClickButton
          classModificator="hover:bg-blue-10 mb-6"
          clickHandler={() => prepend({ img: '', link: '' })}
        >
          Додати соціальну мережу
        </ClickButton>
        {fields.map((field, index) => (
          <div
            className="flex flex-col mb-6 md:flex-row md:gap-3 md:justify-between border-b-2 border-darkSkyBlue-60"
            key={field.id}
          >
            <FormInput
              label={'Посилання'}
              name={`socialMedia.${index}.link`}
              placeholder={'Facebook, Twitter, Instagram, тощо'}
              register={register(`socialMedia.${index}.link`)}
              type="text"
            />
            <FormInput
              label={'Логотип'}
              name={`socialMedia.${index}.img`}
              placeholder={'http://img.com'}
              register={register(`socialMedia.${index}.img`)}
              type="text"
            />
            <ClickButton
              classModificator="hover:bg-error-20 max-w-deleteBtn min-w-deleteBtn md:h-input md:p-2.5 px-1 flex items-center self-center mb-6 md:mb-0"
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
        <div className="flex items-center justify-between gap-4">
          <SubmitButton
            disabled={isLoading ? true : false}
            classNameModificator="w-full py-1 md:py-2.5"
          >
            {isLoading ? 'Завантаження...' : 'Оновити'}
          </SubmitButton>
          <ResetButton
            classModificator="py-1 md:py-2.5"
            reset={() =>
              reset({
                phone: '',
                address: '',
                schedule: '',
                socialMedia: [],
              })
            }
          />
        </div>
      </form>
    </div>
  );
};
