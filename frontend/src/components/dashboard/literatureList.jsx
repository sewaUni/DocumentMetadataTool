import { fetchTopFiveLiterature } from "@/lib/data";
import Link from "next/link";

export async function LiteratureList() {
  const literature = await fetchTopFiveLiterature();
  return (
    <div className="h-96 space-y-8 overflow-x-auto pr-2">
      {literature.map((lit) => (
        <ListItem
          key={lit.title}
          id={lit.id}
          name={lit.title}
          authors={lit.authors}
          number={lit.count}
        />
      ))}
    </div>
  );
}

function ListItem({ id, name, authors, number }) {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        <Link
          className="line-clamp-2 text-sm font-medium underline"
          href={`/literature/${id}`}
        >
          {name}
        </Link>
        <p className="text-sm text-muted-foreground">{authors}</p>
      </div>
      <div className="ml-auto font-medium">{number}</div>
    </div>
  );
}
