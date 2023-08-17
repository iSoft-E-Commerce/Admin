import clsx from 'clsx';
import { FC } from 'react';

type BurgerButtonProps = {
  isToggled: boolean;
  handleToggle: () => void;
};

export const BurgerButton: FC<BurgerButtonProps> = ({
  isToggled,
  handleToggle,
}) => {
  return (
    <button
      className="cursor-pointer p-[6px] block md:hidden border border-blue-100 rounded-lg bg-blue-10 hover:bg-blue-20 ease-out duration-300"
      onClick={handleToggle}
    >
      <div
        className={clsx(
          'flex flex-col gap-1 transition-all duration-700 ease-[cubic-bezier(0.68,-0.35,0.265,1.35)]',
          isToggled ? 'rotate-180' : null,
        )}
      >
        <div
          className={clsx(
            'w-6 h-1 bg-blue-100 rounded-md transition-all duration-300 delay-200',
            isToggled ? 'rotate-45 translate-y-[8px]' : null,
          )}
        ></div>
        <div
          className={clsx(
            'w-6 h-1 rounded-md transition-all duration-100 delay-300',
            isToggled ? 'bg-transparent' : 'bg-blue-100',
          )}
        ></div>
        <div
          className={clsx(
            'w-6 h-1 bg-blue-100 rounded-md transition-all duration-300 delay-200',
            isToggled ? '-rotate-45 -translate-y-[8px]' : null,
          )}
        ></div>
      </div>
    </button>
  );
};
