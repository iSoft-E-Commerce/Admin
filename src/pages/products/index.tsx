import { CreateProductForm } from '@/components/forms/CreateProductForm';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { ProductsList } from '@/components/products/ProductsList';
import { SearchBar } from '@/components/ui/SearchBar';
import { SearchedValues } from '@/components/ui/SearchedValues';
import Tab from '@/components/ui/Tab';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Type, iSoftClient, type Product } from '../../../client';

type ProductsProps = {
  products: Product[] | null;
  pageNum: number;
  pagesCount?: number;
  types: Type[] | null;
};

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);
  const skip = (pageNum - 1) * 6;

  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    const types = await client.typeEndpoints.typeControllerGetTypes();
    const products =
      await client.adminEndpoints.adminProductControllerGetPaginatedProducts({
        limit: 6,
        skip,
      });
    const pagesCount = Math.ceil(products.total / 6);

    return {
      props: { products: products.itemsPerPage, pageNum, pagesCount, types },
    };
  } catch (err) {
    return {
      props: { products: null, pageNum, types: null },
    };
  }
};
const Products: FC<ProductsProps> = ({
  pageNum,
  products,
  pagesCount,
  types,
}) => {
  if (!types) {
    return (
      <WarningMessage>
        Спочатку треба створити Категорії для продуктів.
      </WarningMessage>
    );
  }
  const [activeTab, setActiveTab] = useState<number>(1);
  const [debouncedValue, setDebouncedSearch] = useState('');
  const { handleProductSearch } = useProductSearch();
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const { data: selectedProducts } = useQuery({
    queryKey: ['products', debouncedValue],
    queryFn: () => handleProductSearch(debouncedValue),
  });

  return (
    <SectionLayout>
      <Title>Продукти</Title>
      <div className="relative mb-6 max-w-searchBarContainer w-full mx-auto">
        <SearchBar setDebouncedSearch={setDebouncedSearch} />
        {debouncedValue && selectedProducts?.length ? (
          <SearchedValues>
            {selectedProducts.map((product) => (
              <Link
                className="block max-[576px]:text-quot text-parS font-medium max-[576px]:p-1.5 px-5 py-2.5 border border-gray-300 bg-white hover:bg-blue-10"
                key={product.id}
                href={`/products/${product.description}`}
              >
                {product.description}
              </Link>
            ))}
          </SearchedValues>
        ) : null}
      </div>
      <div className="flex items-center mb-5 md:mb-10">
        <Tab
          label="Отримати всі"
          isActive={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          label="Створити"
          isActive={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </div>
      {activeTab === 1 ? (
        <ProductsList
          products={products}
          pagesCount={pagesCount}
          pageNum={pageNum}
        />
      ) : null}
      {activeTab === 2 ? <CreateProductForm types={types} /> : null}
    </SectionLayout>
  );
};

export default Products;
