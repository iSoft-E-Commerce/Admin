import { useCreateProduct } from '@/hooks/useCreateProduct';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import type { Characteristics, Type } from '../../../client';
import { AdditionalCharacteristics } from '../products/AdditionalCharacteristics';
import { MainProductInputs } from '../products/MainProductInputs';
import { PriceProdctInputs } from '../products/PriceProdctInputs';
import { TypeCharacteristics } from '../products/TypeCharacteristics';
import { ResetButton } from '../ui/ResetButton';
import { SubmitButton } from '../ui/SubmitButton';
import { WarningMessage } from '../ui/WarningMessage';
import { SetColorInputs } from '../products/SetColorInputs';

type CreateProductFormProps = {
  types: Type[];
};

export const CreateProductForm: FC<CreateProductFormProps> = ({ types }) => {
  const [characteristics, setCharacteristics] = useState<Characteristics[]>(
    types[0].characteristics,
  );
  const { handleCreateProduct, methods } = useCreateProduct(
    types[0].characteristics,
  );
  const {
    formState: { isSubmitting: isLoading },
    handleSubmit,
    reset,
    setValue,
  } = methods;

  return (
    <div className="relative pt-5"> 
      <div className="w-full mx-auto">
        {types?.length ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <TypeCharacteristics
                    currTypes={types}
                    characteristics={characteristics}
                    setCharacteristics={setCharacteristics}
                  />
                  <AdditionalCharacteristics />
                </div>
                <div>
                  <MainProductInputs />
                  <SetColorInputs />
                  <PriceProdctInputs />
                  <div className="flex items-center justify-between gap-4">
                    <SubmitButton
                      disabled={isLoading ? true : false}
                      classNameModificator={clsx('w-full py-1 md:py-2.5')}
                    >
                      {isLoading ? 'Завантаження...' : 'Створити'}
                    </SubmitButton>
                    <ResetButton
                      classModificator="py-1 md:py-2.5"
                      reset={() => {
                        reset();
                        setCharacteristics(
                          types[0].characteristics as Characteristics[],
                        );
                        setValue('characteristics', types[0].characteristics);
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        ) : (
          <WarningMessage>
            Спочатку треба створити категорію. (Тип).
          </WarningMessage>
        )}
      </div>
    </div>
  );
};
