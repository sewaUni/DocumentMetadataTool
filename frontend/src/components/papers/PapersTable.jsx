import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { fetchFilteredPapers, fetchPapersByAuthor } from "@/lib/data";
import { AuthorLinks } from "@/components/papers/authorLinks";

export async function PapersTable({ query, currentPage, author }) {
  const papers = author
    ? await fetchPapersByAuthor(author)
    : await fetchFilteredPapers(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {papers.map((paper) => (
          <TableRow key={paper.id}>
            <TableCell>{paper.id}</TableCell>
            <TableCell className="font-medium underline">
              <Link href={`/papers/${paper.id}`}>{paper.title}</Link>
            </TableCell>
            <TableCell>
              <AuthorLinks authorIds={paper.authors} />
            </TableCell>
            <TableCell className="text-right">
              {new Date(paper.date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{papers.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
