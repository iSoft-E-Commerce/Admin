import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ChangeStatusDto, iSoftClient } from '../../client';
import { useState } from 'react';

export const useUserHandles = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUserDelete = async (id: number) => {
    try {
      setLoading(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      await client.adminEndpoints.adminControllerDeleteUser({
        id,
      });
      setLoading(false);
      router.replace(router.asPath);
      toast.success('Користувача успішно видалено.');
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleChangeUserRole = async (data: ChangeStatusDto) => {
    try {
      setLoading(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      await client.adminEndpoints.adminControllerChangeUserRole({
        requestBody: data,
      });
      setLoading(false);
      router.replace(router.asPath);
      toast.success('Роль успішно оновлено.');
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleUsersSearch = async (searchQuery: string) => {
    try {
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const users = await client.adminEndpoints.adminControllerSearchUsers({
        q: searchQuery,
      });
      return users;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return {
    isLoading,
    handleUserDelete,
    handleChangeUserRole,
    handleUsersSearch,
  };
};
