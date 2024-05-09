import { fetchPersons } from "@/lib/data";
import Link from "next/link";

export async function PersonLinks({ personIds }) {
  const persons = await fetchPersons(personIds);
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {persons.map((author) => (
        <div
          key={author.id}
          className="w-fit whitespace-nowrap rounded-xl bg-accent px-2 py-1 transition duration-150 ease-in-out hover:bg-neutral-300"
        >
          <Link key={author.id} href={`/authors/${author.id}`}>
            {author.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
