import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { type Product, iSoftClient, UpdateProductDto } from '../../client';
import { convertDate } from '@/utils/convertDate';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export const useEditProduct = (product: Product) => {
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const router = useRouter();
  const { updatedAt, id, createdAt, ...otherProductData } = product;
  const date = convertDate(createdAt, updatedAt);

  const methods = useForm({
    defaultValues: {
      ...otherProductData,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting: isLoading },
  } = methods;

  const handleUpdateProduct = async (data: any) => {
    const { rating, ...updateData } = data;
    try {
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const res =
        await client.adminEndpoints.adminProductControllerUpdateProduct({
          productId: id,
          requestBody: updateData as UpdateProductDto,
        });
      if (res) {
        toast.success(res.message);
        router.replace(router.asPath);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      setDeleteLoader(true);
      const session = await getSession();
      const client = new iSoftClient({
        BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
        //@ts-ignore
        TOKEN: session?.user.token,
      });
      const res =
        await client.adminEndpoints.adminProductControllerDeleteProduct({ id });
      if (res) {
        setDeleteLoader(false);
        toast.success(res.message);
        await router.push('/products');
      }
    } catch (err: any) {
      setDeleteLoader(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    methods.reset({ ...otherProductData });
  }, [product]);

  return {
    date,
    methods,
    id,
    handleDeleteProduct,
    handleUpdateProduct,
    handleSubmit,
    isLoading,
    deleteLoader,
  };
};
