import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Characteristics, CreateProductDto, iSoftClient } from '../../client';

export const useCreateProduct = (characteristics?: Characteristics[]) => {
  const router = useRouter();
  const methods = useForm<CreateProductDto>({
    defaultValues: {
      isAvailable: true,
      isNewProduct: false,
      additionalCharacteristics: [],
      characteristics,
    },
  });

  const { fields, remove, prepend } = useFieldArray({
    control: methods.control,
    name: 'additionalCharacteristics',
  });

  const handleCreateProduct = async (data: CreateProductDto) => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    const changedData: CreateProductDto = {
      ...data,
      typeId: parseInt(`${data.typeId}`),
      price: {
        price: parseInt(`${data.price.price}`),
        discount: parseInt(`${data.price.discount}`),
      },
    };
    try {
      await client.adminEndpoints.adminProductControllerCreateProduct({
        requestBody: changedData,
      });
      toast.success('Новий продукт успішно створено.');
      router.replace(router.asPath);
    } catch (err: any) {
      toast.error(err.message as string);
    }
  };

  return {
    handleCreateProduct,
    methods,
    fields,
    remove,
    prepend,
  };
};
