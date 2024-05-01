import { PapersTable } from "@/components/papers/PapersTable";
import { Suspense } from "react";
import Search from "@/components/ui/search";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import PaperPagination from "@/components/papers/PaperPagination";
import { fetchPaperPages } from "@/lib/data";

export default async function PapersPage({ searchParams }) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPaperPages();

  return (
    <>
      <h1 className={"p-4 text-4xl font-bold"}>Paper Overview</h1>
      <div className="flex w-full items-center justify-between gap-2 p-4">
        <Search placeholder={"Search Papers..."} />
        <Link className={buttonVariants()} href={"/upload"}>
          Upload Papers
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <PapersTable query={query} currentPage={currentPage} />
        <div className="p-4">
          <PaperPagination totalPages={totalPages} />
        </div>
      </Suspense>
    </>
  );
}
