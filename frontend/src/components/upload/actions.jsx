"use server";
import { uploadPaper } from "@/lib/data";
import { redirect } from "next/navigation";

export async function uploadAction(formData) {
  formData.set("title", formData.get("document").name);

  const result = await uploadPaper(formData);
  console.log(result);
  if (result?.error)    return result;
  else redirect(`/papers/${result.id}/edit`);
}
