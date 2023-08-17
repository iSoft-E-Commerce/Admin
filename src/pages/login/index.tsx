import { FC, useEffect } from 'react';
import { LoginForm } from '@/components/forms/LoginForm';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import { useLogin } from '@/hooks/useLogin';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const Login: FC = () => {
  const { push } = useRouter();
  const { status } = useLogin();

  useEffect(() => {
    if (status === 'authenticated') {
      push('/');
    }
  }, [status]);

  return (
    <SectionLayout>
      <Title>Ласкаво просимо!</Title>
      <LoginForm />
    </SectionLayout>
  );
};

export default Login;
