import pb from "@/lib/pocketbase"


export default async function PaperPage ({params}) {
    const record = await pb.collection('papers').getOne(params.id);

    return (
        <>
            <h1 className="font-bold text-2xl p-4">{record.title}</h1>
            <p>{record.authors}</p>
            <p>{record.date}</p>
            <p>{record.abstract}</p>
        </>
    )
}