"use server";
import { uploadPaper } from "@/lib/data";
import { redirect } from "next/navigation";

export async function uploadAction(formData) {
  formData.set("title", formData.get("document").name);

  const result = await uploadPaper(formData);
  console.log(result);
  if (result?.error)
    return {
      status: result.error.status,
      statusText: result.error.statusText,
    };
  else redirect(`/papers/${result.id}/edit`);
}
