import { UsersQuestionsList } from '@/components/faq/UsersQuestionsList';
import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { FC } from 'react';
import { type UserQuestion, iSoftClient } from '../../../client';

type FaqProps = {
  userQuestions: UserQuestion[] | null;
  pageNum: number | null;
  pagesCount?: number;
};

export const getServerSideProps: GetServerSideProps<FaqProps> = async (ctx) => {
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const skip = (pageNum - 1) * 12;
  try {
    const session = await getSession(ctx);
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    const sortBy = ctx.query.checked === 'checked' ? true : false;
    const questions =
      await client.adminEndpoints.adminQuestionControllerGetPaginatedQuestions({
        limit: 12,
        skip,
        isChecked: sortBy,
      });

    const pagesCount = Math.ceil(questions.total / 12);

    return {
      props: { userQuestions: questions.itemsPerPage, pageNum, pagesCount },
    };
  } catch (err) {
    return {
      props: { userQuestions: null, pageNum },
    };
  }
};

const FAQ: FC<FaqProps> = ({ userQuestions, pageNum, pagesCount }) => {
  return (
    <SectionLayout>
      <Title>Питання</Title>
      {userQuestions?.length ? (
        <UsersQuestionsList
          pageNum={pageNum!}
          usersQuestions={userQuestions}
          pagesCount={pagesCount}
        />
      ) : (
        <WarningMessage>Наразі запитань від клієнтів не має.</WarningMessage>
      )}
    </SectionLayout>
  );
};

export default FAQ;
