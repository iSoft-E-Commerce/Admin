import { convertDate } from '@/utils/convertDate';
import { FC, useState } from 'react';
import { OrderData } from '../../../client';
import clsx from 'clsx';
import { OrderItem } from './OrderItem';

type UserOrderProps = {
  order: OrderData;
};

export const UserOrder: FC<UserOrderProps> = ({ order }) => {
  const [isOpenOrder, setOpenOrder] = useState(false);
  const { formattedCreatedAt } = convertDate(order.createdAt, order.updatedAt);

  const totalPrice = order.products.reduce((sum, item) => {
    const { quantity, product } = item;
    const { price, discount } = product.price;

    return (sum += quantity * (discount ? price - discount : price));
  }, 0);

  return (
    <div>
      <div
        className="flex justify-between items-center gap-2 text-parS md:text-parM font-medium p-2.5 pr-0 mb-1 border bg-white border-blue-60 rounded-md hover:bg-blue-10 transition-all duration-200"
        onClick={() => {
          setOpenOrder(!isOpenOrder);
        }}
      >
        <div className="flex w-full justify-between items-center ">
          <p>№: {order.id}</p>
          <p>{formattedCreatedAt}</p>
        </div>
        <img
          className={clsx(
            'w-8 h-8 transition-all duration-150',
            isOpenOrder ? 'rotate-180' : '',
          )}
          src="/icons/select-arrow.svg"
          alt="open-order"
        />
      </div>
      {isOpenOrder ? (
        <div className="text-parS font-medium p-2.5 border-2 border-stroke bg-white">
          {order.products.map((item) => (
            <OrderItem key={item.id} orderItem={item} />
          ))}
          <p className="py-1.5 text-right">
            <span className="font-semibold">Разом: </span>
            {totalPrice} грн
          </p>
        </div>
      ) : null}
    </div>
  );
};
