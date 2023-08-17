import { CreateTypeForm } from '@/components/forms/CreateTypeForm';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { TypeEdit } from '@/components/type/TypeEdit';
import Tab from '@/components/ui/Tab';
import { Title } from '@/components/ui/Title';
import type { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { iSoftClient, type Type } from '../../../client';

type TypeProps = {
  types: Type[] | null;
};

export const getServerSideProps: GetServerSideProps<TypeProps> = async () => {
  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
    const types = await client.typeEndpoints.typeControllerGetTypes();
    return {
      props: { types },
    };
  } catch (err) {
    return {
      props: { types: null },
    };
  }
};

const Type: FC<TypeProps> = ({ types }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <SectionLayout>
      <Title>Категорії</Title>
      <div className="flex items-center mb-5 md:mb-10">
        <Tab
          label="Створити"
          isActive={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          label="Редагувати"
          isActive={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </div>
      {activeTab === 1 ? <CreateTypeForm /> : null}
      {activeTab === 2 ? <TypeEdit types={types} /> : null}
    </SectionLayout>
  );
};

export default Type;
