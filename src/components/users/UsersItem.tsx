import { useUserHandles } from '@/hooks/useUserHandles';
import Link from 'next/link';
import { FC } from 'react';
import { User } from '../../../client';
import { ClickButton } from '../ui/ClickButton';
import { UserRoleSelect } from './UserRoleSelect';

type UsersItemProps = {
  user: User;
};

export const UsersItem: FC<UsersItemProps> = ({ user }) => {
  const { handleUserDelete, isLoading } = useUserHandles();

  return (
    <div className="w-full border border-blue-100 relative">
      <div className="flex items-center justify-between gap-3 bg-blue-10 border-b border-b-blue-100 p-1 md:p-2.5">
        <img
          src={user.img ? user.img : '/icons/user.svg'}
          alt={user.email}
          className="w-12 h-12 drop-shadow-userIconShadow bg-white rounded-full object-contain"
        />
        <div className="flex gap-3 items-center">
          <UserRoleSelect user={user} />
          <ClickButton
            disable={isLoading}
            classModificator="hover:bg-error-20 max-w-deleteBtn min-w-deleteBtn md:h-input md:p-2.5 px-1 flex items-center"
            clickHandler={() => handleUserDelete(user.id)}
          >
            <img
              src={'icons/trash-logo.svg'}
              alt="trash-logo"
              className="w-5 h-8 mx-auto"
            />
          </ClickButton>
        </div>
      </div>
      <div className="text-parS font-medium p-1 pr-9 md:p-2.5 md:pr-11">
        {user.firstName ? <span>{user.firstName} </span> : null}
        {user.lastName ? <span>{user.lastName}</span> : null}
        <p className="font-bold break-words">{user.email}</p>
      </div>
      <Link
        className="rounded-lg hover:bg-blue-10 absolute bottom-1 right-1"
        href={`/users/${user.id}`}
      >
        <img className="w-8 h-6 md:w-10 md:h-8" src="/icons/arrow-right.svg" />
      </Link>
    </div>
  );
};
