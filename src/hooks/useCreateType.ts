import { getSession } from 'next-auth/react';
import { CreateTypeDto, iSoftClient } from '../../client';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const useCreateType = () => {
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors, isSubmitting: isLoading },
    handleSubmit,
    control,
  } = useForm<CreateTypeDto>({
    defaultValues: {
      name: '',
      characteristics: [{ name: '', value: '' }],
    },
  });
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'characteristics',
  });
  const handleCreateType = async (data: CreateTypeDto) => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    try {
      await client.adminEndpoints.adminTypeControllerCreateType({
        requestBody: data,
      });
      reset({ name: '', characteristics: [{ name: '', value: '' }] });
      router.replace(router.asPath);
      toast.success('Нова категорія створена успішно!');
    } catch (err: any) {
      toast.error(err.message as string);
      reset({ name: '', characteristics: [{ name: '', value: '' }] });
    }
  };

  return {
    handleCreateType,
    isLoading,
    errors,
    register,
    handleSubmit,
    prepend,
    remove,
    fields,
    control,
    reset,
  };
};
