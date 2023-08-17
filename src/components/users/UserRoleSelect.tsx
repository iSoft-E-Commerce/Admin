import { FC } from 'react';
import { User } from '../../../client';
import { useUserHandles } from '@/hooks/useUserHandles';

type UserRoleSelectProps = {
  user: User;
};

export const UserRoleSelect: FC<UserRoleSelectProps> = ({ user }) => {
  const { handleChangeUserRole, isLoading } = useUserHandles();

  return (
    <div className="w-[104px] relative">
      <select
        disabled={isLoading}
        defaultValue={user.role}
        onChange={(e) =>
          handleChangeUserRole({
            userId: user.id,
            role: e.target.value.toLowerCase(),
          })
        }
        className="appearance-none bg-white border border-blue-60 rounded-md py-2 pl-4 pr-8 focus:outline-none focus:border-blue-100"
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="user">User</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-100">
        <img src="/icons/select-arrow.svg" alt="select" />
      </div>
    </div>
  );
};
