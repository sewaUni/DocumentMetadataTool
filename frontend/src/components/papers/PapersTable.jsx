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

const papers = [
    {
        id: "1",
        title: "MetaAnalysis tool",
        authors: "Wallner et al.",
        date: "10.06.2024",
    },
    {
        id: "2",
        title: "ERP Process tools for SMEs",
        authors: "Stadler et al.",
        date: "10.06.2024",
    },
    {
        id: "3",
        title: "Design Science Research: A Methodology for Engineering Productive Information Systems",
        authors: "Peffers et al.",
        date: "12.04.1997",
    },
    {
        id: "4",
        title: "Paper 4",
        authors: "Author 4",
        date: "10.06.2024",
    },
]

export function PapersTable() {
    return (
        <Table>
            <TableCaption>A list of your uploaded papers</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Papers</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {papers.map((paper) => (
                    <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.id}</TableCell>
                        <TableCell>{paper.title}</TableCell>
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
