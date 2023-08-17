import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { toast } from 'react-toastify';

export type LoginInputs = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { status } = useSession();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
      callbackUrl: '/',
    });
    if (res?.error) {
      toast.error(res.error);
    } else {
      reset();
    }
  };

  return {
    onSubmit,
    register,
    status,
    handleSubmit,
    errors,
    isLoading,
  };
};
