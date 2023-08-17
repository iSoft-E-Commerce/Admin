import { Fragment, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PaginationButton } from './PaginationButton';
import { getPaginationTemplate } from '@/utils/getPagination';

type PaginationProps = {
  activePageNumber: number;
  pagesCount: number;
};

export const Pagination: FC<PaginationProps> = ({
  activePageNumber,
  pagesCount,
}) => {
  const { route, query } = useRouter();

  const paginationTemplate = getPaginationTemplate(
    activePageNumber,
    pagesCount,
  );

  return (
    <div className="flex justify-center gap-3">
      {activePageNumber !== 1 ? (
        <PaginationButton variant="prev" activePageNumber={activePageNumber} />
      ) : null}
      <div className="flex gap-1 justify-center items-center text-parM">
        {paginationTemplate.map((item, i) => (
          <Fragment key={i}>
            {item === '...' ? (
              <p className="font-bold px-1">...</p>
            ) : (
              <Link
                href={
                  route === '/faq'
                    ? `${route}?page=${item}&checked=${
                        query.checked ? query.checked : 'unchecked'
                      }`
                    : `${route}?page=${item}`
                }
                passHref
                className="block"
              >
                <button
                  disabled={activePageNumber === item}
                  className="w-8 h-7 border enabled:hover:bg-blue-40 disabled:bg-gradient-to-r disabled:from-blue-800 disabled:to-blue-100 disabled:text-white "
                >
                  {item}
                </button>
              </Link>
            )}
          </Fragment>
        ))}
      </div>
      {activePageNumber !== pagesCount ? (
        <PaginationButton variant="next" activePageNumber={activePageNumber} />
      ) : null}
    </div>
  );
};
