import { FC } from 'react';
import type { Type } from '../../../client';
import { TypeItem } from './TypeItem';
import { WarningMessage } from '../ui/WarningMessage';

type TypeEditProps = {
  types: Type[] | null;
};

export const TypeEdit: FC<TypeEditProps> = ({ types }) => {
  if (!types?.length) {
    return <WarningMessage>Наразі категорій не знайдено.</WarningMessage>;
  }

  return (
    <>
      {types.map((item) => (
        <TypeItem key={item.id} type={item} />
      ))}
    </>
  );
};
