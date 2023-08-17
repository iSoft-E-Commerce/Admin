import { Montserrat } from 'next/font/google';
import React, { FC } from 'react';
import { BackBtn } from '../ui/BackBtn';
import { useRouter } from 'next/router';

const montserrat = Montserrat({ subsets: ['latin'] });

type SectionLayoutProps = {
  children: React.ReactNode;
};

export const SectionLayout: FC<SectionLayoutProps> = ({ children }) => {
  const { route } = useRouter();

  return (
    <section
      className={`${montserrat.className} relative w-full bg-white rounded shadow-md px-3.5 pt-5 pb-10`}
    >
      {route !== '/login' ? <BackBtn /> : null}
      {children}
    </section>
  );
};
