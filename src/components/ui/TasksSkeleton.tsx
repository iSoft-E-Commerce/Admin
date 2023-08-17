import type { FC } from 'react';

export const TasksSkeleton: FC = () => {
  return (
    <div className="animate-pulse h-[90] w-full flex relative flex-col items-center p-1.5 bg-blue-10 border border-blue-100 cursor-pointer hover:bg-blue-20 transition-all duration-150 mb-1">
      <div className="rounded-full bg-slate-400 h-8 w-8 mb-2" />
      <div className="text-center mx-auto bg-slate-400 h-2 rounded-full w-[80%] mb-1" />
      <div className="text-center mx-auto bg-slate-400 h-2 rounded-full w-[40%]" />
      <span className="absolute top-1 right-1 lg:text-parS text-quot font-semibold block w-6 h-6 rounded-full bg-error-90 text-center text-white"></span>
    </div>
  );
};
