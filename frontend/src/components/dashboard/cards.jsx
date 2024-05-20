import { fetchCardData } from "@/lib/data";

export default async function CardWrapper() {
  const { numberOfPapers, numberOfAuthors, numberOfLiterature, averagePages } =
    await fetchCardData();
  return (
    <>
      <Card title="Total Papers" value={numberOfPapers} />
      <Card title="Total Authors" value={numberOfAuthors} />
      <Card title="Total Literature" value={numberOfLiterature} />
      <Card title="Average pages" value={averagePages} />
    </>
  );
}

export function Card({ title, value }) {
  return (
    <div className="rounded-lg bg-secondary p-2">
      <div className="flex justify-center px-4 py-2">
        <h3 className="text-md font-medium">{title}</h3>
      </div>
      <p className={"rounded-lg bg-white px-4 py-8 text-center text-2xl"}>
        {value}
      </p>
    </div>
  );
}
