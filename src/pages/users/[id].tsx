import { SectionLayout } from '@/components/layout/SectionLayout';
import { Title } from '@/components/ui/Title';
import { WarningMessage } from '@/components/ui/WarningMessage';
import { UserOrder } from '@/components/users/UserOrder';
import { UserRoleSelect } from '@/components/users/UserRoleSelect';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import { OrderData, User, iSoftClient } from '../../../client';

type UserPageProps = {
  user: User | null;
  userOrders: OrderData[] | null;
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  ctx,
) => {
  const id = parseInt(ctx.query.id as string);
  const session = await getSession(ctx);

  try {
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });

    const user = await client.adminEndpoints.adminControllerGetUserById({
      id,
    });

    const userOrders =
      await client.adminEndpoints.adminControllerGetOrdersHistory({
        userId: id,
      });

    return {
      props: { user, userOrders },
    };
  } catch (err: any) {
    return {
      props: { user: null, userOrders: null },
    };
  }
};

const UserPage: FC<UserPageProps> = ({ user, userOrders }) => {
  if (!user) {
    return <WarningMessage>Користувача не знайдено!</WarningMessage>;
  }

  return (
    <SectionLayout>
      <Title>Користувач</Title>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:max-w-userInfoContainer w-full">
          <div className="border border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-blue-10 border-b border-b-blue-100 p-2.5">
              <img
                src={user.img ? user.img : '/icons/user.svg'}
                alt={user.email}
                className="w-16 h-16 drop-shadow-userIconShadow bg-white rounded-full object-contain"
              />
              <div className="flex flex-col gap-2 justify-between items-center md:items-end">
                <UserRoleSelect user={user} />
                <p className="font-bold text-parS md:text-parM break-words">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="font-medium px-2.5 text-parS md:text-parM">
              <p className="border-b py-2.5">
                <span className="font-semibold">Ім'я: </span>
                {user.firstName ? user.firstName : '---'}
              </p>
              <p className="border-b py-2.5">
                <span className="font-semibold">Прізвище: </span>
                {user.lastName ? user.lastName : '---'}
              </p>
              <p className="border-b py-2.5">
                <span className="font-semibold">Телефон: </span>
                {user.phone ? user.phone : '---'}
              </p>
              <p className="border-b py-2.5">
                <span className="font-semibold">Додано: </span>
                {user.createdAt.slice(0, 10)}
              </p>
              <p className="py-2.5">
                <span className="font-semibold">Оновлено: </span>
                {user.updatedAt.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-h-userOrders bg-bodyBg border border-stroke overflow-y-auto px-2.5 py-5 flex flex-col gap-3">
          <p className="font-semibold text-dispS3">Історія замовлень:</p>
          {userOrders?.length ? (
            userOrders.map((order) => (
              <UserOrder key={order.id} order={order} />
            ))
          ) : (
            <div className="text-parS md:text-parM font-medium p-2.5 border bg-white border-blue-60 rounded-md">
              Користувач ще не робив замовлень!
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default UserPage;
