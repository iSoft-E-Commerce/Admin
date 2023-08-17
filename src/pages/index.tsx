import { HomeForm } from '@/components/forms/HomeForm';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { FC } from 'react';
import { iSoftClient, type User } from '../../client';

type HomeProps = {
  userData: User | null;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx,
) => {
  try {
    const session = await getSession(ctx);
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user?.token,
    });
    const userData = await client.userEndpoints.userControllerGetUserData();
    return {
      props: { userData },
    };
  } catch (err) {
    return {
      props: { userData: null },
    };
  }
};

const Home: FC<HomeProps> = ({ userData }) => {
  return (
    <SectionLayout>
      <Title>Адмін панель</Title>
      {userData ? (
        <HomeForm userData={userData} />
      ) : (
        <span className="block text-center text-parS font-medium text-error-100">
          Інформацію про користувача не знайдено.
        </span>
      )}
    </SectionLayout>
  );
};

export default Home;
