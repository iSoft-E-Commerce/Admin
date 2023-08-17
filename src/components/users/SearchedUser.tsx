import { FC } from 'react';
import Link from 'next/link';
import { User } from '../../../client';

type SearchedUserProps = {
  user: User;
};

export const SearchedUser: FC<SearchedUserProps> = ({ user }) => {
  return (
    <Link
      href={`/users/${user.id}`}
      className="block max-[576px]:text-quot text-parS font-medium max-[576px]:p-1.5 px-5 py-2.5 border border-gray-300 bg-white hover:bg-blue-10"
    >
      {user.firstName ? <span>{user.firstName} </span> : null}
      {user.lastName ? <span>{user.lastName}</span> : null}
      <p className="break-words">{user.email}</p>
    </Link>
  );
};
