import { fetchLiterature } from "@/lib/data";
import { Suspense } from "react";
import { PapersTable } from "@/components/papers/PapersTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function LiteraturePage({ params }) {
  const paper = await fetchLiterature(params.id);

  return (
    <>
      <div className="flex w-full items-center justify-between px-6">
        <div className="basis-1/6"></div>
        <h1 className={"grow py-6 text-center text-4xl font-bold"}>
          {paper.title}
        </h1>
        <div className="basis-1/6 content-center text-right">
          <Link
            className={buttonVariants()}
            href={`/literature/${params.id}/edit`}
          >
            Edit Literature
          </Link>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
        <span>
          <strong>Authors:</strong> {paper.authors}
        </span>
        <span>
          <strong>Publication Date:</strong>{" "}
          {new Date(paper.date).toLocaleDateString()}
        </span>
        <span>
          <strong>DOI:</strong> {paper.doi}
        </span>
        <span>
          <strong>URL:</strong> {paper.url}
        </span>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <h2 className="py-2 text-xl font-semibold">
          Literature used in these papers
        </h2>
        <div className="flex w-full flex-col items-center justify-between gap-2 px-4">
          <PapersTable literature={paper.id} />
        </div>
      </Suspense>
    </>
  );
}
