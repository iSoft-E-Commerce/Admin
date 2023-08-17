import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { navLinks } from '@/utils/navUtils';
import clsx from 'clsx';

type NavProps = {
  isMobileNavOpen: boolean;
  handleCloseNav: () => void;
};

export const Nav: FC<NavProps> = ({ isMobileNavOpen, handleCloseNav }) => {
  const { route } = useRouter();

  return (
    <aside
      className={clsx(
        'bg-darkSkyBlue-20 md:max-h-[585px] visible w-full fixed md:relative px-px py-2 z-50 md:z-[5] md:block max-md:top-14 max-md:left-0 max-md:h-full md:max-w-navMenu max-md:transition-all max-md:duration-700 max-md:ease-[cubic-bezier(0.68,-0.35,0.265,1.35)]',
        !isMobileNavOpen
          ? 'max-md:-translate-x-full max-md:invisible max-md:opacity-0'
          : null,
      )}
    >
      <nav className="flex justify-between flex-col gap-px">
        {navLinks.map(({ link, name, logo }) => (
          <Link
            key={name}
            className={clsx(
              'flex md:flex-col items-center p-2.5 gap-2',
              route.split('/')[1] === link.split('/')[1]
                ? 'bg-white'
                : 'bg-whiteLabel-200 hover:bg-whiteLabel-100',
            )}
            href={link}
            onClick={handleCloseNav}
          >
            <img className="w-10 h-10" src={logo} alt={name} />
            <span className="text-parM font-medium ">{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
