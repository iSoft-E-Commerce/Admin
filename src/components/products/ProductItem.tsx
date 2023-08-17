import React, { FC } from 'react';
import type { Product } from '../../../client';
import { useRouter } from 'next/router';

type ProductProps = {
  product: Product;
};
export const ProductItem: FC<ProductProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="p-2.5 border shadow-md flex items-center flex-col gap-3 cursor-pointer bg-productItem hover:bg-blue-10"
      onClick={() => router.push(`/products/${product.description}`)}
    >
      <div className="max-[576px]:w-24 max-[576px]:h-20 w-28 sm:h-24">
        <img className="w-full h-full" src={product?.img} alt="product" />
      </div>
      <div className="text-center">
        <p className="text-parS sm:text-parS font-semibold">
          {product.description}
        </p>
      </div>
    </div>
  );
};
