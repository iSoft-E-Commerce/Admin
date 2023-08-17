import { useEditProduct } from '@/hooks/useEditProduct';
import clsx from 'clsx';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { type Product } from '../../../client';
import { EditAdditionalCharacteristics } from '../products/EditAdditionalCharacteristics';
import { EditMainCharacteristics } from '../products/EditMainCharacteristics';
import { MainProductInputs } from '../products/MainProductInputs';
import { PriceProdctInputs } from '../products/PriceProdctInputs';
import { SetColorInputs } from '../products/SetColorInputs';
import { ClickButton } from '../ui/ClickButton';
import { CreatedAtAndUpdatedAt } from '../ui/CreatedAtAndUpdatedAt';
import { SubmitButton } from '../ui/SubmitButton';

type EditProductForm = {
  product: Product;
};

export const EditProductForm: FC<EditProductForm> = ({ product }) => {
  const {
    date,
    handleDeleteProduct,
    handleUpdateProduct,
    handleSubmit,
    isLoading,
    methods,
    deleteLoader,
  } = useEditProduct(product);

  return (
    <div className="max-w-productContainer w-full mx-auto">
      <div className="mb-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleUpdateProduct)}>
            <div className="border-b border-gray-400 mb-6">
              <MainProductInputs />
              <SetColorInputs />
              <PriceProdctInputs />
            </div>
            <EditMainCharacteristics />
            <EditAdditionalCharacteristics />
            <div className="flex items-center gap-1">
              <SubmitButton
                disabled={isLoading ? true : false}
                classNameModificator={clsx('w-full py-1 md:py-2.5')}
              >
                {isLoading ? 'Завантаження...' : 'Оновити'}
              </SubmitButton>
              <ClickButton
                disable={deleteLoader}
                clickHandler={() => handleDeleteProduct(product.id)}
                classModificator="w-full py-1 md:py-2.5 hover:bg-error-20"
              >
                {deleteLoader ? 'Видалення...' : 'Видалити'}
              </ClickButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <CreatedAtAndUpdatedAt
        formattedCreatedAt={date.formattedCreatedAt}
        formattedUpdatedAt={date.formattedUpdatedAt}
      />
    </div>
  );
};
