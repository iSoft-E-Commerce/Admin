import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { iSoftClient, type Type, type UpdateTypeDto } from '../../client';

type UseEditTypeParams = {
  type: Type;
  handleToggleModal: () => void;
};

export const useEditType = ({ type, handleToggleModal }: UseEditTypeParams) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      name: type.name,
    },
  });

  const handleUpdate = async (data: UpdateTypeDto) => {
    try {
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      await client.adminEndpoints.adminTypeControllerUpdateType({
        id: type.id,
        requestBody: data,
      });
      toast.success('Категорія успішно оновлена.');
      router.replace(router.asPath);
      handleToggleModal();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return {
    isLoading,
    handleSubmit,
    handleUpdate,
    errors,
    register,
  };
};
