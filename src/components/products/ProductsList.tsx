import { FC } from 'react';
import type { Product } from '../../../client';
import { Pagination } from '../ui/Pagination';
import { WarningMessage } from '../ui/WarningMessage';
import { ProductItem } from './ProductItem';

type ProductsListProps = {
  products: Product[] | null;
  pageNum: number;
  pagesCount?: number;
};

export const ProductsList: FC<ProductsListProps> = ({
  products,
  pagesCount,
  pageNum,
}) => {
  if (!products?.length) {
    return <WarningMessage>Наразі список продуктів порожній.</WarningMessage>;
  }

  return (
    <div className="max-w-productContainer w-full mx-auto">
      <div className="grid max-[576px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-1 mb-10">
        {products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
      {pagesCount! > 1 ? (
        <Pagination
          activePageNumber={pageNum}
          pagesCount={pagesCount as number}
        />
      ) : null}
    </div>
  );
};
