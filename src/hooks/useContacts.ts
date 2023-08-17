import { getSession } from 'next-auth/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Contacts, iSoftClient, type UpdateContactsDto } from '../../client';

export const useContacts = (contacts: Contacts) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: contacts
      ? {
          contactsId: contacts.id,
          phone: contacts.phone,
          address: contacts.address,
          schedule: contacts.schedule,
          socialMedia: contacts.socialMedia,
        }
      : {
          contactsId: null,
          phone: '',
          address: '',
          schedule: '',
          socialMedia: [],
        },
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'socialMedia',
  });

  const handleUpdateContacts = async (data: UpdateContactsDto) => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });

    try {
      await client.adminEndpoints.adminContactsControllerUpdateContacts({
        requestBody: data,
      });
      toast.success('Контакти успішно оновлені');
    } catch (err: any) {
      toast.error(err.message as string);
    }
  };

  return {
    handleUpdateContacts,
    isLoading,
    errors,
    register,
    handleSubmit,
    prepend,
    remove,
    fields,
    reset,
  };
};
