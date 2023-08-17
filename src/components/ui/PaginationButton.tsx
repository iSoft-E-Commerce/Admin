import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type BtnProps = {
  variant: 'next' | 'prev';
  activePageNumber: number;
};

export const PaginationButton: FC<BtnProps> = ({
  variant,
  activePageNumber,
}) => {
  const { route, query } = useRouter();
  const minusPageRoute =
    route === '/faq'
      ? `${route}?page=${activePageNumber - 1}&checked=${
          query.checked ? query.checked : 'unchecked'
        }`
      : `${route}?page=${activePageNumber - 1}`;

  const plusPageRoute =
    route === '/faq'
      ? `${route}?page=${activePageNumber + 1}&checked=${
          query.checked ? query.checked : 'unchecked'
        }`
      : `${route}?page=${activePageNumber + 1}`;

  return (
    <Link href={variant === 'prev' ? minusPageRoute : plusPageRoute} passHref>
      <button className="w-8 h-8 font-semibold text-dispS3 text-blue-100  hover:bg-blue-20">
        {variant === 'prev' ? '<' : '>'}
      </button>
    </Link>
  );
};
