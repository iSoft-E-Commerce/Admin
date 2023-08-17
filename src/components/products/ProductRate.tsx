import { FC } from 'react';
import { type Rate } from '../../../client';
import { WarningMessage } from '../ui/WarningMessage';
import { RateItem } from './RateItem';

type ProductRate = {
  rate: Rate[];
};

export const ProductRate: FC<ProductRate> = ({ rate }) => {
  return (
    <>
      {rate.length ? (
        <div className="sm:grid lg:grid-cols-2 sm:gap-1">
          {rate.map((rev) => (
            <RateItem key={rev.id} rate={rev} />
          ))}
        </div>
      ) : (
        <WarningMessage>В данний час коментарі відсутні.</WarningMessage>
      )}
    </>
  );
};
