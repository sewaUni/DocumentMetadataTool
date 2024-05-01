import {fetchAuthors} from "@/lib/data";
import Link from "next/link";

export async function AuthorLinks({authorIds}) {
    const authors = await fetchAuthors(authorIds)
    return (
        <div className="flex flex-row gap-1">
            {authors.map((author) => (
                <div key={author.id} className="bg-accent rounded-xl px-2 py-1 w-fit hover:bg-neutral-300 transition ease-in-out duration-150">
                    <Link key={author.id} href={`/authors/${author.id}`}>{author.name}</Link>
                </div>
            ))}
        </div>
    )
}