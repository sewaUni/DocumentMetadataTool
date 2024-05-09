"use server";

import { createLiterature, updatePaperById } from "@/lib/data";

export async function createLiteratureAction(formData) {
  const json = Object.fromEntries(formData);
  return await createLiterature(json);
}

export async function updatePaperLiterature(paperId, literature) {
  literature = { literature: literature.map((paper) => paper.id) };

  await updatePaperById(paperId, literature);
}
