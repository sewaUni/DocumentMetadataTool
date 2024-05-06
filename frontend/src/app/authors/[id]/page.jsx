import { fetchAuthor, fetchAuthors } from "@/lib/data";
import { Suspense } from "react";
import { PapersTable } from "@/components/papers/PapersTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function AuthorPage({ params }) {
  const author = await fetchAuthor(params.id);

  return (
    <>
      <div className="flex w-full items-center justify-between px-6">
        <div className="basis-1/6"></div>
        <h1 className={"grow py-6 text-center text-4xl font-bold"}>
          Papers by {author.name}
        </h1>
        <div className="basis-1/6 content-center text-right">
          <Link
            className={buttonVariants()}
            href={`/authors/${params.id}/edit`}
          >
            Edit Author
          </Link>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-4 p-4">
        <span>
          <strong>Role:</strong> {author.person_type}
        </span>
        <span>
          <strong>E-Mail:</strong> {author.email}
        </span>
        {author.student_id ? (
          <span>
            <strong>Student ID:</strong> {author.student_id}
          </span>
        ) : (
          <></>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex w-full flex-col items-center justify-between gap-2 px-4">
          <PapersTable author={author.id} />
        </div>
      </Suspense>
    </>
  );
}
