import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import type { FC } from 'react';
import { iSoftClient } from '../../../client';
import { TasksSkeleton } from '../ui/TasksSkeleton';
import { WarningMessage } from '../ui/WarningMessage';

export const CurrentTasks: FC = () => {
  const handleGetTasks = async () => {
    const session = await getSession();
    const client = new iSoftClient({
      BASE: process.env.NEXT_PUBLIC_DATABASE_URL,
      //@ts-ignore
      TOKEN: session?.user.token,
    });
    return await client.adminEndpoints.adminCurrentTasksControllerGetCurrentTasks();
  };

  const {
    data: adminTasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['adminTasks'],
    queryFn: () => handleGetTasks(),
  });

  return (
    <div className="min-w-full lg:min-w-[250px] p-2.5 bg-white rounded shadow-md">
      {isError ? (
        <WarningMessage>{(error as any).message}!</WarningMessage>
      ) : (
        <>
          <Link
            href={'/faq'}
            className="block w-full relative mb-4 border-b-2 pb-6 hover:underline transition-all duration-150 hover:text-blue-800"
          >
            <h3 className="text-parM font-semibold">Поточних питань:</h3>
            {isLoading ? (
              <span className="block absolute top-0 right-0 w-7 h-7 rounded-full border-t-2 border-b-2 border-2 border-transparent border-t-blue-60 border-b-blue-60 animate-spin text-parM font-medium text-blue-100 ml-2" />
            ) : (
              <span className="absolute top-0 right-0 text-parM font-medium text-blue-600 ml-2 rounded-full bg-gray-200 w-7 h-7 border border-blue-60 flex items-center justify-center">
                {adminTasks?.questions}
              </span>
            )}
          </Link>
          <div>
            <h3 className="text-parM font-semibold mb-4">
              {adminTasks?.ratingTasks.length
                ? 'Неперевірені коментарі:'
                : 'Коментарів для перевірки немає'}
            </h3>
            {adminTasks?.ratingTasks.length ? (
              <div className="max-h-[150px] lg:max-h-[360px] overflow-auto">
                {adminTasks.ratingTasks.map((task) => (
                  <Link
                    href={`/products/${task.productDescription}`}
                    key={task.productDescription}
                    className="flex relative flex-col items-center p-1.5 bg-blue-10 border border-blue-100 cursor-pointer hover:bg-blue-20 transition-all duration-150 mb-1"
                  >
                    <img src={task.productImg} className="w-8 h-8" />
                    <span className="lg:text-parS text-quot font-medium flex justify-center items-center text-center">
                      {task.productDescription}
                    </span>
                    <span className="absolute top-1 right-1 lg:text-parS text-quot font-semibold w-6 h-6 rounded-full bg-error-90 text-white flex justify-center items-center">
                      {task.rating}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
            {isLoading ? (
              <div className="w-full">
                <TasksSkeleton />
                <TasksSkeleton />
                <TasksSkeleton />
                <TasksSkeleton />
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
