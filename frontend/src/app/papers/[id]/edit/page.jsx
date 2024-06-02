import { Button, buttonVariants } from "@/components/ui/button";
import {
  fetchAllPersons,
  fetchPersons,
  fetchPaper,
  updatePaper,
  fetchUsedLiterature,
  fetchAllLiterature,
  deletePaper,
} from "@/lib/data";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PersonLinksEditable } from "@/components/persons/personLinksEditable";
import { LiteratureTableEditable } from "@/components/literature/literatureTableEditable";

export const metadata = {
  title: "Edit Paper",
};

async function updateAction(formData) {
  "use server";
  const json = Object.fromEntries(formData);
  const result = await updatePaper(json); //todo could implement error handling
  redirect(`/papers/${json.id}`);
}

async function deleteAction(formData) {
  "use server";
  const json = Object.fromEntries(formData);
  const result = await deletePaper(json.id); //todo could implement error handling
  redirect(`/papers`);
}

export default async function EditPaperPage({ params }) {
  const paper = await fetchPaper(params.id);
  const authors = await fetchPersons(paper.authors);
  const supervisors = await fetchPersons(paper.supervisors);
  const allPersons = await fetchAllPersons();
  const literature = await fetchUsedLiterature(paper.literature);
  const allLiterature = await fetchAllLiterature();

  return (
    <>
      <form className="contents w-full rounded-md border" action={updateAction}>
        <input type="hidden" value={paper.id} name="id" />
        <div className="flex w-full items-center justify-between gap-2 px-6">
          <div className="basis-1/6"></div>
          <input
            className="m-4 grow rounded-md border bg-secondary p-2 text-center text-4xl font-bold"
            type="text"
            name="title"
            defaultValue={paper.title}
          />
          <div className="flex basis-1/6 content-center justify-end gap-2">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={`/papers/${params.id}`}
            >
              Back
            </Link>
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 py-2">
          <label className="flex flex-col">
            <span>
              <strong>Publication Date:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="date"
              name="date"
              defaultValue={new Date(paper.date).toLocaleDateString("en-CA")}
            />
          </label>
          <label className="flex flex-col">
            <span>
              <strong>Project Partner:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="text"
              name="project_partner"
              defaultValue={paper.project_partner}
            />
          </label>
          <label className="flex flex-col">
            <span>
              <strong>Course:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="text"
              name="course"
              defaultValue={paper.course}
            />
          </label>
        </div>
        <textarea
          className="h-60 w-3/5 rounded-md border bg-secondary px-4 py-2 text-justify text-gray-700"
          name="abstract"
          defaultValue={paper.abstract}
        ></textarea>
        <div className="flex flex-col flex-wrap items-center justify-center pb-4">
          <h2 className="py-4 text-center text-2xl font-bold">Authors</h2>
          <PersonLinksEditable
            paperIdProp={paper.id}
            personsProp={authors}
            otherPersonsProp={allPersons}
            personTypeProp={"authors"}
          />
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center pb-4">
          <h2 className="py-4 text-center text-2xl font-bold">Supervisors</h2>
          <PersonLinksEditable
            paperIdProp={paper.id}
            personsProp={supervisors}
            otherPersonsProp={allPersons}
            personTypeProp={"supervisors"}
          />
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <label className="flex flex-col">
            <span>
              <strong>Language:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="text"
              name="language"
              defaultValue={paper.language}
            />
          </label>
          <label className="flex flex-col">
            <span>
              <strong>Methodology:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="text"
              name="methodology"
              defaultValue={paper.methodology}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <label className="flex flex-col">
            <span>
              <strong>Pages:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="number"
              name="pages"
              defaultValue={paper.pages}
            />
          </label>
          <label className="flex flex-col">
            <span>
              <strong>Word Count:</strong>
            </span>
            <input
              className="rounded-md border bg-secondary p-2"
              type="number"
              name="word_count"
              defaultValue={paper.word_count}
            />
          </label>
        </div>
        <div className="w-3/5 py-10">
          <h2 className="py-4 text-center text-2xl font-bold">
            Used Literature
          </h2>
          <LiteratureTableEditable
            paperIdProp={paper.id}
            literatureProp={literature}
            otherLiteratureProp={allLiterature}
          />
        </div>
        <div className="flex w-3/5 flex-col items-center justify-center">
          <h2 className="py-4 text-center text-2xl font-bold">
            Additional Information
          </h2>
          <textarea
            className="h-32 w-full rounded-md border bg-secondary px-4 py-2 text-justify text-gray-700"
            name="infos"
            defaultValue={paper.infos}
          ></textarea>
        </div>
        <Button
          formAction={deleteAction}
          variant={"destructive"}
          className="m-4 text-xl"
        >
          Delete Paper
        </Button>
      </form>
    </>
  );
}
