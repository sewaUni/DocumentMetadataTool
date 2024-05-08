import { fetchPaper } from "@/lib/data";
import { PersonLinks } from "@/components/persons/personLinks";
import { Button, buttonVariants } from "@/components/ui/button";
import { LiteratureTable } from "@/components/papers/LiteratureTable";
import Link from "next/link";
import { toast } from "sonner";

export default async function PaperPage({ params }) {
  const paper = await fetchPaper(params.id);
  const word_count = paper.word_count
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <>
      <div className="flex w-full items-center justify-between px-6">
        <div className="basis-1/6"></div>
        <h1 className={"grow py-6 text-center text-4xl font-bold"}>
          {paper.title}
        </h1>
        <div className="basis-1/6 content-center text-right">
          <Link className={buttonVariants()} href={`/papers/${params.id}/edit`}>
            Edit Metadata
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8 py-2">
        <span>
          <strong>Publication Date:</strong>{" "}
          {new Date(paper.date).toLocaleDateString()}
        </span>
        <span>
          <strong>Project Partner:</strong> {paper.project_partner}
        </span>
        <span>
          <strong>Course:</strong> {paper.course}
        </span>
      </div>
      <p className="w-3/5 py-2 text-justify text-gray-700">{paper.abstract}</p>
      <div className="flex flex-col flex-wrap items-center justify-center gap-8 py-4">
        <div className="flex flex-col items-center py-2">
          <span>
            <h2 className="py-4 text-center text-2xl font-bold">Authors</h2>
            <PersonLinks personIds={paper.authors} />
          </span>
          <span>
            <h2 className="py-4 text-center text-2xl font-bold">Supervisors</h2>
            <PersonLinks personIds={paper.supervisors} />
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <span>
            <strong>Language:</strong> {paper.language}
          </span>
          <span>
            <strong>Methodology:</strong> {paper.methodology}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <span>
            <strong>Pages:</strong> {paper.pages}
          </span>
          <span>
            <strong>Word Count:</strong> {word_count}
          </span>
        </div>
      </div>
      <div className="w-3/5 py-10">
        <h2 className="py-4 text-center text-2xl font-bold">Used Literature</h2>
        <LiteratureTable literatureIds={paper.literature} />
      </div>
      <Button className="m-4 text-xl">Download Full Paper</Button>
    </>
  );
}
