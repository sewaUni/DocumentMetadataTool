import {fetchAuthor, fetchAuthors} from "@/lib/data";
import {Suspense} from "react";
import {PapersTable} from "@/components/papers/PapersTable";

export default async function AuthorPage({params}) {
    const author = await fetchAuthor(params.id)

    return (
        <>
            <h1 className={"font-bold text-4xl p-4"}>Papers by {author.name}</h1>
            <div className="flex flex-row flex-wrap justify-center gap-2 p-4">
                <span>
                <strong>Author ID:</strong> {author.id}
                </span>
                <span>
                <strong>Role:</strong> {author.person_type}
                </span>
                <span>
                <strong>E-Mail:</strong> {author.email}
                </span>
                {author.student_id ? <span>
                <strong>Student ID:</strong> {author.student_id}
                </span> : <></>}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <PapersTable author={author.id}/>
            </Suspense>
        </>
    );
}