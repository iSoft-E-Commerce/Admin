import { EditProductForm } from '@/components/forms/EditProductForm';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { ProductRate } from '@/components/products/ProductRate';
import Tab from '@/components/ui/Tab';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { iSoftClient, type Product, type Rate } from '../../../client';

type ProductPageProps = {
  product: Product | null;
  productRate: Rate[] | null;
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx,
) => {
  try {
    const session = await getSession(ctx);
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    const product =
      await client.productEndpoints.productControllerGetProductByDescription({
        description: ctx.query.id as string,
      });
    const productRate =
      await client.adminEndpoints.adminRateControllerGetAllRating({
        productId: product.id,
      });
    return {
      props: { product, productRate },
    };
  } catch (err) {
    console.log(err);
    return { props: { product: null, productRate: null } };
  }
};

const ProductPage: FC<ProductPageProps> = ({ product, productRate }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  if (!product) {
    return (
      <WarningMessage>
        Наразі такий продукт не знайдений в базі. Можливо проблеми з сервером.
      </WarningMessage>
    );
  }

  useEffect(() => {}, []);

  return (
    <SectionLayout>
      <div className="flex items-center justify-center flex-col lg:flex-row mb-6 sm:mb-10">
        <div className="w-40 h-32 sm:w-60 sm:h-52 mb-10 lg:mb-0 ">
          <img
            className="max-w-full"
            src={product.img ? product.img : ''}
            alt="product"
          />
        </div>
        <div>
          <p className="text-parM sm:text-dispS3 font-semibold text-center">
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex items-center mb-6">
        <Tab
          label="Редагувати"
          isActive={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          label="Відгуки"
          isActive={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </div>
      {activeTab === 1 ? <EditProductForm product={product} /> : null}
      {activeTab === 2 ? <ProductRate rate={productRate!} /> : null}
    </SectionLayout>
  );
};

export default ProductPage;
