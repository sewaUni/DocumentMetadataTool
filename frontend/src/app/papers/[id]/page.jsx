import pb from "@/lib/pocketbase";
import { fetchAuthorNames, fetchPaper } from "@/lib/data";
import { AuthorLinks } from "@/components/papers/authorLinks";
import { Button } from "@/components/ui/button";

export default async function PaperPage({ params }) {
  const paper = await fetchPaper(params.id);

  return (
    <>
      <h1 className={"p-4 text-4xl font-bold"}>{paper.title}</h1>
      <div className="flex flex-wrap items-center gap-6">
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
      <p className="w-2/3 p-4 text-justify text-gray-700">{paper.abstract}</p>
      <div className="flex flex-col flex-wrap items-center justify-center gap-6">
        <span>
          <h2 className="pb-2 text-center text-2xl font-bold">Authors</h2>
          <AuthorLinks authorIds={paper.authors} />
        </span>
        <div className="flex flex-wrap items-center gap-6">
          <span>
            <strong>Language:</strong> {paper.language}
          </span>
          <span>
            <strong>Methodology:</strong> {paper.methodology}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <span>
            <strong>Pages:</strong> {paper.pages}
          </span>
          <span className="mr-4">
            <strong>Word Count:</strong> {paper.word_count}
          </span>
        </div>
        <Button className="m-4 text-xl">Download Full Paper</Button>
      </div>
    </>
  );
}
