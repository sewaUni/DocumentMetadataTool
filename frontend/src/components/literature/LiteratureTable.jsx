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
import { fetchUsedLiterature } from "@/lib/data";

export async function LiteratureTable({ literatureIds }) {
  const literature = await fetchUsedLiterature(literatureIds);

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>DOI</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {literature.map((paper) => (
            <TableRow key={paper.id}>
              <TableCell className="font-bold">
                <Link className="underline" href={`/literature/${paper.id}`}>
                  {paper.title}
                </Link>
              </TableCell>
              <TableCell>{paper.authors}</TableCell>
              <TableCell>{new Date(paper.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {" "}
                <Link className="underline" href={paper.doi}>
                  {paper.doi}
                </Link>
              </TableCell>
              <TableCell>
                <Link className="underline" href={paper.url}>
                  {paper.url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{literature.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
