'use client';

import { PageInfo } from '@/generated/graphql';
import { Pagination as NextUIPagination } from '@heroui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props extends PageInfo {
  onChangePage: (nextPage: boolean) => void;
}
export const BasicPagination = ({ hasNextPage, hasPreviousPage, onChangePage }: Props) => {
  return (
    <div className='mt-4 flex items-center justify-end gap-2'>
      <button
        disabled={!hasPreviousPage}
        className='bg-primary flex h-8 w-8 items-center justify-center rounded-full hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => onChangePage(false)}
        aria-label='Página anterior'
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <button
        disabled={!hasNextPage}
        className='bg-primary flex h-8 w-8 items-center justify-center rounded-full hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => onChangePage(true)}
        aria-label='Página siguiente'
      >
        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-white' viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M9.293 16.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

export const Pagination = ({ totalPages, currentPage, className }: PaginationProps) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    const url = `${path}?${params.toString()}`;
    router.replace(url, { scroll: false });
  };

  return (
    <NextUIPagination
      showControls
      total={totalPages}
      showShadow
      page={currentPage}
      onChange={handleChangePage}
      className={className}
    />
  );
};
