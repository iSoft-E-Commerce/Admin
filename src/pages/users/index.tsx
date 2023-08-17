import { SectionLayout } from '@/components/layout/SectionLayout';
import { Pagination } from '@/components/ui/Pagination';
import { Title } from '@/components/ui/Title';
import { UsersItem } from '@/components/users/UsersItem';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { User, iSoftClient } from '../../../client';
import { SearchBar } from '@/components/ui/SearchBar';
import { useQuery } from '@tanstack/react-query';
import { useUserHandles } from '@/hooks/useUserHandles';
import { SearchedUser } from '@/components/users/SearchedUser';
import { SearchedValues } from '@/components/ui/SearchedValues';
import { WarningMessage } from '@/components/ui/WarningMessage';

type UsersProps = {
  usersData: User[] | null;
  pageNum: number;
  pagesCount?: number;
};

export const getServerSideProps: GetServerSideProps<UsersProps> = async (
  ctx,
) => {
  const session = await getSession(ctx);
  let pageNum = 1;
  if (Number(ctx.query.page) >= 0) pageNum = Number(ctx.query.page);

  const skip = (pageNum - 1) * 9;

  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    const usersData =
      await client.adminEndpoints.adminControllerGetPaginatedUsers({
        limit: 12,
        skip,
      });

    const pagesCount = Math.ceil(usersData.total / 12);

    return {
      props: { usersData: usersData.itemsPerPage, pageNum, pagesCount },
    };
  } catch (err) {
    return {
      props: { usersData: null, pageNum },
    };
  }
};

const Users: FC<UsersProps> = ({ usersData, pageNum, pagesCount }) => {
  const [debouncedValue, setDebouncedSearch] = useState('');
  const { handleUsersSearch } = useUserHandles();

  const { data: selectedUsers } = useQuery({
    queryKey: ['users', debouncedValue],
    queryFn: () => handleUsersSearch(debouncedValue),
  });

  return (
    <SectionLayout>
      <Title>Користувачі</Title>
      <div className="w-full max-w-searchBarContainer mx-auto mb-6 relative">
        <SearchBar setDebouncedSearch={setDebouncedSearch} />
        {debouncedValue && selectedUsers?.length ? (
          <SearchedValues>
            {selectedUsers.map((user) => (
              <SearchedUser key={user.id} user={user} />
            ))}
          </SearchedValues>
        ) : null}
      </div>

      {usersData && pagesCount ? (
        <>
          <div className="w-full grid grid-cols-3 gap-3 mb-6 max-[1100px]:grid-cols-2 max-[573px]:grid-cols-1">
            {usersData.map((user) => (
              <UsersItem key={user.id} user={user} />
            ))}
          </div>
          {pagesCount > 1 ? (
            <Pagination activePageNumber={pageNum} pagesCount={pagesCount} />
          ) : null}
        </>
      ) : (
        <WarningMessage>
          Інформацію про користувачів не знайдено!
        </WarningMessage>
      )}
    </SectionLayout>
  );
};

export default Users;
