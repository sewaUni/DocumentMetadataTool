import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import pb from "@/lib/pocketbase"
import Link from "next/link";

const papers = await pb.collection('papers').getFullList({
    sort: '-created',
});


export function PapersTable() {
    return (
        <Table>
            <TableCaption>A list of your uploaded papers</TableCaption>
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
                        <TableCell >{paper.id}</TableCell>
                        <TableCell className="font-medium underline">
                            <Link href={`/papers/${paper.id}`}>{paper.title}</Link>
                        </TableCell>
                        <TableCell>{paper.authors}</TableCell>
                        <TableCell className="text-right">{paper.date}</TableCell>
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
    )
}
