import { UserQuestionData } from '@/components/faq/UserQuestionData';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { FC } from 'react';
import { type UserQuestion, iSoftClient } from '../../../client';

type UserQuestionPageProps = {
  userQuestion: UserQuestion | null;
};

export const getServerSideProps: GetServerSideProps<
  UserQuestionPageProps
> = async (ctx) => {
  try {
    const session = await getSession(ctx);
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });

    const userQuestion =
      await client.adminEndpoints.adminQuestionControllerGetUserQuestion({
        questionId: Number(ctx.query.id),
      });

    return {
      props: { userQuestion },
    };
  } catch (err) {
    return {
      props: { userQuestion: null },
    };
  }
};

const UserQuestionPage: FC<UserQuestionPageProps> = ({ userQuestion }) => {
  if (!userQuestion) {
    return <WarningMessage>Питання не було знайдено.</WarningMessage>;
  }
  return (
    <SectionLayout>
      <Title>Запитання № {userQuestion.id}</Title>
      <UserQuestionData userQuestion={userQuestion} />
    </SectionLayout>
  );
};

export default UserQuestionPage;
