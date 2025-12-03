'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';

type ProductsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductsPaginationProps) {
  const isNextDisabled = currentPage === totalPages;
  const isPrevDisabled = currentPage === 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          className={
            isPrevDisabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          }
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
              className={
                index + 1 === currentPage
                  ? 'pointer-events-none opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          className={
            isNextDisabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'
          }
        />
      </PaginationContent>
    </Pagination>
  );
}

export { ProductsPagination };
