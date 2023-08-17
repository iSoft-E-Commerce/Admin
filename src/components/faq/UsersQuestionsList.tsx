import type { FC } from 'react';
import type { UserQuestion } from '../../../client';
import { Pagination } from '../ui/Pagination';
import { UserQuestionItem } from './UserQuestionItem';
import { useRouter } from 'next/router';
import { ClickButton } from '../ui/ClickButton';

type UsersQuestionsListProps = {
  usersQuestions: UserQuestion[];
  pageNum: number;
  pagesCount?: number;
};
type SortByCheck = 'checked' | 'unchecked';

export const UsersQuestionsList: FC<UsersQuestionsListProps> = ({
  usersQuestions,
  pagesCount,
  pageNum,
}) => {
  const router = useRouter();

  const handleSortClick = (sortByCheck: SortByCheck) => {
    router.push(`${router.route}?page=1&checked=${sortByCheck}`);
  };

  return (
    <div>
      <div className="max-w-productContainer w-full mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <ClickButton
            classModificator="bg-green-200 hover:bg-green-400"
            clickHandler={() => handleSortClick('checked')}
          >
            Перевірені
          </ClickButton>
          <ClickButton
            classModificator="bg-error-20 hover:bg-error-80"
            clickHandler={() => handleSortClick('unchecked')}
          >
            Не перевірені
          </ClickButton>
        </div>
        <div className="grid max-[576px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-1 mb-10">
          {usersQuestions.map((question) => (
            <UserQuestionItem key={question.id} userQuestion={question} />
          ))}
        </div>
        {pagesCount! > 1 ? (
          <Pagination
            activePageNumber={pageNum}
            pagesCount={pagesCount as number}
          />
        ) : null}
      </div>
    </div>
  );
};
