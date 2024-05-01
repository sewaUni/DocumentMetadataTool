import pb from "@/lib/pocketbase";
import { fetchAuthorNames, fetchPaper } from "@/lib/data";
import { AuthorLinks } from "@/components/papers/authorLinks";
import { Button } from "@/components/ui/button";
import { LiteratureTable } from "@/components/papers/LiteratureTable";

export default async function PaperPage({ params }) {
  const paper = await fetchPaper(params.id);
  const word_count = paper.word_count
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <>
      <h1 className={"p-4 text-4xl font-bold"}>{paper.title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-8 py-4">
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
      <p className="w-3/5 py-4 text-justify text-gray-700">{paper.abstract}</p>
      <div className="flex flex-col flex-wrap items-center justify-center gap-8">
        <span>
          <h2 className="py-4 text-center text-2xl font-bold">Authors</h2>
          <AuthorLinks authorIds={paper.authors} />
        </span>
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
