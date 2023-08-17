import { getSession } from 'next-auth/react';
import { iSoftClient } from '../../client';
import { toast } from 'react-toastify';

export const useProductSearch = () => {
  const handleProductSearch = async (searchQuery: string) => {
    try {
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const products =
        await client.productEndpoints.productControllerSearchProducts({
          q: searchQuery,
        });
      return products;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { handleProductSearch };
};
