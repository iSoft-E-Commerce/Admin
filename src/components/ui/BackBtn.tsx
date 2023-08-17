import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const BackBtn: FC = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center  p-1.5 border rounded-xl bg-blue-10 hover:bg-blue-20 transition-all duration-150 absolute top-3.5 left-3.5"
      onClick={() => router.back()}
    >
      <img className="w-6 h-6" src="/icons/back-logo.svg" alt="back-logo" />
    </button>
  );
};
