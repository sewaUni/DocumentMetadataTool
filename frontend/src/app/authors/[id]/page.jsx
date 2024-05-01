import {fetchAuthor, fetchAuthors} from "@/lib/data";
import {Suspense} from "react";
import {PapersTable} from "@/components/papers/PapersTable";

export default async function AuthorPage({params}) {
    const author = await fetchAuthor(params.id)

    return (
        <>
            <h1 className={"font-bold text-4xl p-4"}>Papers by {author.name}</h1>
            <p>Author ID: {author.id}</p>
            <p>E-Mail: {author.email}</p>

            <Suspense fallback={<div>Loading...</div>}>
                <PapersTable query={query} currentPage={currentPage}/>
            </Suspense>
        </>
    );
}