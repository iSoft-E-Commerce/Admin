import { useDeleteType } from '@/hooks/useDeleteType';
import { FC, useState } from 'react';
import type { Type } from '../../../client';
import { EditTypeForm } from '../forms/EditTypeForm';
import { ClickButton } from '../ui/ClickButton';
import clsx from 'clsx';

type TypeItemProps = {
  type: Type;
};

export const TypeItem: FC<TypeItemProps> = ({ type }) => {
  const { handleDelete, deleteLoader } = useDeleteType(type);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-blue-10 mx-auto border border-blue-100 mb-2 p-1 md:p-2.5">
        <h3 className="text-parM font-medium ml-1.5">{type.name}</h3>
        <div className="flex items-center gap-1">
          <ClickButton
            classModificator="hover:bg-yellow-20 max-w-deleteBtn md:h-input md:p-2.5 px-1 flex items-center"
            clickHandler={handleToggleModal}
          >
            <img
              src={'icons/edit-logo.svg'}
              alt="edit-logo"
              className="w-5 h-8 mx-auto"
            />
          </ClickButton>
          <ClickButton
            disable={deleteLoader}
            classModificator={clsx(
              'hover:bg-error-20 max-w-deleteBtn md:h-input md:p-2.5 px-1 flex items-center',
            )}
            clickHandler={handleDelete}
          >
            <img
              src={'icons/trash-logo.svg'}
              alt="trash-logo"
              className="w-5 h-8 mx-auto"
            />
          </ClickButton>
        </div>
      </div>
      {isModalOpen ? (
        <EditTypeForm type={type} handleToggleModal={handleToggleModal} />
      ) : null}
    </>
  );
};
