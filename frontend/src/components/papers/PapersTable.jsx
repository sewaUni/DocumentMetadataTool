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
import {
  fetchFilteredPapers,
  fetchPapersByLiterature,
  fetchPapersByPerson,
} from "@/lib/data";
import { PersonLinks } from "@/components/persons/personLinks";

export async function PapersTable({ query, currentPage, person, literature }) {
  let papers = [];
  if (person) {
    papers = await fetchPapersByPerson(person);
  } else if (literature) {
    papers = await fetchPapersByLiterature(literature);
  } else {
    papers = await fetchFilteredPapers(query, currentPage);
  }

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Supervisors</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {papers.map((paper) => (
            <TableRow key={paper.id}>
              <TableCell className="font-medium underline">
                <Link href={`/papers/${paper.id}`}>{paper.title}</Link>
              </TableCell>
              <TableCell>
                <PersonLinks personIds={paper.authors} />
              </TableCell>
              <TableCell>
                <PersonLinks personIds={paper.supervisors} />
              </TableCell>
              <TableCell className="text-right">
                {new Date(paper.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
