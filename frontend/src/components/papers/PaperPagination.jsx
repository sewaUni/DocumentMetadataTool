"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaperPagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // console.log("currentPage: ", currentPage + " totalPages: ", totalPages);

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
            href={createPageURL(currentPage - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={createPageURL(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <div>/</div>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={createPageURL(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
            href={createPageURL(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
