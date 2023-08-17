import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
import { SubmitButton } from '../ui/SubmitButton';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { BurgerButton } from '../ui/BurgerButton';

type HeaderProps = {
  isBurgerToggled: boolean;
  handleToggleBurger: () => void;
};

export const Header: FC<HeaderProps> = ({
  isBurgerToggled,
  handleToggleBurger,
}) => {
  const { data } = useSession();
  const { push } = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="py-1.5 fixed h-header inset-0 z-10 bg-white shadow-md">
      <div
        className={clsx(
          'flex items-center md:max-w-md xl:max-w-xl px-3.5 mx-auto',
          data ? 'justify-between' : 'justify-center',
        )}
      >
        {data ? (
          <BurgerButton
            isToggled={isBurgerToggled}
            handleToggle={handleToggleBurger}
          />
        ) : null}
        <div className="flex items-center justify-between">
          <img className="w-16 h-11" src="/img/logo.png" alt="logo" />
          <span className="font-bold text-dispS3 -ml-3">iSoft</span>
        </div>
        {data ? (
          <SubmitButton
            classNameModificator="py-1 px-5 text-parS"
            onClick={handleSignOut}
            disabled={false}
          >
            Вийти
          </SubmitButton>
        ) : null}
      </div>
    </header>
  );
};
