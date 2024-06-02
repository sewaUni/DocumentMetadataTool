import { fetchPerson, updatePerson } from "@/lib/data";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Author",
};

async function updateAction(formData) {
  "use server";
  const json = Object.fromEntries(formData);

  const result = await updatePerson(json);
  redirect(`/authors/${json.id}`);
}

export default async function EditPersonPage({ params }) {
  const author = await fetchPerson(params.id);

  return (
    <>
      <form className="contents w-full rounded-md border" action={updateAction}>
        <input type="hidden" value={author.id} name="id" />
        <div className="flex w-full items-center justify-between gap-2 px-6">
          <div className="basis-1/6"></div>
          <input
            className="m-4 rounded-md border bg-secondary p-2 text-center text-4xl font-bold"
            type="text"
            name="name"
            defaultValue={author.name}
          />
          <div className="flex basis-1/6 content-center justify-end gap-2">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={`/authors/${params.id}`}
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
            <strong>Role:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="text"
            name="person_type"
            defaultValue={author.person_type}
          />
          <span>
            <strong>E-Mail:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="email"
            name="email"
            defaultValue={author.email}
          />
          <span>
            <strong>Student ID:</strong>
          </span>
          <input
            className="rounded-md border bg-secondary p-2"
            type="text"
            name="student_id"
            defaultValue={author.student_id}
          />
        </div>
      </form>
    </>
  );
}
