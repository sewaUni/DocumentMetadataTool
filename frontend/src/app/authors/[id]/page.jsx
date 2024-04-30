import {fetchAuthor, fetchAuthors} from "@/lib/data";

export default async function AuthorPage({params}) {
    const author = await fetchAuthor(params.id)

    console.log(author)
    return (
        <div>
            <h1 className={"font-bold text-4xl p-4"}>Papers by {author.name}</h1>
            <p>Author ID: {author.id}</p>
            <p>E-Mail: {author.email}</p>
        </div>
    );
}