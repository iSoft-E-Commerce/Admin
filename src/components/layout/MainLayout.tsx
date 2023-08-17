import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useState } from 'react';
import { Header } from './Header';
import { Nav } from './Nav';
import { CurrentTasks } from './CurrentTasks';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data } = useSession();
  const [isBurgerToggled, setToggleBurger] = useState(false);

  const handleToggleBurger = () => {
    setToggleBurger(!isBurgerToggled);
  };

  const handleCloseNav = () => {
    setToggleBurger(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setToggleBurger(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header
        isBurgerToggled={isBurgerToggled}
        handleToggleBurger={handleToggleBurger}
      />
      <div className="md:max-w-md xl:max-w-xl px-3.5 mx-auto pt-20 h-full md:flex md:justify-between md:gap-3">
        {data ? (
          <Nav
            isMobileNavOpen={isBurgerToggled}
            handleCloseNav={handleCloseNav}
          />
        ) : null}
        <main
          className={clsx(
            'pb-8 w-full h-full flex lg:flex-row flex-col-reverse gap-1 items-start',
          )}
        >
          {children}
          {data ? <CurrentTasks /> : null}
        </main>
      </div>
    </>
  );
};
