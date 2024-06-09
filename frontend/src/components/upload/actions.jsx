"use server";
import { uploadPaper } from "@/lib/data";
import { redirect } from "next/navigation";

export async function uploadAction(formData) {
  formData.set("title", formData.get("document").name);

  const result = await uploadPaper(formData);
  if (result.error) return { error: result.error };
  redirect(`/papers/${result.id}/edit`);
}
