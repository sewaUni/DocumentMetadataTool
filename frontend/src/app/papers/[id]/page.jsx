import pb from "@/lib/pocketbase"
import {fetchAuthorNames, fetchPaper} from "@/lib/data";
import {AuthorLinks} from "@/components/ui/authorLinks";


export default async function PaperPage({params}) {
    const paper = await fetchPaper(params.id)

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
            <p className="text-gray-700 mb-4">{paper.abstract}</p>
            <div className="flex flex-wrap items-center mb-4">
        <span className="mr-4">
          <strong>Authors:</strong> <AuthorLinks authorIds={paper.authors}/>
        </span>
                <span className="mr-4">
          <strong>Course:</strong> {paper.course}
        </span>
                <span className="mr-4">
          <strong>Language:</strong> {paper.language}
        </span>
            </div>
            <div className="flex flex-wrap items-center mb-4">
        <span className="mr-4">
          <strong>Pages:</strong> {paper.pages}
        </span>
                <span className="mr-4">
          <strong>Methodology:</strong> {paper.methodology}
        </span>
                <span className="mr-4">
          <strong>Project Partner:</strong> {paper.project_partner}
        </span>
            </div>
            <div className="flex flex-wrap items-center mb-4">
        <span className="mr-4">
          <strong>Created:</strong> {new Date(paper.created).toLocaleDateString()}
        </span>
                <span className="mr-4">
          <strong>Last Updated:</strong> {new Date(paper.updated).toLocaleDateString()}
        </span>
                <span className="mr-4">
          <strong>Publication Date:</strong> {new Date(paper.date).toLocaleDateString()}
        </span>
            </div>
            <div className="flex flex-wrap items-center">
        <span className="mr-4">
          <strong>Word Count:</strong> {paper.word_count}
        </span>
                <span className="mr-4">
          <strong>Collection:</strong> {paper.collectionName}
        </span>
            </div>
        </div>)
}