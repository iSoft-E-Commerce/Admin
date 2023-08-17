import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { iSoftClient, type Type } from '../../client';

export const useDeleteType = (type: Type) => {
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleteLoader(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      await client.adminEndpoints.adminTypeControllerDeleteType({
        id: type.id,
      });
      setDeleteLoader(false);
      router.replace(router.asPath);
      toast.success('Категорія успішно видалена.');
    } catch (err: any) {
      setDeleteLoader(false);
      toast.error(err.message);
    }
  };
  return {
    handleDelete,
    deleteLoader,
  };
};
