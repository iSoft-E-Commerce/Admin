import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { type ModerateRateDto, type Rate, iSoftClient } from '../../client';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useModerateRate = (
  rate: Rate,
  setIsReply: (b: boolean) => void,
) => {
  const queryClient = useQueryClient();
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const {
    formState: { isSubmitting: isLoading },
    reset,
    handleSubmit,
    control,
  } = useForm({ defaultValues: { moderatorReply: '' } });
  const router = useRouter();

  const handleModerateReview = async ({ moderatorReply }: ModerateRateDto) => {
    try {
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const res =
        await client.adminEndpoints.adminRateControllerModerateUserReview({
          rateId: rate.id,
          requestBody: { moderatorReply },
        });
      if (res) toast.success(res.message);
      reset({ moderatorReply: '' });
      queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
      router.replace(router.asPath);
      setIsReply(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteReview = async (rateId: number) => {
    try {
      setDeleteLoader(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const res = await client.adminEndpoints.adminRateControllerDeleteRate({
        rateId,
      });
      if (res) {
        setDeleteLoader(false);
        toast.success(res.message);
      }
      queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
      router.replace(router.asPath);
    } catch (err: any) {
      setDeleteLoader(false);
      toast.error(err.message);
    }
  };

  return {
    handleDeleteReview,
    handleModerateReview,
    isLoading,
    handleSubmit,
    control,
    deleteLoader,
  };
};
