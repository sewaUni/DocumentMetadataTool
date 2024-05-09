import { fetchLiterature, updateLiterature } from "@/lib/data";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";

async function updateAction(formData) {
  "use server";
  const json = Object.fromEntries(formData);

  const result = await updateLiterature(json);
  redirect(`/literature/${json.id}`);
}

export default async function EditLiteraturePage({ params }) {
  const paper = await fetchLiterature(params.id);

  return (
    <>
      <form className="contents w-full rounded-md border" action={updateAction}>
        <input type="hidden" value={paper.id} name="id" />
        <div className="flex w-full items-center justify-between gap-2 px-6">
          <div className="basis-1/6"></div>
          <input
            className="m-4 rounded-md border bg-secondary p-2 text-center text-4xl font-bold"
            type="text"
            name="name"
            defaultValue={paper.title}
          />
          <div className="flex basis-1/6 content-center justify-end gap-2">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={`/literature/${params.id}`}
            >
              Back
            </Link>
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 p-4">
          <span>
            <strong>Authors:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="text"
            name="authors"
            defaultValue={paper.authors}
          />
          <span>
            <strong>Publication Date:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="date"
            name="date"
            defaultValue={new Date(paper.date).toLocaleDateString("en-CA")}
          />
          <span>
            <strong>DOI:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="text"
            name="doi"
            defaultValue={paper.doi}
          />
          <span>
            <strong>URL:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="url"
            name="url"
            defaultValue={paper.url}
          />
        </div>
      </form>
    </>
  );
}
