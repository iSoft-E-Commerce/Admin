import { getSession } from 'next-auth/react';
import { iSoftClient } from '../../client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useModerateQuestion = (id: number) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChangeStatus = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const res =
        await client.adminEndpoints.adminQuestionControllerModerateQuestion({
          questionId: id,
        });
      if (res) {
        toast.success(res.message);
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ['adminTasks'] });
        router.back();
      }
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleChangeStatus,
  };
};
