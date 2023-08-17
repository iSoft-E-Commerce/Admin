import { FC } from 'react';
import { OrderDataProduct } from '../../../client';
import Link from 'next/link';

type OrderItemProps = {
  orderItem: OrderDataProduct;
};

export const OrderItem: FC<OrderItemProps> = ({ orderItem }) => {
  const { quantity, product } = orderItem;
  const { price, discount } = product.price;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-b py-1.5 text-quot md:text-parS">
      <Link
        href={`/products/${product.description}`}
        className="flex flex-col sm:flex-row lg:w-3/4 items-center gap-2 hover:text-blue-80 hover:underline font-medium"
      >
        <img
          className="w-10 h-10"
          src={product.img}
          alt={product.description}
        />
        <p className="text-center lg:text-left">{product.description}</p>
      </Link>
      <p className="block font-medium grow text-right">
        {quantity} X {discount ? price - discount : price} грн
      </p>
    </div>
  );
};
