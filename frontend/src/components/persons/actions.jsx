"use server";

import { createPerson, updatePaperById } from "@/lib/data";

export async function createPersonAction(formData) {
  const json = Object.fromEntries(formData);
  return await createPerson(json);
}

export async function updatePaperPersons(paperId, personType, persons) {
  if (personType === "authors") {
    persons = { authors: persons.map((person) => person.id) };
  } else if (personType === "supervisors") {
    persons = { supervisors: persons.map((person) => person.id) };
  }

  await updatePaperById(paperId, persons);
}
